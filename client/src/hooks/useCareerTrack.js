import { useCallback, useEffect, useMemo, useState } from 'react';
import { api, clearTokens, getTokens } from '../api';
import { EMPTY_APPLICATION } from '../utils/constants';
export default function useCareerTrack() {
 const [authenticated, setAuthenticated] = useState(Boolean(getTokens().access));
 const [profile, setProfile] = useState(null); const [applications, setApplications] = useState([]); const [dashboard, setDashboard] = useState({ total: 0, status_counts: {} });
 const [loading, setLoading] = useState(true); const [error, setError] = useState(''); const [query, setQuery] = useState(''); const [statusFilter, setStatusFilter] = useState('all');
 const [modalOpen, setModalOpen] = useState(false); const [editing, setEditing] = useState(null); const [form, setForm] = useState(EMPTY_APPLICATION); const [saving, setSaving] = useState(false);
 const loadData = useCallback(async () => { if (!getTokens().access) { setLoading(false); return; } setLoading(true); setError(''); try { const [me, apps, dash] = await Promise.all([api('/auth/profile/'), api('/applications/'), api('/dashboard/')]); setProfile(me); setApplications(Array.isArray(apps) ? apps : apps.results || []); setDashboard(dash); setAuthenticated(true); } catch (err) { setError(err.message); if (/token|credential|authenticate/i.test(err.message)) { clearTokens(); setAuthenticated(false); } } finally { setLoading(false); } }, []);
 useEffect(() => { if (authenticated) loadData(); else setLoading(false); }, [authenticated, loadData]);
 const filtered = useMemo(() => applications.filter(app => `${app.company} ${app.role} ${app.location}`.toLowerCase().includes(query.toLowerCase()) && (statusFilter === 'all' || app.status === statusFilter)), [applications, query, statusFilter]);
 const openNew = () => { setEditing(null); setForm(EMPTY_APPLICATION); setError(''); setModalOpen(true); };
 const openEdit = app => { setEditing(app.id); setForm({ ...EMPTY_APPLICATION, ...app, applied_date: app.applied_date || '' }); setError(''); setModalOpen(true); };
 async function saveApplication(event) { event.preventDefault(); setSaving(true); setError(''); const payload = { ...form, applied_date: form.applied_date || null }; try { await api(editing ? `/applications/${editing}/` : '/applications/', { method: editing ? 'PUT' : 'POST', body: JSON.stringify(payload) }); setModalOpen(false); await loadData(); } catch (err) { setError(err.message); } finally { setSaving(false); } }
 async function removeApplication(id) { if (!window.confirm('Delete this application? This cannot be undone.')) return; try { await api(`/applications/${id}/`, { method: 'DELETE' }); await loadData(); } catch (err) { setError(err.message); } }
 function logout() { clearTokens(); setAuthenticated(false); setProfile(null); setApplications([]); setDashboard({ total: 0, status_counts: {} }); }
 return { authenticated, setAuthenticated, profile, applications, dashboard, loading, error, setError, query, setQuery, statusFilter, setStatusFilter, filtered, modalOpen, setModalOpen, editing, form, setForm, saving, loadData, openNew, openEdit, saveApplication, removeApplication, logout };
}
