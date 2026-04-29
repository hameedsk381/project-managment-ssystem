export function getErrorMessage(error, fallback = "Something went wrong.") {
  return (
    error?.response?.data?.detail ||
    error?.response?.data?.message ||
    error?.message ||
    fallback
  );
}

export function isIntegrationPendingError(error) {
  return (
    error?.code === "ERR_NETWORK" ||
    error?.message === "Network Error" ||
    error?.response?.status === 404 ||
    error?.response?.status === 501
  );
}
