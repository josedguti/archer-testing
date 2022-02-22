import AxiosGithubClient from "../../../axiosGithubClient";

class Column {
  constructor() {
    this.axios = AxiosGithubClient();
  }
  async Create({ projectId, columnName, githubToken }) {
    const data = JSON.stringify({
      query: `mutation{
              addProjectColumn(input:{
                projectId: "${projectId}",
                name: "${columnName}"
              }){
                clientMutationId
              }
            }`,
      variables: {},
    });

    return this.axios.post(`/graphql`, data);
  }
}

export default Column = new Column();
