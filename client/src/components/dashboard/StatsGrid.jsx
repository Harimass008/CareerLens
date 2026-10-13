import { BriefcaseBusiness, CalendarDays, CircleCheck, Clock3 } from 'lucide-react';
export default function StatsGrid({ dashboard }) {
 const counts = dashboard.status_counts || {};
 const stats = [
  { label: 'Total applications', value: dashboard.total ?? 0, note: 'Opportunities in your pipeline', icon: BriefcaseBusiness, tone: 'blue' },
  { label: 'Interviews & assessments', value: (counts.interview || 0) + (counts.assessment || 0), note: 'Keep preparing and following up', icon: CalendarDays, tone: 'purple' },
  { label: 'Offers received', value: counts.offer || 0, note: 'Celebrate every milestone', icon: CircleCheck, tone: 'green' },
  { label: 'Awaiting response', value: (counts.applied || 0) + (counts.saved || 0), note: 'Consider a thoughtful follow-up', icon: Clock3, tone: 'amber' },
 ];
 return <div className="stats-grid">{stats.map(item => { const Icon = item.icon; return <div className="stat-card" key={item.label}><div className="stat-top"><span>{item.label}</span><span className={`stat-icon ${item.tone}`}><Icon size={18}/></span></div><strong>{item.value}</strong><small>{item.note}</small></div>; })}</div>;
}
