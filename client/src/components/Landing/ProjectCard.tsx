// import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { ProjectType } from "../../types/Project";

export default function ProjectCard({ project }: { project: ProjectType }) {
  //   const navigate = useNavigate();

  return (
    <Link
      to={"/project/" + project.ticker}
      className="max-w-[390px] rounded-lg border-[1px] border-[#40959D]
      flex flex-col gap-[6px] justify-between items-center py-[15px] px-[21px]"
    >
      <img src={project.logo} className="w-[360px] h-[180px]" />
      <div className="flex flex-col gap-[6px]">
        <div className=" font-[Rale-SemiBold] text-[#40959D] text-[24px]">
          {project.name}
        </div>
        <div className="rounded-sm px-[12px] flex flex-row py-[3px] bg-[#393939] w-fit text-[#f1f1f1]">
          ${project.ticker}
        </div>
        <p className="text-[15px] text-justify text-wrap text-[#f1f1f1] font-[Rale-Light] leading-[18px]">
          {project.description}
        </p>
        <h3 className="font-[Rale-Medium] text-[#40959D]">
          {(project.amountStaked / 10 ** 12).toFixed(2)} $AOEth Staked
        </h3>
      </div>
    </Link>
  );
}
