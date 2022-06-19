import React, { useState } from "react";
import { useAddUser } from "./hooks/useUser";

const CreateUser = () => {
  const [user, setUser] = useState({
    name: "",
    username: "",
    email: "",
  });

  const handleChangeUser = (e) => {
    const { name, value } = e.target;

    console.log({ name, value });

    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const { isLoading, isError, mutate: addUser } = useAddUser();

  const handleSubmit = (e) => {
    e.preventDefault();

    addUser(user);
    setUser({
      name: "",
      username: "",
      email: "",
    });
  };

  if (isLoading) {
    return <h1>Adding a new user...</h1>;
  }

  if (isError) {
    return <h1>Oops something went wrong!!!</h1>;
  }

  return (
    <div>
      <h3>Create a new user</h3>
      <form onSubmit={handleSubmit}>
        <div style={{ marginTop: 20, marginBottom: 20 }}>
          <label>
            <span style={{ minWidth: 80, display: "inline-block" }}>Name:</span>
            <input
              name="name"
              value={user.name}
              onChange={(e) => handleChangeUser(e)}
            />
          </label>
        </div>
        <div style={{ marginTop: 20, marginBottom: 20 }}>
          <label>
            <span style={{ minWidth: 80, display: "inline-block" }}>
              Username:
            </span>
            <input
              name="username"
              value={user.username}
              onChange={(e) => handleChangeUser(e)}
            />
          </label>
        </div>
        <div style={{ marginTop: 20, marginBottom: 20 }}>
          <label>
            <span style={{ minWidth: 80, display: "inline-block" }}>
              Email:
            </span>
            <input
              name="email"
              value={user.email}
              onChange={(e) => handleChangeUser(e)}
            />
          </label>
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default CreateUser;
