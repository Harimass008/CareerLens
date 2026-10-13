import { BriefcaseBusiness } from 'lucide-react';
import AuthScreen from './components/auth/AuthScreen';
import Sidebar from './components/layout/Sidebar';
import Topbar from './components/layout/Topbar';
import WelcomeHeader from './components/dashboard/WelcomeHeader';
import ErrorBanner from './components/dashboard/ErrorBanner';
import StatsGrid from './components/dashboard/StatsGrid';
import PipelineFilters from './components/applications/PipelineFilters';
import ApplicationList from './components/applications/ApplicationList';
import ApplicationModal from './components/applications/ApplicationModal';
import useCareerTrack from './hooks/useCareerTrack';

export default function App() {
 const state = useCareerTrack();
 if (!state.authenticated) return <AuthScreen onLogin={() => state.setAuthenticated(true)} />;
 const counts = state.dashboard.status_counts || {};
 return <div className="app-shell"><Sidebar profile={state.profile} onLogout={state.logout}/><main className="main-area"><Topbar onAdd={state.openNew}/><div className="content"><WelcomeHeader onRefresh={state.loadData}/><ErrorBanner message={state.error} onDismiss={() => state.setError('')}/><StatsGrid dashboard={state.dashboard}/><section className="pipeline-section"><div className="section-heading"><div><h2>Application pipeline</h2><p className="muted">Every opportunity, all in one place.</p></div></div><PipelineFilters counts={counts} statusFilter={state.statusFilter} onStatusFilter={state.setStatusFilter} query={state.query} onQueryChange={state.setQuery} resultCount={state.filtered.length}/><ApplicationList applications={state.filtered} loading={state.loading} totalApplications={state.applications.length} onAdd={state.openNew} onEdit={state.openEdit} onDelete={state.removeApplication}/></section><footer>CareerTrack <span>·</span> Stay consistent. Your next step matters.</footer></div></main><ApplicationModal open={state.modalOpen} editing={state.editing} form={state.form} setForm={state.setForm} error={state.error} saving={state.saving} onClose={() => state.setModalOpen(false)} onSubmit={state.saveApplication}/></div>;
}
