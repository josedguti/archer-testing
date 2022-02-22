import _ from "lodash";
import { GithubApi } from "../../../lib/github";

export default async function handler(req, res) {
  if (req.method === "POST") {
    console.log(req.body);
    const {
      requirementTitle,
      requirementDescription,
      repoName,
      repoId,
      projectId,
    } = req.body;

    if (_.isEmpty(requirementTitle)) {
      return res.status(400).send({
        status: false,
        message: "Requirement title is required",
      });
    }
    if (_.isEmpty(requirementDescription)) {
      return res.status(400).send({
        status: false,
        message: "Requirement description is required",
      });
    }
    if (_.isEmpty(repoName)) {
      return res.status(400).send({
        status: false,
        message: "Repository name is required",
      });
    }
    if (_.isEmpty(repoId)) {
      return res.status(400).send({
        status: false,
        message: "Repository id is required",
      });
    }
    if (_.isEmpty(projectId)) {
      return res.status(400).send({
        status: false,
        message: "Project id is required",
      });
    }

    try {
      // create a new milestone for a new requirement to the repository
      let issueMilestoneId = null;
      try {
        const milestoneResp = await GithubApi.Respository.Milestone.Create({
          repoName: repoName,
          milestoneTitle: requirementTitle,
          githubToken: process.env.GITHUB_ACCESS_TOKEN,
          githubOrgName: process.env.GITHUB_ORG_NAME,
        });

        issueMilestoneId = milestoneResp?.data?.node_id;
      } catch (err) {
        if (err.response.data.errors[0].code === "already_exists") {
          return res.status(422).send({
            status: false,
            message: `Milestone '${requirementTitle}' already exists`,
          });
        }
        return res.status(500).send({
          status: false,
          message: "Mielstone creation failed",
        });
      }
      if (_.isEmpty(issueMilestoneId)) {
        return res.status(400).send({
          status: false,
          message: "Milestone id is required",
        });
      }

      // create a new issue to the repository project
      const issueResp = await GithubApi.Respository.Project.Issue.Create({
        repoId,
        issueTitle: "Default",
        projectId,
        issueMilestoneId,
        issueDescription: requirementDescription,
        githubToken: process.env.GITHUB_ACCESS_TOKEN,
      });

      return res.status(200).send({
        status: true,
        message: "Requirement created successfully",
      });
    } catch (err) {
      console.log(err.response.data);
      return res.status(500).send({
        status: false,
        message: "Error creating requirement",
      });
    }
  } else if (req.method === "GET") {
    const { repoName } = req.query;

    if (_.isEmpty(repoName)) {
      return res.status(400).send({
        status: false,
        message: "Repository name is required",
      });
    }

    try {
      // get all the requirements of the project
      const requirementResp = await GithubApi.Respository.Milestone.List({
        repoName,
        githubOrgName: process.env.GITHUB_ORG_NAME,
      });

      // extract milestone nodes
      const requirementNodes =
        requirementResp.data?.data?.repository?.milestones?.nodes || [];

      // pull out the 'Milestone 1'
      const nodes = _.pullAllBy(
        requirementNodes,
        [{ title: "Milestone 1" }],
        "title"
      );

      // map requirement nodes to requirement objects
      const requirementList = nodes.map((item) => {
        let obj = {
          id: item.id,
          title: item.title,
          description: item.issues.nodes[0].body,
          url: item.url,
          issues: _.pullAllBy(
            item.issues.nodes,
            [{ title: "Default" }],
            "title"
          ),
        };
        let issues = obj.issues;
        console.log({ issues });

        if (issues.length > 0) {
          issues = issues.map((issue) => ({
            ...issue,
            assignees: issue.assignees.nodes,
          }));
        }
        obj.issues = issues;
        return obj;
      });
      console.log(requirementList);
      return res.status(200).send({
        status: true,
        data: requirementList,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).send({
        status: false,
        message: "Error fetching requirements",
      });
    }
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
