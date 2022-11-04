import { useContext} from "react"
import noteContext from "../context/notes/NoteContext"
export default function NoteItem(props) {
  const {deleteNote}=useContext(noteContext)
  const {title,description,updateCall}=props
  const handleDeleteOnClick=()=>{
    deleteNote(props.id)
  }
  return (
    <div className="col-sm-4 my-3">
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{description}</p>
        <i className="fa-solid fa-trash mx-2" onClick={handleDeleteOnClick}></i>
        <i className="fa-solid fa-pen-to-square mx-2" data-bs-toggle="modal" data-bs-target="#MyModal" onClick={()=>{updateCall(props)}}></i>
      </div>
    </div>
  </div>
  )
}
