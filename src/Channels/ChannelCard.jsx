import { MoreVertical } from "lucide-react";
import { Link } from "react-router-dom";

const ChannelCard = ({
  channel,
  projectId,
  openDropdownId,
  setOpenDropdownId,
  onEdit,
  onDelete,
}) => (
  <div className="relative m-2">
    <Link
      to={`/projects/${projectId}/channels/${channel.id}`}
      className="block bg-white border border-gray-300 rounded-xl shadow p-3 w-full h-[120px] hover:shadow-md transition duration-200"
    >
      {/* Icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 text-indigo-500 mb-2"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M10 4H2v16h20V6H12l-2-2z" />
      </svg>

      {/* Channel Name */}
      <div className="text-sm font-semibold text-gray-800 truncate mb-0.5">
        #{channel.name}
      </div>

      {/* Description (truncated) */}
      {channel.description && (
        <p className="text-xs text-gray-600 truncate">
          {channel.description}
        </p>
      )}
    </Link>

    {/* Dropdown Button */}
    <button
      onClick={() =>
        setOpenDropdownId(openDropdownId === channel.id ? null : channel.id)
      }
      className="absolute top-2 right-2 p-1 rounded hover:bg-gray-200 z-10"
    >
      <MoreVertical size={18} />
    </button>

    {/* Dropdown Menu */}
    {openDropdownId === channel.id && (
      <div className="absolute top-10 right-2 z-20 bg-white border shadow rounded w-28 text-sm">
        <button
          onClick={() => {
            onEdit(channel.id);
            setOpenDropdownId(null);
          }}
          className="w-full px-3 py-2 text-left hover:bg-gray-100"
        >
          Edit
        </button>
        <button
          onClick={() => {
            onDelete(channel.id);
            setOpenDropdownId(null);
          }}
          className="w-full px-3 py-2 text-left text-red-600 hover:bg-gray-100"
        >
          Delete
        </button>
      </div>
    )}
  </div>
);

export default ChannelCard;
