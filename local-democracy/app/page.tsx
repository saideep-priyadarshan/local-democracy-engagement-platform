import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <header className="text-center mb-16">
        <h1 className="text-4xl font-bold mt-4">Welcome to Local Democracy</h1>
        <p className="text-slate-600 dark:text-slate-400 mt-2">
          Empowering citizens to connect with their representatives and improve
          their communities.
        </p>
      </header>

      <main className="w-full max-w-4xl flex flex-col items-center gap-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
          {/* Feedback Section */}
          <Link
            href="/feedback"
            className="group block p-6 border rounded-lg hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white group-hover:underline">
              Provide Feedback →
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mt-2">
              Share your concerns and suggestions directly with your local
              representatives.
            </p>
          </Link>

          {/* Initiatives Section */}
          <Link
            href="/initiatives"
            className="group block p-6 border rounded-lg hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white group-hover:underline">
              Explore Initiatives →
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mt-2">
              Organize community projects to improve your neighborhood.
            </p>
          </Link>

          {/* Impact Section */}
          <Link
            href="/impact"
            className="group block p-6 border rounded-lg hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white group-hover:underline">
              Visualize Impact →
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mt-2">
              See how policies and initiatives are transforming your community.
            </p>
          </Link>

          {/* About Section */}
          <Link
            href="/login"
            className="group block p-6 border rounded-lg hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white group-hover:underline">
              Join Us →
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mt-2">
              Join us to discover our mission and how you can contribute to
              local democracy.
            </p>
          </Link>
        </div>
      </main>

      <footer className="mt-16 text-center">
        <p className="text-slate-600 dark:text-slate-400 text-sm">
          © {new Date().getFullYear()} Local Democracy. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
