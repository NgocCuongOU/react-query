import axios from "axios";

const api = axios.create({
  baseURL: "https://62aae6c8a62365888bcf57d7.mockapi.io/api/",
});

export const getUsers = () => api.get("/users").then((res) => res.data);

export const getUser = (id) => api.get(`/users/${id}s`).then((res) => res.data);

export const updateUser = ({ id, ...updatedUser }) =>
  api
    .put(`/users/${id}`, updatedUser, {
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
    .then((res) => res.data);
