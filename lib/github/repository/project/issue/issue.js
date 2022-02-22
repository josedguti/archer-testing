import AxiosGithubClient from "../../../axiosGithubClient";

class Issue {
  constructor() {
    this.axios = AxiosGithubClient();
  }
  async Create({
    repoId,
    issueTitle,
    issueDescription,
    issueMilestoneId,
    projectId,
    githubToken,
  }) {
    console.log("Creating issue : ", issueTitle);
    const data = JSON.stringify({
      query: `mutation {
                createIssue(input: {
                  title: "${issueTitle}",
                  body: "${issueDescription}",
                  repositoryId: "${repoId}",
                  milestoneId: "${issueMilestoneId}",
                  projectIds: ["${projectId}"],
                }) {
                  issue {
                      title
                  }
                }
              }`,
      variables: {},
    });

    return this.axios.post(`/graphql`, data);
  }
}

export default Issue = new Issue();
