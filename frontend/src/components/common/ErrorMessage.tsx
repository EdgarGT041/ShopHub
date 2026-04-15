interface ErrorMessageProps {
  message: string;
  retry?: () => void;
}

export const ErrorMessage = ({ message, retry }: ErrorMessageProps) => {
  return (
    <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-800">
      <p className="text-sm font-medium">{message}</p>
      {retry ? (
        <button
          type="button"
          onClick={retry}
          className="mt-3 rounded-md bg-red-600 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-red-700"
        >
          Retry
        </button>
      ) : null}
    </div>
  );
};
