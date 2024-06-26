import apiClient from "@/api/client";
import { API_ENDPOINTS } from "@/api/endpoints";
import { useQuery, useMutation } from "@tanstack/react-query";

const fetchCheck = async (professorId: string) => {
  const { data } = await apiClient.get(
    API_ENDPOINTS.PROFESSOR.CHECK(professorId)
  );
  return data;
};

export const useFetchCheck = (professorId: string) => {
  return useQuery({
    queryKey: ["fetchDeploy", professorId],
    queryFn: () => fetchCheck(professorId),
  });
};

interface ClassCreationData {
  className: string;
  studentIds: string[];
  options: { [key: string]: string };
  command: string[];
  customScript: string;
}

interface CreateClassArgs {
  professorId: string;
  classData: ClassCreationData;
}

const createClass = async ({ professorId, classData }: CreateClassArgs) => {
  const { data } = await apiClient.post(
    API_ENDPOINTS.PROFESSOR.CREATE(professorId),
    classData
  );
  return data;
};

export const useCreateClass = () => {
  return useMutation({
    mutationFn: createClass,
  });
};
