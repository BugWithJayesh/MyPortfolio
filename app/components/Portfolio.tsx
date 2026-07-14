"use client";

import {
  ArrowDown,
  ArrowRight,
  Check,
  ContactRound,
  GitFork,
  Mail,
  MapPin,
  Menu,
  Moon,
  Send,
  Sparkles,
  Sun,
  X,
} from "lucide-react";
import { AnimatePresence, MotionConfig, motion } from "motion/react";
import { type FormEvent, type ReactNode, useEffect, useRef, useState } from "react";
import {
  currentSkills,
  interests,
  journey,
  learningSkills,
  navItems,
  projects,
} from "../data";

const EMAIL = "exe.jayesh@gmail.com";
const GITHUB = "https://github.com/BugWithJayesh";
const FORMSPREE_ENDPOINT = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT?.trim();

type ContactField = "name" | "email" | "message";
type ContactValues = Record<ContactField, string>;
type ContactErrors = Partial<Record<ContactField, string>>;
type SubmissionStatus = "idle" | "sending" | "success" | "error";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateContactForm(values: ContactValues): ContactErrors {
  const errors: ContactErrors = {};

  if (!values.name) errors.name = "Please enter your name.";
  if (!values.email) {
    errors.email = "Please enter your email address.";
  } else if (!EMAIL_PATTERN.test(values.email)) {
    errors.email = "Please enter a valid email address.";
  }
  if (!values.message) errors.message = "Please enter a message.";

  return errors;
}

function FadeIn({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.16 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="section-heading">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {description ? <p className="section-description">{description}</p> : null}
    </div>
  );
}

function ThemeToggle({ onToggle }: { onToggle: () => void }) {
  return (
    <button
      type="button"
      className="icon-button theme-toggle"
      onClick={onToggle}
      aria-label="Toggle color theme"
      title="Toggle color theme"
    >
      <Sun className="theme-icon sun-icon" aria-hidden="true" />
      <Moon className="theme-icon moon-icon" aria-hidden="true" />
    </button>
  );
}

function Header({ onThemeToggle }: { onThemeToggle: () => void }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
      <div className="nav-shell">
        <a className="brand" href="#top" aria-label="Jayesh Bairagi, back to top">
          <span>JB</span>
        </a>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {navItems.map((item) => (
            <a href={item.href} key={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="nav-actions">
          <ThemeToggle onToggle={onThemeToggle} />
          <button
            type="button"
            className="icon-button menu-button"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen ? (
          <motion.nav
            id="mobile-navigation"
            className="mobile-nav"
            aria-label="Mobile navigation"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.24 }}
          >
            {navItems.map((item, index) => (
              <a href={item.href} key={item.href} onClick={() => setMenuOpen(false)}>
                <span>0{index + 1}</span>
                {item.label}
              </a>
            ))}
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </header>
  );
}

function Hero() {
  const item = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section id="top" className="hero" aria-labelledby="hero-heading">
      <motion.div
        className="hero-copy"
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.1, delayChildren: 0.08 } } }}
      >
        <motion.div className="availability" variants={item} transition={{ duration: 0.5 }}>
          <span className="status-dot" aria-hidden="true" />
          Open to software development internships
        </motion.div>
        <motion.p className="hero-kicker" variants={item} transition={{ duration: 0.5 }}>
          Hello, I&apos;m Jayesh.
        </motion.p>
        <motion.h1 id="hero-heading" variants={item} transition={{ duration: 0.6 }}>
          Learning to build software that feels <span>considered.</span>
        </motion.h1>
        <motion.p className="hero-intro" variants={item} transition={{ duration: 0.6 }}>
          I&apos;m Jayesh Bairagi, an aspiring software developer and Computer Science student
          focused on strong fundamentals, thoughtful interfaces, and consistent progress.
        </motion.p>
        <motion.div className="hero-actions" variants={item} transition={{ duration: 0.5 }}>
          <a className="button button-primary" href="#projects">
            See what&apos;s next <ArrowRight aria-hidden="true" />
          </a>
          <a className="button button-secondary" href={`mailto:${EMAIL}`}>
            <Mail aria-hidden="true" /> Get in touch
          </a>
        </motion.div>
      </motion.div>

      <motion.div
        className="hero-portrait-wrap"
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="portrait-ring" role="img" aria-label="Profile photo placeholder for Jayesh Bairagi">
          <div className="portrait-placeholder">
            <span>JB</span>
            <small>Photo</small>
          </div>
        </div>
        <div className="portrait-caption">
          <MapPin aria-hidden="true" /> Nagda Junction, India
        </div>
      </motion.div>

      <a className="scroll-cue" href="#about" aria-label="Scroll to about section">
        <span>Explore</span>
        <ArrowDown aria-hidden="true" />
      </a>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="section about-section" aria-labelledby="about-title">
      <FadeIn>
        <SectionHeading eyebrow="01 / About" title="Curious by nature. Consistent by choice." />
      </FadeIn>
      <FadeIn className="about-grid">
        <p className="about-lead" id="about-title">
          I&apos;m at the start of my software development journey—and I&apos;m taking the time
          to build it on solid foundations.
        </p>
        <div className="about-copy">
          <p>
            I&apos;m a Computer Science student who enjoys learning new technologies, solving
            problems, and understanding what makes a digital experience feel clear and useful.
          </p>
          <p>
            Right now, I&apos;m focused on improving one concept at a time: practicing core
            programming, learning modern development tools, and documenting the progress through
            the projects I build.
          </p>
          <div className="principles" aria-label="What guides my work">
            {[
              ["01", "Stay curious"],
              ["02", "Practice daily"],
              ["03", "Build with care"],
            ].map(([number, label]) => (
              <div key={number}>
                <span>{number}</span>
                <strong>{label}</strong>
              </div>
            ))}
          </div>
        </div>
      </FadeIn>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills" className="section" aria-labelledby="skills-title">
      <FadeIn>
        <SectionHeading
          eyebrow="02 / Skills"
          title="A focused toolkit, growing deliberately."
          description="Depth starts with the fundamentals. Here is what I use today and what I am actively learning next."
        />
      </FadeIn>

      <FadeIn className="skills-layout">
        <div className="skill-feature">
          <p className="mini-label">Current foundation</p>
          {currentSkills.map(({ name, description, icon: Icon }) => (
            <div className="skill-feature-inner" key={name}>
              <div className="skill-icon"><Icon aria-hidden="true" /></div>
              <div>
                <h3>{name}</h3>
                <p>{description}</p>
              </div>
              <span className="active-chip"><Check aria-hidden="true" /> Practicing</span>
            </div>
          ))}
        </div>

        <div className="learning-panel">
          <p className="mini-label"><Sparkles aria-hidden="true" /> Currently learning</p>
          <div className="learning-list">
            {learningSkills.map(({ name, icon: Icon }) => (
              <div className="learning-item" key={name}>
                <Icon aria-hidden="true" />
                <span>{name}</span>
                <span className="learning-arrow">↗</span>
              </div>
            ))}
          </div>
        </div>
      </FadeIn>
    </section>
  );
}

function Journey() {
  return (
    <section id="journey" className="section" aria-labelledby="journey-title">
      <FadeIn>
        <SectionHeading
          eyebrow="03 / Journey"
          title="Progress, one meaningful step at a time."
          description="A simple record of where I started, what I am working on now, and where I am headed."
        />
      </FadeIn>
      <FadeIn className="timeline">
        {journey.map((item, index) => (
          <article className="timeline-item" key={item.year}>
            <div className="timeline-marker" aria-hidden="true">
              <span>{String(index + 1).padStart(2, "0")}</span>
            </div>
            <p className="timeline-year">{item.year}</p>
            <div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          </article>
        ))}
      </FadeIn>
    </section>
  );
}

function Projects() {
  return (
    <section id="projects" className="section" aria-labelledby="projects-title">
      <FadeIn>
        <SectionHeading
          eyebrow="04 / Projects"
          title="The work is in progress."
          description="I am currently building real-world projects. This space will evolve as I continue my development journey."
        />
      </FadeIn>

      <div className="projects-grid">
        {projects.map((project, index) => (
          <FadeIn className="project-card" key={project.number}>
            <div className={`project-visual project-visual-${index + 1}`} aria-hidden="true">
              <div className="visual-toolbar"><span /><span /><span /></div>
              <div className="visual-number">{project.number}</div>
              <div className="visual-lines"><span /><span /><span /></div>
            </div>
            <div className="project-content">
              <div className="project-meta">
                <span>{project.focus}</span>
                <span>In progress</span>
              </div>
              <h3>Project Coming Soon</h3>
              <p>
                Currently building real-world projects. This section will be updated as I
                continue my development journey.
              </p>
              <div className="project-actions" aria-label="Project links coming soon">
                <button type="button" disabled><GitFork aria-hidden="true" /> Coming Soon</button>
                <button type="button" disabled>Live Demo <ArrowRight aria-hidden="true" /></button>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section id="experience" className="section" aria-labelledby="experience-title">
      <FadeIn>
        <SectionHeading eyebrow="05 / Experience" title="Learning in the classroom and beyond." />
      </FadeIn>
      <FadeIn className="experience-list">
        <article className="experience-item">
          <div className="experience-index">01</div>
          <div>
            <p className="experience-type">Experience</p>
            <h3>Data Labelling Intern</h3>
          </div>
          <p className="experience-description">
            Worked on data annotation and quality verification tasks for machine learning
            datasets while maintaining consistency and accuracy.
          </p>
          <span className="experience-date">Previous role</span>
        </article>
        <article className="experience-item">
          <div className="experience-index">02</div>
          <div>
            <p className="experience-type">Education</p>
            <h3>B.Tech, Computer Science</h3>
            <p className="experience-org">MIT College</p>
          </div>
          <p className="experience-description">
            Building a broad foundation in computer science while independently exploring
            software and web development.
          </p>
          <span className="experience-date">2024 — 2028</span>
        </article>
      </FadeIn>

      <FadeIn className="interests-row">
        <p className="mini-label">Beyond the code</p>
        <div className="interest-list">
          {interests.map(({ name, icon: Icon }) => (
            <span key={name}><Icon aria-hidden="true" /> {name}</span>
          ))}
        </div>
      </FadeIn>
    </section>
  );
}

function Contact() {
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<{ type: SubmissionStatus; message: string }>({
    type: "idle",
    message: "",
  });
  const submissionLock = useRef(false);
  const isSending = status.type === "sending";

  const handleInput = (event: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const field = event.currentTarget.name as ContactField;

    setErrors((current) => {
      if (!current[field]) return current;
      return { ...current, [field]: undefined };
    });

    if (status.type === "success" || status.type === "error") {
      setStatus({ type: "idle", message: "" });
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submissionLock.current) return;

    const formElement = event.currentTarget;
    const formData = new FormData(formElement);
    const values: ContactValues = {
      name: String(formData.get("name") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim(),
      message: String(formData.get("message") ?? "").trim(),
    };
    const validationErrors = validateContactForm(values);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setStatus({ type: "error", message: "Please check the highlighted fields." });
      const firstInvalidField = (Object.keys(validationErrors) as ContactField[])[0];
      formElement.querySelector<HTMLElement>(`[name="${firstInvalidField}"]`)?.focus();
      return;
    }

    if (!FORMSPREE_ENDPOINT) {
      setStatus({
        type: "error",
        message: "The contact form is not configured yet. Please use the email link instead.",
      });
      return;
    }

    submissionLock.current = true;
    setErrors({});
    setStatus({ type: "sending", message: "Sending your message…" });

    const payload = new FormData();
    payload.append("name", values.name);
    payload.append("email", values.email);
    payload.append("message", values.message);
    payload.append("_subject", `Portfolio message from ${values.name}`);

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: payload,
      });

      if (!response.ok) {
        const result = await response.json().catch(() => null) as
          | { errors?: Array<{ message?: string }> }
          | null;
        const formspreeMessage = result?.errors?.find((item) => item.message)?.message;
        throw new Error(formspreeMessage ?? "Message could not be sent. Please try again.");
      }

      formElement.reset();
      setStatus({ type: "success", message: "Message sent successfully" });
    } catch (error) {
      const message =
        error instanceof Error && error.message !== "Failed to fetch"
          ? error.message
          : "Message could not be sent. Please check your connection and try again.";
      setStatus({ type: "error", message });
    } finally {
      submissionLock.current = false;
    }
  };

  return (
    <section id="contact" className="section contact-section" aria-labelledby="contact-title">
      <FadeIn className="contact-copy">
        <p className="eyebrow">06 / Contact</p>
        <h2 id="contact-title">Let&apos;s build something worth learning from.</h2>
        <p>
          I&apos;m looking for internship opportunities, thoughtful feedback, and conversations
          with people who care about building useful software.
        </p>
        <div className="contact-links">
          <a href={`mailto:${EMAIL}`}><Mail aria-hidden="true" /><span>Email<small>{EMAIL}</small></span></a>
          <a href={GITHUB} target="_blank" rel="noreferrer"><GitFork aria-hidden="true" /><span>GitHub<small>@BugWithJayesh</small></span></a>
          <span className="disabled-social" aria-label="LinkedIn profile coming soon"><ContactRound aria-hidden="true" /><span>LinkedIn<small>Coming soon</small></span></span>
        </div>
      </FadeIn>

      <FadeIn className="contact-form-wrap">
        <form
          className="contact-form"
          action={FORMSPREE_ENDPOINT}
          method="POST"
          onSubmit={handleSubmit}
          aria-busy={isSending}
          noValidate
        >
          <div className="form-row">
            <label>
              <span>Your name</span>
              <input
                name="name"
                type="text"
                autoComplete="name"
                placeholder="Your name"
                onInput={handleInput}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? "contact-name-error" : undefined}
                required
              />
              {errors.name ? <small id="contact-name-error" className="field-error">{errors.name}</small> : null}
            </label>
            <label>
              <span>Email address</span>
              <input
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                onInput={handleInput}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? "contact-email-error" : undefined}
                required
              />
              {errors.email ? <small id="contact-email-error" className="field-error">{errors.email}</small> : null}
            </label>
          </div>
          <label>
            <span>Message</span>
            <textarea
              name="message"
              rows={6}
              placeholder="Tell me about the opportunity or idea…"
              onInput={handleInput}
              aria-invalid={Boolean(errors.message)}
              aria-describedby={errors.message ? "contact-message-error" : undefined}
              required
            />
            {errors.message ? <small id="contact-message-error" className="field-error">{errors.message}</small> : null}
          </label>
          <div className="form-footer">
            {status.message ? (
              <p
                className={`form-status form-status-${status.type}`}
                role={status.type === "error" ? "alert" : "status"}
                aria-live={status.type === "error" ? "assertive" : "polite"}
              >
                {status.message}
              </p>
            ) : null}
            <button className="button button-primary" type="submit" disabled={isSending}>
              {isSending ? "Sending…" : "Send message"} <Send aria-hidden="true" />
            </button>
          </div>
        </form>
      </FadeIn>
    </section>
  );
}

export function Portfolio() {
  const toggleTheme = () => {
    const next = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  return (
    <MotionConfig reducedMotion="user">
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <Header onThemeToggle={toggleTheme} />
      <main id="main-content">
        <Hero />
        <About />
        <Skills />
        <Journey />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <footer className="footer">
        <a className="brand footer-brand" href="#top" aria-label="Back to top"><span>JB</span></a>
        <p>Designed &amp; built by Jayesh Bairagi.</p>
        <p>© {new Date().getFullYear()} · Learning, building, improving.</p>
      </footer>
    </MotionConfig>
  );
}
