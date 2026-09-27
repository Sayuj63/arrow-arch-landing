"use client";
import { useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Brand, DemoLink, Icon, SectionLabel } from "./ui";
gsap.registerPlugin(ScrollTrigger);
const roles = [
  {
    name: "PM",
    icon: "pm",
    title: "Understands the ask.",
    text: "Turns your request into clear acceptance criteria.",
    artifact: "Acceptance criteria",
  },
  {
    name: "Architect",
    icon: "architect",
    title: "Chooses the way.",
    text: "Sets structure, file scope, dependencies and proof commands.",
    artifact: "Bounded work packets",
  },
  {
    name: "Workers",
    icon: "workers",
    title: "Build small pieces.",
    text: "One bounded packet. One isolated Git worktree per worker.",
    artifact: "Scoped changes",
  },
  {
    name: "Orchestrator",
    icon: "orchestrator",
    title: "Keeps control.",
    text: "Owns state, order, processes, retries and the live ledger.",
    artifact: "Controlled execution",
  },
  {
    name: "Verifier",
    icon: "verifier",
    title: "Proves the result.",
    text: "Reads the actual diff. Independently re-runs the checks.",
    artifact: "Independent proof",
  },
];
const problems = [
  [
    "Context disappears",
    "Earlier decisions get lost. The re-explaining starts again.",
  ],
  ["Workers collide", "The same files. The same ports. Conflicting changes."],
  ["“Done” is not proof", "A confident summary can still hide a failing test."],
  [
    "Project conventions drift",
    "Wrong folders, wrong APIs, unnecessary dependencies.",
  ],
  [
    "Fixes create collateral damage",
    "A repair breaks working code. The loop continues.",
  ],
  [
    "Humans still babysit the output",
    "Reviewing everything becomes a second full-time job.",
  ],
];
const faqs = [
  [
    "Does Arrow replace developers?",
    "No. Arrow handles bounded implementation work and proof. Humans still own product decisions, critical rule conflicts and review of what lands.",
  ],
  [
    "Does it change how our company structures code?",
    "No. Onboarding exists specifically so Arrow can learn your existing repository rules and team conventions.",
  ],
  [
    "What happens when a worker fails?",
    "Arrow makes bounded recovery attempts: one retry, one re-plan, then escalation to a human. It does not loop forever.",
  ],
  [
    "Does Arrow push code automatically?",
    "The current product produces a local reviewable task branch. It does not automatically push production changes.",
  ],
];
function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  const panels = useRef<(HTMLDivElement | null)[]>([]);
  function toggle(i: number) {
    const next = open === i ? null : i;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    panels.current.forEach((el, index) => {
      if (el)
        gsap.to(el, {
          height: index === next ? "auto" : 0,
          opacity: index === next ? 1 : 0,
          duration: reduce ? 0 : 0.45,
          ease: "power3.out",
          overwrite: true,
        });
    });
    panels.current.forEach((el, index) => {
      const plus = el?.previousElementSibling?.querySelector(".plus");
      if (plus)
        gsap.to(plus, {
          rotation: index === next ? 45 : 0,
          duration: reduce ? 0 : 0.35,
          ease: "power3.out",
          overwrite: true,
        });
    });
    setOpen(next);
  }
  return (
    <div className="faq-list">
      {faqs.map(([q, a], i) => (
        <div className={`faq-row ${open === i ? "is-open" : ""}`} key={q}>
          <h3>
            <button
              aria-expanded={open === i}
              aria-controls={`faq-panel-${i}`}
              id={`faq-question-${i}`}
              onClick={() => toggle(i)}
            >
              <span>{q}</span>
              <span className="plus" aria-hidden="true">
                +
              </span>
            </button>
          </h3>
          <div
            id={`faq-panel-${i}`}
            role="region"
            aria-labelledby={`faq-question-${i}`}
            aria-hidden={open !== i}
            ref={(el) => {
              panels.current[i] = el;
            }}
            className="faq-panel"
            style={{ height: i === 0 ? "auto" : 0, opacity: i === 0 ? 1 : 0 }}
          >
            <p>{a}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
export default function Landing() {
  const root = useRef<HTMLDivElement>(null);
  const [menu, setMenu] = useState(false);
  useLayoutEffect(() => {
    const mm = gsap.matchMedia();
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        start: 30,
        onUpdate: (s) =>
          document
            .querySelector(".site-header")
            ?.classList.toggle("scrolled", s.scroll() > 30),
      });
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap
          .timeline({ defaults: { ease: "power3.out" } })
          .from(".hero .line-inner", {
            yPercent: 115,
            duration: 1,
            stagger: 0.13,
          })
          .from(
            ".hero-visual",
            { clipPath: "inset(0 100% 0 0)", opacity: 0, duration: 1.2 },
            0.3,
          )
          .from(".hero-target", { opacity: 0, scale: 0.8, duration: 0.6 }, 1)
          .from(
            ".hero-copy .hero-detail",
            { opacity: 0, y: 24, duration: 0.65, stagger: 0.12 },
            0.7,
          );
        gsap.from(".source-node", {
          opacity: 0,
          y: 24,
          stagger: 0.15,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: ".signals", start: "top 80%", once: true },
        });
        gsap.utils
          .toArray<HTMLElement>("[data-reveal]")
          .forEach((el) =>
            gsap.from(el, {
              y: 30,
              opacity: 0,
              duration: 0.85,
              ease: "power3.out",
              scrollTrigger: { trigger: el, start: "top 91%", once: true },
            }),
          );
        document
          .querySelectorAll<SVGPathElement>("[data-draw]")
          .forEach((path) => {
            const length = path.getTotalLength();
            gsap.fromTo(
              path,
              { strokeDasharray: length, strokeDashoffset: length },
              {
                strokeDashoffset: 0,
                duration: 1.4,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: path.closest("section"),
                  start: "top 62%",
                  once: true,
                },
              },
            );
          });
        const crew = gsap.timeline({
          scrollTrigger: {
            trigger: ".crew-scene",
            start: "top 80%",
            end: "bottom 65%",
            scrub: 0.7,
          },
        });
        crew.from(".crew-progress", {
          scaleX: 0,
          transformOrigin: "left",
          ease: "none",
        });
        gsap.utils
          .toArray<HTMLElement>(".role-node")
          .forEach((el, i) =>
            crew.fromTo(
              el,
              { borderColor: "#dadde2", color: "#68717f" },
              {
                borderColor: "#ff5a00",
                color: "#d44900",
                boxShadow: "0 0 32px rgba(255,90,0,.13)",
                duration: 0.2,
              },
              i * 0.16,
            ),
          );
        gsap.from(".memory-tag", {
          x: -26,
          opacity: 0,
          stagger: 0.07,
          duration: 0.8,
          scrollTrigger: {
            trigger: ".memory-scene",
            start: "top 72%",
            once: true,
          },
        });
        gsap.from(".memory-output", {
          x: -20,
          opacity: 0,
          stagger: 0.2,
          duration: 0.8,
          scrollTrigger: {
            trigger: ".memory-scene",
            start: "center 80%",
            once: true,
          },
        });
        gsap
          .timeline({
            scrollTrigger: {
              trigger: ".proof-canvas",
              start: "top 76%",
              once: true,
            },
          })
          .from(".diff-line", {
            opacity: 0,
            x: -18,
            duration: 0.4,
            stagger: 0.1,
          })
          .from(".check-row", {
            opacity: 0,
            y: 12,
            duration: 0.4,
            stagger: 0.15,
          })
          .from(".verified-stamp", { opacity: 0, scale: 0.95, duration: 0.5 });
      });
    }, root);
    return () => {
      mm.revert();
      ctx.revert();
    };
  }, []);
  return (
    <div ref={root}>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="site-header">
        <div className="header-inner">
          <Brand />
          <nav
            className={menu ? "nav open" : "nav"}
            aria-label="Main navigation"
          >
            {[
              ["Why Arrow", "#why"],
              ["How it works", "#crew"],
              ["Onboarding", "#onboarding"],
              ["Demo", "/demo"],
            ].map(([label, href]) => (
              <Link href={href} key={href} onClick={() => setMenu(false)}>
                {label}
              </Link>
            ))}
          </nav>
          <DemoLink className="button-small header-cta" />
          <button
            className="menu-button"
            aria-label={menu ? "Close navigation" : "Open navigation"}
            aria-expanded={menu}
            onClick={() => setMenu(!menu)}
          >
            <span />
            <span />
          </button>
        </div>
      </header>
      <main id="main">
        <section className="hero section-shell" aria-labelledby="hero-title">
          <div className="hero-grid" aria-hidden="true" />
          <div className="hero-copy">
            <div className="eyebrow hero-detail">
              <span className="status-dot" /> VERIFIED MULTI-AGENT DELIVERY
            </div>
            <h1 id="hero-title">
              <span className="line-mask">
                <span className="line-inner">Aim once.</span>
              </span>
              <span className="line-mask">
                <span className="line-inner accent">Land once.</span>
              </span>
            </h1>
            <p className="hero-description hero-detail">
              One clear request in. A bounded AI crew plans, builds and proves
              the change before it lands.
            </p>
            <div className="cta-row hero-detail">
              <DemoLink />
              <a className="text-link" href="#crew">
                See how it works <span>↘</span>
              </a>
            </div>
            <p className="bob-line hero-detail">
              Powered by <strong>IBM Bob Shell</strong> for the model roles.
            </p>
          </div>
          <div className="hero-visual">
            <img
              src="/assets/illustrations/hero-trajectory.webp"
              width="1672"
              height="941"
              alt="An orange trajectory connects a request, an AI crew and verified code to a target."
              fetchPriority="high"
            />
            <span className="visual-coordinate coordinate-start">
              01 — THE REQUEST
            </span>
            <span className="visual-coordinate coordinate-end hero-target">
              06 — THE LANDING <span>↗</span>
            </span>
          </div>
          <div className="hero-bottom">
            <div className="proof-chips">
              {[
                ["worktree", "Isolated workers"],
                ["shield", "Independent checks"],
                ["git_branch", "Reviewable branch"],
              ].map(([icon, label]) => (
                <span key={icon}>
                  <Icon name={icon} />
                  {label}
                </span>
              ))}
            </div>
            <a href="#why" className="scroll-cue">
              FOLLOW THE TRAJECTORY <span>↓</span>
            </a>
          </div>
        </section>
        <section
          id="why"
          className="research section-shell section-space"
          aria-labelledby="why-title"
        >
          <SectionLabel number="01">THE REASON FOR ARROW</SectionLabel>
          <div className="section-heading" data-reveal>
            <h2 id="why-title">
              Real problems.
              <br />
              <span className="muted-heading">A more deliberate system.</span>
            </h2>
            <p>
              Built around the things developers actually say when AI work goes
              sideways.
            </p>
          </div>
          <div className="research-field">
            <div className="signals">
              <div className="source-node source-x">
                <Icon name="x_source" />
                <div>
                  <strong>X</strong>
                  <span>Founders / operators</span>
                </div>
              </div>
              <div className="source-node source-reddit">
                <Icon name="reddit_source" />
                <div>
                  <strong>Reddit</strong>
                  <span>Technical practitioners</span>
                </div>
              </div>
              <div className="source-node source-stack">
                <Icon name="stackoverflow_source" />
                <div>
                  <strong>Stack Overflow</strong>
                  <span>Developers</span>
                </div>
              </div>
              <span className="signal-fragment fragment-one">
                It forgot the earlier decision.
              </span>
              <span className="signal-fragment fragment-two">
                The fix broke another part.
              </span>
              <span className="signal-fragment fragment-three">
                Two agents changed the same thing.
              </span>
              <svg
                className="signal-paths"
                viewBox="0 0 620 420"
                fill="none"
                aria-hidden="true"
              >
                <path data-draw d="M90 65 C340 65 280 210 495 210" />
                <path data-draw d="M130 205 C310 205 340 210 495 210" />
                <path data-draw d="M100 345 C350 345 280 210 495 210" />
                <path data-draw d="M495 210 H620" />
              </svg>
              <div className="memory-point">
                <img
                  src="/assets/arrow-mark.svg"
                  width="43"
                  height="43"
                  alt=""
                />
              </div>
              <span className="signal-caption">REPORTS → PATTERNS</span>
            </div>
            <div className="problem-constellation">
              {problems.map(([title, body], i) => (
                <div className="problem-phrase" key={title} data-reveal>
                  <span className="problem-index">0{i + 1}</span>
                  <div>
                    <h3>{title}</h3>
                    <p>{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <p className="research-footnote">
            Also in the reports: oversized context, invented APIs, the wrong
            thing built, environment setup failures and skipped or repeated tool
            calls.
          </p>
          <div className="research-bottom">
            <span>
              Real complaints <b>→</b> repeatable rules <b>→</b> safer execution
            </span>
            <small>
              Research themes, paraphrased from X, Reddit & Stack Overflow.
            </small>
          </div>
        </section>
        <section
          id="crew"
          className="crew section-shell section-space"
          aria-labelledby="crew-title"
        >
          <SectionLabel number="02">
            ONE REQUEST. SHARED DIRECTION.
          </SectionLabel>
          <div className="section-heading" data-reveal>
            <h2 id="crew-title">
              One prompt.
              <br />
              <span className="accent">A whole crew behind it.</span>
            </h2>
            <p>
              Each role exists to stop a different type of mistake. Every
              handoff has a purpose.
            </p>
          </div>
          <div className="crew-scene">
            <div className="crew-line" aria-hidden="true">
              <div className="crew-progress" />
              <span>→</span>
            </div>
            {roles.map((role, i) => (
              <div className={`role role-${i}`} key={role.name}>
                <div className="role-copy">
                  <span className="role-number">
                    0{i + 1} / {role.name.toUpperCase()}
                  </span>
                  <h3>{role.title}</h3>
                  <p>{role.text}</p>
                </div>
                <div className="role-node">
                  <Icon name={role.icon} />
                </div>
                <span className="role-artifact">{role.artifact}</span>
              </div>
            ))}
          </div>
          <div className="crew-landing" data-reveal>
            <span className="small-cross">+</span>
            <Icon name="git_branch" />
            <span>
              Reviewable branch <span className="accent">+ proof trail</span>
            </span>
            <span className="mono">READY FOR HUMAN REVIEW ↗</span>
          </div>
        </section>
        <section
          id="onboarding"
          className="onboarding section-shell section-space"
          aria-labelledby="onboard-title"
        >
          <SectionLabel number="03">YOUR REPO. YOUR RULES.</SectionLabel>
          <div className="section-heading" data-reveal>
            <h2 id="onboard-title">
              Onboard once.
              <br />
              <span className="accent">Run with your rules.</span>
            </h2>
            <p>
              Arrow learns your repository, your rules and the way your team
              works. That project context stays available for future tasks.
            </p>
          </div>
          <div className="memory-scene">
            <div className="memory-inputs">
              {[
                "Repository",
                "Company / team rules",
                "Folder structure",
                "Commands + versions",
                "Tech stack",
                "Coding conventions",
                "Approval rules",
                "Existing workflows",
              ].map((x, i) => (
                <span className="memory-tag" key={x}>
                  <span className="mono">0{i + 1}</span>
                  {x}
                  <span className="accent">↗</span>
                </span>
              ))}
            </div>
            <div className="memory-visual">
              <img
                src="/assets/illustrations/onboarding-memory.webp"
                width="1672"
                height="941"
                loading="lazy"
                alt="Repository structure and team rules flow into a durable project memory vault."
              />
              <div className="memory-outputs">
                <span className="memory-output">
                  <Icon name="prompt" /> Future Arrow tasks <b>↗</b>
                </span>
                <span className="memory-output">
                  <Icon name="code" /> New developer <b>↗</b>
                </span>
              </div>
            </div>
          </div>
          <div className="onboarding-notes" data-reveal>
            <div>
              <span className="mono">PROJECT MEMORY</span>
              <h3>
                Keep the context.
                <br />
                Skip the re-explaining.
              </h3>
              <p>
                Repo profile, commands, allowed structure, team conventions —
                including the rules you deliberately override.
              </p>
            </div>
            <div>
              <span className="mono">A NEW DEVELOPER JOINS?</span>
              <h3>
                The same memory.
                <br />A human head start.
              </h3>
              <p>
                The project context that guides agents can also explain where
                things live, how to run the repo and which conventions matter.
              </p>
            </div>
          </div>
        </section>
        <section
          id="proof"
          className="proof section-shell section-space"
          aria-labelledby="proof-title"
        >
          <SectionLabel number="04">TRUST THE LANDING</SectionLabel>
          <div className="section-heading" data-reveal>
            <h2 id="proof-title">
              Workers can say “done.”
              <br />
              <span className="accent">Arrow still checks.</span>
            </h2>
            <p>
              The model’s summary is never the final verdict. The control plane
              reads the actual diff and re-runs the proof.
            </p>
          </div>
          <div className="proof-scene">
            <div className="proof-side">
              <div>
                <Icon name="worktree" />
                <h3>Isolated work</h3>
                <p>Each worker edits its own Git worktree.</p>
              </div>
              <div>
                <Icon name="project_structure" />
                <h3>File scope</h3>
                <p>Changes stay inside the packet’s allowed files.</p>
              </div>
            </div>
            <div className="proof-canvas">
              <div className="canvas-top">
                <span>
                  <i /> CHANGE REVIEW
                </span>
                <span className="mono">ILLUSTRATIVE RUN</span>
              </div>
              <div className="diff-file">
                <Icon name="code" /> src / checkout / total.ts{" "}
                <span>+3 −1</span>
              </div>
              <div className="diff-code">
                <div className="diff-line context">
                  <span>12</span> export function total(items) {"{"}
                </div>
                <div className="diff-line removed">
                  <span>13 −</span> return sum(items);
                </div>
                <div className="diff-line added">
                  <span>13 +</span> const subtotal = sum(items);
                </div>
                <div className="diff-line added">
                  <span>14 +</span> return applyDiscount(subtotal);
                </div>
                <div className="diff-line context">
                  <span>15</span> {"}"}
                </div>
              </div>
              <div className="proof-checks">
                <div className="check-row">
                  <Icon name="verifier" />
                  <span>Changed files match allowed scope</span>
                  <b>PASS</b>
                </div>
                <div className="check-row">
                  <Icon name="verifier" />
                  <span>Required checks independently re-run</span>
                  <b>PASS</b>
                </div>
                <div className="check-row">
                  <Icon name="verifier" />
                  <span>Diff and proof attached to branch</span>
                  <b>PASS</b>
                </div>
              </div>
              <div className="verified-stamp">
                <Icon name="shield" />
                <strong>Proven. Ready for review.</strong>
                <Icon name="arrow" />
              </div>
            </div>
            <div className="proof-side">
              <div>
                <Icon name="git_branch" />
                <h3>Live ledger</h3>
                <p>Workers, processes, ports and ownership. Accounted for.</p>
              </div>
              <div>
                <Icon name="shield" />
                <h3>Independent proof</h3>
                <p>Arrow runs required commands before a packet can land.</p>
              </div>
            </div>
          </div>
          <div className="use-case-ribbon">
            {[
              ["code", "Web apps"],
              ["mobile", "Mobile"],
              ["server", "Backend / internal"],
              ["game", "Game development"],
              ["architect", "Any codebase"],
            ].map(([icon, text]) => (
              <span key={icon}>
                <Icon name={icon} />
                {text}
              </span>
            ))}
          </div>
          <p className="ribbon-caption">
            Small fix or large feature. Same control system.
            <span>
              Execution follows your repository’s toolchain and rules.
            </span>
          </p>
        </section>
        <section
          id="faq"
          className="closing-section section-shell section-space"
          aria-labelledby="faq-title"
        >
          <SectionLabel number="05">A FEW THINGS, BEFORE YOU ASK.</SectionLabel>
          <div className="faq-layout">
            <h2 id="faq-title" data-reveal>
              Questions are cheap.
              <br />
              <span className="muted-heading">
                Unproven code
                <br />
                is expensive.
              </span>
            </h2>
            <FAQ />
          </div>
          <div className="closing" data-reveal>
            <img
              className="closing-watermark"
              src="/assets/arrow-mark.svg"
              alt=""
              width="380"
              height="380"
            />
            <span className="eyebrow">
              <span className="status-dot" /> YOUR NEXT CHANGE STARTS HERE
            </span>
            <h2>
              Aim once.
              <br />
              <span className="accent">Land once.</span>
            </h2>
            <p>
              Give Arrow a clear request. Get back a reviewable branch with a
              proof trail.
            </p>
            <div className="cta-row">
              <DemoLink />
              <a
                className="text-link"
                href="https://github.com/AnshumanAtrey/the-arrow-arch"
                target="_blank"
                rel="noreferrer"
              >
                View repository <span>↗</span>
              </a>
            </div>
          </div>
        </section>
      </main>
      <footer className="footer section-shell">
        <Brand />
        <p>Built with IBM Bob Shell for model execution.</p>
        <a href="#main" className="back-top">
          BACK TO TOP ↑
        </a>
      </footer>
    </div>
  );
}
