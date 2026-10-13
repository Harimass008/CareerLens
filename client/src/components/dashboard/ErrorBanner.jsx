import { X } from 'lucide-react';
export default function ErrorBanner({ message, onDismiss }) {
 if (!message) return null;
 return <div className="error-banner"><span>{message}</span><button onClick={onDismiss} aria-label="Dismiss error"><X size={16}/></button></div>;
}
