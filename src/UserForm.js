import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { updateUser } from "./usersApi";

const UserForm = ({ user, setIsEditing }) => {
  const [userFormField, setUserFormField] = useState({ ...user });

  const queryClient = useQueryClient();

  const { isLoading, mutate } = useMutation(updateUser, {
    onMutate: async (userFormFieldUpdate) => {
      // Cancel any outging refetches (so they don't override our optimistic update)
      // Read more at https://react-query.tanstack.com/guides/query-cancellation
      await queryClient.cancelQueries(["user", userFormField.id]);

      // Snapshot the previous to the new value
      const previousUser = queryClient.getQueryData([
        "user",
        userFormFieldUpdate.id,
      ]);

      console.log("previousUser: ", previousUser);
      console.log("userFormFieldUpdate: ", userFormFieldUpdate);

      // Optimistically update to the new value
      queryClient.setQueryData(["user", user.id], userFormFieldUpdate);

      return { previousUser, userFormFieldUpdate };
    },
    // If mutation fails, use the context we returned above
    onError: (error, newUser, context) => {
      queryClient.setQueryData(
        ["user", context.newUser.id],
        context.previousUser
      );
    },
    onSuccess: (data) => {
      // Trigger the old data to be updated
      // console.log("data: ", data);
      queryClient.invalidateQueries(["user", user.id]);

      queryClient.invalidateQueries("users", {
        exact: true,
      });
      setIsEditing(false);
    },
    // Default unset retry
    retry: 3,
  });

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
