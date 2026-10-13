export const STATUSES = ['saved', 'applied', 'assessment', 'interview', 'offer', 'rejected'];
export const EMPTY_APPLICATION = { company: '', role: '', location: '', job_url: '', status: 'saved', applied_date: '', salary_range: '', notes: '', next_step: '' };
export const titleCase = value => value ? value[0].toUpperCase() + value.slice(1) : '';
