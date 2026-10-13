import { useState } from 'react';
import { BriefcaseBusiness } from 'lucide-react';
import { api, setTokens } from '../../api';

export default function AuthScreen({ onLogin }) {
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const change = event => setForm(current => ({ ...current, [event.target.name]: event.target.value }));
  async function submit(event) {
    event.preventDefault(); setBusy(true); setError('');
    try {
      if (mode === 'register') await api('/auth/register/', { method: 'POST', body: JSON.stringify(form) });
      const tokens = await api('/auth/login/', { method: 'POST', body: JSON.stringify({ username: form.username || form.email, password: form.password }) });
      setTokens(tokens); onLogin();
    } catch (err) { setError(`${mode === 'register' ? 'Could not register' : 'Login failed'}: ${err.message}`); }
    finally { setBusy(false); }
  }
  return <main className="auth-shell"><section className="auth-art"><div className="brand"><span className="brand-icon"><BriefcaseBusiness size={20}/></span> CareerTrack</div><div className="art-copy"><span className="eyebrow">YOUR NEXT CHAPTER</span><h1>Make your next career move <em>count.</em></h1><p>One calm place to organize applications, track interviews, and turn your search into a plan.</p><div className="mini-stats"><div><b>01</b><span>Capture opportunities</span></div><div><b>02</b><span>Track every stage</span></div><div><b>03</b><span>Land your next role</span></div></div></div><div className="art-foot">CAREER SEARCH, WITH CLARITY.</div></section><section className="auth-panel"><div className="auth-card"><span className="eyebrow">WELCOME TO CAREERTRACK</span><h2>{mode === 'login' ? 'Welcome back' : 'Create your account'}</h2><p className="muted">{mode === 'login' ? 'Sign in to pick up where you left off.' : 'Start organizing your job search today.'}</p><form onSubmit={submit}>{mode === 'register' && <label>Username<input name="username" value={form.username} onChange={change} required minLength="3" placeholder="e.g. harishb" /></label>}<label>{mode === 'login' ? 'Username' : 'Email'}<input name={mode === 'login' ? 'username' : 'email'} value={mode === 'login' ? form.username : form.email} onChange={change} type={mode === 'register' ? 'email' : 'text'} required placeholder={mode === 'login' ? 'Your username' : 'you@example.com'} /></label><label>Password<input name="password" value={form.password} onChange={change} type="password" required minLength="8" placeholder="At least 8 characters" /></label>{error && <div className="error">{error}</div>}<button className="primary full" disabled={busy}>{busy ? 'Please wait…' : mode === 'login' ? 'Sign in' : 'Create account'}</button></form><p className="switch-auth">{mode === 'login' ? 'New to CareerTrack?' : 'Already have an account?'} <button onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); setError(''); }}>{mode === 'login' ? 'Create account' : 'Sign in'}</button></p><p className="tiny-note">Your applications are private to your account.</p></div></section></main>;
}
