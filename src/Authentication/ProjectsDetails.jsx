import React, { useState } from 'react'
import { Briefcase, List, Users, Target, Edit, Trash2, X } from 'lucide-react'

const priorityStyles = {
    Low: 'bg-green-100 text-green-800',
    Medium: 'bg-yellow-100 text-yellow-800',
    High: 'bg-orange-100 text-orange-800',
    Urgent: 'bg-red-100 text-red-800',
}

const ProjectsDetail = () => {
    const [showForm, setShowForm] = useState(false)
    const [editMode, setEditMode] = useState(false)
    const [editingId, setEditingId] = useState(null)
    const [projects, setProjects] = useState([])
    const [formData, setFormData] = useState({
        name: '',
        priority: 'Low',
    })

    const handleAddOrEditProject = (e) => {
        e.preventDefault()

        if (editMode) {
            setProjects((prev) =>
                prev.map((p) =>
                    p.id === editingId ? { ...p, ...formData } : p
                )
            )
            setEditMode(false)
            setEditingId(null)
        } else {
            const newProject = {
                id: Date.now(),
                ...formData,
                createdAt: new Date().toLocaleDateString(),
                completed: false,
            }
            setProjects([newProject, ...projects])
        }

        setFormData({ name: '', priority: 'Low' })
        setShowForm(false)
    }

    const handleEdit = (project) => {
        setFormData({
            name: project.name,
            priority: project.priority,
        })
        setEditingId(project.id)
        setEditMode(true)
        setShowForm(true)
    }

    const handleDelete = (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this project?")
        if (confirmDelete) {
            setProjects(projects.filter((p) => p.id !== id))
        }
    }

    const handleMarkCompleted = (id) => {
        setProjects((prev) =>
            prev.map((p) =>
                p.id === id ? { ...p, completed: true } : p
            )
        )
    }

    const handleMarkActive = (id) => {
        setProjects((prev) =>
            prev.map((p) =>
                p.id === id ? { ...p, completed: false } : p
            )
        )
    }

    return (
        <>
            {/* Modal Form */}
            {showForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl relative">
                        <button
                            onClick={() => {
                                setShowForm(false)
                                setEditMode(false)
                                setEditingId(null)
                            }}
                            className="absolute top-2 right-2 text-gray-500 hover:text-black"
                        >
                            <X />
                        </button>
                        <h2 className="text-xl font-semibold mb-4">
                            {editMode ? 'Edit Project' : 'Create New Project'}
                        </h2>
                        <form onSubmit={handleAddOrEditProject} className="space-y-4">
                            <div>
                                <label className="text-sm font-medium">Project Name</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) =>
                                        setFormData({ ...formData, name: e.target.value })
                                    }
                                    required
                                    className="w-full border px-3 py-2 mt-1 rounded"
                                    placeholder="Enter project name"
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium">Priority</label>
                                <select
                                    value={formData.priority}
                                    onChange={(e) =>
                                        setFormData({ ...formData, priority: e.target.value })
                                    }
                                    className="w-full border px-3 py-2 mt-1 rounded"
                                >
                                    <option>Low</option>
                                    <option>Medium</option>
                                    <option>High</option>
                                    <option>Urgent</option>
                                </select>
                            </div>
                            <button
                                type="submit"
                                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                            >
                                {editMode ? 'Update Project' : 'Add Project'}
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* Top Section */}
            <div className="pt-8 relative" style={{ backgroundColor: '#4b5cfb', height: '13rem' }}>
                <div className="flex justify-between items-center mt-5 px-[3%]">
                    <h1 className="text-[1.8rem] text-white">Projects</h1>
                    <button
                        onClick={() => setShowForm(true)}
                        className="bg-white font-semibold px-4 py-2 border rounded hover:bg-gray-200 transition-colors"
                    >
                        Create New Project
                    </button>
                </div>

                {/* Cards */}
                <div
                    className="absolute left-[3%] right-[3%] flex justify-between gap-4"
                    style={{ top: '100%', transform: 'translateY(-50%)' }}
                >
                    {[Briefcase, List, Users, Target].map((Icon, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-xl shadow-lg p-6 w-[24%] h-[10.5rem]"
                        >
                            <div className="flex justify-between items-center mb-3">
                                <span className="text-gray-700 font-medium">
                                    {['Projects', 'Active Task', 'Teams', 'Productivity'][index]}
                                </span>
                                <div className="bg-purple-100 p-2 rounded">
                                    <Icon className="h-5 w-5 text-purple-600" />
                                </div>
                            </div>
                            <h2 className="text-3xl font-bold">
                                {index === 0 ? projects.length : index === 3 ? '0%' : 0}
                            </h2>
                            <p className="text-sm text-gray-500">--</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Section Heading */}
            <div className="mt-[7rem] px-[3%]">
                <div className="bg-white border-2 shadow-lg border-gray-100 p-4 rounded-lg">
                    <h2 className="text-lg font-semibold text-gray-800">Active Projects</h2>
                </div>
            </div>

            {/* Table Section */}
            <div className="mt-4 px-[3%] pb-10">
                <div className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
                    <table className="w-full text-left table-auto">
                        <thead className="bg-gray-100 text-gray-600 text-sm">
                            <tr>
                                <th className="px-6 py-3 font-medium">Project Name</th>
                                <th className="px-6 py-3 font-medium">Creation Date</th>
                                <th className="px-6 py-3 font-medium">Priority</th>
                                <th className="px-6 py-3 font-medium">Channels</th>
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
                                projects.map((project) => (
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
                                        <td className="px-6 py-4 text-gray-400 italic">--</td>
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
        </>
    )
}

export default ProjectsDetail
