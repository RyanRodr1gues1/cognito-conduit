# 📋 Guia de Deploy - ChatBot Admin Panel

Este documento fornece instruções detalhadas para fazer o deploy da aplicação no Google Cloud Platform.

## 🚀 Pré-requisitos

### 1. Conta Google Cloud Platform
- Crie uma conta no [Google Cloud Platform](https://cloud.google.com/)
- Crie um novo projeto ou use um existente
- Ative a cobrança no projeto (necessário para usar App Engine)

### 2. Instalação do Google Cloud SDK
```bash
# No Ubuntu/Debian
curl https://sdk.cloud.google.com | bash
exec -l $SHELL

# No macOS (com Homebrew)
brew install --cask google-cloud-sdk

# No Windows
# Baixe o instalador em: https://cloud.google.com/sdk/docs/install
```

### 3. Configuração Inicial
```bash
# Faça login no Google Cloud
gcloud auth login

# Configure o projeto (substitua YOUR_PROJECT_ID)
gcloud config set project YOUR_PROJECT_ID

# Verifique a configuração
gcloud config list
```

## 🛠️ Configuração do Projeto

### 1. Habilitar APIs Necessárias
```bash
gcloud services enable appengine.googleapis.com
gcloud services enable cloudbuild.googleapis.com
```

### 2. Configurar App Engine
```bash
# Crie uma aplicação App Engine (faça apenas uma vez por projeto)
gcloud app create --region=us-central1
```

## 📦 Opções de Deploy

### Opção 1: Deploy Automatizado (Recomendado)
```bash
# Torne o script executável
chmod +x deploy.sh

# Configure o PROJECT_ID
export PROJECT_ID=your-project-id

# Execute o deploy
./deploy.sh
```

### Opção 2: Deploy Manual
```bash
# 1. Build da aplicação
npm install
npm run build

# 2. Deploy para App Engine
gcloud app deploy app.yaml --quiet

# 3. Abrir aplicação no navegador
gcloud app browse
```

### Opção 3: Deploy com Cloud Build (CI/CD)
```bash
# Configure o Cloud Build
gcloud builds submit --config cloudbuild.yaml
```

## 🐳 Deploy com Docker (Alternativo)

Se preferir usar Docker com Cloud Run:

```bash
# Build da imagem
docker build -t chatbot-admin .

# Tag para Google Container Registry
docker tag chatbot-admin gcr.io/YOUR_PROJECT_ID/chatbot-admin

# Push da imagem
docker push gcr.io/YOUR_PROJECT_ID/chatbot-admin

# Deploy no Cloud Run
gcloud run deploy chatbot-admin \
  --image gcr.io/YOUR_PROJECT_ID/chatbot-admin \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated
```

## ⚙️ Configuração de Variáveis de Ambiente

As variáveis já estão configuradas no `app.yaml`, mas você pode atualizá-las:

```yaml
env_variables:
  NODE_ENV: production
  VITE_SUPABASE_URL: https://jzwmenumtoyacgfgfmqq.supabase.co
  VITE_SUPABASE_PUBLISHABLE_KEY: [sua-chave-supabase]
  VITE_SUPABASE_PROJECT_ID: jzwmenumtoyacgfgfmqq
```

## 🔍 Monitoramento e Logs

### Visualizar Logs
```bash
# Logs em tempo real
gcloud app logs tail -s default

# Logs históricos
gcloud app logs read --limit 50
```

### Métricas no Console
- Acesse [Google Cloud Console](https://console.cloud.google.com/)
- Navegue para App Engine > Dashboard
- Visualize métricas de performance, erro e tráfego

## 🔒 Configurações de Segurança

### 1. Configurar HTTPS
O HTTPS é habilitado automaticamente no App Engine com certificado gerenciado.

### 2. Configurar Domínio Personalizado
```bash
# Mapear domínio personalizado
gcloud app domain-mappings create example.com
```

### 3. Configurar Firewall (Opcional)
```bash
# Restringir acesso por IP
gcloud app firewall-rules create 100 --action=allow --source-range="192.168.1.0/24"
```

## 📊 Otimizações de Performance

### 1. Configuração de Cache
O Nginx está configurado para cache automático de assets estáticos (1 ano).

### 2. Compressão Gzip
Habilitada automaticamente para reduzir tamanho de arquivos.

### 3. Scaling Automático
Configurado em `app.yaml`:
- Min instances: 0 (economia de custos)
- Max instances: 10 (evita sobrecarga)
- CPU target: 60%

## 🚨 Troubleshooting

### Erro: "App Engine application does not exist"
```bash
gcloud app create --region=us-central1
```

### Erro: "Insufficient permissions"
```bash
# Verifique as permissões do usuário
gcloud projects get-iam-policy YOUR_PROJECT_ID

# Adicione permissões necessárias (como owner/editor)
gcloud projects add-iam-policy-binding YOUR_PROJECT_ID \
  --member="user:your-email@domain.com" \
  --role="roles/editor"
```

### Build Falha
```bash
# Limpe cache npm e reinstale
rm -rf node_modules package-lock.json
npm install
npm run build
```

## 💰 Estimativa de Custos

### App Engine (F2 instances)
- **Desenvolvimento**: ~$0-5/mês (com free tier)
- **Produção baixa**: ~$10-30/mês
- **Produção alta**: ~$50-200/mês

### Supabase
- **Free tier**: 0$/mês (até 50MB database)
- **Pro**: $25/mês (até 8GB database)

## 📞 Suporte

Para suporte adicional:
- [Documentação Google Cloud](https://cloud.google.com/docs)
- [Suporte Supabase](https://supabase.com/docs)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/google-app-engine)

## 🔄 Atualizações

Para atualizar a aplicação:
```bash
# Pull das mudanças
git pull origin main

# Reinstalar dependências (se necessário)
npm install

# Nova versão do deploy
./deploy.sh
```

---
**Nota**: Mantenha suas chaves de API seguras e nunca as exponha em repositórios públicos.