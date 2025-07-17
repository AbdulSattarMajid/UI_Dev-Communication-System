import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { isAdmin } from "../utils/roles"
import AddMemberForm from "../Channels/AddMemberForm"


const ChannelPage = () => {
  const { projectId, channelId } = useParams()
  const [channel, setChannel] = useState(null)
  const [project, setProject] = useState(null)
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState([])
  const [newMemberEmail, setNewMemberEmail] = useState("")

  useEffect(() => {
    const savedProjects = JSON.parse(localStorage.getItem("projects")) || []
    const foundProject = savedProjects.find(p => String(p.id) === projectId)
    if (foundProject) {
      setProject(foundProject)
      const foundChannel = (foundProject.channels || []).find(c => String(c.id) === channelId)
      if (foundChannel) setChannel(foundChannel)
    }

    const stored = JSON.parse(localStorage.getItem("chats")) || {}
    const chatKey = `${projectId}-${channelId}`
    setMessages(stored[chatKey] || [])
  }, [projectId, channelId])

  const saveMessages = (updated) => {
    setMessages(updated)
    const allChats = JSON.parse(localStorage.getItem("chats")) || {}
    allChats[`${projectId}-${channelId}`] = updated
    localStorage.setItem("chats", JSON.stringify(allChats))
  }

  const handleSend = () => {
    if (!message.trim()) return
    const newMsg = {
      id: Date.now(),
      type: "text",
      text: message.trim(),
      sender: "You",
      timestamp: new Date().toLocaleTimeString(),
    }
    const updated = [...messages, newMsg]
    saveMessages(updated)
    setMessage("")
  }

  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    if (!file) return

    const reader = new FileReader()
    reader.onloadend = () => {
      const newMsg = {
        id: Date.now(),
        type: file.type.startsWith("image/") ? "image" : "file",
        fileName: file.name,
        fileType: file.type,
        fileData: reader.result,
        sender: "You",
        timestamp: new Date().toLocaleTimeString(),
      }
      const updated = [...messages, newMsg]
      saveMessages(updated)
    }
    reader.readAsDataURL(file)
  }

  const handleAddMember = () => {
    if (!newMemberEmail.trim()) return alert("Please enter an email")
    alert(`Member with email ${newMemberEmail} added (not functional yet)`)
    setNewMemberEmail("")
  }

  if (!project || !channel) return <div className="p-6">Channel not found</div>

  return (
    <div className="relative h-[calc(100vh-4rem)] flex flex-col bg-gray-50">
      {/* Fixed Header */}
      <div className="bg-blue-50  p-6 text-sm flex justify-between items-center shadow-sm fixed w-full  z-10" style={{ top: "4rem" }}>
        <div className="space-y-1">
          <h1 className="text-lg font-semibold text-gray-800">
            <span className="text-blue-600 font-bold">#{channel.name}</span>
          </h1>
          <p className="text-gray-500 text-xs">
            Project: <strong>{project.name}</strong> &middot; Priority:{" "}
            <span className="font-medium text-yellow-600">{project.priority}</span>
          </p>
        </div>

      {/* Add Member - Admin Only */}
      {isAdmin() && (
        <div className="bg-white rounded-lg shadow p-2 mr-[15rem]">
          <h2 className="text-xl font-semibold mb-4">Add Members</h2>
          <AddMemberForm onAddMember={handleAddMember} />
        </div>
      )}
      </div>

      {/* Scrollable Messages */}
      <div className="flex-1 overflow-y-auto p-4 pt-[7.5rem] pb-[6.5rem] mb-10">
        {messages.length === 0 ? (
          <p className="text-gray-400 italic">No messages yet</p>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              className="bg-white p-2 rounded shadow-sm border border-x-blue-200 border-y-purple-800 mt-3 space-y-1"
            >
              {msg.type === "text" && <div className="text-sm">{msg.text}</div>}

              {msg.type === "image" && (
                <img
                  src={msg.fileData}
                  alt={msg.fileName}
                  className="w-40 rounded shadow border"
                />
              )}

              {msg.type === "file" && (
                <div className="text-sm text-blue-600 underline">
                  <a href={msg.fileData} download={msg.fileName}>
                    📎 {msg.fileName}
                  </a>
                </div>
              )}

              <div className="text-xs text-gray-400">
                {msg.sender} • {msg.timestamp}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Fixed Input Bar */}
      <div className="bg-white border-t px-4 py-3 flex items-center gap-2 fixed overflow-y-auto  max-w-full right-0 left-0 ml-64 bottom-0 z-10">
        <label
          htmlFor="file-upload"
          className="cursor-pointer text-blue-600 hover:text-blue-800"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </label>
        <input
          type="file"
          id="file-upload"
          className="hidden"
          onChange={handleFileUpload}
        />

        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Type a message..."
          className="flex-1 px-4 py-2 border rounded focus:outline-none focus:ring"
        />

        <button
          onClick={handleSend}
          className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 text-sm"
        >
          Send
        </button>
      </div>
    </div>
  )
}

export default ChannelPage
