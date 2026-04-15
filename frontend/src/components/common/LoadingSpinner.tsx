interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
}

const sizeClasses = {
  sm: 'h-5 w-5 border-4',
  md: 'h-8 w-8 border-4',
  lg: 'h-12 w-12 border-4',
};

export const LoadingSpinner = ({ size = 'md' }: LoadingSpinnerProps) => {
  return (
    <div className="flex items-center justify-center py-8" role="status" aria-label="Loading">
      <div className={`${sizeClasses[size]} rounded-full border-blue-600 border-t-transparent animate-spin`} />
    </div>
  );
};
