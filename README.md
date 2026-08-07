# SFTP Dev Sync

Extensão SFTP para VS Code. Sincroniza pastas e arquivos com o servidor de forma simples e rápida. Suporta upload, download, sync automático e seleção de pastas permitidas.

## Características

- ✅ Upload/Download de arquivos e pastas
- ✅ Sincronização bidirecional (Local ↔ Remote)
- ✅ Upload automático ao salvar
- ✅ **Novo**: Selecione quais pastas PERMITIR para download (em vez de listar o que ignorar)
- ✅ Explorador remoto na barra lateral
- ✅ Comparação de arquivos (Diff)
- ✅ Suporte a múltiplos perfis
- ✅ Suporte a SSH com chave privada

## Configuração

Crie um arquivo `.vscode/sftp-dev-sync.json` na raiz do seu projeto:

```json
{
  "name": "Seu Servidor",
  "host": "seu-servidor.com",
  "port": 22,
  "protocol": "sftp",
  "username": "usuario",
  "password": "senha",
  "remotePath": "/caminho/remoto",
  "uploadOnSave": false,
  "includeFolders": [
    "src",
    "public",
    "config"
  ]
}
```

### Modo Inclusão (Novo)

Use `includeFolders` para especificar **APENAS** as pastas que devem ser baixadas. Tudo que não estiver na lista será ignorado.

## Comandos

- **Sync Remote → Local** - Sincronizar servidor para local
- **Sync Local → Remote** - Sincronizar local para servidor
- **Upload File** - Enviar arquivo
- **Download File** - Baixar arquivo
- **Diff with Remote** - Comparar com arquivo remoto

## License

MIT
