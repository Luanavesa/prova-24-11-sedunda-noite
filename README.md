# Gerenciamento de Chamados

Projeto da Prova A2 - Sistema de gerenciamento de chamados

## Como executar

### API (.NET)
```bash
cd APII/API
dotnet run
```

### Frontend (React)
```bash
cd frontend
npm install
npm run dev
```

Acesse: http://localhost:5173

## 🧪 Testando com Insomnia/Postman

1. Abra `APII/API/Tests/chamado.http`
2. Copie/cole as requisições no Insomnia ou Postman
3. Certifique-se de que a API está rodando em `http://localhost:5000`

---

## 📦 Dependências

### Backend (.NET SDK 8.0)
- `Microsoft.EntityFrameworkCore`
- `Microsoft.EntityFrameworkCore.Sqlite`
- `Microsoft.AspNetCore.Mvc`

### Frontend (Node.js)
- `react@18.2.0`
- `react-dom@18.2.0`
- `vite@^5.0.0`
- `typescript@5.2.2`

---

## 🗄️ Banco de Dados

- **Tipo**: SQLite
- **Arquivo**: `Luanavesa.db` (gerado automaticamente ao rodar a API)
- **Localização**: `APII/API/Luanavesa.db`

Dados iniciais (seed):
```csharp
new Chamado { ChamadoId = "6a8b3e4d-5e4e-4f7e-bdc9-9181e456ad0e", Descricao = "Formatar computador", Status = "Aberto" },
new Chamado { ChamadoId = "2f1b7dc1-3b9a-4e1a-a389-7f5d2f1c8f3e", Descricao = "Trocar tinta da impressora", Status = "Aberto" },
new Chamado { ChamadoId = "e5d4a7b9-1f9e-4c4a-ae3b-5b7c1a9d2e3f", Descricao = "Trocar teclado", Status = "Aberto" }
```

---

## ✅ Critérios de Avaliação (Implementados)

| Item | Status |
|------|--------|
| API - PATCH `/api/chamado/alterar` | ✅ Completo |
| API - GET `/api/chamado/naoresolvidos` | ✅ Completo |
| API - GET `/api/chamado/resolvidos` | ✅ Completo |
| Front - Listar Chamados | ✅ Completo |
| Front - Cadastrar Chamado | ✅ Completo |
| Front - Alterar Chamado | ✅ Completo |
| Front - Listar Resolvidos | ✅ Completo |
| Front - Listar Não Resolvidos | ✅ Completo |
| GitHub + Arquivo .http | ✅ Completo |

---

## 📝 Notas Importantes

- **Sem validações**: A solução segue as instruções da prova (nenhuma validação é exigida).
- **Frontend**: React Vanilla com TypeScript e Vite.
- **Backend**: Minimal API (.NET 8.0) com Entity Framework.
- **Normalização**: O frontend normaliza as respostas da API (PascalCase → camelCase) para consistência.

---

## 🚨 Troubleshooting

### "npm não é reconhecido"
- Reinstale Node.js com "Add to PATH" marcado
- Feche e reabra o PowerShell/VS Code
- Ou execute os scripts `.bat` (duplo-clique)

### "Não consegue conectar à API"
- Verifique se `dotnet run` está em execução em `http://localhost:5000`
- Verifique se o frontend está tentando `http://localhost:5000` (não 5273)
- Check firewall

### Erros no VS Code (linhas vermelhas)
- Rode `npm install` na pasta `frontend`
- Ao completar, os erros devem desaparecer

---

## 📬 Entrega

**Se enviando via Google Drive:**
1. Exclua as pastas `node_modules` (frontend) e `bin`/`obj` (API) antes de zipar
2. Inclua o repositório `.git`
3. Confirme o e-mail com o link do repositório antes de sair da sala

**Se via GitHub:**
- Repositório: `https://github.com/Luanavesa/prova-24-11-sedunda-noite`
- Branch: `main`
- Inclua todos os arquivos (exceto `node_modules`, `bin`, `obj`)

---

**Desenvolvido em 24/11/2025** ✅
