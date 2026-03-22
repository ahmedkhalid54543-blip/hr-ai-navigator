"use client";

import { useState } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { scenes, searchTools, type Tool } from "@/data/tools";
import {
  UserPlus,
  GraduationCap,
  Handshake,
  TrendingUp,
  Heart,
  Zap,
  Search,
  ArrowRight,
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

export default function HomePage() {
  const [query, setQuery] = useState("");
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null);
  const searchResults = query.trim() ? searchTools(query) : [];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50">
        <div className="mx-auto max-w-5xl px-6 py-6">
          <div className="flex items-center gap-3 mb-1">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-foreground">
              <Sparkles className="h-4 w-4 text-background" />
            </div>
            <h1 className="text-lg font-semibold tracking-tight">
              HR AI Navigator
            </h1>
          </div>
          <p className="text-sm text-muted-foreground mt-1 mb-5">
            精选中国大陆可直接使用的HR AI产品与工具，内置实用Prompt模板
          </p>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="搜索工具、场景或关键词..."
              className="pl-9 h-10 bg-secondary/50 border-border/50 focus-visible:ring-1 focus-visible:ring-ring/30"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-8">
        {/* Search Results */}
        {query.trim() && (
          <div className="mb-8">
            <h2 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-4">
              搜索结果 · {searchResults.length} 个工具
            </h2>
            {searchResults.length === 0 ? (
              <p className="text-sm text-muted-foreground py-8 text-center">
                未找到匹配的工具，试试其他关键词
              </p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {searchResults.map((tool) => (
                  <button
                    key={tool.id}
                    onClick={() => setSelectedTool(tool)}
                    className="group flex items-start gap-3 rounded-lg border border-border/50 p-4 text-left transition-colors hover:bg-secondary/50"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-medium">{tool.name}</span>
                        <Badge variant="secondary" className="text-[10px] px-1.5 py-0 font-normal">
                          {tool.category}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-1">
                        {tool.description}
                      </p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground/50 mt-0.5 shrink-0 group-hover:text-foreground transition-colors" />
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Scene Cards */}
        {!query.trim() && (
          <>
            <h2 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-4">
              场景导航
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {scenes.map((scene) => {
                const Icon = iconMap[scene.icon];
                return (
                  <Link
                    key={scene.id}
                    href={`/scene/${scene.id}`}
                    className="group flex flex-col rounded-lg border border-border/50 p-5 transition-all hover:bg-secondary/50 hover:border-border"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary">
                        {Icon && (
                          <Icon className="h-4 w-4 text-foreground/70" />
                        )}
                      </div>
                      <div>
                        <h3 className="text-sm font-medium">{scene.name}</h3>
                        <span className="text-[11px] text-muted-foreground">
                          {scene.tools.length} 个工具
                        </span>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed mb-3 flex-1">
                      {scene.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {scene.tools.map((tool) => (
                        <Badge
                          key={tool.id}
                          variant="secondary"
                          className="text-[10px] px-1.5 py-0 font-normal"
                        >
                          {tool.name}
                        </Badge>
                      ))}
                    </div>
                  </Link>
                );
              })}
            </div>
          </>
        )}
      </main>

      {/* Tool Detail Sheet */}
      <ToolDetailSheet
        tool={selectedTool}
        open={!!selectedTool}
        onOpenChange={(open) => !open && setSelectedTool(null)}
      />
    </div>
  );
}
