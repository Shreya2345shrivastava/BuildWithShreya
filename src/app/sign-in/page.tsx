import { SignInButton } from "@/components/auth/SignInButton";

export default function SignInPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <div className="text-center">
        <h1 className="font-serif text-5xl">
          Welcome Back
        </h1>

        <p className="mt-4 text-gray-500">
          Sign in to continue.
        </p>

        <div className="mt-8">
          <SignInButton />
        </div>
      </div>
    </main>
  );
}