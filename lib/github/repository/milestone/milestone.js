import AxiosGithubClient from "../../axiosGithubClient";

class Milestone {
  constructor() {
    this.axios = AxiosGithubClient();
  }
  async Create({ repoName, milestoneTitle, githubToken, githubOrgName }) {
    const data = JSON.stringify({
      title: milestoneTitle,
    });
    return this.axios.post(
      `/repos/${githubOrgName}/${repoName}/milestones`,
      data
    );
  }
  async List({ githubOrgName, repoName }) {
    const data = JSON.stringify({
      query: `query {
        repository(name: "${repoName}", owner: "${githubOrgName}") {
          milestones(first: 10, orderBy: {field: CREATED_AT, direction: DESC}, states: OPEN) {
            nodes {
              id
              title
              url
              description
              issues(first: 50) {
                nodes {
                  body
                  title
                  assignees(first: 10) {
                    nodes {
                      avatarUrl
                      name
                    }
                  }
                }
              }
            }
          }
        }
      }`,
      variables: {},
    });

    return this.axios.post("/graphql", data);
  }
}

export default Milestone = new Milestone();
