This document is to list the functionalities of the app by page. This is so that we get a better understanding of how the frontend should work and what are the backend dependencies we may have.

# Authentication

## Login/Register

- The user is will authenticate through this page.
- We will use Github OAuth for this.

# Organization

## Add Organization

- We don't need this page as we will use `organization` from the user data in `Github` to create an Org/company on Archer.

## Add User to Organization

- We don't need this page as we have the users data from Github, and we will assign them to the organization they are a part of on Github.

# Project Management

## Project Home

- The projects under the organization that are accessible by the user will be displayed.
- The admin/owner of the org can view all the project, as for the other users of the org, it will depend on their access-level set by the admin.
- The admin will be able to add people to desired projects by first adding them to the organization and then navigating to the project settings to which they want to add the other people.
- When a user clicks on a specific project it will take user to that projects view page.
- The user can navigate to the add project page from here.

## Add Project

- This page is where the user will add a new project
- The page will take the following as input when the user wants to add a project:
  1. Project name
  2. Description
  3. The problem it's solving
  4. Additional docs.
  5. People from user's org involved in the project.
- On the backend-side adding a project should trigger the following actions:
  1. Create a project repo under dabble-lab org.
  2. Create a Project Entity on CMS/DB.
  3. Create default issues on the project like `meeting/review & commenting on issues`

## View Project

- This page will simply fetch the data related to that specific project. The data could include:

1. Developers working on the project
2. Total hours spent on the project
3. Requirements of the project
4. If a requirement's estimation process is done there will be a button so that the client can set a priority for development. Priority tags can be set however the client wants—how they are used is communicated outside of Archer.

- The user will be able to visit the following pages from this project view/home page:

1. Add requirement
2. View specific requirement
3. Compose the requirements as needed (set their priorities)
4. Requirement Progress

## Edit Project

- The user should be able to update a few things on the project such as -

1. Renaming the project
2. Adding other people to the project
3. Removing people's access from certain projects

## Add Requirement

- Here the user will be able to add a requirement. The form for a requirement may have the following inputs -

1. Requirement Title
2. Requirement description
3. Requirement user story
4. Documents to be attached
5. Priority

- Adding a requirement should trigger the following actions in the backend:

1. Create a requirement entity on CMS.
2. Create a milestone on the project for this requirement.
3. Create a default issue with the user story linked to it and add it to the milestone.

`Note` - The milestone mentioned in point 2 will be used to track the estimation process. When the developers are done estimating and creating technical items, they will close that user story issue, which will cause the milestone to close, then the user will get a notification that the estimation process is done.

## View Requirement

- On this page the client gets to view an individual requirement.The functionalities may consist of -

1. If requirement estimated but not launched, it will prompt the client to set priority.
2. View the list of technical items related to that requirement.
3. Set priority of the requirement
4. Display data related to the requirement and the technical items such as-
   - Estimated time needed
   - Team members working on it
   - Percentage done
   - Hours spent

## Requirement Progress Page

- This page will be used to display the progress of an ongoing requirement.

# Requirement Review (Developers)

- Each Archer project is tied to a Dabble Lab GitHub repo, so for now, developers will have to use GitHub to mark issues as complete.
- A developer view is needed for voting on how long issues will take. This view is very minimal. It shows a new requirement (it doesn't matter which project it is for) and gives the background on the project along with who is working on it. This allows developers to reach out as needed and then enter their predicted technical items (issues) and timeframes. When the develop is done, they should be able to submit and the proposal will be sent around to other developers until a certain number edit and approve. Once approved, the requirement gets turned into a milestone and issues in GitHub and the client can set a priority.
- Instead of building out a UI for this inputing review data, for now we will use Contentful directly, but we still need a view that assigns reviewers (and stores the date of their review) for new requirements (even if the requirement updates). We should store the requirement history (how it has changed over time). In this flow, a few times each week, developers will meet with their randomly assign group to collaborate on establishing technical items for randomly assigned requirements. Once they all have decided on the technical items, the requirement goes into time estimation voting. As developers can, the requirements are passed around evenly until they have 3 time estimate. These estimates are multiplied by each developer (estimator's accuracy rate) and averaged before showing to the client.s