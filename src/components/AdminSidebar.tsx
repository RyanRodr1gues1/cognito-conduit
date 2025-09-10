import { 
  Settings, 
  FileText, 
  BarChart3, 
  MessageSquare, 
  Shield, 
  Upload,
  Bot
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface AdminSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const menuItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: BarChart3,
    description: "Visão geral e métricas"
  },
  {
    id: "setup",
    label: "Configuração",
    icon: Settings,
    description: "API Keys e conectores"
  },
  {
    id: "documents",
    label: "Documentos",
    icon: FileText,
    description: "Gestão de conteúdo"
  },
  {
    id: "conversations",
    label: "Conversas",
    icon: MessageSquare,
    description: "Histórico do chatbot"
  },
  {
    id: "security",
    label: "Segurança",
    icon: Shield,
    description: "Logs e monitoramento"
  }
];

export function AdminSidebar({ activeTab, onTabChange }: AdminSidebarProps) {
  return (
    <aside className="w-64 bg-gradient-card shadow-card border-r border-border h-screen overflow-y-auto">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center shadow-primary">
            <Bot className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="font-semibold text-foreground text-lg">ChatBot Admin</h1>
            <p className="text-sm text-muted-foreground">Sistema de Gestão</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <Button
              key={item.id}
              variant={isActive ? "default" : "ghost"}
              className={cn(
                "w-full justify-start h-auto p-3 font-normal transition-smooth",
                isActive 
                  ? "bg-gradient-primary text-primary-foreground shadow-primary" 
                  : "hover:bg-secondary-hover text-foreground"
              )}
              onClick={() => onTabChange(item.id)}
            >
              <Icon className="w-5 h-5 mr-3 flex-shrink-0" />
              <div className="flex-1 text-left">
                <div className="font-medium">{item.label}</div>
                <div className={cn(
                  "text-xs mt-0.5",
                  isActive ? "text-primary-foreground/80" : "text-muted-foreground"
                )}>
                  {item.description}
                </div>
              </div>
            </Button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border bg-gradient-secondary">
        <div className="text-xs text-muted-foreground text-center">
          <p>ChatBot Admin v1.0</p>
          <p className="mt-1">Sistema Profissional</p>
        </div>
      </div>
    </aside>
  );
}