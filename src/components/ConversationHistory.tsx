import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  MessageSquare, 
  Search, 
  Filter, 
  Download, 
  Calendar,
  User,
  Clock
} from "lucide-react";

interface Conversation {
  id: string;
  user: string;
  phone: string;
  messages: number;
  lastMessage: string;
  status: "active" | "resolved" | "pending";
  timestamp: string;
  satisfaction?: number;
}

const mockConversations: Conversation[] = [
  {
    id: "1",
    user: "João Silva",
    phone: "+55 11 99999-1234",
    messages: 12,
    lastMessage: "Obrigado pela ajuda com o produto!",
    status: "resolved",
    timestamp: "2024-01-10 14:30",
    satisfaction: 5
  },
  {
    id: "2",
    user: "Maria Santos",
    phone: "+55 11 98888-5678",
    messages: 5,
    lastMessage: "Ainda estou com dúvidas sobre a garantia",
    status: "pending",
    timestamp: "2024-01-10 13:45"
  },
  {
    id: "3",
    user: "Carlos Oliveira",
    phone: "+55 11 97777-9012",
    messages: 8,
    lastMessage: "Perfeito, problema resolvido!",
    status: "resolved",
    timestamp: "2024-01-10 11:20",
    satisfaction: 4
  },
  {
    id: "4",
    user: "Ana Costa",
    phone: "+55 11 96666-3456",
    messages: 3,
    lastMessage: "Como faço para cancelar?",
    status: "active",
    timestamp: "2024-01-10 09:15"
  }
];

export function ConversationHistory() {
  const [conversations] = useState<Conversation[]>(mockConversations);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filteredConversations = conversations.filter(conv => {
    const matchesSearch = conv.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         conv.phone.includes(searchTerm) ||
                         conv.lastMessage.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || conv.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: Conversation['status']) => {
    switch (status) {
      case "active":
        return <Badge className="bg-primary text-primary-foreground">Ativo</Badge>;
      case "resolved":
        return <Badge variant="default" className="bg-success text-success-foreground">Resolvido</Badge>;
      case "pending":
        return <Badge variant="secondary" className="bg-warning text-warning-foreground">Pendente</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2">Histórico de Conversas</h2>
        <p className="text-muted-foreground">
          Acompanhe todas as interações do chatbot com os usuários
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-card shadow-card">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">{conversations.length}</p>
              <p className="text-sm text-muted-foreground">Total</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-card shadow-card">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-success">
                {conversations.filter(c => c.status === "resolved").length}
              </p>
              <p className="text-sm text-muted-foreground">Resolvidas</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-card shadow-card">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-warning">
                {conversations.filter(c => c.status === "pending").length}
              </p>
              <p className="text-sm text-muted-foreground">Pendentes</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-card shadow-card">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">
                {conversations.filter(c => c.status === "active").length}
              </p>
              <p className="text-sm text-muted-foreground">Ativas</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="bg-gradient-card shadow-card">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Buscar por nome, telefone ou mensagem..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <select 
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-input rounded-md bg-background text-foreground"
              >
                <option value="all">Todos Status</option>
                <option value="active">Ativo</option>
                <option value="resolved">Resolvido</option>
                <option value="pending">Pendente</option>
              </select>
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filtros
              </Button>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Exportar
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Conversations List */}
      <Card className="bg-gradient-card shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-primary" />
            Conversas ({filteredConversations.length})
          </CardTitle>
          <CardDescription>
            Lista de todas as conversas registradas no sistema
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filteredConversations.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <MessageSquare className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>Nenhuma conversa encontrada</p>
                <p className="text-sm">Tente ajustar os filtros de busca</p>
              </div>
            ) : (
              filteredConversations.map((conversation) => (
                <div key={conversation.id} className="border border-border rounded-lg p-4 hover:bg-secondary hover:border-primary transition-smooth cursor-pointer">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary-light rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium text-foreground">{conversation.user}</h4>
                        <p className="text-sm text-muted-foreground">{conversation.phone}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusBadge(conversation.status)}
                      {conversation.satisfaction && (
                        <div className="flex items-center gap-1">
                          <span className="text-sm text-muted-foreground">★</span>
                          <span className="text-sm font-medium">{conversation.satisfaction}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <p className="text-sm text-foreground line-clamp-2">{conversation.lastMessage}</p>
                  </div>
                  
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <MessageSquare className="w-3 h-3" />
                        {conversation.messages} mensagens
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {conversation.timestamp}
                      </span>
                    </div>
                    <Button variant="ghost" size="sm" className="text-primary hover:text-primary">
                      Ver detalhes →
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}