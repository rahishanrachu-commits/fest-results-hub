import { Loader2 } from "lucide-react";

export const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 space-y-4">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-primary/20 rounded-full"></div>
        <div className="absolute top-0 left-0 w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
      <div className="text-center">
        <h3 className="text-lg font-semibold text-foreground">Fetching Latest Results</h3>
        <p className="text-muted-foreground">Loading data from Google Sheets...</p>
      </div>
    </div>
  );
};