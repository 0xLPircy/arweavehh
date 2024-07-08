import { useEffect, useState } from "react";
import { ProjectType } from "../types/Project";
import { dryrun } from "@permaweb/aoconnect";
import { PLATFORM_PID } from "./constants";

export function useProjects() {
  const [projects, setProjects] = useState<ProjectType[]>([]);
  useEffect(() => {
    const fetch = async () => {
      const result = await dryrun({
        process: PLATFORM_PID,
        tags: [{ name: "Action", value: "Get-Projects" }],
        anchor: "1234",
      });
      const projects = JSON.parse(result.Messages[0].Data);
      setProjects(projects);
    };
    fetch();
  }, []);
  return projects;
}
