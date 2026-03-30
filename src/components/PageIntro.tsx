type PageIntroProps = {
  title?: string;
  description?: string;
};

export function PageIntro({ title, description }: PageIntroProps) {
  return (
    <header className="mb-10">
      {title ? (
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          {title}
        </h1>
      ) : null}
      {description ? (
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
          {description}
        </p>
      ) : null}
    </header>
  );
}
