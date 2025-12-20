"use client";

import {
  PromptInput,
  PromptInputAction,
  PromptInputActions,
  PromptInputTextarea,
} from "@/components/ui/prompt-input";
import { ArrowUp, Paperclip, Square, X } from "lucide-react";
import React, { type ChangeEvent, useRef, useState } from "react";

import { Message } from "@/components/message";
import { useChat } from "@ai-sdk/react";
import { cn } from "@/lib/utils";

const Home: React.FC = () => {
  const [input, setInput] = useState("Check a todo list and add these list items: \n - Buy Vegetables \n - Buy milk \n - Buy Kushpush");
  const [files, setFiles] = useState<File[]>([]);
  const uploadInputRef = useRef<HTMLInputElement | null>(null);

  // useChat provides streaming state and messages
  const { messages, sendMessage, status } = useChat({});

  // Derive loading state from SDK status
  const isLoading = status === "submitted" || status === "streaming";

  // Empty-state when there are no messages yet
  const isEmpty = messages.length === 0;

  const fileToDataURL = (file: File) =>
    new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => reject(new Error("Failed to read file"));
      reader.readAsDataURL(file);
    });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
setInput("");
    const text = input?.trim();
    if (!text && files.length === 0) return;

    try {
      // build parts: include text part if present, and file parts for each file
      const parts: Array<any> = [];
      if (text) parts.push({ type: "text", text });

      for (const file of files) {
        // convert file to data url (you can change to upload to server if needed)
        const dataUrl = await fileToDataURL(file);
        parts.push({
          type: "file",
          mediaType: file.type,
          filename: file.name,
          url: dataUrl,
        });
      }

      // sendMessage is provided by the SDK
      await sendMessage({
        parts,
      });

      // reset composer
      setInput("");
      setFiles([]);
      if (uploadInputRef.current) uploadInputRef.current.value = "";
    } catch (err) {
      console.error("Failed to send message with files:", err);
      // handle/report error as you prefer
    }
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    if (!fileList) return;
    const newFiles = Array.from(fileList);
    setFiles((prev) => [...prev, ...newFiles]);
  };

  const handleRemoveFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    if (uploadInputRef.current) {
      // Clearing input.value prevents the same-file-select-from-dialog issue
      uploadInputRef.current.value = "";
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 text-slate-900">
      <div
        className={cn(
          "mx-auto flex h-screen max-w-3xl flex-col items-center px-4 pb-12",
          isEmpty ? "justify-center gap-12" : "justify-between gap-3"
        )}
      >
        {/* Header (empty-state) or Messages */}
        {isEmpty ? (
          <header className="space-y-4 text-center">
            <p className="text-slate-600 text-sm uppercase tracking-[0.3em]">
              Vercel AI SDK • File System Agent demo
            </p>
            <h1 className="font-semibold text-4xl text-slate-900 sm:text-5xl">
             Chat with files <br />to perform file operations
            </h1>
            <div className="flex items-center justify-center gap-3 text-slate-600 text-xs">
              <span className="rounded-full border border-slate-300 px-3 py-1">
                Enter ↵ to send, Shift+Enter for newline
              </span>
            </div>
          </header>
        ) : (
          // Messages container
          <section
            aria-live="polite"
            className="flex-1 w-full max-w-3xl overflow-y-auto py-14"
          >
            <div className="space-y-4">
              {messages.map((message) => (
                <Message
                  key={message.id}
                  role={message.role}
                  parts={message.parts}
                />
              ))}
            </div>
          </section>
        )}

        {/* Input / Composer */}
        <section className="w-full max-w-2xl">
          <form onSubmit={handleSubmit}>
            <PromptInput
              value={input}
              onValueChange={setInput}
              isLoading={isLoading}
              onSubmit={handleSubmit}
              className="max-w-2xl border border-slate-200 bg-white shadow-sm backdrop-blur-lg"
            >
              {/* Files preview */}
              {files.length > 0 && (
                <div className="flex flex-wrap gap-2 pb-2">
                  {files.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-100 px-3 py-2 text-slate-900 text-sm"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Paperclip className="h-4 w-4 text-slate-600" />
                      <span className="max-w-[160px] truncate">{file.name}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveFile(index)}
                        className="rounded-full p-1 transition hover:bg-slate-200"
                        aria-label={`Remove ${file.name}`}
                      >
                        <X className="h-4 w-4 text-slate-600" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <PromptInputTextarea
                placeholder="Ask me anything about streaming, UI patterns, or the SDK..."
                className="text-base text-slate-900 placeholder:text-slate-500 "
              />

              <PromptInputActions className="flex items-center justify-between gap-2 pt-2">
                <PromptInputAction tooltip="Attach files">
                  <label
                    htmlFor="file-upload"
                    className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-2xl transition hover:bg-slate-100"
                    aria-label="Attach files"
                  >
                    <input
                      type="file"
                      multiple
                      onChange={handleFileChange}
                      className="hidden"
                      id="file-upload"
                      ref={uploadInputRef}
                      aria-label="File upload"
                    />
                    <Paperclip className="h-5 w-5 text-slate-700" />
                  </label>
                </PromptInputAction>

                <PromptInputAction
                  tooltip={isLoading ? "Stop generation" : "Send message"}
                  side="left"
                >
                  <button
                    type="submit"
                    disabled={isLoading || input.trim().length === 0 && files.length === 0}
                    className={`flex h-9 w-9 items-center justify-center rounded-full text-white transition ${
                      isLoading
                        ? "bg-red-500 hover:bg-red-600"
                        : "bg-indigo-600 hover:bg-indigo-700"
                    }`}
                    aria-label={isLoading ? "Stop generation" : "Send message"}
                  >
                    {isLoading ? <Square className="h-5 w-5" /> : <ArrowUp className="h-5 w-5" />}
                  </button>
                </PromptInputAction>
              </PromptInputActions>
            </PromptInput>
          </form>
        </section>
      </div>
    </main>
  );
};

export default Home;