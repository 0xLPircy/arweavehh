import Navbar from "../components/Navbar";
import { useAppStore } from "../utils/store";

export default function About() {
  const projects = useAppStore((state) => state.projects);
  console.log("projects", projects);
  return (
    <>
      <Navbar />
      <div>About us</div>
    </>
  );
}
