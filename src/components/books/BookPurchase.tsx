import { Button } from "@/components/ui";

type BookPurchaseProps = {
  price: string;
  gumroadUrl: string;
  kindleUrl: string;
  includes: string[];
};

export function BookPurchase({
  price,
  gumroadUrl,
  kindleUrl,
  includes,
}: BookPurchaseProps) {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="overflow-hidden rounded-[2rem] border border-[var(--color-border-soft)] bg-white shadow-[0_20px_60px_rgba(32,25,19,0.08)]">
          <div className="grid gap-12 p-10 lg:grid-cols-2 lg:p-14">

            {/* Left */}
            <div>
              <span className="rounded-full bg-[var(--color-accent-peach)]/10 px-4 py-2 text-sm font-medium text-[var(--color-accent-peach)]">
                Premium Digital Product
              </span>

              <h2 className="mt-6 font-serif text-5xl text-[var(--color-text-primary)]">
                What's Included
              </h2>

              <p className="mt-4 max-w-xl text-lg text-[var(--color-text-secondary)]">
                Everything you need to gain clarity, take action,
                and create meaningful progress in your life.
              </p>

              <div className="mt-10 space-y-4">
                {includes.map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3"
                  >
                    <span className="text-lg text-[var(--color-accent-peach)]">
                      ✓
                    </span>

                    <span className="text-[var(--color-text-secondary)]">
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-10 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-[var(--color-border-soft)] p-4">
                  <div className="text-xl">⚡</div>
                  <div className="mt-2 font-medium">
                    Instant Download
                  </div>
                </div>

                <div className="rounded-2xl border border-[var(--color-border-soft)] p-4">
                  <div className="text-xl">🔒</div>
                  <div className="mt-2 font-medium">
                    Secure Checkout
                  </div>
                </div>

                <div className="rounded-2xl border border-[var(--color-border-soft)] p-4">
                  <div className="text-xl">♾️</div>
                  <div className="mt-2 font-medium">
                    Lifetime Access
                  </div>
                </div>

                <div className="rounded-2xl border border-[var(--color-border-soft)] p-4">
                  <div className="text-xl">📱</div>
                  <div className="mt-2 font-medium">
                    Mobile Friendly
                  </div>
                </div>
              </div>
            </div>

            {/* Right */}
            <div className="rounded-[2rem] bg-[var(--color-bg-ivory)] p-8 text-center">
              <span className="text-sm uppercase tracking-[0.2em] text-[var(--color-accent-peach)]">
                Special Launch Price
              </span>

              <div className="mt-4 font-serif text-6xl text-[var(--color-text-primary)]">
                {price}
              </div>

              <div className="mt-6 flex items-center justify-center gap-2 text-lg">
                ⭐⭐⭐⭐⭐
                <span className="text-[var(--color-text-secondary)]">
                  Loved by early readers
                </span>
              </div>

              <div className="mt-3 text-sm text-[var(--color-text-secondary)]">
                Join hundreds of creators and dreamers building a better future.
              </div>

              <div className="mt-10 space-y-4">
                <Button
                  href={gumroadUrl}
                  size="lg"
                  className="w-full justify-center"
                >
                  Buy Now
                </Button>

                <Button
                  href={kindleUrl}
                  variant="secondary"
                  size="lg"
                  className="w-full justify-center"
                >
                  View on Kindle
                </Button>
              </div>

              <div className="mt-8 rounded-2xl border border-[var(--color-border-soft)] p-4 text-left">
                <div className="flex items-center gap-2">
                  🔒
                  <span className="font-medium">
                    Safe & Secure Payment
                  </span>
                </div>

                <div className="mt-2 text-sm text-[var(--color-text-secondary)]">
                  Payments are processed securely through trusted platforms.
                </div>
              </div>

              <p className="mt-6 text-sm text-[var(--color-text-secondary)]">
                One-time purchase • Instant access • No subscription required
              </p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}