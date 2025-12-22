import { MyUIMessage } from "@/tools/file-system/types";
import { Hammer, User, Bot } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { cn } from "@/lib/utils";
import {
  Steps,
  StepsBar,
  StepsContent,
  StepsItem,
  StepsTrigger,
} from "./ui/steps";

export const Message = ({
  role,
  parts,
}: {
  role: string;
  parts: MyUIMessage["parts"];
}) => {
  const isUser = role === "user";
  
  const text = parts
    .map((part) => {
      if (part.type === "text") {
        return part.text;
      }
      return "";
    })
    .join("");

  const toolParts = parts.filter((part) => part.type.startsWith("tool-"));

  return (
    <div
      className={cn(
        "flex w-full mb-6",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      <div
        className={cn(
          "flex max-w-[80%] flex-col gap-2",
          isUser ? "items-end" : "items-start"
        )}
      >
        <div className="flex items-center gap-2 px-1">
            <div className={cn("size-6 flex items-center justify-center rounded-full border shadow-sm", isUser ? "bg-white" : "bg-black text-white")}>
                {isUser ? <User className="size-3" /> : <Bot className="size-3" />}
            </div>
            <span className="text-xs text-slate-500 font-medium">
                {isUser ? "You" : "AI Agent"}
            </span>
        </div>

        <div
          className={cn(
            "relative rounded-2xl px-5 py-3 text-sm shadow-sm",
            isUser
              ? "bg-slate-900 text-slate-50 rounded-tr-none"
              : "bg-white border border-slate-100 text-slate-800 rounded-tl-none"
          )}
        >
          {text && (
            <div className={cn("prose prose-sm max-w-none", isUser ? "prose-invert" : "")}>
              <ReactMarkdown>{text}</ReactMarkdown>
            </div>
          )}

          {toolParts.length > 0 && (
            <div className={cn("mt-3", isUser ? "opacity-90" : "")}>
              <Steps defaultOpen={false} className="border-t border-slate-200/20 pt-2">
                <StepsTrigger 
                    leftIcon={<Hammer className="size-3" />} 
                    className={cn(
                        "text-xs hover:text-current", 
                        isUser ? "text-slate-300" : "text-slate-500"
                    )}
                >
                  Tool Activity ({toolParts.length})
                </StepsTrigger>
                <StepsContent bar={<StepsBar className="mr-2 ml-1.5 bg-slate-200/20" />}>
                  <div className="space-y-1 pt-1">
                    {toolParts.map((part, index) => {
                      let content = "";
                      switch (part.type) {
                        case "tool-writeFile":
                          content = `Write: ${part.input?.path || "Unknown"}`;
                          break;
                        case "tool-readFile":
                          content = `Read: ${part.input?.path || "Unknown"}`;
                          break;
                        case "tool-deletePath":
                          content = `Delete: ${part.input?.path || "Unknown"}`;
                          break;
                        case "tool-listDirectory":
                          content = `List: ${part.input?.path || "Unknown"}`;
                          break;
                        case "tool-createDirectory":
                          content = `Create: ${part.input?.path || "Unknown"}`;
                          break;
                        case "tool-exists":
                          content = `Check: ${part.input?.path || "Unknown"}`;
                          break;
                        case "tool-searchFiles":
                          content = `Search: ${part.input?.pattern || "Unknown"}`;
                          break;
                        default:
                          content = `Tool: ${part.type}`;
                      }
                      return (
                        <StepsItem 
                            key={index} 
                            className={cn("text-xs", isUser ? "text-slate-300" : "text-slate-500")}
                        >
                            {content}
                        </StepsItem>
                    );
                    })}
                  </div>
                </StepsContent>
              </Steps>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
