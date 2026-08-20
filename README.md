# bible

Pipeline automatizado que popula um banco de dados com o texto completo da
Bíblia e, para cada versículo, gera:

- **Áudio** do versículo (Google Cloud Text-to-Speech);
- **Palavras-chave** extraídas do texto e traduzidas para inglês (Google
  Cloud Translate);
- **Imagem** gerada a partir dessas palavras-chave via Midjourney, automatizado
  por Puppeteer no Discord.

O processo roda em loop, agendado por cron, sempre pegando o próximo
versículo ainda não processado.

## Como funciona

1. `robots/books.js` busca a lista de livros na API
   [A Bíblia Digital](https://www.abibliadigital.com.br/) e salva em
   `bibleBooks`.
2. `robots/verses.js` percorre cada livro/capítulo na mesma API e salva todos
   os versículos em `bibleVerses` (coluna `handled` marca o progresso).
3. `index.js` roda a cada 5 minutos (`node-cron`) e, para o próximo versículo
   com `handled: false`:
   - aciona `robots/audios.js` (se ainda não existe áudio para o versículo);
   - aciona `robots/analysetext.js` para extrair e traduzir palavras-chave
     (se ainda não existirem);
   - aciona `robots/images.js`, que usa as palavras-chave para gerar uma
     imagem no Midjourney (via Discord) e marca o versículo como `handled`.

Os models Sequelize (`bdfiles/*.js`) definem as tabelas `bibleBooks`,
`bibleVerses`, `audios`, `keywords` e `images`.

## Estrutura do projeto

```
bdfiles/    modelos Sequelize (books, verses, audios, keywords, images)
robots/     scripts da pipeline (books, verses, analysetext, audios, images)
credentials/ arquivos de credenciais (não versionados)
db.js       conexão com o MySQL via Sequelize
index.js    orquestração e agendamento (cron)
```

## Pré-requisitos

- Node.js 20+
- MySQL rodando localmente, com um banco chamado `bible`
- Conta no Google Cloud com as APIs habilitadas:
  - Cloud Text-to-Speech
  - Cloud Translation
  - (Cloud Natural Language, se for usada no lugar do `keyword-extractor`)
- Credenciais do Google Cloud configuradas via
  [`GOOGLE_APPLICATION_CREDENTIALS`](https://cloud.google.com/docs/authentication/application-default-credentials)
- Uma conta do Discord com acesso ao servidor/canal onde o bot do Midjourney
  está instalado (usada pelo `robots/images.js` via Puppeteer)
- Um token de API da [A Bíblia Digital](https://www.abibliadigital.com.br/)

## Configuração

1. Instale as dependências:

   ```bash
   npm install
   ```

2. Crie o banco de dados MySQL:

   ```sql
   CREATE DATABASE bible;
   ```

   Ajuste usuário/senha/host da conexão em [`db.js`](db.js) conforme seu
   ambiente.

3. Crie a pasta `credentials/` na raiz do projeto (ela é ignorada pelo git)
   com:
   - o arquivo JSON de credenciais de serviço do Google Cloud;
   - `discord.json`, com as credenciais de login usadas pelo
     `robots/images.js`, no formato:

     ```json
     { "email": "seu-email@exemplo.com", "pass": "sua-senha" }
     ```

4. Defina a variável de ambiente com o caminho das credenciais do Google
   Cloud, por exemplo:

   ```bash
   export GOOGLE_APPLICATION_CREDENTIALS="./credentials/google-cloud.json"
   ```

5. Copie `.env.example` para `.env` e preencha o token da API da Bíblia
   Digital:

   ```bash
   cp .env.example .env
   ```

   ```
   BIBLE_API_TOKEN=seu-token-aqui
   ```

   O arquivo `.env` é ignorado pelo git — nunca commite tokens diretamente
   no código.

6. Crie as pastas de saída (também ignoradas pelo git):

   ```bash
   mkdir -p audios images
   ```

7. Na primeira execução, descomente o bloco de `database.sync()` em
   [`index.js`](index.js) para criar as tabelas no MySQL (ou rode as
   migrações equivalentes manualmente).

## Uso

Popular livros e versículos (rodar uma única vez, ou quando quiser
resincronizar com a API):

```js
// descomente em index.js, dentro de run():
// await robots.books()
// await robots.verses()
```

Iniciar o processamento contínuo (áudio, palavras-chave e imagem):

```bash
node index.js
```

O script fica agendado via cron (`*/5 * * * *`) processando um versículo por
ciclo. Para rodar uma única passada imediatamente, descomente a chamada
`start()` no final de `index.js`.

## Atenção

- Nunca commite tokens/credenciais reais. Prefira variáveis de ambiente ou
  arquivos dentro de `credentials/` (já ignorado pelo git).
- A automação do Discord via Puppeteer depende de seletores de UI que podem
  mudar a qualquer atualização do Discord, além de estar sujeita aos Termos
  de Serviço da plataforma — use por sua conta e risco.
