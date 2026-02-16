"use client";

import { useMemo, useState } from "react";

type Project = {
  title: string;
  tag: string;
  desc: string;
  impact: string;
  stack: string[];
  bullets: string[];
};

const PROJECTS: Project[] = [
  {
    title: "Project RapidPatch",
    tag: "Automation of OCP on Powershell",
    desc: "Streamlined Oracle Security Patches to minimize client downtime.",
    impact: "Transformed a 48 hours + patching cycle into a 2 hours automated deployment window.",
    stack: ["Oracle", "Automation", "Powershell", "Ops"],
    bullets: [
      "Standardized patch workflow with repeatable steps.",
      "Reduced manual steps and improved validation checkpoints.",
      "Improved communication and rollout predictability.",
    ],
  },
  {
    title: "Enterprise Deployment Orchestrator",
    tag: "Deployment Automation on Powershell/Shell",
    desc: "Automated installation/deployment steps across environments.",
    impact: "Cut installs by 78%, which previously took 2 hours per environment",
    stack: ["PowerShell", "Scripting", "Automation","Shell","Linux/Windows"],
    bullets: [
      "Built repeatable automation to reduce human error.",
      "Improved consistency across environments.",
      "Captured success/failure outcomes with logging.",
    ],
  },
  {
    title: "Mission: Data Extraction / Financial Intelligence Automation",
    tag: "Python",
    desc: "Automated sourcing and research of financial Rating Issuance files for S&P workflows.",
    impact: "Saved ~400 hours per resource annually.",
    stack: ["Python", "Selenium", "Excel Parsing", "PDF Processing"],
    bullets: [
		"Built Selenium automation to extract Rating Issuance files from web portals.",
		"Reduced manual research and data collection effort across teams.",
		"Automated extraction of structured data from Excel and PDF sources.",
		"Improved turnaround time and accuracy for financial reporting workflows.",
	  ],
  },
];

function Modal({
  open,
  onClose,
  project,
}: {
  open: boolean;
  onClose: () => void;
  project: Project | null;
}) {
  if (!open || !project) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="absolute left-1/2 top-1/2 w-[92vw] max-w-2xl -translate-x-1/2 -translate-y-1/2">
        <div className="rounded-3xl border border-white/15 bg-[#0b0b10] shadow-2xl overflow-hidden">
          <div className="p-6">
            <div className="text-[11px] uppercase tracking-[0.25em] text-white/55">
              {project.tag}
            </div>
            <h2 className="mt-2 text-2xl font-bold">{project.title}</h2>
            <p className="mt-2 text-white/75">{project.desc}</p>

            <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="text-sm font-semibold">Impact</div>
              <div className="mt-1 text-white/80">{project.impact}</div>
            </div>

            <div className="mt-5">
              <div className="text-sm font-semibold">Highlights</div>
              <ul className="mt-2 space-y-2 text-sm text-white/75">
                {project.bullets.map((b) => (
                  <li key={b}>• {b}</li>
                ))}
              </ul>
            </div>

            <div className="mt-5">
              <div className="text-sm font-semibold">Stack</div>
              <div className="mt-2 flex flex-wrap gap-2">
                {project.stack.map((s) => (
                  <span
                    key={s}
                    className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-white/80"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                className="rounded-2xl border border-white/20 bg-white/5 px-5 py-2 text-sm font-semibold hover:bg-white/10"
                onClick={onClose}
              >
                Close
              </button>
              <a
                className="rounded-2xl bg-white px-5 py-2 text-sm font-semibold text-black hover:opacity-90"
                href="/contact"
              >
                Contact
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProjectsPage() {
  const [selected, setSelected] = useState<Project | null>(null);

  const list = useMemo(() => PROJECTS, []);

  return (
    <main className="min-h-screen bg-[#050508] text-white">
      <header className="border-b border-white/10 bg-black/40 backdrop-blur">
        <div className="mx-auto max-w-6xl px-5 py-4 flex items-center justify-between">
          <div className="font-semibold tracking-wide">Projects</div>
          <a className="text-sm text-white/80 hover:text-white" href="/">
            ← Home
          </a>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-5 py-10">
        <h1 className="text-3xl font-bold tracking-tight">Featured Work</h1>
        <p className="mt-2 text-white/70">
          Click any card to expand (Netflix-style).
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((p) => (
            <button
              key={p.title}
              onClick={() => setSelected(p)}
              className="text-left rounded-3xl border border-white/10 bg-white/5 p-5 transition
                         hover:-translate-y-1 hover:bg-white/10 hover:border-white/20"
            >
              <div className="text-[11px] uppercase tracking-[0.25em] text-white/55">
                {p.tag}
              </div>
              <div className="mt-2 text-lg font-semibold">{p.title}</div>
              <p className="mt-2 text-sm text-white/70">{p.desc}</p>
              <div className="mt-3 text-sm font-medium text-white/90">
                {p.impact}
              </div>
            </button>
          ))}
        </div>
      </section>

      <Modal
        open={!!selected}
        onClose={() => setSelected(null)}
        project={selected}
      />
    </main>
  );
}
