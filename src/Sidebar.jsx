import React, { useState } from "react";
import {
  Home,
  Folder,
  Settings,
  Plus,
  Trash,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

export default function Sidebar() {
  const [isProjectsOpen, setIsProjectsOpen] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newProjectName, setNewProjectName] = useState("");
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [channelsByProject, setChannelsByProject] = useState({});
  const [selectedChannel, setSelectedChannel] = useState(null);

  const handleAddProject = () => {
    if (newProjectName.trim()) {
      setProjects([...projects, newProjectName.trim()]);
      setNewProjectName("");
      setShowAddForm(false);
    }
  };

  const handleDeleteProject = (indexToDelete) => {
    const deleted = projects[indexToDelete];
    setProjects(projects.filter((_, i) => i !== indexToDelete));
    if (selectedProject === deleted) {
      setSelectedProject(null);
      setSelectedChannel(null);
    }
  };

  const handleAddChannel = () => {
    const name = prompt("Enter channel name:");
    if (name?.trim()) {
      setChannelsByProject((prev) => {
        const current = prev[selectedProject] || [];
        return {
          ...prev,
          [selectedProject]: [...current, name.trim()],
        };
      });
    }
  };

  return (
    <div className="flex h-screen w-full">
      {/* Primary Sidebar */}
      <div className="w-[15%] bg-green-500 text-white flex flex-col p-5 shadow-lg">
        <div className="space-y-4">
          {/* Home */}
          <div className="flex flex-col items-start gap-1 cursor-pointer hover:bg-red-300 p-3 rounded-md transition-all">
            <Home size={24} />
            <span className="text-sm font-medium">Home</span>
          </div>

          {/* Projects */}
          <div className="flex flex-col gap-1">
            <div
              onClick={() => setIsProjectsOpen(!isProjectsOpen)}
              className="flex flex-col items-start gap-1 cursor-pointer hover:bg-yellow-800 p-3 rounded-md transition-all"
            >
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-2">
                  <Folder size={24} />
                  <span className="text-sm font-medium">Projects</span>
                </div>
                {isProjectsOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </div>
            </div>

            {isProjectsOpen && (
              <div className="ml-6 mt-2 flex flex-col gap-2">
                {/* Add Project */}
                <div
                  className="flex items-center gap-2 cursor-pointer hover:text-gray-300"
                  onClick={() => setShowAddForm(!showAddForm)}
                >
                  <Plus size={16} />
                  <span className="text-sm">Add New Project</span>
                </div>

                {/* Input */}
                {showAddForm && (
                  <div className="mt-2">
                    <input
                      type="text"
                      placeholder="Project name"
                      value={newProjectName}
                      onChange={(e) => setNewProjectName(e.target.value)}
                      className="w-full px-2 py-1 text-black text-sm rounded"
                    />
                    <button
                      onClick={handleAddProject}
                      className="mt-1 bg-white text-green-700 text-xs px-2 py-1 rounded hover:bg-green-100 transition-all"
                    >
                      Create
                    </button>
                  </div>
                )}

                {/* List Projects */}
                {projects.map((project, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center group pr-1"
                  >
                    <span
                      className="text-sm hover:text-gray-200 cursor-pointer"
                      onClick={() => {
                        setSelectedProject(project);
                        setSelectedChannel(null); // Reset channel
                      }}
                    >
                      • {project}
                    </span>
                    <Trash
                      size={16}
                      onClick={() => handleDeleteProject(index)}
                      className="text-gray-300 hover:text-red-400 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Settings */}
          <div className="flex flex-col items-start gap-1 cursor-pointer hover:bg-gray-800 p-3 rounded-md transition-all">
            <Settings size={24} />
            <span className="text-sm font-medium">Settings</span>
          </div>
        </div>
      </div>

      {/* Channels Sidebar */}
      {selectedProject && (
        <div className="w-[15%] bg-gray-800 text-white p-5 shadow-lg">
          <h2 className="text-lg font-bold mb-4">
            {selectedProject} Channels
          </h2>

          <button
            onClick={handleAddChannel}
            className="mb-4 bg-green-400 hover:bg-green-300 text-xs px-3 py-1 rounded"
          >
            + Add Channel
          </button>

          <div className="space-y-2 text-sm">
            {(channelsByProject[selectedProject] || []).map((channel, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedChannel(channel)}
                className={`pl-2 py-1 rounded cursor-pointer hover:bg-gray-700 ${
                  selectedChannel === channel ? "bg-gray-700" : ""
                }`}
              >
                # {channel}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Chat View Area */}
      {selectedChannel && (
        <div className="flex-1 bg-white flex flex-col">
          <div className="border-b px-4 py-3 font-semibold text-lg text-gray-700 shadow">
            #{selectedChannel}
          </div>
          <div className="flex-1 p-4 overflow-y-auto text-gray-500 text-sm">
            {/* Future chat messages can go here */}
            This is the beginning of #{selectedChannel} channel.
          </div>
          <div className="border-t px-4 py-3">
            <input
              type="text"
              placeholder="Type your message..."
              className="w-full px-3 py-2 border rounded text-sm"
            />
          </div>
        </div>
      )}
    </div>
  );
}
