import _ from "lodash";
import { GithubApi } from "../../../lib/github";
import { getSession } from "next-auth/react";

const githubToken = process.env.GITHUB_ACCESS_TOKEN;
const githubOrgName = process.env.GITHUB_ORG_NAME;
const githubOwnerId = process.env.GITHUB_OWNER_ID;

/* POST - Create a project in archer
  1. create a new repository on github
  2. create a new project for the repository
  3. create a new milestone
  4. create a default issue in the repo
  5. create a team
  6. add the team to the repository
  7. add the user to the team
*/

/* GET - Get all projects in archer
    1. Fetch all the teams a user is a part of under the org
    2. Fetch all the repos the team has access to
*/

export default async function createProject(req, res) {
  const session = await getSession({ req });

  if (req.method === "POST") {
    const { repoName, repoDescription, repoPrivate = true } = req.body;

    // create a new repository on github
    const createRepoRes = await GithubApi.Respository.Create({
      repoName,
      repoDescription,
      repoPrivate,
      githubToken,
      githubOwnerId,
    });

    const repoId = createRepoRes?.data?.data?.createRepository?.repository?.id;
    const repoNameFromGithubAPI = createRepoRes?.data?.data?.createRepository?.repository?.name;

    // create a project board in the repo
    const projectBoard = await GithubApi.createRepositoryProjectBoard({
      repoNameFromGithubAPI,
      githubToken,
      githubOrgName,
    });

    // create the milestone
    const milestone = await GithubApi.Respository.Milestone.Create({
      repoName: repoNameFromGithubAPI,
      milestoneTitle: "Milestone 1",
      githubToken,
      githubOrgName,
    });

    // add default issues
    await GithubApi.addDefaultIssues({
      repoId,
      projectId: projectBoard.id,
      issueMilestoneId: milestone.data.node_id,
      githubToken,
    });

    // create a team
    const team = await GithubApi.createTeam({ githubOrgName, repoName });

    // add user to the team
    await GithubApi.addUserToTeam({
      teamSlug: team.data.slug,
      userName: session.user.username,
      githubOrgName,
    });

    // add team to the repository
    const repoTeamRes = await GithubApi.addTeamToRepository({
      githubOrgName,
      teamSlug: team.data.slug,
      owner: githubOrgName,
      repo: repoNameFromGithubAPI,
    });

    return res.status(200).send({
      sucess: true,
    });
  } else if (req.method === "GET") {
    const repos = await GithubApi.getClientRepos({
      githubOrgName,
      userName: session.user.username,
      first: 100,
    });
    res.status(200).json(repos);
  }
}
