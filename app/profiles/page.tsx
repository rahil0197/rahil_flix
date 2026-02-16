"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type ProfileId = "rahil" | "recruiter" | "guest";

type Profile = {
  id: ProfileId;
  name: string;
  avatar: string; // /profiles/...
  tagline: string;
};

const PROFILES: Profile[] = [
  { id: "rahil", name: "Rahil", avatar: "/profiles/rahil.jpg", tagline: "Owner" },
  {
    id: "recruiter",
    name: "Recruiter",
    avatar: "/profiles/recruiter.jpg",
    tagline: "Hiring / interview view",
  },
  { id: "guest", name: "Guest", avatar: "/profiles/guest.jpg", tagline: "Quick browse" },
];

function setActiveProfile(id: ProfileId) {
  localStorage.setItem("rsflix_profile", id);
}

export default function ProfilesPage() {
  const router = useRouter();

  // Intro gate
  const [showProfiles, setShowProfiles] = useState(false);

  // Your existing “Rahil challenge”
  const [challengeOpen, setChallengeOpen] = useState(false);

  const rahil = useMemo(() => PROFILES.find((p) => p.id === "rahil")!, []);

  useEffect(() => {
    // Optional: if you want intro only once per browser:
    // const seen = localStorage.getItem("rsflix_intro_seen");
    // if (seen === "1") setShowProfiles(true);
  }, []);

  // 1) INTRO VIDEO VIEW (LOCAL FILE)
	const [muted, setMuted] = useState(true);
	const [videoKey, setVideoKey] = useState(0);


	if (!showProfiles) {
	  return (
		<main className="min-h-screen bg-black text-white">
		  <div
			className="relative h-screen w-full"
			onClick={() => {
			  if (muted) {
				setMuted(false);
				setVideoKey((k) => k + 1); // restart video
			  }
			}}
		  >
			<video
			  key={videoKey}
			  className="h-full w-full object-cover"
			  src="/intro/intro.mp4"
			  autoPlay
			  muted={muted}
			  playsInline
			  controls={false}
			  onEnded={() => setShowProfiles(true)}
			/>

			<div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/60" />

			{muted && (
			  <div className="absolute bottom-10 left-10 rounded-xl border border-white/20 bg-black/60 px-6 py-3 text-sm font-semibold backdrop-blur">
				🔊 Click Anywhere For Sound
			  </div>
			)}

			<button
			  onClick={(e) => {
				e.stopPropagation();
				setShowProfiles(true);
			  }}
			  className="absolute bottom-10 right-10 rounded-xl bg-white px-6 py-3 font-semibold text-black hover:opacity-90"
			>
			  Skip Intro
			</button>
		  </div>
		</main>
	  );
	}




  // 2) PROFILES VIEW (your original UI)
  return (
    <main className="min-h-screen bg-[#050508] text-white">
      <div className="mx-auto max-w-5xl px-6 py-20">
        <div className="text-[12px] uppercase tracking-[0.35em] text-white/60">
          Rahil_Flix
        </div>
        <h1 className="mt-4 text-4xl sm:text-5xl font-extrabold tracking-tight">
          Who&apos;s watching?
        </h1>
        <p className="mt-3 text-white/70">
          Pick a profile. I&apos;ll tailor the content based on who you are.
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {/* Rahil (special click) */}
          <button
            onClick={() => setChallengeOpen(true)}
            className="group rounded-3xl border border-white/10 bg-white/5 p-6 text-left transition hover:bg-white/10"
          >
            <div className="aspect-square w-full overflow-hidden rounded-2xl border border-white/10 bg-white/5">
              <img
                src={rahil.avatar}
                alt={rahil.name}
                className="h-full w-full object-cover transition group-hover:scale-[1.03]"
              />
            </div>
            <div className="mt-4 text-lg font-semibold">{rahil.name}</div>
            <div className="mt-1 text-sm text-white/60">{rahil.tagline}</div>
          </button>

          {/* Others */}
          {PROFILES.filter((p) => p.id !== "rahil").map((p) => (
            <button
              key={p.id}
              onClick={() => {
                setActiveProfile(p.id);
                router.push("/");
              }}
              className="group rounded-3xl border border-white/10 bg-white/5 p-6 text-left transition hover:bg-white/10"
            >
              <div className="aspect-square w-full overflow-hidden rounded-2xl border border-white/10 bg-white/5">
                <img
                  src={p.avatar}
                  alt={p.name}
                  className="h-full w-full object-cover transition group-hover:scale-[1.03]"
                />
              </div>
              <div className="mt-4 text-lg font-semibold">{p.name}</div>
              <div className="mt-1 text-sm text-white/60">{p.tagline}</div>
            </button>
          ))}
        </div>

        <div className="mt-10 text-xs text-white/50">
          Tip: You can change profiles anytime from the top nav ;)
        </div>
      </div>

      {/* Challenge modal */}
      {challengeOpen && (
        <div className="fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setChallengeOpen(false)}
          />
          <div className="absolute left-1/2 top-1/2 w-[92vw] max-w-lg -translate-x-1/2 -translate-y-1/2">
            <div className="overflow-hidden rounded-3xl border border-white/15 bg-[#0b0b10] shadow-2xl">
              <div className="p-6">
                <div className="text-sm uppercase tracking-[0.25em] text-white/60">
                  Identity check
                </div>
                <h2 className="mt-2 text-2xl font-bold">
                  I don’t think you’re Rahil.
                </h2>
                <p className="mt-3 text-white/70">
                  Are you a recruiter or a guest? Choose a profile to continue.
                </p>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <button
                    onClick={() => {
                      setActiveProfile("recruiter");
                      setChallengeOpen(false);
                      router.push("/");
                    }}
                    className="rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-black hover:opacity-90"
                  >
                    Recruiter
                  </button>
                  <button
                    onClick={() => {
                      setActiveProfile("guest");
                      setChallengeOpen(false);
                      router.push("/");
                    }}
                    className="rounded-2xl border border-white/20 bg-white/5 px-4 py-3 text-sm font-semibold hover:bg-white/10"
                  >
                    Guest
                  </button>
                </div>

                <button
                  onClick={() => setChallengeOpen(false)}
                  className="mt-4 w-full rounded-2xl border border-white/20 px-4 py-3 text-sm text-white/80 hover:bg-white/10"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
