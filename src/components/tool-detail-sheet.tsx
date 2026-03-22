"use client";

import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Check, Copy, ExternalLink } from "lucide-react";
import type { Tool } from "@/data/tools";

interface ToolDetailSheetProps {
  tool: Tool | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ToolDetailSheet({
  tool,
  open,
  onOpenChange,
}: ToolDetailSheetProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  if (!tool) return null;

  const handleCopy = async (text: string, index: number) => {
    await navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-lg p-0">
        <SheetHeader className="px-6 pt-6 pb-4">
          <div className="flex items-start justify-between">
            <div>
              <SheetTitle className="text-base font-semibold">
                {tool.name}
              </SheetTitle>
              <p className="text-sm text-muted-foreground mt-1">
                {tool.description}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 mt-3">
            <Badge variant="secondary" className="text-xs font-normal">
              {tool.category}
            </Badge>
            {tool.tags.map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className="text-xs font-normal"
              >
                {tag}
              </Badge>
            ))}
          </div>
          <Button
            variant="outline"
            size="sm"
            className="mt-3 w-fit text-xs"
            asChild
          >
            <a href={tool.url} target="_blank" rel="noopener noreferrer">
              访问工具
              <ExternalLink className="ml-1.5 h-3 w-3" />
            </a>
          </Button>
        </SheetHeader>

        <Separator />

        <ScrollArea className="h-[calc(100vh-220px)]">
          <div className="px-6 py-4 space-y-5">
            <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Prompt 模板
            </h3>
            {tool.prompts.map((prompt, index) => (
              <div
                key={index}
                className="rounded-lg border border-border/50 overflow-hidden"
              >
                <div className="flex items-center justify-between px-4 py-2.5 bg-secondary/30">
                  <span className="text-sm font-medium">{prompt.title}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 px-2 text-xs"
                    onClick={() => handleCopy(prompt.content, index)}
                  >
                    {copiedIndex === index ? (
                      <>
                        <Check className="mr-1 h-3 w-3" />
                        已复制
                      </>
                    ) : (
                      <>
                        <Copy className="mr-1 h-3 w-3" />
                        复制
                      </>
                    )}
                  </Button>
                </div>
                <div className="px-4 py-3">
                  <pre className="text-xs text-muted-foreground leading-relaxed whitespace-pre-wrap font-[family-name:var(--font-geist-mono)]">
                    {prompt.content}
                  </pre>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
