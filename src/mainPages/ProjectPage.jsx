// Components/Projects/ProjectPage.jsx
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import ProjectInfo from "../Components/ProjectInfo"
import CreateChannelForm from "../Channels/CreateChannelForm"
import ChannelCard from "../Channels/ChannelCard"
import { isAdmin } from "../utils/roles"

const ProjectPage = () => {
  const { id } = useParams()
  const [project, setProject] = useState(null)
  const [channelName, setChannelName] = useState("")
  const [channels, setChannels] = useState([])
  const [openDropdownId, setOpenDropdownId] = useState(null)
  const [channelDescription, setChannelDescription] = useState("")

  // Load project from localStorage
  useEffect(() => {
    const savedProjects = JSON.parse(localStorage.getItem("projects")) || []
    const foundProject = savedProjects.find((p) => String(p.id) === id)
    if (foundProject) {
      setProject(foundProject)
      setChannels(foundProject.channels || [])
    }
  }, [id])

  // Update localStorage after changes to channels
  const updateLocalStorageChannels = (updatedChannels) => {
    const allProjects = JSON.parse(localStorage.getItem("projects")) || []
    const updatedProjects = allProjects.map((p) =>
      String(p.id) === id ? { ...p, channels: updatedChannels } : p
    )
    localStorage.setItem("projects", JSON.stringify(updatedProjects))
  }

  // Add Channel
  const handleAddChannel = (e) => {
    e.preventDefault()
    if (!channelName.trim()) return

    const newChannel = {
      id: Date.now(),
      name: channelName.trim(),
      description: channelDescription.trim(),
    }

    const updated = [newChannel, ...channels]
    setChannels(updated)
    setChannelName("")
    setChannelDescription("")
    updateLocalStorageChannels(updated)
  }

  // Edit Channel
  const handleEditChannel = (channelId) => {
    const existingChannel = channels.find((ch) => ch.id === channelId)
    const newName = prompt("Enter new channel name:", existingChannel.name)
    const newDescription = prompt("Enter new description (optional):", existingChannel.description || "")

    if (!newName) return

    const updated = channels.map((ch) =>
      ch.id === channelId
        ? { ...ch, name: newName.trim(), description: newDescription.trim() }
        : ch
    )

    setChannels(updated)
    updateLocalStorageChannels(updated)
  }

  // Delete Channel
  const handleDeleteChannel = (channelId) => {
    if (!window.confirm("Delete this channel?")) return
    const updated = channels.filter((ch) => ch.id !== channelId)
    setChannels(updated)
    updateLocalStorageChannels(updated)
  }

  // Add Member
  const handleAddMember = (email) => {
    setMembers((prev) => [...prev, email])
  }

  if (!project) return <div className="p-6">Project not found</div>

  return (
    <div className="p-6 space-y-6">
      {/* Project Info */}
      <ProjectInfo project={project} />

      {/* Channel Creation - Admin Only */}
      {isAdmin() && (
        <CreateChannelForm
          channelName={channelName}
          setChannelName={setChannelName}
          channelDescription={channelDescription}
          setChannelDescription={setChannelDescription}
          handleAddChannel={handleAddChannel}
        />
      )}

      {/* Channel List */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Channels</h2>
        {channels.length === 0 ? (
          <p className="text-gray-500 italic">No channels yet</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {channels.map((channel) => (
              <ChannelCard
                key={channel.id}
                channel={channel}
                projectId={id}
                openDropdownId={openDropdownId}
                setOpenDropdownId={setOpenDropdownId}
                onEdit={handleEditChannel}
                onDelete={handleDeleteChannel}
              />
            ))}
          </div>
        )}
      </div>


    </div>
  )
}

export default ProjectPage
