import { getToken } from "../auth/tokenservice"

const API_BASE = "http://127.0.0.1:8000/notes"

const getHeaders = () => ({
    "Content-Type": "application/json",
    "Authorization": `Bearer ${getToken()}`
})

export const createNote = async (title, content) => {
    const response = await fetch(`${API_BASE}/create`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify({ title, content })
    })
    return response.json()
}

export const getAllNotes = async () => {
    const response = await fetch(`${API_BASE}/get`, {
        method: "GET",
        headers: getHeaders()
    })
    return response.json()
}

export const getNoteById = async (id) => {
    const response = await fetch(`${API_BASE}/get/${id}`, {
        method: "GET",
        headers: getHeaders()
    })
    return response.json()
}

export const updateNote = async (id, title, content) => {
    const response = await fetch(`${API_BASE}/update/${id}`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify({ title, content })
    })
    return response.json()
}

export const deleteNote = async (id) => {
    const response = await fetch(`${API_BASE}/delete/${id}`, {
        method: "DELETE",
        headers: getHeaders()
    })
    return response.json()
}
