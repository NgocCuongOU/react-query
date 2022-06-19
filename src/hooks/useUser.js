import {
  useQuery,
  useMutation,
  useQueryClient,
  useInfiniteQuery,
} from "react-query";
import { getUser, getUsers, addUser, updateUser } from "../usersApi";

export const useUsers = () => {
  return useInfiniteQuery(["users"], getUsers, {
    getNextPageParam: (_lastPage, pages) => {
      console.log({ _lastPage, pages });
      if (pages.length < 4) {
        return pages.length + 1;
      } else {
        return undefined;
      }
    },
  });
};

export const useUser = (queryKey, onSuccess, onError) => {
  return useQuery(["user", queryKey], () => getUser(queryKey), {
    enabled: Boolean(queryKey),
    onError,
    onSuccess,
  });
};

export const useAddUser = () => {
  const queryClient = useQueryClient();
  return useMutation(addUser, {
    // onMutate: async (payload) => {
    //   // Cancel any outgoing refetch (so they don't override our optimistic update)
    //   await queryClient.cancelQueries("users");

    //   // Snapshot the previous to the new value
    //   const previousUsers = queryClient.getQueryData("users");

    //   // Optimistically update to the new value
    //   queryClient.setQueryData("users", (oldData) => {
    //     return {
    //       ...oldData,
    //       data: [...oldData.data, payload],
    //     };
    //   });

    //   // Return a context object with the snapshotted value
    //   return { previousUsers };
    // },
    onError: (error, data, context) => {
      console.log({ error, data, context });

      // queryClient.setQueryData("users", context.previousUsers);
    },
    onSuccess: (data) => {
      queryClient.setQueryData("users", (oldData) => {
        return {
          ...oldData,
          data: [...oldData.data, data],
        };
      });
    },
    // onSettled: () => {
    //   queryClient.invalidateQueries("users", {
    //     exact: true,
    //   });
    // },
  });
};

export const useUpdateUser = (setIsEditing) => {
  const queryClient = useQueryClient();

  return useMutation(updateUser, {
    onMutate: async (payload) => {
      // Cancel any outgoing refetch (so they don't override our optimistic update)
      await queryClient.cancelQueries(["user", payload.id]);

      // Snapshot the previous to the new value
      const previousUser = queryClient.getQueryData(["user", payload.id]);

      // Optimistically update to the new value
      queryClient.setQueryData(["user", payload.id], (_oldData) => {
        return {
          ...payload,
        };
      });

      return { previousUser };
    },
    onError: (error, data, context) => {
      console.log({ error, data, context });

      queryClient.setQueryData(
        ["user", context.previousUser.id],
        context.previousUser
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries("users", {
        exact: true,
      });

      setIsEditing(false);
    },
    retry: 3,
  });
};
