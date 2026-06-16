'use client';
import { useEffect, useState } from 'react';

const KEY = 'apex-theme';

export default function ThemeToggle() {
  const [theme, setTheme] = useState('dark');
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let saved = null;
    try { saved = localStorage.getItem(KEY); } catch {}
    const initial = saved || (window.matchMedia?.('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
    apply(initial);
    setTheme(initial);
    setReady(true);
  }, []);

  function apply(t) {
    const root = document.documentElement;
    root.classList.toggle('light', t === 'light');
    root.classList.toggle('dark', t === 'dark');
  }

  function toggle() {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    apply(next);
    try { localStorage.setItem(KEY, next); } catch {}
  }

  return (
    <button
      onClick={toggle}
      aria-label="Toggle light or dark theme"
      title={ready ? `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode` : 'Toggle theme'}
      className="glass rounded-full w-10 h-10 grid place-items-center text-base hover:scale-105 active:scale-95 transition"
    >
      <span suppressHydrationWarning>{ready ? (theme === 'dark' ? '☀️' : '🌙') : '☀️'}</span>
    </button>
  );
}
