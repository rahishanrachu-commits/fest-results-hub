import { Loader2 } from "lucide-react";

export const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20 space-y-6">
      <div className="relative">
        <div className="w-20 h-20 border-4 border-primary/20 rounded-full"></div>
        <div className="absolute top-0 left-0 w-20 h-20 border-4 border-transparent border-t-primary rounded-full animate-spin"></div>
        <div className="absolute top-2 left-2 w-16 h-16 border-4 border-transparent border-t-accent rounded-full animate-spin animation-delay-150"></div>
        <div className="absolute top-4 left-4 w-12 h-12 border-4 border-transparent border-t-secondary rounded-full animate-spin animation-delay-300"></div>
      </div>
      <div className="text-center">
        <h3 className="text-xl font-semibold text-foreground mb-2">Fetching Latest Results</h3>
        <p className="text-muted-foreground text-lg">Loading data from Google Sheets...</p>
        <div className="flex justify-center mt-4 space-x-1">
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce animation-delay-100"></div>
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce animation-delay-200"></div>
        </div>
      </div>
    </div>
  );
};