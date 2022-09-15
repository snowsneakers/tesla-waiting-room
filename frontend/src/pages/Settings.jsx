import {useState, useEffect} from 'react'
import { useAuthContext } from '../hooks/useAuthContext'
function Settings() {
  const {user, dispatch} = useAuthContext()

  const [file, setFile] = useState("")
  const [image, setImage] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    const res = await fetch("http://localhost:8000/api/user/updateAvatar", {
      method: "PUT",
      headers: {"Content-Type": "application/json", "Authorization": `Bearer ${user.token}`},
      body: JSON.stringify({image: image})
    })
    const data = await res.json()
  }

  const previewFiles = (file) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      setImage(reader.result)
    }
  }

  const handleChange = (e) => {
      setFile(e.target.files[0])
      previewFiles(e.target.files[0])
  }



  return (
    <div className="w-[50%] max-h-screen p-5 border overflow-scroll scrollbar-hide">
      <h2>change avatar</h2>
      <form onSubmit={e => handleSubmit(e)} >
        <input type="file" name="file" onChange={(e) => handleChange(e)} accept="image/png, image/jpeg, image/jpg" />
        <button className='py-1 px-2 bg-red-500 text-white' type="submit">Submit</button>
      </form>
    </div>
  )
}
export default Settings