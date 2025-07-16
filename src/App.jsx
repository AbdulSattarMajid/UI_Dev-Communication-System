import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Sidebar from "./Components/Sidebar"
import TopNavbar from "./Authentication/TopNavbar"
import ProjectsDetails from "./mainPages/ProjectsDetails"
import ProjectPage from './mainPages/ProjectPage'
import ChannelPage from './mainPages/ChannelPage'

export default function App() {
  return (
    <Router>
      <div className="h-screen flex">
        {/* Sidebar stays fixed */}
        <Sidebar />

        {/* Main content wrapper */}
        <div className="ml-64 flex flex-col w-full h-screen overflow-hidden">
          
          {/* Sticky Navbar */}
          <div className="h-[4rem] flex-shrink-0 z-10">
            <TopNavbar />
          </div>

          {/* Scrollable content area below navbar */}
          <div className="flex-1 overflow-y-auto bg-gray-50 ">
            <Routes>
              <Route path="/" element={<ProjectsDetails />} />
              <Route path="/projects/:id" element={<ProjectPage />} />
              <Route path="/projects/:projectId/channels/:channelId" element={<ChannelPage />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  )
}
