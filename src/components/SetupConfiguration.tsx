import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { 
  Key, 
  MessageSquare, 
  Eye, 
  EyeOff, 
  CheckCircle, 
  AlertCircle,
  Save,
  TestTube
} from "lucide-react";

export function SetupConfiguration() {
  const [showApiKey, setShowApiKey] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const [whatsappToken, setWhatsappToken] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [systemPrompt, setSystemPrompt] = useState(`Você é um assistente virtual profissional e prestativo. 
Responda sempre de forma clara, objetiva e educada.
Use as informações dos documentos fornecidos para dar respostas precisas.`);
  const [isConnected, setIsConnected] = useState(false);
  const { toast } = useToast();

  const handleSaveApiKey = () => {
    if (!apiKey.trim()) {
      toast({
        title: "Erro",
        description: "Por favor, insira uma API Key válida",
        variant: "destructive"
      });
      return;
    }
    
    // Simulate API key validation
    toast({
      title: "Sucesso",
      description: "API Key da OpenAI configurada com sucesso",
    });
  };

  const handleConnectWhatsApp = () => {
    if (!whatsappToken.trim() || !whatsappNumber.trim()) {
      toast({
        title: "Erro",
        description: "Preencha todos os campos do WhatsApp",
        variant: "destructive"
      });
      return;
    }

    setIsConnected(true);
    toast({
      title: "Conectado",
      description: "WhatsApp Business API conectada com sucesso",
    });
  };

  const handleTestConnection = () => {
    toast({
      title: "Teste iniciado",
      description: "Enviando mensagem de teste...",
    });
    
    // Simulate test
    setTimeout(() => {
      toast({
        title: "Teste concluído",
        description: "Conexão funcionando corretamente!",
      });
    }, 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2">Configuração Inicial</h2>
        <p className="text-muted-foreground">
          Configure as integrações essenciais para seu chatbot
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* OpenAI Configuration */}
        <Card className="bg-gradient-card shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Key className="w-5 h-5 text-primary" />
              OpenAI API
            </CardTitle>
            <CardDescription>
              Configure sua chave de API da OpenAI para ativar o chatbot
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="apikey">API Key</Label>
              <div className="relative">
                <Input
                  id="apikey"
                  type={showApiKey ? "text" : "password"}
                  placeholder="sk-..."
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  className="pr-10"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3"
                  onClick={() => setShowApiKey(!showApiKey)}
                >
                  {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="model">Modelo GPT</Label>
              <select className="w-full p-2 border border-input rounded-md bg-background">
                <option value="gpt-4">GPT-4</option>
                <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
              </select>
            </div>

            <Button 
              onClick={handleSaveApiKey}
              className="w-full bg-gradient-primary hover:bg-primary-hover text-primary-foreground"
            >
              <Save className="w-4 h-4 mr-2" />
              Salvar Configuração
            </Button>
          </CardContent>
        </Card>

        {/* WhatsApp Configuration */}
        <Card className="bg-gradient-card shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-success" />
              WhatsApp Business
              {isConnected && (
                <Badge variant="default" className="bg-success text-success-foreground">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Conectado
                </Badge>
              )}
            </CardTitle>
            <CardDescription>
              Conecte seu WhatsApp Business para receber mensagens
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="whatsapp-token">Access Token</Label>
              <Input
                id="whatsapp-token"
                type="password"
                placeholder="EAAxxxx..."
                value={whatsappToken}
                onChange={(e) => setWhatsappToken(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="whatsapp-number">Número do WhatsApp</Label>
              <Input
                id="whatsapp-number"
                placeholder="+55 11 99999-9999"
                value={whatsappNumber}
                onChange={(e) => setWhatsappNumber(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Button 
                onClick={handleConnectWhatsApp}
                className="w-full bg-success hover:bg-success/90 text-success-foreground"
                disabled={isConnected}
              >
                {isConnected ? (
                  <>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Conectado
                  </>
                ) : (
                  "Conectar WhatsApp"
                )}
              </Button>
              
              {isConnected && (
                <Button 
                  variant="outline"
                  onClick={handleTestConnection}
                  className="w-full"
                >
                  <TestTube className="w-4 h-4 mr-2" />
                  Testar Conexão
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System Prompt Configuration */}
      <Card className="bg-gradient-card shadow-card">
        <CardHeader>
          <CardTitle>Prompt do Sistema</CardTitle>
          <CardDescription>
            Defina como o chatbot deve se comportar e responder aos usuários
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="system-prompt">Instruções para o Chatbot</Label>
            <Textarea
              id="system-prompt"
              value={systemPrompt}
              onChange={(e) => setSystemPrompt(e.target.value)}
              placeholder="Descreva como o chatbot deve se comportar..."
              className="min-h-32"
            />
          </div>
          
          <Button className="bg-gradient-primary hover:bg-primary-hover text-primary-foreground">
            <Save className="w-4 h-4 mr-2" />
            Salvar Prompt do Sistema
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}