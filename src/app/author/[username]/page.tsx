import { getPublicProfile } from "@/lib/actions/settings.actions";
import { notFound } from "next/navigation";

export default async function AuthorProfilePage({ params }: { params: Promise<{ username: string }> }) {
  const resolvedParams = await params;
  const profile = await getPublicProfile(resolvedParams.username);
  
  if (!profile) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[var(--color-bg-ivory)] pb-24 pt-32">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        
        {/* Profile Header */}
        <div className="flex flex-col items-center text-center space-y-6">
          {profile.image ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img 
              src={profile.image} 
              alt={profile.name} 
              className="h-32 w-32 rounded-full border-4 border-white object-cover shadow-lg"
            />
          ) : (
            <div className="flex h-32 w-32 items-center justify-center rounded-full border-4 border-white bg-[#FCF8F2] text-5xl font-medium text-[var(--color-accent-peach)] shadow-lg">
              {profile.name?.charAt(0).toUpperCase() || "A"}
            </div>
          )}
          
          <div>
            <h1 className="font-serif text-5xl text-[var(--color-text-primary)]">
              {profile.name}
            </h1>
            <p className="mt-2 text-lg text-[var(--color-text-secondary)]">
              @{profile.username}
            </p>
          </div>
          
          {profile.bio && (
            <p className="max-w-2xl text-lg leading-relaxed text-[var(--color-text-secondary)]">
              {profile.bio}
            </p>
          )}
        </div>

        {/* Authored Content Sections */}
        <div className="mt-20 space-y-16">
          <section>
            <h2 className="font-serif text-3xl text-[var(--color-text-primary)] border-b border-[var(--color-border-soft)] pb-4 mb-8">
              Books by {profile.name.split(" ")[0]}
            </h2>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-2xl border border-[var(--color-border-soft)] bg-white p-6 shadow-sm">
                <div className="aspect-[3/4] w-full rounded-xl bg-[#FCF8F2] mb-4 flex items-center justify-center text-[var(--color-accent-peach)]">
                   [Book Cover]
                </div>
                <h3 className="font-serif text-xl font-medium text-[var(--color-text-primary)]">The Calm Creator</h3>
                <p className="mt-2 text-sm text-[var(--color-text-secondary)]">A guide to sustainable growth.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="font-serif text-3xl text-[var(--color-text-primary)] border-b border-[var(--color-border-soft)] pb-4 mb-8">
              Recent Articles
            </h2>
            <div className="space-y-4">
               <div className="rounded-2xl border border-[var(--color-border-soft)] bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md cursor-pointer">
                 <h3 className="font-serif text-xl font-medium text-[var(--color-text-primary)]">The Myth of Productivity</h3>
                 <p className="mt-2 text-[var(--color-text-secondary)]">Why doing less actually helps you achieve more in the long run.</p>
                 <div className="mt-4 flex items-center gap-2 text-sm text-[var(--color-accent-peach)]">
                    Read article &rarr;
                 </div>
               </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
