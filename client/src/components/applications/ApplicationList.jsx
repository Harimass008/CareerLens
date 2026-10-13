import { BriefcaseBusiness, RefreshCw, Plus } from 'lucide-react';
import ApplicationRow from './ApplicationRow';
export default function ApplicationList({ applications, loading, totalApplications, onAdd, onEdit, onDelete }) {
 if (loading) return <div className="empty-state"><RefreshCw className="spin"/><p>Loading your applications…</p></div>;
 if (!applications.length) return <div className="empty-state"><div className="empty-icon"><BriefcaseBusiness size={24}/></div><h3>{totalApplications ? 'No matching applications' : 'Your next opportunity starts here'}</h3><p>{totalApplications ? 'Try changing your search or status filter.' : 'Add your first job application to start building your pipeline.'}</p>{!totalApplications && <button className="primary" onClick={onAdd}><Plus size={16}/> Add first application</button>}</div>;
 return <div className="applications-list">{applications.map(app => <ApplicationRow key={app.id} application={app} onEdit={onEdit} onDelete={onDelete}/>)}</div>;
}
