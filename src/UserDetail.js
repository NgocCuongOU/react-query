import React, { useState } from "react";
import { useUser } from "./hooks/useUser";
import UserForm from "./UserForm";

const UserDetail = ({ userId }) => {
  const [isEditing, setIsEditing] = useState(false);

  const onError = (error) => {
    console.log(error);
  };

  const onSuccess = (data) => {
    console.error("Performed data success: ", data);
  };

  const {
    data: user,
    isLoading,
    isError,
    isFetching,
  } = useUser(userId, onSuccess, onError);

  if (!userId) {
    return <h2>Select a user please.</h2>;
  }

  if (isLoading) {
    return <h2>Loading user details...</h2>;
  }

  if (isError) {
    return <h2>Oops something went wrong...</h2>;
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
