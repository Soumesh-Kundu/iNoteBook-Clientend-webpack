import NoteContext from "./NoteContext";
import { useState } from "react";
const NoteState = (props) => {
  const [notes, setNotes] = useState([])
  const getAllNotes = async () => {
    const response = await fetch(`api/notes/fetchAllNotes`, {
      method: 'GET',
      headers: {
        'auth-token': localStorage.getItem("authToken")
      }
    }
    )
    const data=await response.json()
    setNotes(data)
  }

  //Add Note
  const addNote = async (title, description, tag) => {
    //TODO:API CALL
    const response = await fetch(`api/notes/AddNote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem("authToken")
      },
      body: JSON.stringify({ title, description, tag })
    });
    let note = await response.json()
    setNotes(prev => [...prev,note])
    let header=notes.length<1?{head:"Hurry!!",msg:"Your first note has been created"}:{head:"Yeahh!",msg:"Your note has been added"}
    props.alert(header.head,header.msg,"success")
  }

  //Edit Note
  const editNote = async (id, title, description, tag) => {
    const EditNotes = JSON.parse(JSON.stringify(notes))
    const editableIndex = EditNotes.findIndex(obj => obj._id === id)
    //API CALL
    const response = await fetch(`api/notes/updateNote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth-token':  localStorage.getItem("authToken")
      },
      body: JSON.stringify({title,description,tag})
    });
    const editedNote=await response.json()
    EditNotes.splice(editableIndex, 1, editedNote)
    setNotes(EditNotes)
    props.alert("Congo!!","Your edited your note","success")
  }
  //Delete Note
  const deleteNote = async(id) => {
    //TODO: API CALL
    await fetch(`api/notes/deleteNote/${id}`, {
      method: 'DELETE',
      headers: {
        'auth-token': localStorage.getItem("authToken")
      }
    });
    const AfterDeleteNotes = notes.filter(note => note._id !== id)
    setNotes(AfterDeleteNotes)
    props.alert("Oops!","You deleted your note might be you wanted it","success")
  }

  return (
    <NoteContext.Provider value={{ notes, addNote, editNote, deleteNote,getAllNotes }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState