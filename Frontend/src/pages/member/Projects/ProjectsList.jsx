import { useEffect, useState } from "react";
import { Eye, Pencil } from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function ProjectsList() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/projects`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setProjects(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProjects();
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Projects</h1>
        <Link 
          to="/dashboard/projects/add" 
          className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-lg shadow"
        >
          + Add Project
        </Link>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="w-full">
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
            {projects.map(project => (
              <tr 
                key={project.id} 
                className="border-b border-gray-200 hover:bg-gray-50 transition"
              >
                <td className="px-6 py-4 text-gray-800">{project.name}</td>
                <td className="px-6 py-4 text-gray-800 capitalize">{project.status}</td>
                <td className="px-6 py-4 text-gray-800">
                  {project.startDate ? new Date(project.startDate).toLocaleDateString() : '-'}
                </td>
                <td className="px-6 py-4 text-gray-800">
                  {project.endDate ? new Date(project.endDate).toLocaleDateString() : '-'}
                </td>
                <td className="px-6 py-4 text-gray-800">{project.creator?.name || '-'}</td>
                <td className="px-6 py-4 text-center flex justify-center items-center gap-4">
                  <Link
                    to={`/dashboard/projects/view/${project.id}`}
                    className="text-blue-600 hover:text-blue-800"
                    title="View Project"
                  >
                    <Eye className="w-5 h-5" />
                  </Link>
                  {project.creator?.id === localStorage.getItem("userId") && (
                    <Link
                      to={`/dashboard/projects/edit/${project.id}`}
                      className="text-green-600 hover:text-green-800"
                      title="Edit Project"
                    >
                      <Pencil className="w-5 h-5" />
                    </Link>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
