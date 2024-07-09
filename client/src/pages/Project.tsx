import { ProjectsDisplay, ProjectFull } from "../components";
import { dummyProject } from "../utils/constants";

export default function Project() {
  return (
    <main className="w-[100vw] flex flex-col gap-24 font-[Rale-Regular]">
      <ProjectFull project={dummyProject} />
      <ProjectsDisplay />
    </main>
  );
}
