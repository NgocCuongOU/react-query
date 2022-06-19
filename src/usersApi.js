import axios from "axios";

const api = axios.create({
  baseURL: "https://62aae6c8a62365888bcf57d7.mockapi.io/api/",
});

export const getUsers = ({ pageParam = 1 }) =>
  api.get(`/users?page=${pageParam}&limit=4`);

export const getUser = (id) => api.get(`/users/${id}`).then((res) => res.data);

export const addUser = (user) =>
  api.post("/users", user).then((res) => res.data);

export const updateUser = ({ id, ...updatedUser }) =>
  api
    .put(`/users/${id}s`, updatedUser, {
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
    .then((res) => res.data);
