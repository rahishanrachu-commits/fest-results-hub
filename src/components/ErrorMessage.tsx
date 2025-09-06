import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export const ErrorMessage = ({ message, onRetry }: ErrorMessageProps) => {
  return (
    <div className="max-w-2xl mx-auto py-8">
      <Alert variant="destructive" className="border-destructive/50 glass rounded-2xl p-8">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle className="text-lg font-semibold">Error Loading Results</AlertTitle>
        <AlertDescription className="mt-3 text-base leading-relaxed">
          {message}
        </AlertDescription>
        {onRetry && (
          <div className="mt-6">
            <Button 
              variant="gradient" 
              onClick={onRetry}
              size="lg"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Try Again
            </Button>
          </div>
        )}
      </Alert>
    </div>
  );
};