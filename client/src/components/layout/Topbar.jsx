import { CalendarDays, Plus } from 'lucide-react';
export default function Topbar({ onAdd }) {
 return <header className="topbar"><div><span className="breadcrumb">Workspace /</span> <strong>Overview</strong></div><div className="top-actions"><span className="today"><CalendarDays size={15}/> Your job search</span><button className="primary" onClick={onAdd}><Plus size={17}/> Add application</button></div></header>;
}
