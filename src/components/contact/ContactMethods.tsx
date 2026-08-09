const methods = [
  {
    title: "Email",
    value: "hello@buildwithshreya.com",
  },
  {
    title: "Instagram",
    value: "@buildwithshreya",
  },
  {
    title: "Newsletter",
    value: "Weekly growth insights",
  },
];

export function ContactMethods() {
  return (
    <section className="pb-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-8 md:grid-cols-3">
          {methods.map((method) => (
            <div
              key={method.title}
              className="rounded-[2rem] border border-[var(--color-border-soft)] bg-white p-8 text-center"
            >
              <h3 className="font-serif text-3xl">
                {method.title}
              </h3>

              <p className="mt-4 text-[var(--color-text-secondary)]">
                {method.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}