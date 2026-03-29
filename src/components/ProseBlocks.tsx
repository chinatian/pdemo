import type { ProseBlock } from "@/i18n/types";

export function ProseBlocks({ blocks }: { blocks: ProseBlock[] }) {
  return (
    <>
      {blocks.map((b, i) => {
        switch (b.type) {
          case "h2":
            return (
              <h2 key={i} className="mt-10 text-xl font-semibold tracking-tight text-zinc-900 first:mt-0 dark:text-zinc-50">
                {b.text}
              </h2>
            );
          case "h3":
            return (
              <h3 key={i} className="mt-8 text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                {b.text}
              </h3>
            );
          case "p":
            return (
              <p key={i} className="mb-4 leading-relaxed">
                {b.text}
              </p>
            );
          case "pCode":
            return (
              <p key={i} className="mb-4 leading-relaxed">
                {b.before}
                <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-[0.875em] text-zinc-800 dark:bg-zinc-900 dark:text-zinc-200">
                  {b.code}
                </code>
                {b.after}
              </p>
            );
          case "ul":
            return (
              <ul key={i} className="mb-4 list-disc space-y-1 pl-6">
                {b.items.map((item, j) => (
                  <li key={j} className="leading-relaxed">
                    {item}
                  </li>
                ))}
              </ul>
            );
          case "pre":
            return (
              <pre key={i} className="mb-4 overflow-x-auto rounded-lg border border-zinc-200 bg-zinc-50 p-4 text-sm dark:border-zinc-800 dark:bg-zinc-900/50">
                <code>{b.code}</code>
              </pre>
            );
          default:
            return null;
        }
      })}
    </>
  );
}
