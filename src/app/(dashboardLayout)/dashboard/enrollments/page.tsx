"use client";

import React from "react";
import EnrollmentForm from "./__components/EnrollmentForm";
import { useSearchParams } from "next/navigation";
import { useGetApplicationByApplicationIdQuery } from "@/redux/api/admissionApplication";
import { LoadingState } from "@/components/common/LoadingState";

export default function EnrollmentPageContent() {
  const searchParams = useSearchParams();
  const applicationId = searchParams.get("applicationId");

  const {
    data: admissionApplications,
    isLoading,
    error,
  } = useGetApplicationByApplicationIdQuery(
    { applicationId },
    { skip: !applicationId },
  );

  if (isLoading) {
    return <LoadingState />;
  }

  if (error) {
    console.error("Error fetching application:", error);
    return <div>Error loading application data</div>;
  }

  return (
    <EnrollmentForm
      applicationId={applicationId}
      admissionApplications={admissionApplications}
    />
  );
}
