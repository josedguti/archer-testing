import {socialLoginOptions} from '../utils';

Cypress.Commands.add('login',()=>{  
        return cy
          .task("GithubSocialLogin", socialLoginOptions)    
})


