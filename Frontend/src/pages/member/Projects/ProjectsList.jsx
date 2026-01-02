import { useEffect, useState } from "react";
import { Eye, Pencil, UserPlus, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import API from "../../../api/axios";

export default function ProjectsList() {
  const [projects, setProjects] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const pageSize = 5;
  const totalPages = Math.ceil(total / pageSize);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await API.get(
          `/projects?page=${page}&pageSize=${pageSize}`
        );

        setProjects(res.data.projects);
        setTotal(res.data.total);
      } catch (err) {
        console.error("Failed to fetch projects", err);
      }
    };

    fetchProjects();
  }, [page]);

  return (
    // <div className="p-6 bg-gray-50 min-h-screen">
    <div className="p-3 sm:p-6 bg-gray-50 min-h-screen">

      {/* <div className="flex justify-between items-center mb-6"> */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-6">

        <h1 className="text-2xl font-bold text-gray-800">Projects</h1>
        <Link
          to="/dashboard/projects/add"
          className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-lg shadow"
        >
          + Add Project
        </Link>
      </div>


        <div className="bg-white shadow rounded-lg overflow-x-auto">
  <table className="min-w-[800px] w-full">

          <thead className="bg-gray-100">
            <tr>
              <th className="text-left px-6 py-3 text-gray-700 font-medium">Name</th>
              <th className="text-left px-6 py-3 text-gray-700 font-medium">Status</th>
              <th className="text-left px-6 py-3 text-gray-700 font-medium">Start Date</th>
              <th className="text-left px-6 py-3 text-gray-700 font-medium">End Date</th>
              <th className="text-left px-6 py-3 text-gray-700 font-medium">Created By</th>
              <th className="text-center px-6 py-3 text-gray-700 font-medium">Actions</th>
            </tr>
          </thead>

          <tbody>
            {projects.map((project) => (
              <tr
                key={project.id}
                className="border-b border-gray-200 hover:bg-gray-50 transition"
              >
                <td className="px-3 sm:px-6 py-3 text-gray-800">{project.name}</td>

                <td className="px-6 py-4 text-gray-800 capitalize">
                  {project.status}
                </td>

                <td className="px-6 py-4 text-gray-800">
                  {project.startDate
                    ? new Date(project.startDate).toLocaleDateString()
                    : "-"}
                </td>

                <td className="px-6 py-4 text-gray-800">
                  {project.endDate
                    ? new Date(project.endDate).toLocaleDateString()
                    : "-"}
                </td>

                <td className="px-6 py-4 text-gray-800">
                  {project.creator?.name || "-"}
                </td>

                {/*  FIXED ACTIONS COLUMN */}
                <td className="px-6 py-4 text-center">
                  <div className="flex justify-center items-center gap-5">
                    {/* View */}
                    <Link
                      to={`/dashboard/projects/view/${project.id}`}
                      className="text-green-600 hover:text-green-800"
                      title="View Project"
                    >
                      <Eye className="w-5 h-5" />
                    </Link>

                    {/* Edit (creator only) */}
                    {project.creator?.id === localStorage.getItem("memberId") && (
                      <Link
                        to={`/dashboard/projects/edit/${project.id}`}
                        className="text-blue-600 hover:text-blue-800"
                        title="Edit Project"
                      >
                        <Pencil className="w-5 h-5" />
                      </Link>
                    )}
                 </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      {/* <div className="flex justify-end mt-6 gap-4 items-center flex-wrap"> */}
      <div className="flex justify-center sm:justify-end mt-6 gap-4 items-center flex-wrap">

        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="px-3 py-1 bg-indigo-200 rounded disabled:opacity-50"
        >
          Prev
        </button>

        <span className="px-3 py-1 bg-white border rounded">{page}</span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
          className="px-3 py-1 bg-indigo-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}


