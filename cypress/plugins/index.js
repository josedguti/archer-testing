const {GitHubSocialLogin} = require('cypress-social-logins').plugins

module.exports = (on, config) => {
  on("task", {
    GithubSocialLogin: GitHubSocialLogin,
  })
   return config;
}
