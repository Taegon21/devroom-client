import apiClient from "@/api/client";
import { API_ENDPOINTS } from "@/api/endpoints";
import { useQuery } from "@tanstack/react-query";

const fetchService = async (studentId: string) => {
  const { data } = await apiClient.get(
    API_ENDPOINTS.STUDENT.SERVICE(studentId)
  );
  return data;
};

const fetchPod = async (studentId: string) => {
  const { data } = await apiClient.get(API_ENDPOINTS.STUDENT.POD(studentId));
  return data;
};

const fetchDeploy = async (studentId: string) => {
  const { data } = await apiClient.get(API_ENDPOINTS.STUDENT.DEPLOY(studentId));
  return data;
};

export const useFetchService = (studentId: string) => {
  return useQuery({
    queryKey: ["fetchService", studentId],
    queryFn: () => fetchService(studentId),
  });
};

export const useFetchPod = (studentId: string) => {
  return useQuery({
    queryKey: ["fetchPod", studentId],
    queryFn: () => fetchPod(studentId),
  });
};

export const useFetchDeploy = (studentId: string) => {
  return useQuery({
    queryKey: ["fetchDeploy", studentId],
    queryFn: () => fetchDeploy(studentId),
  });
};
