import { Link } from "react-router";
import { Button } from "../components/ui/button";
import { Home, AlertCircle } from "lucide-react";

export function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-full px-6 text-center bg-gradient-to-b from-gray-50 via-blue-50/30 to-purple-50/30">
      <div className="mb-8">
        <div className="w-24 h-24 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-red-100 to-orange-100 flex items-center justify-center shadow-lg">
          <AlertCircle className="w-12 h-12 text-red-600" />
        </div>
        <h1 className="text-6xl mb-3 font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">404</h1>
        <h2 className="text-xl mb-2 font-medium">Page Not Found</h2>
        <p className="text-muted-foreground max-w-sm">
          The page you're looking for doesn't exist or has been moved.
        </p>
      </div>
      <Link to="/">
        <Button className="gap-2 h-12 bg-gradient-to-r from-primary to-blue-600 hover:from-primary-hover hover:to-blue-700 shadow-md px-6 rounded-xl">
          <Home className="w-4 h-4" />
          Go Back Home
        </Button>
      </Link>
    </div>
  );
}