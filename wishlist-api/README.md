# Wishlist Microservice

Um microserviço de wishlist implementado seguindo os princípios de Clean Architecture.

## 🚀 Funcionalidades

- ✅ Adicionar produto à wishlist
- ✅ Remover produto da wishlist  
- ✅ Verificar se produto está na wishlist
- ✅ Listar todos os produtos da wishlist

## 🏗️ Arquitetura

```
src/
├── domain/          # Regras de negócio
├── presentation/    # Controllers e DTOs
├── infra/          # Persistência e serviços externos
└── main/           # Configuração e bootstrap
```

## 📦 Instalação

```bash
# Instalar dependências
npm install

# Configurar variáveis de ambiente
cp .env.example .env
```

## 🔧 Configuração

### **1. Instalar dependências**
```bash
npm install
```

### **2. Configurar variáveis de ambiente**
```bash
cp .env.example .env
```

### **3. Iniciar MongoDB com Docker**
```bash
# Subir o MongoDB
npm run docker:up

# Ver logs do MongoDB
npm run docker:logs

# Parar o MongoDB
npm run docker:down
```

Configure as variáveis no arquivo `.env`:
```bash
MONGO_URL=mongodb://admin:password@localhost:27017/wishlist?authSource=admin
PORT=3000
```

## 🚀 Como Executar

### **1. Iniciar o MongoDB**
```bash
# Subir o container do MongoDB
npm run docker:up
```

### **2. Executar a aplicação**
```bash
# Desenvolvimento
npm run dev

# Produção
npm run build
npm start

# Testes
npm test
```

### **3. Parar serviços**
```bash
# Parar MongoDB
npm run docker:down
```

## 📚 API Endpoints

### 📄 Listar Produtos da Wishlist
```http
GET /api/wishlist/{clientId}
```

### ➕ Adicionar Produto
```http
POST /api/wishlist/{clientId}/products
Content-Type: application/json

{
  "productId": "product-123"
}
```

### ❌ Remover Produto
```http
DELETE /api/wishlist/{clientId}/products/{productId}
```

### 🔍 Verificar Produto
```http
GET /api/wishlist/{clientId}/products/{productId}
```

## 🧪 Testes

```bash
# Executar todos os testes
npm test

# Testes em modo watch
npm run test:dev
```

## 📋 Cobertura de Testes

- ✅ Testes unitários dos controllers
- ✅ Testes de integração com MongoDB
- ✅ Cobertura: ~95%

## 🛠️ Tecnologias

- **Node.js** + **TypeScript**
- **Express.js** - Framework web
- **MongoDB** - Banco de dados
- **Jest** - Framework de testes
- **ESLint** - Linting
- **Clean Architecture** - Arquitetura