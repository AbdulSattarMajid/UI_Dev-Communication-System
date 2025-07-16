// Components/Channels/CreateChannelForm.jsx

const CreateChannelForm = ({
  channelName,
  setChannelName,
  channelDescription,
  setChannelDescription,
  handleAddChannel,
}) => (
  <div className="bg-white rounded-lg shadow p-6">
    <h2 className="text-xl font-semibold mb-4">Create New Channel</h2>
    <form onSubmit={handleAddChannel} className="flex flex-col gap-4">
      <input
        type="text"
        placeholder="Enter channel name"
        value={channelName}
        onChange={(e) => setChannelName(e.target.value)}
        className="border rounded px-4 py-2"
        required
      />
      <textarea
        placeholder="Enter optional description"
        value={channelDescription}
        onChange={(e) => setChannelDescription(e.target.value)}
        className="border rounded px-4 py-2 resize-none text-sm text-gray-700"
        rows={2}
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Add Channel
      </button>
    </form>
  </div>
)

export default CreateChannelForm
