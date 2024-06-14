import axios from "axios";
const BASE_URL = "http://localhost:5000/api/";
const TOKEN = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NjA0MGMxMjNhYjkyOWU2OTg5OGJhZCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTcxODE4MzIxNCwiZXhwIjoxNzE4NDQyNDE0fQ.Lieyte9CbjfgSZCPHr4ISjj2ZqZXoKfcq4iVoW-29_A"

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: {token:`${TOKEN}`},
});
