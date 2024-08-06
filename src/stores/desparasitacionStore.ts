import { apiClient } from "@/axios";
import {
  QueryFunctionContext,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/vue-query";
import { reactive } from "vue";

export interface Deworming {
  id: number;
  tipo: string;
  fecha: string;
  producto: string;
  peso: number;
  formato: string;
}

export interface NewDeworming {
  tipo: string;
  fecha: string;
  producto: string;
  peso: number;
  formato: string;
}

async function postDesparasitaciones(
  id: number,
  payload: NewDeworming,
): Promise<Deworming> {
  const res = await apiClient.post(`/api/animals/${id}/desparasitaciones`, payload);
  return res.data
}

export async function getDesparasitaciones({
  queryKey,
}: QueryFunctionContext): Promise<Deworming[]> {
  try {
    const response = await apiClient.get(
      `/api/animals/${queryKey[1]}/desparasitaciones`,
    );
    return response.data;
  } catch (error: any) {
    console.error(error.message);
    return [];
  }
}

export const useDesparasitaciones = (idAnimal: number) => {
  const queryClient = useQueryClient();
  const { data } = useQuery({
    queryKey: ["desparasitaciones", idAnimal],
    queryFn: getDesparasitaciones,
    initialData: [],
  });

  const { mutateAsync, error, isError, isSuccess } = useMutation({
    mutationFn: async (payload: NewDeworming) => postDesparasitaciones(idAnimal, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["desparasitaciones", idAnimal],
      });
    },
  });

  return reactive({
    items: data,
    create: mutateAsync,
    creationError: error,
    isCreationError: isError,
    isCreationSuccess: isSuccess,
  });
};
