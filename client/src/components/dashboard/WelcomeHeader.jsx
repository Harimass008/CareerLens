import { RefreshCw } from 'lucide-react';
export default function WelcomeHeader({ onRefresh }) {
 return <div className="welcome-row"><div><span className="eyebrow">YOUR CAREER DASHBOARD</span><h1>Good things take <em>momentum.</em></h1><p className="muted">Here's how your job search is shaping up.</p></div><button className="quiet-button" onClick={onRefresh}><RefreshCw size={15}/> Refresh</button></div>;
}
