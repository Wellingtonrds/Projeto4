<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/dbdd1833-2847-4a06-ab82-17b555f3bcab

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.example](.env.example) to your Gemini API key
3. Run the app:
   `npm run dev`

## Deploy no Vercel

O projeto já está 100% configurado para o Vercel (`vercel.json`, `.npmrc` e Serverless Functions em `/api`):

1. Conecte o repositório no [Vercel](https://vercel.com).
2. Framework Preset: **Vite** (detectado automaticamente).
3. Root Directory: `./` (padrão).
4. Em **Environment Variables**, adicione (opcional, para IA completa):
   - `GEMINI_API_KEY`: sua chave de API do Google Gemini.
5. Clique em **Deploy**. As rotas SPA e a API Serverless funcionarão automaticamente.
