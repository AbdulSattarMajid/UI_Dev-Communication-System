import React from 'react'
import { Briefcase, List, Users, Target } from 'lucide-react'

const HeaderCards = ({ projects, openForm, totalChannels = 0 }) => {
  return (
    <div className="relative bg-[#4b5cfb] pt-8 pb-[7.5rem]">
      {/* Header */}
      <div className="flex justify-between items-center mt-5 px-[3%]">
        <h1 className="text-[1.8rem] text-white">Projects</h1>
        <button
          onClick={openForm}
          className="bg-white font-semibold px-4 py-2 border rounded hover:bg-gray-200 transition-colors"
        >
          Create New Project
        </button>
      </div>

      {/* Cards (floating within blue background) */}
      <div
        className="absolute left-[3%] right-[3%] flex justify-between gap-4"
        style={{ bottom: '-5.25rem' }}
      >
        {[Briefcase, List, Users, Target].map((Icon, i) => (
          <div
            key={i}
            className="bg-white border-[1px] border-indigo-950 rounded-xl shadow-lg p-6 w-[24%] h-[10.5rem]"
          >
            <div className="flex justify-between items-center mb-3">
              <span className="text-gray-700 font-medium">
                {['Projects', 'Active Task', 'Channels', 'Productivity'][i]}
              </span>
              <div className="bg-purple-100 p-2 rounded">
                <Icon className="h-5 w-5 text-purple-600" />
              </div>
            </div>
            <h2 className="text-3xl font-bold">
              {i === 0
                ? projects.length
                : i === 1
                  ? 0
                  : i === 2
                    ? totalChannels
                    : '0%'}
            </h2>

            <p className="text-sm text-gray-500">--</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default HeaderCards
