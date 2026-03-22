"use client";

import { useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { type Scene, type Tool } from "@/data/tools";
import {
  UserPlus,
  GraduationCap,
  Handshake,
  TrendingUp,
  Heart,
  Zap,
  ArrowLeft,
  ExternalLink,
  Sparkles,
} from "lucide-react";
import { ToolDetailSheet } from "@/components/tool-detail-sheet";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  UserPlus,
  GraduationCap,
  Handshake,
  TrendingUp,
  Heart,
  Zap,
};

interface ScenePageClientProps {
  scene: Scene;
}

export function ScenePageClient({ scene }: ScenePageClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null);

  const categories = [
    "all",
    ...Array.from(new Set(scene.tools.map((tool) => tool.category))),
  ];
  const filteredTools =
    selectedCategory === "all"
      ? scene.tools
      : scene.tools.filter((tool) => tool.category === selectedCategory);

  const Icon = iconMap[scene.icon];

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/50">
        <div className="mx-auto max-w-5xl px-6 py-5">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors mb-4"
          >
            <ArrowLeft className="h-3 w-3" />
            返回导航
          </Link>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
              {Icon ? <Icon className="h-5 w-5 text-foreground/70" /> : null}
            </div>
            <div>
              <h1 className="text-lg font-semibold tracking-tight">
                {scene.name}
              </h1>
              <p className="text-sm text-muted-foreground">
                {scene.description}
              </p>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-6 py-8">
        <div className="flex gap-8">
          <aside className="hidden md:block w-44 shrink-0">
            <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
              工具分类
            </h3>
            <nav className="space-y-0.5">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`w-full text-left px-3 py-1.5 rounded-md text-sm transition-colors ${
                    selectedCategory === category
                      ? "bg-secondary font-medium text-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                  }`}
                >
                  {category === "all" ? "全部" : category}
                </button>
              ))}
            </nav>

            <Separator className="my-4" />

            <div className="text-xs text-muted-foreground">
              <p>
                共{" "}
                <span className="font-medium text-foreground">
                  {filteredTools.length}
                </span>{" "}
                个工具
              </p>
              <p className="mt-1">
                共{" "}
                <span className="font-medium text-foreground">
                  {filteredTools.reduce(
                    (sum, tool) => sum + tool.prompts.length,
                    0
                  )}
                </span>{" "}
                个Prompt模板
              </p>
            </div>
          </aside>

          <div className="md:hidden flex gap-2 mb-4 overflow-x-auto pb-2 w-full">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "secondary" : "ghost"}
                size="sm"
                className="text-xs shrink-0"
                onClick={() => setSelectedCategory(category)}
              >
                {category === "all" ? "全部" : category}
              </Button>
            ))}
          </div>

          <div className="flex-1 min-w-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {filteredTools.map((tool) => (
                <button
                  key={tool.id}
                  onClick={() => setSelectedTool(tool)}
                  className="group flex flex-col rounded-lg border border-border/50 p-4 text-left transition-all hover:bg-secondary/50 hover:border-border"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="flex h-7 w-7 items-center justify-center rounded-md bg-secondary">
                        <Sparkles className="h-3.5 w-3.5 text-foreground/60" />
                      </div>
                      <span className="text-sm font-medium">{tool.name}</span>
                    </div>
                    <ExternalLink className="h-3.5 w-3.5 text-muted-foreground/40 group-hover:text-muted-foreground transition-colors" />
                  </div>

                  <p className="text-xs text-muted-foreground leading-relaxed mb-3 flex-1">
                    {tool.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {tool.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className="text-[10px] px-1.5 py-0 font-normal"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="text-[11px] text-muted-foreground">
                    {tool.prompts.length} 个Prompt模板
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <ToolDetailSheet
        tool={selectedTool}
        open={!!selectedTool}
        onOpenChange={(open) => !open && setSelectedTool(null)}
      />
    </div>
  );
}
