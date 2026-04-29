import EmptyState from "../components/EmptyState";
import IntegrationPendingState from "../components/IntegrationPendingState";
import PageHeader from "../components/PageHeader";
import SectionCard from "../components/SectionCard";

function InboxPage() {
  return (
    <>
      <PageHeader
        title="Inbox"
        subtitle="Triage incoming work, route unclear ownership, and keep intake from slipping through the cracks."
      />

      <section className="content-grid triage-grid">
        <SectionCard title="Unassigned Items" subtitle="Work that needs ownership before execution starts.">
          <EmptyState
            title="No unassigned items"
            description="Unowned tasks and unresolved work intake will appear here."
          />
        </SectionCard>
        <SectionCard title="Pending Review" subtitle="Approvals and review loops waiting on attention.">
          <EmptyState
            title="Nothing pending review"
            description="Review requests will surface here once review workflows are connected."
          />
        </SectionCard>
        <SectionCard title="Newly Created Work" subtitle="Latest intake across projects and teams.">
          <EmptyState
            title="No new work items"
            description="Recently created tasks, initiatives, and requests will show up here."
          />
        </SectionCard>
        <SectionCard title="Backlog Intake" subtitle="Unshaped demand before it becomes committed work.">
          <EmptyState
            title="Backlog intake is empty"
            description="Incoming requests and candidate work will populate this stream."
          />
        </SectionCard>
      </section>

      <SectionCard
        title="AI Suggestions"
        subtitle="Placeholder for future suggestions like routing, prioritization, and risk signals."
      >
        <IntegrationPendingState
          title="AI triage suggestions pending"
          description="Attach AI orchestration or recommendation endpoints later to surface smart routing and summaries."
        />
      </SectionCard>
    </>
  );
}

export default InboxPage;
