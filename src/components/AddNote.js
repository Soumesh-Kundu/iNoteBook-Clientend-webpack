import { useContext,useState } from "react"
import noteContext from "../context/notes/NoteContext"
export default function AddNote() {
    const {addNote}=useContext(noteContext)
    const InitialNote={title:"",description:"",tag:""}
    const [note, setNote] = useState(InitialNote)
    const handleAddNote=(e)=>{
        e.preventDefault()
        let detailArray=[note.title,note.description,note.tag]
        addNote(note.title,note.description,note.tag)
        setNote(InitialNote)
    }
    const onChange=(e)=>{
        setNote(prev=>({...prev,[e.target.name]:e.target.value}))
    }
    return (
        <>
            <div className="container my-3">
                <h1>Add notes</h1>
                <form>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Add Title</label>
                        <input type="text" name="title" value={note.title} className="form-control" id="title" aria-describedby="emailHelp"  onChange={onChange}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Give Description</label>
                        <input type="text" name="description" value={note.description}className="form-control" id="desc"  onChange={onChange}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label">Add Tag</label>
                        <input type="text" name="tag" value={note.tag} className="form-control" id="tag" onChange={onChange} />
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={handleAddNote}>Add note</button>
                </form>
            </div>
        </>
    )
}