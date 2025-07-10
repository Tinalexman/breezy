import toast from "react-hot-toast";

export const useToast = () => {
  const showSuccess = (message: string) => {
    toast.success(message);
  };

  const showError = (message: string) => {
    toast.error(message);
  };

  const showLoading = (message: string) => {
    return toast.loading(message);
  };

  const showInfo = (message: string) => {
    toast(message);
  };

  const dismiss = (toastId: string) => {
    toast.dismiss(toastId);
  };

  return {
    success: showSuccess,
    error: showError,
    loading: showLoading,
    info: showInfo,
    dismiss,
  };
};
