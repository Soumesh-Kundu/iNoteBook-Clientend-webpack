import { useContext, useEffect, useState } from "react"
import noteContext from "../context/notes/NoteContext"
import AddNote from "./AddNote"
import { useNavigate } from "react-router-dom"
import NoteItem from "./NoteItem"

export default function Home() {
  const noteContextAPI = useContext(noteContext)
  const navigate=useNavigate()
  const { notes, getAllNotes, editNote } = noteContextAPI
  const InitialNote = { etitle: "", edescription: "", etag: "",id:"" }
  const [Modalnote, setModalNote] = useState(InitialNote)
  useEffect(() => {
    if(localStorage.getItem("authToken")){
      getAllNotes()
    }
    else{
      navigate('/login')
    }
    // eslint-disable-next-line
  }, [])
  const handleEditNote = (e) => {
    e.preventDefault()
    editNote(Modalnote.id,Modalnote.etitle,Modalnote.edescription,Modalnote.etag)
    setModalNote(InitialNote)
  }
  const onChange = (e) => {
    setModalNote(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }
  const updateOnClick = (currentNote) => {
    setModalNote({etitle:currentNote.title,edescription:currentNote.description,etag:currentNote.tag,id:currentNote.id})
  }

  return (
    <>
      <AddNote />
      <div className="modal fade" id="MyModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">Modal title</h5>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">Edit Title</label>
                  <input type="text" name="etitle" value={Modalnote.etitle} className="form-control" id="etitle" aria-describedby="emailHelp" onChange={onChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">Edit Description</label>
                  <input type="text" name="edescription" value={Modalnote.edescription} className="form-control" id="edesc" onChange={onChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="etag" className="form-label">Edit Tag</label>
                  <input type="text" name="etag" value={Modalnote.etag} className="form-control" id="etag" onChange={onChange} />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={handleEditNote}>Update Note</button>
            </div>
          </div>
        </div>
      </div>
      <h1>Your Notes</h1>
      <div className="container row">
        {notes.length === 0 ? <div className="container">Write Your first Note</div>: JSON.parse(JSON.stringify(notes)).reverse().map(note => {
          return <NoteItem key={note._id} id={note._id} title={note.title} updateCall={updateOnClick} description={note.description} tag={note.tag} alert/>
        })}
      </div>
    </>
  )
}
