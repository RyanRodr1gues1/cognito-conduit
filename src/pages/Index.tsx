import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AdminSidebar } from "@/components/AdminSidebar";
import { DashboardOverview } from "@/components/DashboardOverview";
import { SetupConfiguration } from "@/components/SetupConfiguration";
import { DocumentManagement } from "@/components/DocumentManagement";
import { ConversationHistory } from "@/components/ConversationHistory";
import { SecurityMonitoring } from "@/components/SecurityMonitoring";
import { useAuth } from "@/hooks/useAuth";
import LoadingScreen from "@/components/LoadingScreen";

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const { isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate("/auth");
    }
  }, [isAuthenticated, loading, navigate]);

  if (loading) {
    return <LoadingScreen message="Carregando painel administrativo..." />;
  }

  if (!isAuthenticated) {
    return null;
  }

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <DashboardOverview />;
      case "setup":
        return <SetupConfiguration />;
      case "documents":
        return <DocumentManagement />;
      case "conversations":
        return <ConversationHistory />;
      case "security":
        return <SecurityMonitoring />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="flex-1 overflow-hidden">
        <div className="h-full overflow-y-auto">
          <div className="p-6 lg:p-8">
            {renderContent()}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
