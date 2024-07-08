import "./App.css";
import Navbar from "./components/Navbar";
import ProjectCard from "./components/ProjectCard";
import { useProjects } from "./utils/hooks";

function App() {
  const projects = useProjects();
  console.log({ projects });
  return (
    <main className="w-[100vw] min-h-[100vh]">
      <Navbar />
      {/* <img className={"fixed top-0 -z-10"} src={shading} alt="shading" /> */}

      {/* <Unstake /> */}
      {/* <Stake /> */}
      {projects.map((project) => {
        return <ProjectCard project={project} />;
      })}
    </main>
  );
}

export default App;
