import { setToken } from "./tokenservice"

const API_BASE = "http://127.0.0.1:8000/auth"

export const loginUser = async (name, password) => {
    const response = await fetch(`${API_BASE}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "accept": "application/json"
        },
        body: JSON.stringify({ name, password })
    })

    if (!response.ok) {
        throw new Error("Login failed")
    }

    const data = await response.json()

    // Store the token if returned by the API
    if (data.access_token) {
        setToken(data.access_token)
    }

    return data
}

export const Signupuser = async (name, password) => {
    const response = await fetch(`${API_BASE}/signup`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "accept": "application/json"
        },
        body: JSON.stringify({ name, password })
    })

    if (!response.ok) {
        throw new Error("Signup failed")
    }

    const data = await response.json()

    // Auto-login after signup if token is returned
    if (data.access_token) {
        setToken(data.access_token)
    }

    return data
}