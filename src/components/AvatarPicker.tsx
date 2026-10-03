"use client";

import { useState } from "react";
import InfiniteMenu from "@/components/InfiniteMenu";
import { characterBuild, characterImage, characters } from "@/content";

// Pictures go through Next's image optimiser (small WebP instead of the multi-MB PNG).
const items = Array.from({ length: characters.count }, (_, i) => ({
  image: `/_next/image?url=${encodeURIComponent(characterImage(i + 1))}&w=640&q=75`,
}));

// Spinning menu of the characters; the chosen one is posted as avatar=avatar_N.
// `saved` (0-based, NaN for none) is the star picked before: it stays the answer until another one is chosen.
// ponytail: the menu doesn't spin round to the saved star, it's shown below it instead.
export function AvatarPicker({ saved }: { saved?: number }) {
  const c = characterBuild.avatar;
  const [chosen, setChosen] = useState<number | null>(null);
  const [kept, setKept] = useState(saved !== undefined && items[saved] ? saved : null);
  const answer = chosen ?? kept;
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative h-[60svh] max-h-[600px] min-h-[380px] w-full">
        <InfiniteMenu items={items} scale={1.2} hint={
            chosen !== null ? (
              c.hintLocked
            ) : (
              <>
                <span className="pointer-fine:hidden">{c.hintTouch}</span>
                <span className="hidden pointer-fine:inline">{c.hintMouse}</span>
              </>
            )
          } chosen={chosen} onChoose={(i) => { setChosen(i); setKept(null); }}
          // Spinning to another star un-chooses the old one, so the star saved is always the one shown with ✓.
          onActive={(i) => setChosen((c) => (c === i ? c : null))} />
      </div>
      <input
        name="avatar"
        value={answer === null ? "" : `avatar_${answer + 1}`}
        onChange={() => {}}
        // Set on every render, so the "choose a star" message clears as soon as one is chosen.
        ref={(el) => el?.setCustomValidity(answer === null ? c.notChosen : "")}
        required
        tabIndex={-1}
        aria-hidden
        className="sr-only"
      />
      {answer !== null && (
        <p className="flex items-center gap-3 text-sm text-lilac">
          {/* eslint-disable-next-line @next/next/no-img-element -- already optimised above */}
          <img src={items[answer].image} alt="" className="size-12 rounded-full bg-indigo object-contain" />
          {c.chosen}
        </p>
      )}
    </div>
  );
}
