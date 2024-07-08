// import { useNavigate } from "react-router-dom";
import { ProjectType } from "../types/Project";

export default function ProjectCard({ project }: { project: ProjectType }) {
  //   const navigate = useNavigate();

  return (
    <a href={"/project/" + project.id}>
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="h-40 bg-gray-300"></div>
        <div className="p-4">
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
          </div>
          <div className="mt-4 flex items-center">
            <div className="bg-gray-300 rounded-full px-2 py-1 text-xs font-medium text-gray-700">Token</div>
          </div>
          <div className="mt-4 space-y-2">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
          </div>
          <div className="mt-4 flex justify-between items-center">
            <div className="flex items-center">
              <div className="bg-gray-300 rounded-full h-6 w-6"></div>
              <div className="bg-gray-300 rounded-full h-6 w-6 -ml-2"></div>
              <div className="bg-gray-300 rounded-full h-6 w-6 -ml-2"></div>
              <span className="ml-2 text-gray-700">Amt staked</span>
            </div>
            <div className="bg-gray-300 rounded-full px-2 py-1 text-xs font-medium text-gray-700"></div>
          </div>
        </div>
      </div>
    </a>
  );
}
