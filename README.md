# SFTP Dev Sync

Extensão SFTP para VS Code. Sincroniza pastas e arquivos com o servidor de forma simples e rápida. Suporta upload, download, sync automático e seleção de pastas permitidas.

## Instalação

1. Clone ou faça download desta extensão
2. Abra a pasta no VS Code
3. Pressione `F5` para abrir a janela de desenvolvimento

## Configuração

Crie um arquivo `.vscode/sftp-dev-sync.json` na raiz do seu projeto:

```json
{
    "name": "Meu Servidor",
    "host": "77.37.40.227",
    "port": 22,
    "protocol": "sftp",
    "username": "root",
    "password": "senha",
    "remotePath": "/www/wwwroot/meusite.com",
    "uploadOnSave": true,
    "includeFolders": [
        "control",
        "api",
        "config"
    ],
    "includeFiles": [
        "*.php",
        "*.js",
        "*.css",
        "*.html",
        "*.json"
    ]
}
```

### Opções

- **host**: Endereço do servidor SFTP
- **port**: Porta (padrão: 22)
- **username**: Usuário SSH
- **password**: Senha (ou use `privateKey` e `passphrase`)
- **remotePath**: Caminho no servidor remoto
- **uploadOnSave**: Fazer upload automático ao salvar arquivo local
- **includeFolders**: Lista de pastas que DEVEM ser baixadas. Se vazio, baixa tudo.
- **includeFiles**: Filtro por extensão/padrão de arquivo

## Comandos

- `SFTP Dev Sync: Create/Edit Config` - Criar ou editar configuração
- `SFTP Dev Sync: Download Project` - Baixar projeto inteiro (filtrado)
- `SFTP Dev Sync: Upload File` - Enviar arquivo único
- `SFTP Dev Sync: Sync Local → Remote` - Sincronizar local para servidor
- `SFTP Dev Sync: Sync Remote → Local` - Sincronizar servidor para local
- `SFTP Dev Sync: Diff Local vs Remote` - Comparar arquivo local com remoto

## Características

✅ Download seletivo por pasta (allowlist)  
✅ Upload automático ao salvar  
✅ Explorador remoto na barra lateral  
✅ Sincronização bidirecional  
✅ Comparação de arquivos  
✅ Suporte a SSH com chave privada  
✅ Fila de transferências com controle de concorrência  

## License

MIT
