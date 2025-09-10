import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Shield, 
  AlertTriangle, 
  Activity, 
  Lock, 
  Eye,
  Download,
  RefreshCcw,
  CheckCircle,
  XCircle
} from "lucide-react";

interface LogEntry {
  id: string;
  timestamp: string;
  level: "info" | "warning" | "error" | "success";
  message: string;
  source: string;
  details?: string;
}

interface SecurityMetric {
  title: string;
  value: string;
  status: "good" | "warning" | "critical";
  description: string;
  icon: React.ElementType;
}

const mockLogs: LogEntry[] = [
  {
    id: "1",
    timestamp: "2024-01-10 14:35:22",
    level: "success",
    message: "API OpenAI: Resposta gerada com sucesso",
    source: "OpenAI",
    details: "Tempo de resposta: 1.2s | Tokens: 150"
  },
  {
    id: "2",
    timestamp: "2024-01-10 14:32:15",
    level: "warning",
    message: "Rate limit aproximando do limite",
    source: "API Manager",
    details: "85% do limite mensal utilizado"
  },
  {
    id: "3",
    timestamp: "2024-01-10 14:28:10",
    level: "error",
    message: "Falha na conexão WhatsApp API",
    source: "WhatsApp",
    details: "Timeout após 30s | Tentativa de reconexão em 60s"
  },
  {
    id: "4",
    timestamp: "2024-01-10 14:25:05",
    level: "info",
    message: "Documento processado: Manual_v2.pdf",
    source: "Document Processor",
    details: "45 chunks gerados | Indexação concluída"
  },
  {
    id: "5",
    timestamp: "2024-01-10 14:20:33",
    level: "success",
    message: "Backup automático realizado",
    source: "System",
    details: "Conversas e configurações salvos"
  }
];

const securityMetrics: SecurityMetric[] = [
  {
    title: "Status da API",
    value: "Segura",
    status: "good",
    description: "Todas as comunicações via HTTPS",
    icon: Lock
  },
  {
    title: "Rate Limiting",
    value: "85%",
    status: "warning",
    description: "Aproximando do limite mensal",
    icon: Activity
  },
  {
    title: "Autenticação",
    value: "Ativa",
    status: "good",
    description: "Acesso protegido por token",
    icon: Shield
  },
  {
    title: "Monitoramento",
    value: "Online",
    status: "good",
    description: "Sistema de logs funcionando",
    icon: Eye
  }
];

export function SecurityMonitoring() {
  const getLogIcon = (level: LogEntry['level']) => {
    switch (level) {
      case "success":
        return <CheckCircle className="w-4 h-4 text-success" />;
      case "info":
        return <Activity className="w-4 h-4 text-primary" />;
      case "warning":
        return <AlertTriangle className="w-4 h-4 text-warning" />;
      case "error":
        return <XCircle className="w-4 h-4 text-destructive" />;
    }
  };

  const getLogBadge = (level: LogEntry['level']) => {
    switch (level) {
      case "success":
        return <Badge variant="default" className="bg-success text-success-foreground text-xs">Sucesso</Badge>;
      case "info":
        return <Badge variant="secondary" className="text-xs">Info</Badge>;
      case "warning":
        return <Badge variant="secondary" className="bg-warning text-warning-foreground text-xs">Aviso</Badge>;
      case "error":
        return <Badge variant="destructive" className="text-xs">Erro</Badge>;
    }
  };

  const getMetricColor = (status: SecurityMetric['status']) => {
    switch (status) {
      case "good":
        return "text-success";
      case "warning":
        return "text-warning";
      case "critical":
        return "text-destructive";
    }
  };

  const getMetricBg = (status: SecurityMetric['status']) => {
    switch (status) {
      case "good":
        return "bg-success/10 border-success/20";
      case "warning":
        return "bg-warning/10 border-warning/20";
      case "critical":
        return "bg-destructive/10 border-destructive/20";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2">Segurança e Monitoramento</h2>
        <p className="text-muted-foreground">
          Monitore a segurança do sistema e acompanhe logs detalhados
        </p>
      </div>

      {/* Security Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {securityMetrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <Card key={metric.title} className={`shadow-card ${getMetricBg(metric.status)} border`}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <Icon className={`w-5 h-5 ${getMetricColor(metric.status)}`} />
                  <div className={`w-2 h-2 rounded-full ${metric.status === 'good' ? 'bg-success' : metric.status === 'warning' ? 'bg-warning' : 'bg-destructive'}`}></div>
                </div>
                <h3 className="font-semibold text-foreground text-sm">{metric.title}</h3>
                <p className={`text-lg font-bold ${getMetricColor(metric.status)}`}>{metric.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{metric.description}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* System Performance */}
        <Card className="bg-gradient-card shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-primary" />
              Performance
            </CardTitle>
            <CardDescription>Métricas de desempenho do sistema</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-foreground">CPU</span>
                <span className="text-sm text-success">32%</span>
              </div>
              <Progress value={32} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-foreground">Memória</span>
                <span className="text-sm text-warning">68%</span>
              </div>
              <Progress value={68} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-foreground">Armazenamento</span>
                <span className="text-sm text-success">24%</span>
              </div>
              <Progress value={24} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-foreground">API Quota</span>
                <span className="text-sm text-warning">85%</span>
              </div>
              <Progress value={85} className="h-2" />
            </div>
          </CardContent>
        </Card>

        {/* Cost Monitoring */}
        <Card className="bg-gradient-card shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-accent-blue" />
              Custos API
            </CardTitle>
            <CardDescription>Monitoramento de gastos</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">R$ 89,50</p>
              <p className="text-sm text-muted-foreground">Este mês</p>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">OpenAI</span>
                <span className="font-medium">R$ 67,20</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">WhatsApp</span>
                <span className="font-medium">R$ 22,30</span>
              </div>
              <div className="flex justify-between text-sm border-t border-border pt-2">
                <span className="text-foreground font-medium">Total</span>
                <span className="font-bold text-primary">R$ 89,50</span>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs text-muted-foreground">Limite mensal</span>
                <span className="text-xs text-muted-foreground">R$ 200,00</span>
              </div>
              <Progress value={45} className="h-2" />
            </div>
          </CardContent>
        </Card>

        {/* Security Status */}
        <Card className="bg-gradient-card shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-success" />
              Status de Segurança
            </CardTitle>
            <CardDescription>Verificações de segurança</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-foreground">HTTPS</span>
              <CheckCircle className="w-4 h-4 text-success" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-foreground">API Keys</span>
              <CheckCircle className="w-4 h-4 text-success" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-foreground">Autenticação</span>
              <CheckCircle className="w-4 h-4 text-success" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-foreground">Rate Limiting</span>
              <AlertTriangle className="w-4 h-4 text-warning" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-foreground">Backup</span>
              <CheckCircle className="w-4 h-4 text-success" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System Logs */}
      <Card className="bg-gradient-card shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-primary" />
            Logs do Sistema
          </CardTitle>
          <CardDescription>
            Registro detalhado de todas as atividades do sistema
          </CardDescription>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <RefreshCcw className="w-4 h-4 mr-2" />
              Atualizar
            </Button>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Exportar
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {mockLogs.map((log) => (
              <div key={log.id} className="flex items-start gap-3 p-3 border border-border rounded-lg hover:bg-secondary transition-smooth">
                <div className="flex-shrink-0 mt-0.5">
                  {getLogIcon(log.level)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-mono text-muted-foreground">
                      {log.timestamp}
                    </span>
                    {getLogBadge(log.level)}
                    <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded">
                      {log.source}
                    </span>
                  </div>
                  <p className="text-sm text-foreground mb-1">{log.message}</p>
                  {log.details && (
                    <p className="text-xs text-muted-foreground">{log.details}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}