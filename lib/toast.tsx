import toast from 'react-hot-toast';

// ── Design tokens — homepage consistent ─────────────────────────
const BASE = {
  background: '#0e0e18',
  color: 'rgba(255,255,255,0.88)',
  border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: '14px',
  fontSize: '13px',
  fontFamily: "'DM Sans', 'Inter', system-ui, sans-serif",
  fontWeight: '500',
  padding: '12px 16px',
  boxShadow: '0 8px 32px rgba(0,0,0,0.45)',
  maxWidth: '340px',
};

export const showToast = {

  success: (msg: string) =>
    toast.success(msg, {
      duration: 2800,
      style: { ...BASE, background: '#0a1410', border: '1px solid rgba(52,211,153,0.22)' },
      iconTheme: { primary: '#34d399', secondary: '#0a1410' },
    }),

  error: (msg: string) =>
    toast.error(msg, {
      duration: 4000,
      style: { ...BASE, background: '#140a0a', border: '1px solid rgba(239,68,68,0.22)' },
      iconTheme: { primary: '#f87171', secondary: '#140a0a' },
    }),

  // Loading — auto-dismiss after 8s as safety fallback
  loading: (msg: string): string => {
    const id = toast.loading(msg, {
      style: { ...BASE, color: 'rgba(255,255,255,0.55)' },
    });
    // Safety: auto-dismiss after 8s so it never gets stuck permanently
    setTimeout(() => toast.dismiss(id), 8000);
    return id;
  },

  // Achievement — short, non-intrusive
  achievement: (title: string, subtitle?: string) =>
    toast(
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div style={{
          width: 32, height: 32, borderRadius: 8, flexShrink: 0,
          background: 'rgba(52,211,153,0.1)',
          border: '1px solid rgba(52,211,153,0.2)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16,
        }}>🏆</div>
        <div>
          <p style={{ margin: 0, fontWeight: 600, fontSize: 13, color: 'rgba(255,255,255,0.92)' }}>{title}</p>
          {subtitle && <p style={{ margin: '1px 0 0', fontSize: 11, color: 'rgba(255,255,255,0.38)' }}>{subtitle}</p>}
        </div>
      </div>,
      {
        duration: 3500,
        style: { ...BASE, background: '#0a1410', border: '1px solid rgba(52,211,153,0.2)', padding: '8px 14px' },
      }
    ),

  // Weekly stats — shows once per session
  stats: (weeklyCount: number, totalCount: number) =>
    toast(
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div style={{
          width: 32, height: 32, borderRadius: 8, flexShrink: 0,
          background: 'rgba(52,211,153,0.08)',
          border: '1px solid rgba(52,211,153,0.18)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15,
        }}>📊</div>
        <div>
          <p style={{ margin: 0, fontWeight: 600, fontSize: 13, color: 'rgba(255,255,255,0.9)' }}>
            {weeklyCount} quiz{weeklyCount !== 1 ? 'zes' : ''} this week
          </p>
          <p style={{ margin: '1px 0 0', fontSize: 11, color: 'rgba(255,255,255,0.35)' }}>
            {totalCount} total · keep it up!
          </p>
        </div>
      </div>,
      {
        duration: 3000,
        style: { ...BASE, background: '#0a1410', border: '1px solid rgba(52,211,153,0.18)', padding: '8px 14px' },
      }
    ),
};