import { useEffect, useState } from "react";
import { ProjectType } from "../types/Project";
import { dryrun } from "@permaweb/aoconnect";
import { AOETH_TOKEN_PID, PLATFORM_PID } from "./constants";
import { useAppStore } from "./store";
import { StakedAmounts, UserTransaction } from "../types/User";

export function useProjects() {
  const { projects, setProjects } = useAppStore();
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
  console.log("got pr", projects);
  return projects;
}

export function useProject(id: string) {
  const [project, setProject] = useState<ProjectType | null>(null);
  const { projects } = useAppStore();

  useEffect(() => {
    const fetch = async () => {
      const result = await dryrun({
        process: PLATFORM_PID,
        tags: [
          { name: "Action", value: "Get-Project" },
          {
            name: "ProjectId",
            value: id,
          },
        ],
        anchor: "1234",
      });
      console.log(result);
      const project = JSON.parse(result.Messages[0].Data);
      setProject(project);
    };
    fetch();
  }, [id]);

  return project ? project : projects.find((p) => p.id === id);
}

export function useUserData(address?: string) {
  const [allTransactions, setAllTransactions] = useState<UserTransaction[] | null>(null);
  const [pendingTransactions, setPendingTransactions] = useState<UserTransaction[] | null>(null);
  // const [confirmedTransactions, setConfirmedTransactions] = useState<UserTransaction[] | null>(null);
  const [stakedAmounts, setStakedAmounts] = useState<StakedAmounts | null>(null);

  useEffect(() => {
    const fetch = async () => {
      if (!address) return;
      const result = await dryrun({
        process: PLATFORM_PID,
        Owner: address,
        tags: [{ name: "Action", value: "Get-User-Data" }],
        anchor: "1234",
      });
      console.log("get user data result", result);
      const transactions = JSON.parse(result.Messages[0].Data)?.msg ?? [];
      const pendingTransactions = transactions.filter((t: UserTransaction) => !t.ptSent);
      const confirmedTransactions = transactions.filter((t: UserTransaction) => t.ptSent);

      const stakedAmounts = confirmedTransactions.reduce((acc: StakedAmounts, t: UserTransaction) => {
        const projectTicker = t.projectTicker;
        if (!acc[projectTicker]) acc[projectTicker] = { amount: 0 };
        acc[projectTicker].amount += t.ptSent;

        return acc;
      }, {} as StakedAmounts);
      setStakedAmounts(stakedAmounts);

      setAllTransactions(transactions);
      setPendingTransactions(pendingTransactions);
      // setConfirmedTransactions(confirmedTransactions);
    };
    fetch();
  }, [address]);
  console.log("got transactions", stakedAmounts, pendingTransactions);

  return { stakedAmounts, allTransactions, pendingTransactions };
}

export function useUserAoETH(address?: string) {
  const [aoeth, setAoeth] = useState<number | null>(null);
  useEffect(() => {
    const fetch = async () => {
      if (!address) return;
      const result = await dryrun({
        process: AOETH_TOKEN_PID,
        tags: [
          { name: "Action", value: "Balance" },
          { name: "Recipient", value: address },
        ],
        anchor: "1234",
      });
      const aoeth = JSON.parse(result.Messages[0].Data);
      setAoeth(aoeth);
    };
    fetch();
  }, [address]);
  console.log("got aoeth", aoeth);

  return aoeth;
}
