import React, { useState } from "react";
import { useQuery } from "react-query";
import { getUser } from "./usersApi";
import UserForm from "./UserForm";

const UserDetail = ({ userId }) => {
  const [isEditing, setIsEditing] = useState(false);

  const {
    data: user,
    isLoading,
    isError,
    isFetching,
  } = useQuery(["user", userId], () => getUser(userId), {
    enabled: Boolean(userId),
  });

  if (!userId) {
    return <h2>Select a user please.</h2>;
  }

  if (isLoading) {
    return <h2>Loading user details...</h2>;
  }

  return (
    <div>
      <button onClick={() => setIsEditing(!isEditing)}>
        {isEditing ? "Cancel" : "Edit"}
      </button>
      {isEditing ? (
        <UserForm user={user} setIsEditing={setIsEditing} />
      ) : (
        <div>
          <h3>User info:</h3>
          <p>Name: {user.name}</p>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
        </div>
      )}
      {isFetching && <h2>Data Fetching...</h2>}
    </div>
  );
};

export default UserDetail;
