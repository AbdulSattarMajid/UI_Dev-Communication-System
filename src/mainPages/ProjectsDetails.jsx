import React, { useState, useEffect } from 'react'
import HeaderCards from '../Components/HeaderCards'
import ProjectFormModal from '../Components/ProjectFormModal'
import ProjectsTable from '../Components/ProjectsTable'

const ProjectsDetails = () => {

    const [showForm, setShowForm] = useState(false)
    const [editMode, setEditMode] = useState(false)
    const [editingId, setEditingId] = useState(null)
    const [formData, setFormData] = useState({ name: '', priority: 'Low' })
    const [projects, setProjects] = useState(() => {
        const saved = localStorage.getItem('projects');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem('projects', JSON.stringify(projects));
    }, [projects]);

    const handleAddOrEditProject = (e) => {
        e.preventDefault()
        if (editMode) {
            setProjects(prev =>
                prev.map(p => (p.id === editingId ? { ...p, ...formData } : p))
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
        setFormData({ name: project.name, priority: project.priority })
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
        setProjects(prev =>
            prev.map(p => (p.id === id ? { ...p, completed: true } : p))
        )
    }

    const handleMarkActive = (id) => {
        setProjects(prev =>
            prev.map(p => (p.id === id ? { ...p, completed: false } : p))
        )
    }

    return (
        <>
            {showForm && (
                <ProjectFormModal
                    formData={formData}
                    setFormData={setFormData}
                    handleAddOrEditProject={handleAddOrEditProject}
                    editMode={editMode}
                    closeModal={() => {
                        setShowForm(false)
                        setEditMode(false)
                        setEditingId(null)
                    }}
                />
            )}

            <HeaderCards projects={projects} openForm={() => setShowForm(true)} />

            <div className="mt-[6.5rem] px-[3%]">
                <div className="bg-white border-2 shadow-lg border-gray-100 p-4 rounded-lg">
                    <h2 className="text-lg font-semibold text-gray-800">Active Projects</h2>
                </div>
            </div>
            

            <ProjectsTable
                projects={projects}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
                handleMarkCompleted={handleMarkCompleted}
                handleMarkActive={handleMarkActive}
            />
        </>
    )
}

export default ProjectsDetails
