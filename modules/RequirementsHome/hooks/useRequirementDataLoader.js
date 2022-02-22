import axios from "axios";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
function useRequirementDataLoader() {
  const [loading, setLoading] = useState(true);
  const [project, setProject] = useState(undefined);

  const router = useRouter();

  useEffect(() => {
    if (router.isReady) {
      (async () => {
        await setLoading(true);
        var data = JSON.stringify({
          query: `{
            project(id: "${router.query.id}") {
              name
              description
              createdAt
              totalHoursEstimated
              totalHoursSpent
              totalHoursRemaining
              estimatedCompletionDate
              projectVelocity
              hourlyEfficiency
              contributors {
                id
                name
              }
              openRequirements {
                name
                totalHoursSpent
                totalHoursRemaining
                stage                
                workItems{
                    id
                    name
                }
              }
              requirements {
                id
                name
                description
                totalHoursEstimated
                totalHoursSpent
                totalHoursRemaining
                stage
                priority
                workItems {
                  id
                  name
                  hoursSpent
                  hoursEstimated
                }
              }
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
        const responseProject = response.data.data.project;

        await setProject(responseProject);
        await setLoading(false);
      })();
    }
  }, [router]);

  return {
    loading,
    project,
  };
}

export default useRequirementDataLoader;
