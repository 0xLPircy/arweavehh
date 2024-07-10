import { useLocation } from "react-router-dom";
import { ProjectFull, ProjectsDisplay } from "../components";
import { useProjects } from "../utils/hooks";

export default function Project() {
  const projects = useProjects();
  const location = useLocation();

  // Split the pathname into segments and filter out any empty segments
  const pathSegments = location.pathname.split("/").filter((segment) => segment);

  // Get the last segment
  const lastSegment = pathSegments[pathSegments.length - 1];
  return (
    <main className="w-[100vw] flex flex-col gap-24 font-[Rale-Regular]">
      {projects.map((project) => {
        if (project.ticker == lastSegment) {
          return <ProjectFull project={project} />;
        }
      })}

      <ProjectsDisplay />
    </main>
  );
}
