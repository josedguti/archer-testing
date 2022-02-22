import Respository from "./repository";
import octokit from "./octokit";
import AxiosGithubClient from "./axiosGithubClient";

async function createRepositoryProjectBoard({
  repoNameFromGithubAPI,
  githubToken,
  githubOrgName,
}) {
  // create a new project to the repository
  const createProjectRes = await GithubApi.Respository.Project.Create({
    repoName: repoNameFromGithubAPI,
    projectName: "General",
    githubToken,
    githubOrgName,
  });

  const projectId = createProjectRes?.data?.node_id;

  // create a Backlog column to the project
  const backlogResp = await GithubApi.Respository.Project.Column.Create({
    projectId,
    columnName: "Backlog",
    githubToken,
  });

  // create a Next column to the project
  await GithubApi.Respository.Project.Column.Create({
    projectId,
    columnName: "Next",
    githubToken,
  });

  // create a Working column to the project
  await GithubApi.Respository.Project.Column.Create({
    projectId,
    columnName: "Working",
    githubToken,
  });

  // create a Review column to the project
  await GithubApi.Respository.Project.Column.Create({
    projectId,
    columnName: "Review",
    githubToken,
  });

  // create a Closed column to the project
  await GithubApi.Respository.Project.Column.Create({
    projectId,
    columnName: "Closed",
    githubToken,
  });

  return {
    project: createProjectRes.data,
    id: projectId,
  };
}

async function addDefaultIssues({
  repoId,
  projectId,
  issueMilestoneId,
  githubToken,
}) {
  // create a Meetings issue to the repository
  const MeetingIssue = () => {
    GithubApi.Respository.Project.Issue.Create({
      repoId,
      issueTitle: "Meetings",
      projectId,
      issueMilestoneId,
      issueDescription:
        "This issue is used for tracking time spent on meetings related to this project. Don't close this issue.",
      githubToken,
    });
  };

  // create a Review and Comment issue to the repository
  const ReviewAndCommentIssue = () => {
    GithubApi.Respository.Project.Issue.Create({
      repoId,
      issueTitle: "Review and comment on issues",
      projectId,
      issueMilestoneId,
      issueDescription:
        "This issue to track time when creating/editing and commenting on different issues.",
      githubToken,
    });
  };
  // create a Project Management issue to the repository
  const ProjectManagementIssue = () => {
    GithubApi.Respository.Project.Issue.Create({
      repoId,
      issueTitle: "Project Management",
      projectId,
      issueMilestoneId,
      issueDescription:
        "This issue is used to track project management time spent on this project. Don't close this issue.",
      githubToken,
    });
  };
  // create a Code reviews issue to the repository
  const CodeReviewsIssue = () => {
    GithubApi.Respository.Project.Issue.Create({
      repoId,
      issueTitle: "Code Reviews",
      projectId,
      issueMilestoneId,
      issueDescription:
        "Use this issue to track time spent reviewing code. This is an ongoing issue so it should stay in the `Backlog` and should not be closed.",
      githubToken,
    });
  };

  return Promise.all([
    MeetingIssue(),
    ReviewAndCommentIssue(),
    ProjectManagementIssue(),
    CodeReviewsIssue(),
  ]);
}

async function createTeam({ githubOrgName, repoName }) {
  return octokit.request("POST /orgs/{org}/teams", {
    org: githubOrgName,
    name: repoName + "-team",
  });
}

async function addUserToTeam({ teamSlug, userName, githubOrgName, role }) {
  await octokit.request(
    "PUT /orgs/{org}/teams/{team_slug}/memberships/{username}",
    {
      org: githubOrgName,
      team_slug: teamSlug,
      username: userName,
      role: role ? role : "member",
    }
  );
}

async function addTeamToRepository({ githubOrgName, teamSlug, owner, repo }) {
  await octokit.request(
    "PUT /orgs/{org}/teams/{team_slug}/repos/{owner}/{repo}",
    {
      org: githubOrgName,
      team_slug: teamSlug,
      owner: owner,
      repo: repo,
    }
  );
}

async function getClientRepos({ githubOrgName, userName, first }) {
  let data = JSON.stringify({
    query: `
    {
        organization(login: "${githubOrgName}") {
          teams(first: ${first} userLogins: ["${userName}"]) {
            nodes {
              name
              repositories(first: 100) {
                nodes {
                  name
                  url
                  id
                  description
                }
              }
            }
          }
        }
    }
    `,
    variables: {},
  });

  const axiosGithubClient = AxiosGithubClient();

  // Make a post request using axios
  const response = await axiosGithubClient.post("/graphql", data);

  const repos = response.data.data.organization.teams.nodes
    .reduce((a, c) => {
      if (c.repositories.nodes[0]) {
        return a.concat(c.repositories.nodes);
      }
      return a;
    }, [])
    .reverse();

  return repos;
}

export const GithubApi = {
  Respository,
  createRepositoryProjectBoard,
  addDefaultIssues,
  createTeam,
  addUserToTeam,
  addTeamToRepository,
  getClientRepos,
};
