"use client";

// Keeps the customise checkboxes valid as the student clicks, so the form never bounces back:
// ticking Skip clears the options, ticking an option clears Skip, and a pick past `max` is undone.
export function ExclusiveChoices({ name, max, children }: { name: string; max: number; children: React.ReactNode }) {
  function onChange(e: React.ChangeEvent<HTMLDivElement>) {
    const box = e.target as unknown as HTMLInputElement;
    if (box.name !== name || !box.checked) return;
    const boxes = [...e.currentTarget.querySelectorAll<HTMLInputElement>(`input[name="${name}"]`)];
    const skip = box.value === "skip";
    boxes.forEach((b) => b !== box && (b.value === "skip") !== skip && (b.checked = false));
    if (!skip && boxes.filter((b) => b.checked).length > max) box.checked = false;
  }
  return (
    <div onChange={onChange} className="flex flex-col gap-8">
      {children}
    </div>
  );
}
