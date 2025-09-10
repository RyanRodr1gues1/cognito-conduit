import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center space-y-6 p-8">
        <div className="flex justify-center">
          <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center shadow-primary">
            <AlertTriangle className="w-10 h-10 text-primary-foreground" />
          </div>
        </div>
        <div className="space-y-4">
          <h1 className="text-6xl font-bold text-foreground">404</h1>
          <h2 className="text-2xl font-semibold text-foreground">Página não encontrada</h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            A página que você está procurando não existe ou foi movida para outro local.
          </p>
        </div>
        <Button asChild className="bg-gradient-primary hover:bg-primary-hover text-primary-foreground">
          <a href="/">
            <Home className="w-4 h-4 mr-2" />
            Voltar ao Dashboard
          </a>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
