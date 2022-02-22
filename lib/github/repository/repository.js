import AxiosGithubClient from "../axiosGithubClient";
import Milestone from "./milestone";
import Project from "./project";

class Repository {
  constructor() {
    this.axios = AxiosGithubClient();
  }
  async Create({
    repoName,
    repoDescription,
    repoPrivate,
    githubToken,
    githubOwnerId,
  }) {
    let data = JSON.stringify({
      query: `mutation{
                createRepository(input: {
                    name: "${repoName}",
                    description: "${repoDescription}",
                    ownerId:"${githubOwnerId}",
                    visibility: ${repoPrivate ? "PRIVATE" : "PUBLIC"},
                }) {
                    repository {
                        id,
                        name
                    }
                }
            }`,
      variables: {},
    });

    // Make a post request using axios
    return await this.axios.post("/graphql", data);
  }
  async List({ githubOrgName, githubToken }) {
    console.log(githubOrgName);
    const data = JSON.stringify({
      query: `query {
          organization(login: "${githubOrgName}") {
            repositories(first: 100, privacy: PRIVATE, affiliations: COLLABORATOR, orderBy: {field: CREATED_AT, direction: DESC}) {
              nodes {
                id
                name
                nameWithOwner
                description
                url
                createdAt
                updatedAt
                isPrivate
              }
              pageInfo {
                hasNextPage
              }
            }
          }
        }`,
      variables: {},
    });

    return this.axios.post("/graphql", data);
  }
}

Repository.prototype.Milestone = Milestone;
Repository.prototype.Project = Project;
export default Repository = new Repository();
