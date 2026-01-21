import { useState, useEffect } from "react"
import { createNote, getAllNotes, getNoteById, deleteNote, updateNote } from "../services/notesService"

function Dashboard() {
    const [notes, setNotes] = useState([])
    const [selectedNote, setSelectedNote] = useState(null)
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [isEditing, setIsEditing] = useState(false)
    const [editId, setEditId] = useState(null)

    useEffect(() => {
        fetchNotes()
    }, [])

    const fetchNotes = async () => {
        try {
            const data = await getAllNotes()
            setNotes(data)
        } catch (error) {
            console.error("Failed to fetch notes")
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!title || !content) return

        try {
            if (isEditing) {
                await updateNote(editId, title, content)
                setIsEditing(false)
                setEditId(null)
            } else {
                await createNote(title, content)
            }
            setTitle("")
            setContent("")
            fetchNotes()
        } catch (error) {
            console.error("Failed to save note")
        }
    }

    const handleNoteClick = async (id) => {
        try {
            const note = await getNoteById(id)
            setSelectedNote(note)
        } catch (error) {
            console.error("Failed to fetch note")
        }
    }

    const handleEdit = (note) => {
        setTitle(note.title)
        setContent(note.content)
        setIsEditing(true)
        setEditId(note.id)
    }

    const handleDelete = async (id) => {
        try {
            await deleteNote(id)
            setSelectedNote(null)
            fetchNotes()
        } catch (error) {
            console.error("Failed to delete note")
        }
    }

    return (
        <div style={{ display: "flex", height: "100vh" }}>
            <div style={{ width: "250px", borderRight: "1px solid #ccc", padding: "10px", overflowY: "auto" }}>
                <h3>Notes</h3>
                {notes.map((note) => (
                    <div
                        key={note.id}
                        onClick={() => handleNoteClick(note.id)}
                        style={{ padding: "8px", cursor: "pointer", borderBottom: "1px solid #eee" }}
                    >
                        {note.title}
                    </div>
                ))}
            </div>

            <div style={{ flex: 1, padding: "20px" }}>
                <h2>Add Note</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        style={{ display: "block", marginBottom: "10px", width: "300px", padding: "8px" }}
                    />
                    <textarea
                        placeholder="Content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        style={{ display: "block", marginBottom: "10px", width: "300px", height: "100px", padding: "8px" }}
                    />
                    <button type="submit">{isEditing ? "Update" : "Create"} Note</button>
                    {isEditing && (
                        <button type="button" onClick={() => { setIsEditing(false); setTitle(""); setContent(""); setEditId(null) }} style={{ marginLeft: "10px" }}>
                            Cancel
                        </button>
                    )}
                </form>

                {selectedNote && (
                    <div style={{ marginTop: "30px", padding: "20px", border: "1px solid #ccc" }}>
                        <h3>{selectedNote.title}</h3>
                        <p>{selectedNote.content}</p>
                        <button onClick={() => handleEdit(selectedNote)}>Edit</button>
                        <button onClick={() => handleDelete(selectedNote.id)} style={{ marginLeft: "10px" }}>Delete</button>
                    </div>
                )}

                <div style={{ marginTop: "30px", padding: "20px", border: "1px solid #ccc" }}>
                    <h3>Summary Dashboard</h3>
                    <p>Total Notes: {notes.length}</p>
                    <p>Summary feature coming soon</p>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
