"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Ban } from "lucide-react";
import { accessoryImage, characterBuild, characterImage, characters } from "@/content";
import { cn } from "@/lib/utils";

const all = Array.from({ length: characters.accessories }, (_, i) => i + 1);

// Game-style customiser: character on top, accessory grid below. One accessory (or none);
// tapping one swaps the big picture to characterN/N.X.png. Posted as accessory=accessory_X or "none".
export function Wardrobe({ character }: { character: number }) {
  const c = characterBuild.customize;
  const [picked, setPicked] = useState(0);
  // Only offer accessories whose pictures have been uploaded (a HEAD request downloads nothing).
  const [ready, setReady] = useState<number[]>([]);
  useEffect(() => {
    const exists = (src: string) => fetch(src, { method: "HEAD" }).then((r) => r.ok, () => false);
    Promise.all(all.map(async (x) => (await exists(accessoryImage(x))) && (await exists(characterImage(character, x))))).then(
      (ok) => setReady(all.filter((_, i) => ok[i])),
    );
  }, [character]);

  const tile =
    "panel relative grid aspect-square cursor-pointer place-items-center overflow-hidden p-2 transition-colors hover:bg-indigo has-checked:bg-indigo has-checked:ring-2 has-checked:ring-lavender has-focus-visible:ring-2 has-focus-visible:ring-lavender";

  return (
    <div className="flex flex-col gap-4">
      <div className="relative mx-auto aspect-[3/4] h-[42svh] max-h-[480px] min-h-[260px]">
        <Image
          key={picked}
          src={characterImage(character, picked)}
          alt=""
          fill
          priority
          sizes="(max-width: 640px) 70vw, 360px"
          className="animate-in fade-in zoom-in-95 object-contain duration-300"
        />
      </div>

      <fieldset className="panel flex flex-col gap-3 p-3 sm:p-4">
        <legend className="sr-only">{c.panel}</legend>
        <p aria-hidden className="font-mono text-xs uppercase tracking-wider text-fog">
          {c.panel}
        </p>
        <div className="grid grid-cols-4 gap-2 sm:grid-cols-7 sm:gap-3">
          <label className={tile}>
            <input type="radio" name="accessory" value="none" checked={!picked} onChange={() => setPicked(0)} className="sr-only" />
            <Ban aria-hidden className="size-7 text-fog" />
            <span className="sr-only">{c.none}</span>
          </label>
          {ready.map((x) => (
            <label key={x} className={cn(tile, "animate-in fade-in")}>
              <input
                type="radio"
                name="accessory"
                value={`accessory_${x}`}
                checked={picked === x}
                onChange={() => setPicked(x)}
                className="sr-only"
              />
              <Image src={accessoryImage(x)} alt={`Accessory ${x}`} fill sizes="96px" className="object-contain p-1" />
            </label>
          ))}
        </div>
      </fieldset>
    </div>
  );
}
