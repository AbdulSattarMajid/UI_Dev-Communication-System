import React from 'react'
import { Edit, Trash2 } from 'lucide-react'
import { Link } from 'react-router-dom'

const priorityStyles = {
    Low: 'bg-green-100 text-green-800',
    Medium: 'bg-yellow-100 text-yellow-800',
    High: 'bg-orange-100 text-orange-800',
    Urgent: 'bg-red-100 text-red-800',
}

const ProjectsTable = ({ projects, handleEdit, handleDelete, handleMarkCompleted, handleMarkActive }) => {
    return (
        <div className="mt-4 px-[3%] pb-10">
            <div className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
                <table className="w-full text-left table-auto">
                    <thead className="bg-gradient-to-r from-neutral-800 via-indigo-900 to-blue-500 text-white bg-opacity-90 text-sm">
                        <tr>
                            <th className="px-6 py-3 font-medium">Project Name</th>
                            <th className="px-6 py-3 font-medium">Creation Date</th>
                            <th className="px-6 py-3 font-medium">Priority</th>
                            <th className="px-6 py-3 font-medium">Details</th>
                            <th className="px-6 py-3 font-medium">Modify</th>
                        </tr>
                    </thead>
                    <tbody>
                        {projects.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="text-center text-gray-500 py-8">
                                    No project at the moment
                                </td>
                            </tr>
                        ) : (
                            projects.map(project => (
                                <tr
                                    key={project.id}
                                    className={`border-t ${project.completed ? 'text-gray-400 line-through' : ''}`}
                                >
                                    <td className="px-6 py-4">{project.name}</td>
                                    <td className="px-6 py-4">{project.createdAt}</td>
                                    <td className="px-6 py-4">
                                        {project.completed ? (
                                            <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                                                Completed ✅
                                            </span>
                                        ) : (
                                            <span
                                                className={`px-3 py-1 rounded-full text-sm font-medium ${priorityStyles[project.priority]}`}
                                            >
                                                {project.priority}
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4">
                                        <Link
                                            to={`/projects/${project.id}`}
                                            className="text-blue-600 hover:underline font-medium"
                                        >
                                            View Details
                                        </Link>
                                    </td>
                                    <td className="px-6 py-4 flex items-center gap-2">
                                        {project.completed ? (
                                            <button
                                                onClick={() => handleMarkActive(project.id)}
                                                className="text-blue-600 hover:text-blue-800"
                                                title="Mark as Active"
                                            >
                                                🔄
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() => handleMarkCompleted(project.id)}
                                                className="text-green-600 hover:text-green-800"
                                                title="Mark as Completed"
                                            >
                                                ✅
                                            </button>
                                        )}
                                        <button
                                            onClick={() => handleEdit(project)}
                                            className="text-blue-500 hover:text-blue-700"
                                            title="Edit"
                                        >
                                            <Edit size={18} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(project.id)}
                                            className="text-red-500 hover:text-red-700"
                                            title="Delete"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ProjectsTable
