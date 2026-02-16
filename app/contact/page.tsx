import Link from "next/link";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#050508] text-white px-6">
      <div className="mx-auto max-w-3xl py-20">
        <h1 className="text-4xl font-extrabold tracking-tight">Contact</h1>
        <p className="mt-3 text-white/70">
          Reach out anytime, happy to connect 😊
        </p>

        <div className="mt-10 grid gap-4">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <div className="text-sm text-white/60">Email</div>
            <a
              className="mt-1 block text-lg font-semibold hover:underline"
              href="mailto:rahil0197@gmail.com"
            >
              rahil0197@gmail.com
            </a>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <div className="text-sm text-white/60">LinkedIn</div>
            <a
              className="mt-1 block text-lg font-semibold hover:underline"
              href="https://linkedin.com/in/rahil0197"
              target="_blank"
              rel="noreferrer"
            >
              linkedin.com/in/rahil0197
            </a>
          </div>

          <div className="pt-2">
            <Link
              href="/"
              className="inline-block rounded-2xl border border-white/20 bg-white/5 px-5 py-3 text-sm font-semibold hover:bg-white/10"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
