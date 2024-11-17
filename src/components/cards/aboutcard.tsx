import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default function AboutCard() {
  return (
    <div className="max-w-xl mx-auto mt-10">
      <Card>
        <CardHeader>
          <CardTitle>Next.js Ollama Starter Kit</CardTitle>
          <CardDescription>Local AI with streaming responses</CardDescription>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground/90 leading-normal prose">
          <p className="mb-3">
            Built on top of{" "}
            <Link
              href="https://vercel.com/templates/next.js/next-js-ai-lite"
              className="underline"
            >
              Next.js AI Lite
            </Link>
            , this starter kit runs locally on port 11434 with Ollama. Features
            React Markdown, TypeScript typography, and streaming responses out
            of the box.
          </p>

          <p className="mb-3 font-semibold">Features:</p>
          <ul className="flex flex-col mb-2">
            <li>→ Streaming chat responses</li>
            <li>→ Local model inference</li>
            <li>→ React Markdown & TypeScript typography</li>
          </ul>

          <p className="mb-3 text-xs text-muted-foreground">
            Tip: Change model in /app/api/chat/route.ts to use different Ollama
            models
          </p>

          <p>
            <Link
              href="https://github.com/ycocerious/nextjs-ollama-starter-kit"
              className="underline"
            >
              Get started →
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
