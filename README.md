# 🛒 Wishlist - Microserviços

Sistema de wishlist desenvolvido em **microserviços** com **Clean Architecture**, composto por:

- **🔧 Wishlist API**: API principal de gerenciamento de wishlist (MongoDB)
- **🛡️ Wishlist BFF**: Backend for Frontend com autenticação JWT e proxy inteligente
- **🗃️ MongoDB**: Banco de dados principal e de testes

## 🚀 Rodando o Projeto com Docker

### 📋 Pré-requisitos
- **Docker** e **Docker Compose** instalados

### 🐳 Iniciando todos os serviços

```bash
# Clonar o repositório
git clone <repository-url>
cd wishlist-clean-arc

# Iniciar todos os serviços (API + BFF + MongoDB)
docker compose up --build -d
```

### 🌐 Serviços Disponíveis

| Serviço | URL | Descrição |
|---------|-----|-----------|
| **Wishlist BFF** | http://localhost:3001 | Backend for Frontend |
| **Swagger BFF** | http://localhost:3001/api/docs | Documentação interativa |
| **Wishlist API** | http://localhost:5050 | API principal |
| **MongoDB** | localhost:27017 | Banco de dados |

### ⚙️ Variáveis de Ambiente (Docker Compose)

Configuração automática via `docker-compose.yml`:

**Wishlist API:**
- `PORT=5050`
- `MONGO_URL=mongodb://admin:password@mongodb:27017/wishlist?authSource=admin`
- `MONGO_TEST_URL=mongodb://admin:password@mongodb:27017/wishlist-test?authSource=admin`

**Wishlist BFF:**
- `PORT=3001`
- `WISHLIST_API_URL=http://wishlist-api:5050`
- `JWT_SECRET=secret-jwt-key`

## 🔑 Gerando Token JWT para Testes

Para testar os endpoints, é necessário um token JWT válido:

### 🐳 Comando Único com Docker

```bash
docker exec wishlist-bff npx ts-node generate-token.ts
```

### 💻 Alternativa sem Docker (apenas para generate-token)

```bash
cd wishlist-bff
npx ts-node generate-token.ts
```

### 📋 Exemplo de Output

```bash
Token JWT gerado:
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXN0b21lcklkIjoiNTA3ZjFmNzdiY2Y4NmNkNzk5NDM5MDExIiwiZW1haWwiOiJsdWNhc0BleGFtcGxlLmNvbSIsIm5hbWUiOiJMdWNhcyBMaW1hIiwiaWF0IjoxNzU0NjE0NTc2LCJleHAiOjE3NTQ2MTgxNzZ9.dcxJWoTUH8TbwcRcQdlFFbF0vWbdAiv5-Tl35JQjjeU

Para usar no Swagger ou Postman:
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

Dados do cliente no token:
{
  "customerId": "507f1f77bcf86cd799439011",
  "email": "lucas@example.com",
  "name": "Lucas Lima"
}
```

## 🧪 Executando Testes com Docker

### 📊 Banco de Dados de Testes

O projeto usa **duas bases MongoDB**:
- **`wishlist`**: Banco principal para desenvolvimento
- **`wishlist-test`**: Banco isolado para execução de testes

Os testes são executados automaticamente no banco `wishlist-test`, garantindo isolamento total dos dados de desenvolvimento.

### 🔬 Executando Testes da Wishlist API

```bash
# Executar todos os testes
docker exec wishlist-api npm test

# Executar testes unitários
docker exec wishlist-api npm run test:unit

# Executar testes de integração
docker exec wishlist-api npm run test:integration

# Executar testes end to end
docker exec wishlist-api npm run test:e2e

```

### 🔬 Executando Testes do Wishlist BFF

```bash
# Executar todos os testes
docker exec wishlist-bff npm test

```
## 📖 API - Documentação e Uso

### 🔐 Autenticação

**Todos os endpoints do BFF requerem autenticação JWT:**

```bash
Authorization: Bearer <seu-jwt-token>
```

### 📚 Endpoints Disponíveis

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| `GET` | `/api/v1/wishlist` | Listar produtos da wishlist |
| `POST` | `/api/v1/wishlist` | Adicionar produto à wishlist |
| `GET` | `/api/v1/wishlist/:productId` | Verificar se produto existe |
| `DELETE` | `/api/v1/wishlist/:productId` | Remover produto da wishlist |

## 📊 Documentação Swagger

Acesse a documentação interativa em: **http://localhost:3001/api/docs**

1. Clique em **"Authorize"**
2. Digite: `<seu-token>`
3. Teste os endpoints diretamente na interface

## 💼 Tecnologias

- **Node.js 22** + **TypeScript**
- **Express.js** + **JWT** para APIs
- **MongoDB** para persistência
- **Docker** + **Docker Compose** para containerização
- **Swagger/OpenAPI** para documentação
- **Jest** para testes automatizados
- **Clean Architecture** pattern
