# Next.js Ollama Starter Kit

A streamlined starter kit for building AI applications with Ollama and Next.js, featuring streaming responses and local model inference. Built on top of [Next.js AI Lite](https://vercel.com/templates/next.js/next-js-ai-lite).

## Prerequisites

1. Install [Ollama](https://ollama.ai) on your machine
2. Download a model using Ollama (e.g., `ollama run llama2`)
3. Ensure Ollama is running in the background

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/ycocerious/nextjs-ollama-starter-kit
```

2. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Configure your model:

- Open `/app/api/chat/route.ts`
- Change the model name to match your downloaded Ollama model (default is "llama2")

4. Start the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000) with your browser

Your Ollama instance should be running on port 11434 (default Ollama port).

## Features

- 🚀 Streaming chat responses
- 💻 Local model inference with Ollama
- ✨ React Markdown & TypeScript typography
- 🔧 Built on Next.js App Router and React Server Components

## Project Structure

- `/app/api/chat/route.ts` - Ollama chat endpoint configuration
- `/components` - React components including chat interface
- `/lib` - Utility functions and configurations

## Built With

- [Next.js](https://nextjs.org/)
- [Ollama](https://ollama.ai)
- [Tailwind CSS](https://tailwindcss.com)
- [shadcn/ui](https://ui.shadcn.com/)

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Ollama Documentation](https://github.com/jmorganca/ollama)

## Acknowledgments

Based on [Next.js AI Lite](https://vercel.com/templates/next.js/next-js-ai-lite) template by Vercel
