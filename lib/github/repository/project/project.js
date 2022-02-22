import AxiosGithubClient from "../../axiosGithubClient";

import Column from "./column";
import Issue from "./issue";

class Project {
  constructor() {
    this.axios = AxiosGithubClient();
  }
  async Create({ repoName, projectName, githubToken, githubOrgName }) {
    const data = JSON.stringify({
      name: projectName,
    });

    return this.axios.post(
      `/repos/${githubOrgName}/${repoName}/projects`,
      data
    );
  }
}

Project.prototype.Column = Column;
Project.prototype.Issue = Issue;
export default Project = new Project();
