import { useState } from "react"

const AddMemberForm = ({ onAddMember }) => {
  const [email, setEmail] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email.trim()) return
    onAddMember(email.trim())
    setEmail("")
  }

  return (
    <form onSubmit={handleSubmit} className="flex space-x-2 ">
      <input
        type="email"
        placeholder="Member email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border px-2 py-1 rounded text-sm flex-1"
        required
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
      >
        Add
      </button>
    </form>
  )
}

export default AddMemberForm
