import { useEffect, useState } from "react";
import { ProjectType } from "../types/Project";
import { createDataItemSigner, dryrun, message } from "@permaweb/aoconnect";
import { AOETH_TOKEN_PID, PLATFORM_PID } from "./constants";
import { useAppStore } from "./store";
import { StakedAmounts, UserTransaction } from "../types/User";

export const addProject = async ({
  projectName,
  projectDescription,
  projectProcess,
  tokenName,
  founderName,
  founderDesignation,
  // founderDescription,
  tokenProcess,
  websiteLink,
  githubLink,
  twitterLink,
  discordLink,
  coolDown,
  conversion,
}: any) => {
  console.log("ao call for new project");
  const msg = await message({
    process: "Zr44oFbd4i9Tiq7SdoyPzmWxH_k-Fu_KtvbvgOjEv4s",
    signer: createDataItemSigner(window.arweaveWallet),
    tags: [
      { name: "Action", value: "Add-New-Project" },
      { name: "X-Process", value: projectProcess },
      { name: "X-TokenProcess", value: tokenProcess },
      { name: "X-Ticker", value: tokenName },
      { name: "X-Name", value: projectName },
      { name: "X-Description", value: projectDescription },
      { name: "X-Cooldown", value: coolDown },
      { name: "X-Conversion", value: conversion },
      { name: "X-FounderName", value: founderName },
      { name: "X-FounderDesignation", value: founderDesignation },
      { name: "X-Website", value: websiteLink },
      { name: "X-Twitter", value: twitterLink },
      { name: "X-Discord", value: discordLink },
      { name: "X-Github", value: githubLink },
    ],
  });
  return msg;
};

export function useProjects() {
  const { projects, setProjects } = useAppStore();
  useEffect(() => {
    const fetch = async () => {
      const result = await dryrun({
        process: "Zr44oFbd4i9Tiq7SdoyPzmWxH_k-Fu_KtvbvgOjEv4s",
        tags: [{ name: "Action", value: "Get-Projects" }],
        anchor: "1234",
      });
      const projects = JSON.parse(result.Messages[0].Data);
      console.log("got pr", projects);
      setProjects(projects);
    };
    fetch();
  }, []);
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
  const [allTransactions, setAllTransactions] = useState<
    UserTransaction[] | null
  >(null);
  const [pendingTransactions, setPendingTransactions] = useState<
    UserTransaction[] | null
  >(null);
  const [confirmedTransactions, setConfirmedTransactions] = useState<
    UserTransaction[] | null
  >(null);
  const [stakedAmounts, setStakedAmounts] = useState<StakedAmounts | null>(
    null
  );

  const getNewData = async () => {
    if (!address) return;
    const result = await dryrun({
      process: PLATFORM_PID,
      Owner: address,
      tags: [{ name: "Action", value: "Get-User-Data" }],
      anchor: "1234",
    });
    console.log("get user data result", result);
    const transactions = JSON.parse(result.Messages[0].Data)?.msg ?? [];
    const pendingTransactions = transactions.filter(
      (t: UserTransaction) => !t.ptSent
    );
    const confirmedTransactions = transactions.filter(
      (t: UserTransaction) => t.ptSent && !t.amtUnstaked
    );

    const stakedAmounts = confirmedTransactions.reduce(
      (acc: StakedAmounts, t: UserTransaction) => {
        const projectTicker = t.projectTicker;
        if (!acc[projectTicker])
          acc[projectTicker] = { aoeth: 0, projectToken: 0 };
        acc[projectTicker].aoeth += parseInt(t.aoEthQuantity) / 10 ** 12;
        acc[projectTicker].projectToken +=
          parseInt(t.ProjectTokenReceived) / 10 ** 12;

        return acc;
      },
      {} as StakedAmounts
    );
    setStakedAmounts(stakedAmounts);

    setAllTransactions(transactions);
    setPendingTransactions(pendingTransactions);
    setConfirmedTransactions(confirmedTransactions);
    console.log({
      allTransactions,
      stakedAmounts,
      confirmedTransactions,
      pendingTransactions,
    });
  };
  useEffect(() => {
    getNewData();
  }, [address]);

  const refresh = async () => {
    await getNewData();
  };

  return {
    refresh,
    stakedAmounts,
    confirmedTransactions,
    allTransactions,
    pendingTransactions,
  };
}

export function useUserAoETH(address?: string) {
  const [aoeth, setAoeth] = useState<number | null>(null);
  const fetchData = async () => {
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
    console.log("got aoeth", aoeth);
    setAoeth(aoeth / 10 ** 12);
  };
  useEffect(() => {
    fetchData();
  }, [address]);

  const refresh = async () => {
    await fetchData();
  };

  return { aoeth, refresh };
}

export const useStakeLoader = (projectData: ProjectType, address?: string) => {
  const [receivedAoETH, setRecievedAoETH] = useState<boolean>(false);
  const [projectConfirmedStake, setProjectConfirmedStake] =
    useState<boolean>(false);
  const [rewardsSent, setRewardsSent] = useState<boolean>(false);

  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setRecievedAoETH(false);
    setProjectConfirmedStake(false);
    setRewardsSent(false);
  }, [address, projectData]);

  const start = (startDate: Date) => {
    setTimer(
      setInterval(async () => {
        console.log("checking new data");
        const result = await dryrun({
          process: PLATFORM_PID,
          Owner: address,
          tags: [{ name: "Action", value: "Get-User-Data" }],
          anchor: "1234",
        });
        const transactions = JSON.parse(result.Messages[0].Data)?.msg ?? [];
        const currentTrx = transactions.filter(
          (t: UserTransaction) =>
            new Date(t.date) > startDate &&
            t.projectTicker == projectData.ticker
        );
        console.log({ transactions, currentTrx });
        if (currentTrx.length > 0) setRecievedAoETH(true);
        const ptReceived = transactions.filter(
          (t: UserTransaction) =>
            new Date(t.date) > startDate &&
            t.ptReceived &&
            t.projectTicker == projectData.ticker
        );
        if (ptReceived.length > 0) setProjectConfirmedStake(true);
        const rewardsSent = transactions.filter(
          (t: UserTransaction) =>
            new Date(t.date) > startDate &&
            t.ptSent &&
            t.projectTicker == projectData.ticker
        );
        if (rewardsSent.length > 0) setRewardsSent(true);
      }, 500)
    );
  };

  const stop = () => {
    if (timer) {
      clearTimeout(timer);
      setTimer(null);
    }
  };

  return {
    stop,
    start,
    receivedAoETH: receivedAoETH,
    projectConfirmedStake,
    rewardsSent,
  };
};
