"use client";

import React from "react";
import {
  useFetchService,
  useFetchPod,
  useFetchDeploy,
} from "@/api/hooks/useStudent";

const StudentInfoComponent = () => {
  const studentId = "2019312430";
  const {
    data: serviceData,
    isLoading: isLoadingService,
    error: errorService,
  } = useFetchService(studentId);
  const {
    data: podData,
    isLoading: isLoadingPod,
    error: errorPod,
  } = useFetchPod(studentId);
  const {
    data: deployData,
    isLoading: isLoadingDeploy,
    error: errorDeploy,
  } = useFetchDeploy(studentId);

  // 로딩 상태 처리
  if (isLoadingService || isLoadingPod || isLoadingDeploy) {
    return <div>Loading...</div>;
  }

  // 에러 상태 처리
  if (errorService || errorPod || errorDeploy) {
    return <div>Error loading data. Please try again later.</div>;
  }

  return (
    <div>
      <h1>Student Information</h1>
      <div>
        <h2>Service Details</h2>
        <p>{JSON.stringify(serviceData, null, 2)}</p>
      </div>
      <div>
        <h2>Pod Details</h2>
        <p>{JSON.stringify(podData, null, 2)}</p>
      </div>
      <div>
        <h2>Deployment Details</h2>
        <p>{JSON.stringify(deployData, null, 2)}</p>
      </div>
    </div>
  );
};

export default StudentInfoComponent;
