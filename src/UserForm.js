import React, { useState } from "react";
import { useUpdateUser } from "./hooks/useUser";

const UserForm = ({ user, setIsEditing }) => {
  const [userFormField, setUserFormField] = useState({ ...user });

  const { isLoading, mutate } = useUpdateUser(setIsEditing);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUserFormField({ ...userFormField, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Trigger mutation
    mutate(userFormField);
  };

  if (isLoading) {
    return <h2>Updating user...</h2>;
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div style={{ marginTop: 20, marginBottom: 20 }}>
          <label>
            <span style={{ minWidth: 80, display: "inline-block" }}>Name:</span>
            <input
              name="name"
              value={userFormField.name}
              onChange={(e) => handleChange(e)}
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
              value={userFormField.username}
              onChange={(e) => handleChange(e)}
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
              value={userFormField.email}
              onChange={(e) => handleChange(e)}
            />
          </label>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default UserForm;
