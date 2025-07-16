import React from 'react'
import { X } from 'lucide-react'

const ProjectFormModal = ({ formData, setFormData, handleAddOrEditProject, editMode, closeModal }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl relative">
        <button onClick={closeModal} className="absolute top-2 right-2 text-gray-500 hover:text-black">
          <X />
        </button>
        <h2 className="text-xl font-semibold mb-4">{editMode ? 'Edit Project' : 'Create New Project'}</h2>
        <form onSubmit={handleAddOrEditProject} className="space-y-4">
          <div>
            <label className="text-sm font-medium">Project Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              className="w-full border px-3 py-2 mt-1 rounded"
              placeholder="Enter project name"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Priority</label>
            <select
              value={formData.priority}
              onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
              className="w-full border px-3 py-2 mt-1 rounded"
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
              <option>Urgent</option>
            </select>
          </div>
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            {editMode ? 'Update Project' : 'Add Project'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default ProjectFormModal
