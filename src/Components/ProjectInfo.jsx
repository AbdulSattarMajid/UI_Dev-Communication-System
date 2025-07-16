// Components/Projects/ProjectInfo.jsx
const ProjectInfo = ({ project }) => (
  <div className="bg-white rounded-lg shadow p-6">
    <h1 className="text-3xl font-bold mb-2">{project.name}</h1>
    <p className="text-gray-600 mb-1"><strong>Created:</strong> {project.createdAt}</p>
    <p className="text-gray-600"><strong>Priority:</strong> {project.priority}</p>
  </div>
)

export default ProjectInfo
