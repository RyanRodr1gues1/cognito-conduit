import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  MessageSquare, 
  Users, 
  FileText, 
  TrendingUp, 
  Clock,
  CheckCircle,
  AlertCircle,
  DollarSign
} from "lucide-react";

const metrics = [
  {
    title: "Conversas Hoje",
    value: "247",
    change: "+12%",
    icon: MessageSquare,
    trend: "up",
    color: "text-primary"
  },
  {
    title: "Usuários Ativos",
    value: "1,834",
    change: "+5%",
    icon: Users,
    trend: "up",
    color: "text-success"
  },
  {
    title: "Documentos",
    value: "156",
    change: "+3",
    icon: FileText,
    trend: "up",
    color: "text-accent-blue"
  },
  {
    title: "Custo API (mês)",
    value: "R$ 89,50",
    change: "+2%",
    icon: DollarSign,
    trend: "up",
    color: "text-warning"
  }
];

const recentActivities = [
  {
    type: "document",
    message: "Documento 'Manual_Produto.pdf' processado com sucesso",
    time: "5 min atrás",
    status: "success"
  },
  {
    type: "conversation",
    message: "142 novas conversas iniciadas",
    time: "10 min atrás",
    status: "info"
  },
  {
    type: "error",
    message: "Falha na conexão com WhatsApp API",
    time: "25 min atrás",
    status: "error"
  },
  {
    type: "document",
    message: "Upload de 3 documentos em processamento",
    time: "1 hora atrás",
    status: "processing"
  }
];

export function DashboardOverview() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2">Dashboard</h2>
        <p className="text-muted-foreground">
          Visão geral do desempenho do seu chatbot
        </p>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <Card key={metric.title} className="bg-gradient-card shadow-card hover:shadow-card-hover transition-smooth">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">{metric.title}</p>
                    <p className="text-2xl font-bold text-foreground">{metric.value}</p>
                    <div className="flex items-center mt-2">
                      <TrendingUp className="w-4 h-4 text-success mr-1" />
                      <span className="text-sm text-success">{metric.change}</span>
                    </div>
                  </div>
                  <div className={`p-3 rounded-lg bg-primary-light ${metric.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* System Status */}
        <Card className="bg-gradient-card shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-success" />
              Status do Sistema
            </CardTitle>
            <CardDescription>Monitoramento em tempo real</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-foreground">API OpenAI</span>
                <Badge variant="default" className="bg-success text-success-foreground">Ativo</Badge>
              </div>
              <Progress value={98} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-foreground">WhatsApp API</span>
                <Badge variant="destructive">Desconectado</Badge>
              </div>
              <Progress value={0} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-foreground">Processamento</span>
                <Badge variant="secondary" className="bg-warning text-warning-foreground">75%</Badge>
              </div>
              <Progress value={75} className="h-2" />
            </div>
          </CardContent>
        </Card>

        {/* Recent Activities */}
        <Card className="bg-gradient-card shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              Atividades Recentes
            </CardTitle>
            <CardDescription>Últimas ações do sistema</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-secondary hover:bg-secondary-hover transition-smooth">
                  <div className={`p-1 rounded-full ${
                    activity.status === 'success' ? 'bg-success' :
                    activity.status === 'error' ? 'bg-destructive' :
                    activity.status === 'processing' ? 'bg-warning' :
                    'bg-primary'
                  }`}>
                    {activity.status === 'success' && <CheckCircle className="w-3 h-3 text-success-foreground" />}
                    {activity.status === 'error' && <AlertCircle className="w-3 h-3 text-destructive-foreground" />}
                    {activity.status === 'processing' && <Clock className="w-3 h-3 text-warning-foreground" />}
                    {activity.status === 'info' && <MessageSquare className="w-3 h-3 text-primary-foreground" />}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-foreground">{activity.message}</p>
                    <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}