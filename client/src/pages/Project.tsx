import Navbar from "../components/Navbar";
import ProjectFull from "../components/ProjectFull";
import { useProject } from "../utils/hooks";

export default function Project() {
  const project = useProject("sat");
  return (
    <>
      <Navbar />
      {project && <ProjectFull project={project} />}
    </>
  );
}
