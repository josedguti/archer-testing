import axios from "axios";

async function approveRequirement(id) {
  var data = JSON.stringify({
    query: `mutation {
      approveRequirement(requirementId:"${id}"){         
      priority,
      message
      }
      }`,
    variables: {},
  });
  var config = {
    method: "post",
    url: "/api/graphql",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };
  const response = await axios(config);
  window.location.reload();
}

export default approveRequirement;
