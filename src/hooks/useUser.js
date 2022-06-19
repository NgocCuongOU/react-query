import { useQuery } from "react-query";
import { getUser } from "../usersApi";

export const useUser = (queryKey, onSuccess, onError) => {
  return useQuery(["user", queryKey], () => getUser(queryKey), {
    enabled: Boolean(queryKey),
    onError,
    onSuccess,
  });
};
