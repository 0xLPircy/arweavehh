import "./index.css";
import { Hero, ProjectsDisplay } from "./components";

function App() {
  return (
    <main className="w-[100vw] flex flex-col gap-24 font-[Rale-Regular]">
      <Hero />
      <ProjectsDisplay />
      {/* <img className={"fixed top-0 -z-10"} src={shading} alt="shading" /> */}
      {/* <Unstake /> */}
      {/* <Stake /> */}
    </main>
  );
}

export default App;
