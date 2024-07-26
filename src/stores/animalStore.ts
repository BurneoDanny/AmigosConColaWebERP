import { apiClient } from "@/axios";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/vue-query";
import { Ref, reactive } from "vue";

export interface Animal {
  id: number;
  adoptado: boolean;
  nombre: string;
  edad: number;
  genero: string;
  imagen: string;
  especie: string;
  historia: string;
  ubicacion: string;
  peso: number;
  codigo: string;
}

export interface GetResponse {
  data: Animal[];
  nextPage: number;
  totalItems: number;
  totalPages: number;
}

/**
 * Get a paginated list of all animals.
 * @param page The page number
 * @param perPage How many items per page
 * @param specie The filter to apply
 * @param name Filter by name
 * @return A list of animals.
 */
async function getPaginated(
  page: number = 1,
  specie?: string,
  name?: string,
): Promise<GetResponse | null> {
  if (page < 0) return null;

  let url = `/api/animals/?page=${page}&perPage=12`;
  ``;

  if (specie) url += `&species=${specie}`;
  if (name) url += `&name=${name}`;

  try {
    const response = await apiClient.get(url);
    return response.data;
  } catch (error) {
    return null;
  }
}

interface CreateAnimalParams {
  animal: Animal;
  image: File | null;
}

/**
 * Create a new animal.
 * @param animal The animal to create.
 * @param image Image file to upload
 * @return The created animal.
 */
// En src/stores/animalStore.ts
async function createAnimal({
  animal,
  image,
}: CreateAnimalParams): Promise<Animal | null> {
  if (!animal || typeof animal !== "object") return null;

  const formData = new FormData();

  formData.set("nombre", animal.nombre);
  formData.set("genero", animal.genero);
  formData.set("especie", animal.especie);
  formData.set("edad", animal.edad.toString());
  formData.set("codigo", animal.codigo);
  formData.set("ubicacion", animal.ubicacion);
  formData.set("historia", animal.historia);
  formData.set("peso", animal.peso.toString());

  if (image !== null) {
    formData.set("imagen", image);
  }

  try {
    const response = await apiClient.post(`/api/animals`, formData);
    return await response.data;
  } catch (error: any) {
    return null;
  }
}

/**
 * Get a single animal by its id.
 * @param id The number that identifies the animal
 * @return An animal.
 */
async function getAnimalById(id: number) {
  try {
    const response = await apiClient.get(`/api/animals/${id}`);
    return await response.data;
  } catch {
    return null;
  }
}

export const useAnimal = (idAnimal: number) => {
  const { data, isFetching } = useQuery({
    queryKey: ["animals", idAnimal],
    queryFn: async () => await getAnimalById(idAnimal),
  });

  return reactive({
    data,
    loading: isFetching,
  });
};

export const useAnimals = (
  params: {
    page: Ref<number>;
    specie: Ref<string>;
    name: Ref<string>;
  } | null = null,
) => {
  const queryClient = useQueryClient();

  const emptyData = { data: [], nextPage: 0, totalItems: 0, totalPages: 0 };

  const { data, refetch } = useQuery({
    queryKey: ["animals"],
    queryFn: async () =>
      params !== null
        ? await getPaginated(
            params.page.value,
            params.specie.value,
            params.name.value,
          )
        : emptyData,
    placeholderData: keepPreviousData,
    initialData: emptyData,
  });

  const { mutateAsync: create } = useMutation({
    mutationKey: ["animals"],
    mutationFn: createAnimal,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["animals"],
      });
    },
  });

  return reactive({
    data,
    refetch,
    create,
  });
};
