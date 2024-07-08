import Navbar from "../components/Navbar";
import ProjectFull from "../components/ProjectFull";
import { dummyProject } from "../utils/constants";

export default function Project() {
  return (
    <>
      <Navbar />
      <ProjectFull project={dummyProject} />
    </>
  );
}
