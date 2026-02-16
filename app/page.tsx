"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

/* ===================== TYPES ===================== */

type Card = {
  id: string;
  title: string;
  category: string;
  summary: string;
  image: string; // /thumbs/...
  details: string[];
  showProjects?: boolean;
};

type Skill = {
  id: string;
  category: "Automation" | "DBA" | "Cloud";
  movieTitle: string;
  realTitle: string;
  image: string;
  badges: ("ORACLE" | "OCI" | "PYTHON" | "POWERSHELL")[];
  examples: string[];
  tools: string[];
};

/* ===================== DATA ===================== */

/** Work Experience */
const workExperience: Card[] = [
  {
    id: "dba-manager",
    title: "DBA Manager – CMiC",
    category: "Mar 2025 – Present",
    summary: "Lead evening DBA Team, drive full scale automation & coach new/junior DBAs.",
    image: "/thumbs/DBA_Manager.png",
	showProjects: true,
    details: [
      "Lead the evening DBA team, providing leadership and direction across support operations.",
      "Manage high-priority escalations during weekends and off-business hours.",
      "Drive full-scale automation initiatives for the DBA team, leading to significant time savings:",
      "Reduced installation time by 78%, cutting previous duration of 2-3 hours per resource per environment.",
      "Minimized client downtime for Oracle Security Patches from a Full weekend to 2 hours.",
      "Oversee automation architecture for internal DBA tools, tracking effectiveness via logs and metrics.",
      "Coordinate deployments and upgrades with stakeholders and project teams.",
      "Conduct monthly client calls to address issues, propose improvements, and identify upselling opportunities.",
      "Mentor and coach junior DBAs to align team knowledge and performance with organizational standards.",
    ],
  },
  {
    id: "assistant-lead",
    title: "Assistant DBA Team Lead – CMiC",
    category: "Sep 2024 – Mar 2025",
    summary: "SQL tuning, backup for DBA Manager, DB enhancements & standardization.",
    image: "/thumbs/Assistant_DBA_Team_Lead.jpg",
    details: [
      "Assisted in managing day-to-day DBA responsibilities and technical escalations.",
      "Acted as the primary backup for the DBA Manager in leadership functions.",
      "Supported process standardization and continuous improvement across the team.",
      "Mentored junior DBAs; contributed documentation and internal training material.",
      "Aligned database enhancements with release schedules with dev/product teams.",
      "Helped gather/analyze KPIs to assess team performance and suggest improvements.",
      "Laid groundwork for automation frameworks that later rolled out broadly as DBA Manager.",
    ],
  },
  {
    id: "db-analyst",
    title: "Database Analyst – CMiC",
    category: "Feb 2022 – Sep 2024",
    summary: "Deployed & maintained enterprise DBs; standards, SLAs, debugging, documentation.",
    image: "/thumbs/Database_Analyst.jpg",
    details: [
      "Deployed, developed, and maintained enterprise databases.",
      "Improved database standards to ensure SLAs were met.",
      "Researched technical problems, analyzed requirements, and designed processes to meet business needs.",
      "Estimated and documented required effort to develop/test/implement new technical changes.",
      "Created technical documentation of implementation activities for management and team members.",
      "Tested and debugged program units; integrated modules and systems.",
      "Provided technical support and mentoring to team members for professional development.",
    ],
  },
  {
    id: "dba-coordinator",
    title: "DBA Coordinator – CMiC",
    category: "Jul 2021 – Jan 2022",
    summary: "Ticket dispatch, client communication, patch plans, RCA, automation checks.",
    image: "/thumbs/DBA_Coordinator.jpg",
    details: [
      "Prioritized high-impact tickets and ensured deadlines were consistently met.",
      "Assigned and dispatched emails/tickets to DBAs.",
      "Monitored incidents and ensured timely status updates.",
      "Communicated with clients on patching plans and RCAs for incidents.",
      "Analyzed and processed high volume of tickets/emails.",
      "Participated in meetings; collaborated with internal departments.",
      "Developed an automation script eliminating manual post-maintenance system checks.",
    ],
  },
  {
    id: "crisil",
    title: "CRISIL – An S&P Global Company",
    category: "Jul 2018 – Jun 2019",
    summary: "Financial data analysis + Python automation (Selenium) saving ~400 hours/yr.",
    image: "/thumbs/CRISIL.jpg",
    details: [
      "Collected and analyzed financial/investment data (profiles, bonds, trades, portfolio data).",
      "Extracted required financial datasets into output templates for S&P.",
      "Presented monthly dashboards to onshore clients for capacity utilization.",
      "Project: Automated sourcing/research of Rating Issuance files using Selenium (Python).",
      "Saved ~400 annual hours per resource through automation.",
      "Built Python scripts to read data from Excel/PDF for business needs.",
    ],
  },
];

/** Education as Cards so clicking opens details */
const educationCards: Card[] = [
  {
    id: "edu-ba",
    title: "Business Analytics",
    category: "Seneca College · Toronto, CA",
    summary: "Sep 2020 – Apr 2021",
    image: "/thumbs/Business_Analytics.jpg",
    details: [
      "Program: Business Analytics",
      "Institution: Seneca College",
      "Location: Toronto, CA",
      "Period: Sep 2020 – Apr 2021",
    ],
  },
  {
    id: "edu-pap",
    title: "Professional Accounting Practice",
    category: "Seneca College · Toronto, CA",
    summary: "Sep 2019 – Aug 2020",
    image: "/thumbs/Professional_Accounting_Practice.jpg",
    details: [
      "Program: Professional Accounting Practice",
      "Institution: Seneca College",
      "Location: Toronto, CA",
      "Period: Sep 2019 – Aug 2020",
    ],
  },
  {
    id: "edu-baf",
    title: "Bachelor of Accounting & Finance",
    category: "University of Mumbai · Mumbai, IN",
    summary: "Jul 2015 – May 2018",
    image: "/thumbs/Bachelor_of_Accounting_Finance.jpg",
    details: [
      "Program: Bachelor of Accounting & Finance",
      "Institution: University of Mumbai",
      "Location: Mumbai, IN",
      "Period: Jul 2015 – May 2018",
    ],
  },
];

/** Skills grouped + searchable */
const skillsByCategory: Record<Skill["category"], Skill[]> = {
  Automation: [
    {
      id: "ps-auto",
      category: "Automation",
      movieTitle: "The Scriptfather",
      realTitle: "PowerShell Automation",
      image: "/thumbs/PowerShell_Automation.jpg",
      badges: ["POWERSHELL"],
      examples: [
        "Automated repeatable operations workflows",
        "Reduced manual steps with safe, logged runs",
        "Built playbooks and guardrails for reliability",
      ],
      tools: ["PowerShell", "Windows", "Logging/Metrics"],
    },
    {
      id: "py-auto",
      category: "Automation",
      movieTitle: "Mission: Automate",
      realTitle: "Python Automation",
      image: "/thumbs/Python_Automation.jpg",
      badges: ["PYTHON"],
      examples: [
        "Scripting for automation and data workflows",
        "Selenium automation saving ~400 hours/year in prior role",
        "Automation patterns that reduce errors",
      ],
      tools: ["Python", "Selenium", "CLI tooling"],
    },
  ],
  DBA: [
    {
      id: "oracle-dba-082",
      category: "DBA",
      movieTitle: "The Oracle Awakens",
      realTitle: "Oracle Database Administration I (1Z0-082)",
      image: "/thumbs/1Z0-082.jpg",
      badges: ["ORACLE"],
      examples: [
        "Oracle upgrades: 12c → 19c → 23ai",
        "Operational Reliability",
        "Backup/recovery best practices",
        "RAC/DR/DG/Golden Gate",
      ],
      tools: ["Oracle", "RMAN", "RAC", "Golden Gate", "DG/DR", "Monitoring"],
    },
    {
      id: "oracle-sql-071",
      category: "DBA",
      movieTitle: "Query Impossible",
      realTitle: "Oracle Database SQL Associate (1Z0-071)",
      image: "/thumbs/1Z0-071.jpg",
      badges: ["ORACLE"],
      examples: [
        "SQL tuning and query optimization",
        "Explain plans and performance fixes",
        "Indexing and execution path improvements",
      ],
      tools: [
        "SQL",
        "Explain Plan",
        "AWR/ASH (if available)",
        "Oracle tuning",
        "OS monitoring",
        "Capacity planning",
      ],
    },
  ],
  Cloud: [
    {
      id: "oci-foundations-2024",
      category: "Cloud",
      movieTitle: "Cloud Wars: Foundations",
      realTitle: "OCI 2024 Certified Foundations Associate",
      image: "/thumbs/oci1.jpg",
      badges: ["OCI"],
      examples: ["Cloud fundamentals", "Core OCI services understanding"],
      tools: ["OCI Core", "IAM basics", "Networking basics"],
    },
    {
      id: "oci-genai-2024",
      category: "Cloud",
      movieTitle: "GenAI: Rise of the Cloud",
      realTitle: "OCI 2024 Generative AI Certified Professional",
      image: "/thumbs/genai.jpg",
      badges: ["OCI"],
      examples: ["GenAI fundamentals in OCI context", "Cloud AI concepts"],
      tools: ["OCI GenAI", "Cloud best practices"],
    },
    {
      id: "oci-multicloud-2023",
      category: "Cloud",
      movieTitle: "Multicloud Heist",
      realTitle: "OCI 2023 Multicloud Architect Certified Associate",
      image: "/thumbs/multicloud.jpg",
      badges: ["OCI"],
      examples: ["Multicloud architecture patterns", "Integration fundamentals"],
      tools: ["OCI", "Architecture", "Integration patterns"],
    },
    {
      id: "oracle-dm-2023",
      category: "Cloud",
      movieTitle: "Data Guardians",
      realTitle: "Oracle Cloud Data Management 2023 Foundations",
      image: "/thumbs/cloud.jpg",
      badges: ["ORACLE", "OCI"],
      examples: ["Cloud data foundations", "Data management concepts"],
      tools: ["Cloud data", "Foundations"],
    },
    {
      id: "oracle-ml-2023",
      category: "Cloud",
      movieTitle: "Machines of the Oracle",
      realTitle: "Oracle ML using Autonomous Database 2023 Associate",
      image: "/thumbs/ml.jpg",
      badges: ["ORACLE", "OCI"],
      examples: ["ML concepts in ADB context", "Applied learning workflows"],
      tools: ["Autonomous DB", "Oracle ML tools"],
    },
    {
      id: "oci-foundations-2023",
      category: "Cloud",
      movieTitle: "Foundations: The Prequel",
      realTitle: "OCI 2023 Certified Foundations Associate",
      image: "/thumbs/oci.jpg",
      badges: ["OCI"],
      examples: ["OCI fundamentals", "Cloud basics"],
      tools: ["OCI Core", "Foundations"],
    },
  ],
};

/* ===================== UI HELPERS ===================== */

function Badge({ b }: { b: Skill["badges"][number] }) {
  const label =
    b === "ORACLE" ? "Oracle" : b === "OCI" ? "OCI" : b === "PYTHON" ? "Python" : "PowerShell";

  return (
    <span className="rounded-full border border-white/15 bg-white/5 px-2.5 py-1 text-[11px] text-white/80">
      {label}
    </span>
  );
}

function CardModal({ card, onClose }: { card: Card | null; onClose: () => void }) {
  if (!card) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="absolute left-1/2 top-1/2 w-[92vw] max-w-3xl -translate-x-1/2 -translate-y-1/2">
        <div className="overflow-hidden rounded-3xl border border-white/15 bg-[#0b0b10] shadow-2xl">
          <div className="relative aspect-[16/9] bg-white/5">
            <img
              src={card.image}
              alt={card.title}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
            <div className="absolute bottom-4 left-5 right-5">
              <div className="text-xs uppercase tracking-widest text-white/70">
                {card.category}
              </div>
              <div className="mt-1 text-2xl font-bold">{card.title}</div>
              <div className="mt-1 text-white/80">{card.summary}</div>
            </div>
          </div>

          <div className="p-6">
            <ul className="space-y-2 text-sm text-white/75">
              {card.details.map((d) => (
                <li key={d}>• {d}</li>
              ))}
            </ul>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={onClose}
                className="rounded-2xl border border-white/20 px-5 py-2 text-sm hover:bg-white/10"
              >
                Close
              </button>

              {card.showProjects ? (
                <Link
                  href="/projects"
                  className="rounded-2xl bg-white px-5 py-2 text-sm font-semibold text-black hover:opacity-90"
                >
                  View Projects
                </Link>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


function SkillModal({ skill, onClose }: { skill: Skill | null; onClose: () => void }) {
  if (!skill) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      <div className="absolute left-1/2 top-1/2 w-[92vw] max-w-3xl -translate-x-1/2 -translate-y-1/2">
        <div className="overflow-hidden rounded-3xl border border-white/15 bg-[#0b0b10] shadow-2xl">
          <div className="relative aspect-[16/9] bg-white/5">
            <img src={skill.image} alt={skill.realTitle} className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
            <div className="absolute bottom-4 left-5 right-5">
              <div className="text-xs uppercase tracking-widest text-white/70">{skill.category}</div>
              <div className="mt-1 text-2xl font-bold">{skill.movieTitle}</div>
              <div className="mt-1 text-white/80">{skill.realTitle}</div>
            </div>
          </div>

          <div className="p-6">
            <div className="flex flex-wrap gap-2">
              {skill.badges.map((b) => (
                <Badge key={`${skill.id}-${b}`} b={b} />
              ))}
            </div>

            <div className="mt-5">
              <div className="text-sm font-semibold">Examples</div>
              <ul className="mt-2 space-y-2 text-sm text-white/75">
                {skill.examples.map((x) => (
                  <li key={x}>• {x}</li>
                ))}
              </ul>
            </div>

            <div className="mt-5">
              <div className="text-sm font-semibold">Tools</div>
              <div className="mt-2 flex flex-wrap gap-2">
                {skill.tools.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-white/80"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={onClose}
                className="rounded-2xl border border-white/20 px-5 py-2 text-sm hover:bg-white/10"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ===================== NETFLIX ROWS ===================== */

function PosterRow({
  title,
  subtitle,
  items,
  onClick,
}: {
  title: string;
  subtitle?: string;
  items: Card[];
  onClick: (c: Card) => void;
}) {
  const rowRef = useRef<HTMLDivElement | null>(null);

  function scrollByCards(dir: "left" | "right") {
    const el = rowRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === "left" ? -900 : 900, behavior: "smooth" });
  }

  return (
    <section className="mt-10">
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-base font-semibold text-white/90">{title}</h2>
          {subtitle ? <div className="mt-1 text-xs text-white/50">{subtitle}</div> : null}
        </div>
      </div>

      <div className="relative mt-3 group">
        <button
          type="button"
          onClick={() => scrollByCards("left")}
          className="absolute left-2 top-1/2 z-20 -translate-y-1/2
                     rounded-full border border-white/15 bg-black/50 p-3
                     text-white/80 backdrop-blur opacity-0 group-hover:opacity-100 transition
                     hover:bg-black/75 hover:text-white"
          aria-label="Scroll left"
        >
          ◀
        </button>

        <button
          type="button"
          onClick={() => scrollByCards("right")}
          className="absolute right-2 top-1/2 z-20 -translate-y-1/2
                     rounded-full border border-white/15 bg-black/50 p-3
                     text-white/80 backdrop-blur opacity-0 group-hover:opacity-100 transition
                     hover:bg-black/75 hover:text-white"
          aria-label="Scroll right"
        >
          ▶
        </button>

        <div ref={rowRef} className="flex gap-3 overflow-x-auto pb-6 no-scrollbar scroll-smooth px-10 snap-x">
          {items.map((c) => (
            <button
              key={c.id}
              onClick={() => onClick(c)}
              className="group/poster min-w-[180px] sm:min-w-[180px] max-w-[180px]
                         snap-start text-left transition duration-200
                         hover:z-10 hover:scale-[1.08]"
            >
              <div
                className="relative aspect-[2/3] overflow-hidden rounded-xl bg-white/5
                           shadow-[0_0_0_1px_rgba(255,255,255,0.08)]
                           group-hover/poster:shadow-[0_0_0_1px_rgba(255,255,255,0.18),0_18px_60px_rgba(0,0,0,0.65)]"
              >
                <img
                  src={c.image}
                  alt={c.title}
                  className="h-full w-full object-cover transition duration-200 group-hover/poster:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent opacity-0 group-hover/poster:opacity-100 transition" />
                <div className="absolute left-3 right-3 bottom-3 opacity-0 group-hover/poster:opacity-100 transition">
                  <div className="text-[10px] uppercase tracking-[0.25em] text-white/70">{c.category}</div>
                  <div className="mt-1 text-sm font-semibold leading-snug">{c.title}</div>
                  <div className="mt-1 text-xs text-white/70">{c.summary}</div>
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className="pointer-events-none absolute left-0 top-0 h-full w-10 bg-gradient-to-r from-[#050508] to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 h-full w-10 bg-gradient-to-l from-[#050508] to-transparent" />
      </div>
    </section>
  );
}

function SkillsSection() {
  const [query, setQuery] = useState("");
  const [activeSkill, setActiveSkill] = useState<Skill | null>(null);
  const rowRef = useRef<HTMLDivElement | null>(null);

  const allSkills = useMemo(() => {
    return [
      ...skillsByCategory.Automation,
      ...skillsByCategory.DBA,
      ...skillsByCategory.Cloud,
    ];
  }, []);

  function matches(s: Skill) {
    const q = query.trim().toLowerCase();
    if (!q) return true;

    const hay = [
      s.movieTitle,
      s.realTitle,
      s.category,
      ...s.badges,
      ...s.examples,
      ...s.tools,
    ]
      .join(" ")
      .toLowerCase();

    return hay.includes(q);
  }

  const filtered = useMemo(() => allSkills.filter(matches), [allSkills, query]);

  function scrollByCards(dir: "left" | "right") {
    const el = rowRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === "left" ? -900 : 900, behavior: "smooth" });
  }

  return (
    <section className="mt-14 pb-20">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-base font-semibold text-white/90">
            Certifications & Skills (Top 10 in Canada)
          </h2>
          <p className="mt-1 text-xs text-white/55">
            Click the title for more details.
          </p>
        </div>

        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search (Python, OCI, Oracle, PowerShell, tuning...)"
          className="w-full sm:w-[420px] rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white/90 placeholder:text-white/40 outline-none focus:border-white/30"
        />
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="text-xs text-white/45">{filtered.length} items</div>
      </div>

      {/* Netflix row */}
      <div className="relative mt-3 group">
        <button
          type="button"
          onClick={() => scrollByCards("left")}
          className="absolute left-2 top-1/2 z-20 -translate-y-1/2
                     rounded-full border border-white/15 bg-black/50 p-3
                     text-white/80 backdrop-blur opacity-0 group-hover:opacity-100 transition
                     hover:bg-black/75 hover:text-white"
          aria-label="Scroll left"
        >
          ◀
        </button>

        <button
          type="button"
          onClick={() => scrollByCards("right")}
          className="absolute right-2 top-1/2 z-20 -translate-y-1/2
                     rounded-full border border-white/15 bg-black/50 p-3
                     text-white/80 backdrop-blur opacity-0 group-hover:opacity-100 transition
                     hover:bg-black/75 hover:text-white"
          aria-label="Scroll right"
        >
          ▶
        </button>

        <div
          ref={rowRef}
          className="flex gap-3 overflow-x-auto pb-6 no-scrollbar scroll-smooth px-10 snap-x"
        >
          {filtered.map((s) => (
			  <button
				key={s.id}
				onClick={() => setActiveSkill(s)}
				className="group/poster min-w-[180px] sm:min-w-[180px] md:min-w-[185px]
						   snap-start text-left transition duration-200
						   hover:z-10 hover:scale-[1.08]"
			  >
				<div
				  className="relative aspect-[2/3] overflow-hidden rounded-xl bg-white/5
							 shadow-[0_0_0_1px_rgba(255,255,255,0.08)]
							 group-hover/poster:shadow-[0_0_0_1px_rgba(255,255,255,0.18),0_18px_60px_rgba(0,0,0,0.65)]"
				>
				  <img
					src={s.image}
					alt={s.realTitle}
					className="h-full w-full object-cover transition duration-200 group-hover/poster:scale-[1.04]"
				  />

				  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent opacity-0 group-hover/poster:opacity-100 transition" />

				  <div className="absolute left-3 right-3 bottom-3 opacity-0 group-hover/poster:opacity-100 transition">
					<div className="text-[10px] uppercase tracking-[0.25em] text-white/70">
					  {s.category}
					</div>
					<div className="mt-1 text-sm font-semibold leading-snug">
					  {s.movieTitle}
					</div>
					<div className="mt-1 text-xs text-white/70">
					  {s.realTitle}
					</div>

					<div className="mt-2 flex flex-wrap gap-2">
					  {s.badges.map((b) => (
						<Badge key={`${s.id}-${b}`} b={b} />
					  ))}
					</div>
				  </div>
				</div>
			  </button>
			))}

        </div>
      </div>

      <SkillModal skill={activeSkill} onClose={() => setActiveSkill(null)} />
    </section>
  );
}


/* ===================== PAGE ===================== */

export default function Home() {
  const [activeCard, setActiveCard] = useState<Card | null>(null);

  const [profile, setProfile] = useState<string | null>(null);
  useEffect(() => {
    setProfile(localStorage.getItem("rsflix_profile"));
  }, []);

  // Keep if you still want to sanity-check missing images while working
  const requiredThumbs = useMemo(
    () => [
      "/hero/featured.jpg",
      "/thumbs/DBA_Manager.png",
      "/thumbs/Assistant_DBA_Team_Lead.jpg",
      "/thumbs/Database_Analyst.jpg",
      "/thumbs/DBA_Coordinator.jpg",
      "/thumbs/CRISIL.jpg",
      "/thumbs/Business_Analytics.jpg",
      "/thumbs/Professional_Accounting_Practice.jpg",
      "/thumbs/Bachelor_of_Accounting_Finance.jpg",
      "/thumbs/PowerShell_Automation.jpg",
      "/thumbs/Python_Automation.jpg",
      "/thumbs/1Z0-082.jpg",
      "/thumbs/1Z0-071.jpg",
      "/thumbs/oci1.jpg",
      "/thumbs/genai.jpg",
      "/thumbs/multicloud.jpg",
      "/thumbs/cloud.jpg",
      "/thumbs/ml.jpg",
      "/thumbs/oci.jpg",
    ],
    []
  );

  return (
    <main className="min-h-screen bg-[#050508] text-white">
      {/* NAV */}
      <header className="sticky top-0 z-20 border-b border-white/10 bg-black/40 backdrop-blur">
        <div className="mx-auto max-w-6xl px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-white text-black px-3 py-1 text-sm font-black tracking-tight">
              R
            </div>
            <div className="text-lg font-semibold tracking-wide">Rahil_Flix</div>
          </div>

          <nav className="flex gap-6 text-sm text-white/80">
            <Link href="/" className="hover:text-white">
              Home
            </Link>
            <Link href="/projects" className="hover:text-white">
              Projects
            </Link>
            <Link href="/contact" className="hover:text-white">
              Contact
            </Link>
            <Link href="/profiles" className="hover:text-white">
              Profiles
            </Link>
          </nav>
        </div>
      </header>

      {/* HERO (Netflix-ish featured) */}
      <section className="relative h-[62vh] min-h-[460px] overflow-hidden">
		  {/* Background Video */}
		  <video
			className="absolute inset-0 h-full w-full object-cover"
			src="/hero/featured.mp4"
			autoPlay
			muted
			loop
			playsInline
		  />

		  {/* Dark overlays for Netflix feel */}
		  <div className="absolute inset-0 bg-gradient-to-r from-black via-black/20 to-transparent" />
		  <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-transparent to-black/10" />

		  {/* Content */}
		  <div className="relative w-full px-8 sm:px-12 lg:px-16 pt-20">
			<div className="max-w-[720px]">
			  <div className="text-[11px] uppercase tracking-[0.35em] text-white/70">
				Featured • Automation • DBA • WebLogic
			  </div>

			  <h1 className="mt-4 text-5xl sm:text-6xl font-extrabold tracking-tight leading-[1.02]">
				Rahil Shah
			  </h1>

			  <p className="mt-3 text-lg text-white/80">
				Oracle DBA Manager · Automation Engineer · Middleware Specialist
			  </p>

			  <div className="mt-6 flex flex-wrap gap-3">
				<Link
				  href="/contact"
				  className="rounded-2xl border border-white/20 bg-white/5 px-7 py-3 text-sm font-semibold hover:bg-white/10"
				>
				  More Info
				</Link>

				<a
				  href="/Rahil_Shah_Resume.pdf"
				  className="rounded-2xl border border-white/20 px-7 py-3 text-sm font-semibold text-white/90 hover:bg-white/10"
				>
				  Download Resume
				</a>
			  </div>

			  <div className="mt-6 text-xs text-white/60">
				Automation Expert • Reliability obsessed • Enterprise Operations
			  </div>
			</div>
		  </div>
		</section>


      {/* CONTENT */}
      <section className="mx-auto max-w-6xl px-5 pb-10">
        <PosterRow
          title="Trending Now: Work Experience"
          subtitle="Click a poster to view details"
          items={workExperience}
          onClick={setActiveCard}
        />

        <PosterRow
          title="Recommended For You"
          subtitle="Education (Click the card for More details"
          items={educationCards}
          onClick={setActiveCard}
        />

        <SkillsSection />

        {/* Optional debug */}
        {/* <pre className="text-xs text-white/40">{JSON.stringify(requiredThumbs, null, 2)}</pre> */}
      </section>

      <CardModal card={activeCard} onClose={() => setActiveCard(null)} />

      <footer className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-5 py-10 text-xs text-white/50">
          © {new Date().getFullYear()} Rahil Shah • Rahil_Flix
        </div>
      </footer>
    </main>
  );
}
