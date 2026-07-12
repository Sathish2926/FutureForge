type PagePlaceholderProps = {
  title: string;
  description: string;
};

export function PagePlaceholder({ title, description }: PagePlaceholderProps) {
  return (
    <section className="flex min-h-[50vh] flex-col items-start justify-center gap-3 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-600">FutureForge</p>
      <h1 className="text-3xl font-semibold text-slate-900">{title}</h1>
      <p className="max-w-2xl text-sm leading-6 text-slate-600">{description}</p>
    </section>
  );
}
