import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export const ErrorMessage = ({ message, onRetry }: ErrorMessageProps) => {
  return (
    <div className="max-w-2xl mx-auto">
      <Alert variant="destructive" className="border-destructive/50">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error Loading Results</AlertTitle>
        <AlertDescription className="mt-2">
          {message}
        </AlertDescription>
        {onRetry && (
          <div className="mt-4">
            <Button 
              variant="outline" 
              onClick={onRetry}
              className="border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
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