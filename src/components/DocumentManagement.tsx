import { useState, useCallback } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { 
  Upload, 
  FileText, 
  Trash2, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  Download,
  Eye
} from "lucide-react";

interface Document {
  id: string;
  name: string;
  size: string;
  type: string;
  status: "processing" | "completed" | "error";
  uploadDate: string;
  processedChunks?: number;
  totalChunks?: number;
}

const mockDocuments: Document[] = [
  {
    id: "1",
    name: "Manual_Produto_v2.pdf",
    size: "2.4 MB",
    type: "PDF",
    status: "completed",
    uploadDate: "2024-01-10",
    processedChunks: 45,
    totalChunks: 45
  },
  {
    id: "2",
    name: "FAQ_Atendimento.docx",
    size: "856 KB",
    type: "DOCX",
    status: "processing",
    uploadDate: "2024-01-10",
    processedChunks: 23,
    totalChunks: 34
  },
  {
    id: "3",
    name: "Politicas_Empresa.txt",
    size: "124 KB",
    type: "TXT",
    status: "error",
    uploadDate: "2024-01-09",
  }
];

export function DocumentManagement() {
  const [documents, setDocuments] = useState<Document[]>(mockDocuments);
  const [dragActive, setDragActive] = useState(false);
  const { toast } = useToast();

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  }, []);

  const handleFiles = (files: FileList) => {
    Array.from(files).forEach((file) => {
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        toast({
          title: "Arquivo muito grande",
          description: `${file.name} excede o limite de 10MB`,
          variant: "destructive"
        });
        return;
      }

      const newDoc: Document = {
        id: Date.now().toString(),
        name: file.name,
        size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
        type: file.name.split('.').pop()?.toUpperCase() || "Unknown",
        status: "processing",
        uploadDate: new Date().toISOString().split('T')[0],
        processedChunks: 0,
        totalChunks: Math.floor(Math.random() * 50) + 10
      };

      setDocuments(prev => [newDoc, ...prev]);

      // Simulate processing
      simulateProcessing(newDoc.id);

      toast({
        title: "Upload iniciado",
        description: `${file.name} está sendo processado`,
      });
    });
  };

  const simulateProcessing = (docId: string) => {
    const interval = setInterval(() => {
      setDocuments(prev => 
        prev.map(doc => {
          if (doc.id === docId && doc.status === "processing") {
            const newProcessed = (doc.processedChunks || 0) + Math.floor(Math.random() * 3) + 1;
            const totalChunks = doc.totalChunks || 30;
            
            if (newProcessed >= totalChunks) {
              clearInterval(interval);
              return { ...doc, processedChunks: totalChunks, status: "completed" as const };
            }
            
            return { ...doc, processedChunks: newProcessed };
          }
          return doc;
        })
      );
    }, 1000);
  };

  const handleDelete = (docId: string) => {
    setDocuments(prev => prev.filter(doc => doc.id !== docId));
    toast({
      title: "Documento removido",
      description: "O documento foi removido com sucesso",
    });
  };

  const getStatusIcon = (status: Document['status']) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4 text-success" />;
      case "processing":
        return <Clock className="w-4 h-4 text-warning animate-spin" />;
      case "error":
        return <AlertCircle className="w-4 h-4 text-destructive" />;
    }
  };

  const getStatusBadge = (status: Document['status']) => {
    switch (status) {
      case "completed":
        return <Badge variant="default" className="bg-success text-success-foreground">Processado</Badge>;
      case "processing":
        return <Badge variant="secondary" className="bg-warning text-warning-foreground">Processando</Badge>;
      case "error":
        return <Badge variant="destructive">Erro</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2">Gestão de Documentos</h2>
        <p className="text-muted-foreground">
          Faça upload e gerencie os documentos que o chatbot usará como base de conhecimento
        </p>
      </div>

      {/* Upload Area */}
      <Card className="bg-gradient-card shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="w-5 h-5 text-primary" />
            Upload de Documentos
          </CardTitle>
          <CardDescription>
            Arraste arquivos aqui ou clique para selecionar (PDF, DOCX, TXT - máx. 10MB)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-smooth ${
              dragActive
                ? "border-primary bg-primary-light"
                : "border-border hover:border-primary hover:bg-primary-light/50"
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <Upload className={`w-12 h-12 mx-auto mb-4 ${dragActive ? "text-primary" : "text-muted-foreground"}`} />
            <p className="text-lg font-medium text-foreground mb-2">
              {dragActive ? "Solte os arquivos aqui" : "Arraste arquivos ou clique para selecionar"}
            </p>
            <p className="text-sm text-muted-foreground mb-4">
              Suporte para PDF, DOCX, TXT (até 10MB por arquivo)
            </p>
            <input
              type="file"
              multiple
              accept=".pdf,.docx,.txt"
              onChange={(e) => e.target.files && handleFiles(e.target.files)}
              className="hidden"
              id="file-upload"
            />
            <Button asChild variant="outline">
              <label htmlFor="file-upload" className="cursor-pointer">
                Selecionar Arquivos
              </label>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Documents List */}
      <Card className="bg-gradient-card shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-accent-blue" />
            Documentos ({documents.length})
          </CardTitle>
          <CardDescription>
            Lista de documentos processados e disponíveis para o chatbot
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {documents.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <FileText className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>Nenhum documento carregado ainda</p>
                <p className="text-sm">Faça upload dos primeiros documentos acima</p>
              </div>
            ) : (
              documents.map((doc) => (
                <div key={doc.id} className="flex items-center gap-4 p-4 border border-border rounded-lg bg-secondary hover:bg-secondary-hover transition-smooth">
                  <div className="flex-shrink-0">
                    {getStatusIcon(doc.status)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium text-foreground truncate">{doc.name}</h4>
                      {getStatusBadge(doc.status)}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{doc.type}</span>
                      <span>{doc.size}</span>
                      <span>Carregado em {new Date(doc.uploadDate).toLocaleDateString('pt-BR')}</span>
                    </div>
                    
                    {doc.status === "processing" && doc.processedChunks && doc.totalChunks && (
                      <div className="mt-2">
                        <div className="flex justify-between text-xs text-muted-foreground mb-1">
                          <span>Processando...</span>
                          <span>{doc.processedChunks}/{doc.totalChunks} chunks</span>
                        </div>
                        <Progress 
                          value={(doc.processedChunks / doc.totalChunks) * 100} 
                          className="h-2"
                        />
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {doc.status === "completed" && (
                      <>
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Download className="w-4 h-4" />
                        </Button>
                      </>
                    )}
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleDelete(doc.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="w-4 h-4" />
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