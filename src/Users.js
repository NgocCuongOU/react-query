import React from "react";
import { useUsers } from "./hooks/useUser";

function Users({ setUserId }) {
  const {
    data: users,
    isFetchingNextPage,
    isLoading,
    isFetching,
    isError,
    fetchNextPage,
    hasNextPage,
  } = useUsers();

  if (isLoading) {
    return <h1>Loading users...</h1>;
  }

  if (isFetching && !isFetchingNextPage) {
    return <h1>Re-Fetching users...</h1>;
  }

  if (isError) {
    return <h1>Something went wrong... </h1>;
  }

  return (
    <>
      <ul>
        {users &&
          users.pages.map((groups, index) => {
            return (
              <React.Fragment key={index}>
                {groups.data.map((user) => {
                  return (
                    <li style={{ marginBottom: 10 }} key={user.id}>
                      {user.id}: {user.name}
                      <button
                        style={{ marginLeft: 10 }}
                        onClick={() => setUserId(user.id)}
                      >
                        View
                      </button>
                    </li>
                  );
                })}
              </React.Fragment>
            );
          })}
      </ul>
      <button disabled={!hasNextPage} onClick={fetchNextPage}>
        Load more
      </button>
    </>
  );
}

export default Users;
