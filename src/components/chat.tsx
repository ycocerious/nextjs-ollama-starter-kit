"use client";

import AboutCard from "@/components/cards/aboutcard";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { IconArrowUp } from "@/components/ui/icons";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { Message } from "ollama";
import { useRef, useState } from "react";
import { MessageContent } from "./MessageContent";
export const maxDuration = 30;

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [streamedContent, setStreamedContent] = useState("");
  const abortControllerRef = useRef<AbortController | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const userMessage = { content: input, role: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    setStreamedContent("");

    try {
      abortControllerRef.current = new AbortController();

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify([...messages, userMessage]),
        signal: abortControllerRef.current.signal,
      });

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      let accumulatedContent = "";
      let partialChunk = "";

      while (true) {
        const { done, value } = await reader!.read();

        if (done) {
          if (accumulatedContent) {
            setMessages((prev) => [
              ...prev,
              { role: "assistant", content: accumulatedContent },
            ]);
            setStreamedContent("");
          }
          break;
        }

        const chunk = decoder.decode(value);
        partialChunk += chunk;

        try {
          const lines = partialChunk.split("\n");

          for (let i = 0; i < lines.length - 1; i++) {
            const line = lines[i].trim();
            if (line) {
              const parsed = JSON.parse(line);
              if (parsed.message?.content) {
                accumulatedContent += parsed.message.content;
                setStreamedContent(accumulatedContent);
              }
            }
          }

          partialChunk = lines[lines.length - 1];
        } catch (e) {
          console.warn("Parsing chunk failed, accumulating more data");
        }
      }
    } catch (error) {
      console.error("Error fetching response:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, I encountered an error processing your request.",
        },
      ]);
    } finally {
      setIsLoading(false);
      abortControllerRef.current = null;
    }
  };

  return (
    <div className="group w-full overflow-auto ">
      {messages.length <= 0 ? (
        <AboutCard />
      ) : (
        <div className="max-w-xl mx-auto mt-10 mb-24">
          {messages.map((message, index) => (
            <div key={index} className="flex mb-5">
              <div
                className={`${
                  message.role === "user"
                    ? "bg-slate-200 ml-auto"
                    : "bg-transparent"
                } p-2 px-4 rounded-lg`}
              >
                {message.role === "assistant" ? (
                  <MessageContent content={message.content as string} />
                ) : (
                  <span className="leading-normal">
                    {message.content as string}
                  </span>
                )}
              </div>
            </div>
          ))}
          {streamedContent && (
            <div className="flex mb-5">
              <div className="bg-transparent p-2 px-4 rounded-lg w-full">
                <MessageContent content={streamedContent} />
              </div>
            </div>
          )}
          {isLoading && !streamedContent && (
            <div className="flex justify-start mb-5">
              <div className="p-2 rounded-lg">
                <Loader2 className="h-4 w-4 animate-spin" />
              </div>
            </div>
          )}
        </div>
      )}
      <div className="fixed inset-x-0 bottom-10 w-full ">
        <div className="w-full max-w-xl mx-auto">
          <Card className="p-2">
            <form onSubmit={handleSubmit}>
              <div className="flex">
                <Input
                  type="text"
                  value={input}
                  onChange={(event) => {
                    setInput(event.target.value);
                  }}
                  className="w-[95%] mr-2 border-0 ring-offset-0 focus-visible:ring-0 focus-visible:outline-none focus:outline-none focus:ring-0 ring-0 focus-visible:border-none border-transparent focus:border-transparent focus-visible:ring-none"
                  placeholder="Ask me anything..."
                />
                <Button disabled={!input.trim() || isLoading}>
                  <IconArrowUp />
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
}
