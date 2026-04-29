import { Link } from "react-router-dom";
import CTASection from "../components/CTASection";
import FeatureCard from "../components/FeatureCard";
import LandingNavbar from "../components/LandingNavbar";
import SectionContainer from "../components/SectionContainer";

const features = [
  {
    icon: "◻",
    title: "Project Management",
    description: "Organize initiatives, ownership, and delivery timelines in one focused workspace.",
  },
  {
    icon: "▣",
    title: "Task Tracking",
    description: "See work clearly across status, assignee, priority, and deadline contexts.",
  },
  {
    icon: "◫",
    title: "Team Collaboration",
    description: "Keep people, teams, and cross-functional delivery aligned without noise.",
  },
  {
    icon: "◇",
    title: "Milestones & Delivery",
    description: "Track important checkpoints, momentum, and schedule confidence as work evolves.",
  },
  {
    icon: "◎",
    title: "Notifications & Activity",
    description: "Surface the right changes and project movement without overwhelming the team.",
  },
  {
    icon: "◈",
    title: "AI-ready Workspace",
    description: "Prepared for future intelligent routing, summaries, risk signals, and decision support.",
  },
];

const steps = [
  {
    number: "01",
    title: "Create Projects",
    description: "Define initiatives with clear ownership, timelines, and structure from the start.",
  },
  {
    number: "02",
    title: "Assign Tasks",
    description: "Turn plans into execution by routing work to the right people with visible priorities.",
  },
  {
    number: "03",
    title: "Track Progress",
    description: "Follow activity, milestones, and delivery health as work moves through the system.",
  },
];

const differentiators = [
  "Triage / Inbox for intake and routing",
  "Decision log built into project detail views",
  "Activity timeline for operational context",
  "AI-ready architecture for future orchestration",
  "Focused workspace designed for real project execution",
];

function LandingPage() {
  return (
    <div className="landing-shell">
      <LandingNavbar />

      <main className="landing-main">
        <section className="landing-hero">
          <div className="landing-hero-copy">
            <span className="landing-eyebrow">AI-native project coordination platform</span>
            <h1>AI Native Project Management System</h1>
            <p>
              A modern operating surface for projects, tasks, teams, milestones, and delivery visibility,
              designed to evolve into a deeply AI-native project management product.
            </p>
            <div className="btn-row">
              <Link to="/login" className="btn brand">
                Get Started
              </Link>
              <Link to="/login" className="btn ghost">
                Login
              </Link>
            </div>
          </div>
          <div className="landing-hero-visual">
            <div className="hero-panel hero-panel-primary">
              <strong>Execution overview</strong>
              <span>Projects, tasks, milestones, notifications, and timeline-aware coordination.</span>
            </div>
            <div className="hero-panel">
              <strong>Built for clarity</strong>
              <span>Focused UI for real work management instead of generic placeholder dashboards.</span>
            </div>
          </div>
        </section>

        <SectionContainer
          eyebrow="Features"
          title="Core product capabilities"
          description="A clean SaaS-style surface for the workflows teams rely on every day."
        >
          <div className="feature-grid">
            {features.map((feature) => (
              <FeatureCard key={feature.title} {...feature} />
            ))}
          </div>
        </SectionContainer>

        <SectionContainer
          eyebrow="How It Works"
          title="From planning to delivery"
          description="A simple flow designed to support project setup, execution, and ongoing coordination."
        >
          <div className="steps-grid">
            {steps.map((step) => (
              <article key={step.number} className="step-card">
                <span className="step-number">{step.number}</span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </article>
            ))}
          </div>
        </SectionContainer>

        <SectionContainer
          eyebrow="Why It Stands Out"
          title="Designed like a real product, ready for deeper intelligence"
          description="Built to feel like a serious PM tool today while staying ready for future AI-native workflows."
        >
          <div className="differentiator-grid">
            {differentiators.map((item) => (
              <div key={item} className="differentiator-card">
                <span className="brand-mark" aria-hidden="true" />
                <p>{item}</p>
              </div>
            ))}
          </div>
        </SectionContainer>

        <CTASection />
      </main>

      <footer className="landing-footer">
        <div>
          <strong>AI Native Project Management System</strong>
          <p>AI-native project coordination platform for modern teams.</p>
        </div>
        <div className="split-actions">
          <Link to="/login">Login</Link>
          <Link to="/">About</Link>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
