const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
// use `prisma` in your application to read and write data in your DB

const GITHUB_USERNAME = "alextingiris";

// Generate seed project data function
async function generateSeedProjectData(
  username,
  projectName,
  projectDescription
) {
  const user = await prisma.user.findUnique({
    where: {
      username: username,
    },
  });

  const project = await prisma.project.create({
    data: {
      name: projectName ? projectName : "Project 1",
      description: projectDescription,
      users: {
        create: [
          {
            userId: user.id,
          },
        ],
      },
      requirements: {
        create: [
          {
            name: "Requirement 1",
            description: "This is the first requirement",
            stage: "completed",
            priority: "low",
            workItems: {
              create: [
                {
                  name: "Work Item 1",
                  hoursEstimated: 1,
                  hoursSpent: 1,
                  completed: true,
                },
                {
                  name: "Work Item 2",
                  hoursEstimated: 2,
                  hoursSpent: 1.5,
                  completed: true,
                },
              ],
            },
          },
          {
            name: "Requirement 2",
            description: "This is the second requirement",
            stage: "completed",
            priority: "high",
            workItems: {
              create: [
                {
                  name: "Work Item 1",
                  hoursEstimated: 1,
                  hoursSpent: 1,
                  completed: true,
                },
                {
                  name: "Work Item 2",
                  hoursEstimated: 2,
                  hoursSpent: 3,
                  completed: true,
                },
              ],
            },
          },
          {
            name: "Requirement 3",
            description: "This is the third requirement",
            stage: "inprogress",
            priority: "high",
            workItems: {
              create: [
                {
                  name: "Work Item 1",
                  hoursEstimated: 2,
                  hoursSpent: 0,
                  completed: false,
                },
                {
                  name: "Work Item 2",
                  hoursEstimated: 2,
                  hoursSpent: 1,
                  completed: false,
                },
                {
                  name: "Work Item 3",
                  hoursEstimated: 2,
                  hoursSpent: 2,
                  completed: true,
                },
              ],
            },
          },
          {
            name: "Requirement 4",
            description: "This is the fourth requirement",
            stage: "inprogress",
            priority: "low",
            workItems: {
              create: [
                {
                  name: "Work Item 1",
                  hoursEstimated: 2,
                  hoursSpent: 0,
                  completed: false,
                },
                {
                  name: "Work Item 2",
                  hoursEstimated: 2,
                  hoursSpent: 1,
                  completed: false,
                },
                {
                  name: "Work Item 3",
                  hoursEstimated: 2,
                  hoursSpent: 2,
                  completed: true,
                },
              ],
            },
          },
          {
            name: "Requirement 5",
            description: "This is the fifth requirement",
            stage: "ondeck",
            priority: "low",
            workItems: {
              create: [
                {
                  name: "Work Item 1",
                  hoursEstimated: 1,
                  hoursSpent: 0,
                  completed: false,
                },
                {
                  name: "Work Item 2",
                  hoursEstimated: 2,
                  hoursSpent: 0,
                  completed: false,
                },
              ],
            },
          },
          {
            name: "Requirement 6",
            description: "This is the sixth requirement",
            stage: "ondeck",
            priority: "low",
            workItems: {
              create: [
                {
                  name: "Work Item 1",
                  hoursEstimated: 1,
                  hoursSpent: 1,
                  completed: false,
                },
                {
                  name: "Work Item 2",
                  hoursEstimated: 2,
                  hoursSpent: 2,
                  completed: false,
                },
              ],
            },
          },
          {
            name: "Requirement 7",
            description: "This is the seventh requirement",
            stage: "waitingapproval",
            priority: "high",
            workItems: {
              create: [
                {
                  name: "Work Item 1",
                  hoursEstimated: 1,
                  hoursSpent: 0,
                  completed: false,
                },
                {
                  name: "Work Item 2",
                  hoursEstimated: 2,
                  hoursSpent: 0,
                  completed: false,
                },
              ],
            },
          },
          {
            name: "Requirement 8",
            description: "This is the eighth requirement",
            stage: "waitingapproval",
            priority: "low",
            workItems: {
              create: [
                {
                  name: "Work Item 1",
                  hoursEstimated: 1,
                  hoursSpent: 0,
                  completed: false,
                },
                {
                  name: "Work Item 2",
                  hoursEstimated: 2,
                  hoursSpent: 0,
                  completed: false,
                },
              ],
            },
          },
          {
            name: "Requirement 9",
            description: "This is the ninth requirement",
            stage: "makingestimate",
            priority: "low",
            workItems: {
              create: [
                {
                  name: "Work Item 1",
                  hoursEstimated: 1,
                  hoursSpent: 0,
                  completed: false,
                },
                {
                  name: "Work Item 2",
                  hoursEstimated: 2,
                  hoursSpent: 0,
                  completed: false,
                },
              ],
            },
          },
          {
            name: "Requirement 10",
            description: "This is the tenth requirement",
            stage: "makingestimate",
            priority: "high",
            workItems: {
              create: [
                {
                  name: "Work Item 1",
                  hoursEstimated: 2,
                  hoursSpent: 0,
                },
                {
                  name: "Work Item 2",
                  hoursEstimated: 0,
                  hoursSpent: 0,
                  completed: false,
                },
              ],
            },
          },
        ],
      },
      contributors: {
        create: [
          {
            contributor: {
              create: {
                name: "Steve",
                image:
                  "https://lh3.googleusercontent.com/a-/AOh14GhsO6N0i-g4AksGubeA917KEWT_sSpNJD8lJwFCbQ=s48",
              },
            },
          },
          {
            contributor: {
              create: {
                name: "Alex",
                image:
                  "https://lh3.googleusercontent.com/a-/AOh14GjhJe1l5JimHSUp4uSWwf69yNk_xADnmfKODUZB=s48",
              },
            },
          },
          {
            contributor: {
              create: {
                name: "Alyssa",
                image:
                  "https://avatars.githubusercontent.com/u/68715169?s=120&v=4",
              },
            },
          },
          {
            contributor: {
              create: {
                name: "Khalid",
                image:
                  "https://lh3.googleusercontent.com/a-/AOh14GiVjMXagVl9ahCoVt3_nQzSb7yxKe-t879upeWgrg=s48",
              },
            },
          },
          {
            contributor: {
              create: {
                name: "Zulkar",
                image:
                  "https://lh3.google.com/u/2/ogw/ADea4I61SOZGVDAQmX7GQDOyjDfa-zEbrVPQr9FuDjYk=s83-c-mo",
              },
            },
          },
        ],
      },
    },
  });

  return project;
}

generateSeedProjectData(GITHUB_USERNAME, "Project 999", "");
