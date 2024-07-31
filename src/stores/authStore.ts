import { useMutation } from "@tanstack/vue-query";
import { apiClient } from "@/axios.ts";

interface UserCreds {
  username: string;
  password: string;
}

interface UserTokens {
  access_token: string;
  refresh_token: string;
}

export const useAuth = () => {
  const { mutateAsync: login } = useMutation({
    mutationKey: ["auth"],
    mutationFn: async ({ username, password }: UserCreds) => {
      const result = await apiClient.post<UserTokens>("/api/Auth/login", {
        username,
        password,
      });

      const { access_token, refresh_token } = result.data;

      localStorage.setItem("access_token", access_token);
      localStorage.setItem("refresh_token", refresh_token);
    },
  });

  return {
    login,
  };
};
