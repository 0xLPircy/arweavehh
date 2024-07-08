import shading from "/homeShading.svg";
import "./App.css";
import Navbar from "./components/Navbar";
import ProjectCard from "./components/ProjectCard";
import { dummyProject } from "./utils/constants";

function App() {
  return (
    <main>
      <Navbar />
      <img className={"fixed top-0 -z-10"} src={shading} alt="shading" />

      {/* <Unstake /> */}
      {/* <Stake /> */}
      <ProjectCard project={dummyProject} />
    </main>
  );
}

export default App;
