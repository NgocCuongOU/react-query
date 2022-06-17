import { useState } from "react";
import { useQuery } from "react-query";
import { getUsers } from "./usersApi";

function Users({ setUserId }) {
  const [interval] = useState(1000);

  const {
    data: users,
    isLoading,
    isError,
    isFetching,
  } = useQuery("users", getUsers, {
    retry: false,
    // Refetch data every second
    refetchInterval: interval,
  });

  if (isLoading) {
    return <h1>Loading users...</h1>;
  }

  if (isFetching) {
    return <h1>isFetching...</h1>;
  }

  if (isError) {
    return <h1>Something went wrong... </h1>;
  }

  return (
    <ul>
      {users &&
        users.map((user) => (
          <li style={{ marginBottom: 10 }} key={user.id}>
            {user.id}: {user.name}
            <button
              style={{ marginLeft: 10 }}
              onClick={() => setUserId(user.id)}
            >
              View
            </button>
          </li>
        ))}
    </ul>
  );
}

export default Users;
