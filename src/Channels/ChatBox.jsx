// Components/Channels/ChatBox.jsx
import { useState } from "react"

const ChatBox = () => {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState("")

  const handleSend = () => {
    if (!input.trim()) return
    setMessages([...messages, input])
    setInput("")
  }

  return (
    <div className="bg-white rounded-lg shadow p-4 mt-6">
      <h2 className="text-xl font-semibold mb-3">Channel Chat</h2>
      <div className="h-48 overflow-y-auto border rounded p-2 mb-3 bg-gray-50">
        {messages.length === 0 ? (
          <p className="text-gray-500 italic">No messages yet</p>
        ) : (
          messages.map((msg, idx) => (
            <div key={idx} className="mb-1 bg-blue-100 text-blue-800 px-3 py-2 rounded w-fit max-w-xs">
              {msg}
            </div>
          ))
        )}
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message"
          className="flex-1 border rounded px-4 py-2"
        />
        <button
          onClick={handleSend}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Send
        </button>
      </div>
    </div>
  )
}

export default ChatBox
