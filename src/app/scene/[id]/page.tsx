import { notFound } from "next/navigation";
import { getSceneById, scenes } from "@/data/tools";
import { ScenePageClient } from "./scene-page-client";

export const dynamicParams = false;

export function generateStaticParams() {
  return scenes.map((scene) => ({ id: scene.id }));
}

interface ScenePageProps {
  params: {
    id: string;
  };
}

export default function ScenePage({ params }: ScenePageProps) {
  const scene = getSceneById(params.id);

  if (!scene) {
    notFound();
  }

  return <ScenePageClient scene={scene} />;
}
