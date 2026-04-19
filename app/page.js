'use client';
import { useState, useRef, useEffect } from 'react';
import { competitiveData } from '../lib/data';

const COLORS = {
  bg: '#0a0a0f', surface: '#111118', border: '#1e1e2e', text: '#e2e8f0',
  muted: '#64748b', green: '#76b900', orange: '#f97316', red: '#ef4444',
};
const COMPANY_COLORS = { NVIDIA: '#76b900', AMD: '#ed1c24', Intel: '#0071c5', Qualcomm: '#3253dc' };

export default function Dashboard() {
  const [selectedCompany, setSelectedCompany] = useState('NVIDIA');
  const [aiQuery, setAiQuery] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [hoveredBubble, setHoveredBubble] = useState(null);
  const canvasRef = useRef(null);
  const data = competitiveData[2025];
  const companies = Object.keys(data);

  const getVulnColor = (v) => v < 3 ? COLORS.green : v < 7 ? COLORS.orange : COLORS.red;
  const getCompanyColor = (c) => COMPANY_COLORS[c] || '#888';

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const W = canvas.width, H = canvas.height;
    const pad = 60;
    ctx.clearRect(0, 0, W, H);
    ctx.strokeStyle = '#1e1e2e'; ctx.lineWidth = 1;
    for (let i = 0; i <= 4; i++) {
      const x = pad + (i / 4) * (W - pad * 2);
      const y = pad + (i / 4) * (H - pad * 2);
      ctx.beginPath(); ctx.moveTo(x, pad); ctx.lineTo(x, H - pad); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(pad, y); ctx.lineTo(W - pad, y); ctx.stroke();
    }
    ctx.fillStyle = '#64748b'; ctx.font = '11px monospace'; ctx.textAlign = 'center';
    ctx.fillText('Market Share', W / 2, H - 12);
    ctx.save(); ctx.translate(14, H / 2); ctx.rotate(-Math.PI / 2);
    ctx.fillText('TAM Growth', 0, 0); ctx.restore();
    companies.forEach((company) => {
      const d = data[company];
      const x = pad + (d.marketShare / 100) * (W - pad * 2);
      const y = H - pad - (d.tamGrowth / 50) * (H - pad * 2);
      const r = 16 + (1 - d.vulnerability / 10) * 24;
      const color = getCompanyColor(company);
      const isSelected = selectedCompany === company;
      const isHovered = hoveredBubble === company;
      if (isSelected || isHovered) {
        const grd = ctx.createRadialGradient(x, y, 0, x, y, r * 2);
        grd.addColorStop(0, color + '40'); grd.addColorStop(1, 'transparent');
        ctx.beginPath(); ctx.arc(x, y, r * 2, 0, Math.PI * 2);
        ctx.fillStyle = grd; ctx.fill();
      }
      ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fillStyle = color + (isSelected ? 'ee' : '88'); ctx.fill();
      ctx.strokeStyle = color; ctx.lineWidth = isSelected ? 3 : 1.5; ctx.stroke();
      ctx.fillStyle = '#fff'; ctx.font = (isSelected ? 'bold ' : '') + '12px monospace';
      ctx.textAlign = 'center'; ctx.fillText(company, x, y + r + 16);
    });
  }, [selectedCompany, hoveredBubble]);

  const handleCanvasClick = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const mx = (e.clientX - rect.left) * (canvas.width / rect.width);
    const my = (e.clientY - rect.top) * (canvas.height / rect.height);
    const pad = 60; const W = canvas.width, H = canvas.height;
    companies.forEach((company) => {
      const d = data[company];
      const x = pad + (d.marketShare / 100) * (W - pad * 2);
      const y = H - pad - (d.tamGrowth / 50) * (H - pad * 2);
      const r = 16 + (1 - d.vulnerability / 10) * 24;
      if (Math.hypot(mx - x, my - y) < r + 10) setSelectedCompany(company);
    });
  };

  const handleCanvasMove = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const mx = (e.clientX - rect.left) * (canvas.width / rect.width);
    const my = (e.clientY - rect.top) * (canvas.height / rect.height);
    const pad = 60; const W = canvas.width, H = canvas.height;
    let found = null;
    companies.forEach((company) => {
      const d = data[company];
      const x = pad + (d.marketShare / 100) * (W - pad * 2);
      const y = H - pad - (d.tamGrowth / 50) * (H - pad * 2);
      const r = 16 + (1 - d.vulnerability / 10) * 24;
      if (Math.hypot(mx - x, my - y) < r + 10) found = company;
    });
    setHoveredBubble(found);
    canvas.style.cursor = found ? 'pointer' : 'default';
  };

  const askAI = async () => {
    if (!aiQuery.trim()) return;
    setAiLoading(true); setAiResponse('');
    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: aiQuery, context: JSON.stringify(data, null, 2) }),
      });
      const json = await res.json();
      setAiResponse(json.answer || 'No response received.');
    } catch (err) {
      setAiResponse('Error connecting to AI. Check your API key in Vercel settings.');
    }
    setAiLoading(false);
  };

  const exportCSV = () => {
    const headers = ['Company', 'Market Share (%)', 'TAM Growth (%)', 'Vulnerability', 'Tech Maturity', 'Ecosystem', 'Scale', 'Brand', 'Narrative'];
    const rows = companies.map(c => { const d = data[c]; return [c, d.marketShare, d.tamGrowth, d.vulnerability, d.techMaturity, d.ecosystem, d.scale, d.brand, '"' + d.narrative + '"']; });
    const csv = [headers, ...rows].map(r => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' }); const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = 'nvidia-analysis.csv'; a.click();
  };

  const exportJSON = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = 'nvidia-analysis.json'; a.click();
  };

  const selected = data[selectedCompany];

  return (
    <div style={{ background: COLORS.bg, minHeight: '100vh', color: COLORS.text, fontFamily: '"IBM Plex Mono","Courier New",monospace', padding: 0 }}>
      <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@300;400;600;700&display=swap" rel="stylesheet" />
      <div style={{ borderBottom: '1px solid #1e1e2e', padding: '1.5rem 2.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontSize: '11px', color: '#76b900', letterSpacing: '0.2em', marginBottom: '4px' }}>DATACENTER INTELLIGENCE</div>
          <h1 style={{ fontSize: '22px', fontWeight: 700, margin: 0 }}>NVIDIA Competitive Positioning Matrix</h1>
        </div>
        <div style={{ fontSize: '11px', color: '#64748b', textAlign: 'right' }}>
          <div style={{ color: '#76b900', marginBottom: '2px' }}>● LIVE</div>
          <div>Q1 2025 Data</div>
        </div>
      </div>
      <div style={{ padding: '2rem 2.5rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '8px' }}>
            {companies.map((company) => (
              <button key={company} onClick={() => setSelectedCompany(company)} style={{ padding: '10px 8px', background: selectedCompany === company ? getCompanyColor(company) + '22' : '#111118', border: '1px solid ' + (selectedCompany === company ? getCompanyColor(company) : '#1e1e2e'), borderRadius: '4px', cursor: 'pointer', color: selectedCompany === company ? getCompanyColor(company) : '#64748b', fontFamily: 'inherit', fontSize: '12px', fontWeight: 600, letterSpacing: '0.05em' }}>
                {company.toUpperCase()}
              </button>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '12px' }}>
            {[{ label: 'MARKET SHARE', value: selected.marketShare.toFixed(1) + '%', color: COLORS.text }, { label: 'TAM GROWTH', value: selected.tamGrowth + '%', color: COLORS.text }, { label: 'VULNERABILITY', value: selected.vulnerability.toFixed(1) + '/10', color: getVulnColor(selected.vulnerability) }].map(({ label, value, color }) => (
              <div key={label} style={{ background: '#111118', border: '1px solid #1e1e2e', borderRadius: '6px', padding: '1rem' }}>
                <div style={{ fontSize: '9px', color: '#64748b', letterSpacing: '0.15em', marginBottom: '8px' }}>{label}</div>
                <div style={{ fontSize: '28px', fontWeight: 700, color, lineHeight: 1 }}>{value}</div>
              </div>
            ))}
          </div>
          <div style={{ background: '#111118', border: '1px solid #1e1e2e', borderRadius: '6px', padding: '1.25rem' }}>
            <div style={{ fontSize: '11px', color: '#64748b', letterSpacing: '0.15em', marginBottom: '1rem' }}>STRENGTH PROFILE — {selectedCompany}</div>
            {['techMaturity', 'ecosystem', 'scale', 'brand'].map((key) => (
              <div key={key} style={{ marginBottom: '14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                  <span style={{ fontSize: '11px', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{key}</span>
                  <span style={{ fontSize: '11px', fontWeight: 700, color: selected[key] >= 8 ? '#76b900' : '#f97316' }}>{selected[key].toFixed(1)}</span>
                </div>
                <div style={{ height: '4px', background: '#1e1e2e', borderRadius: '2px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: ((selected[key] / 10) * 100) + '%', background: selected[key] >= 8 ? '#76b900' : '#f97316', borderRadius: '2px', transition: 'width 0.4s ease' }} />
                </div>
              </div>
            ))}
            <p style={{ fontSize: '12px', color: '#64748b', margin: '1rem 0 0', fontStyle: 'italic' }}>{selected.narrative}</p>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button onClick={exportCSV} style={{ flex: 1, padding: '10px', background: '#111118', border: '1px solid #1e1e2e', borderRadius: '4px', color: '#e2e8f0', fontFamily: 'inherit', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}>↓ EXPORT CSV</button>
            <button onClick={exportJSON} style={{ flex: 1, padding: '10px', background: '#111118', border: '1px solid #1e1e2e', borderRadius: '4px', color: '#e2e8f0', fontFamily: 'inherit', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}>↓ EXPORT JSON</button>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ background: '#111118', border: '1px solid #1e1e2e', borderRadius: '6px', padding: '1.25rem' }}>
            <div style={{ fontSize: '11px', color: '#64748b', letterSpacing: '0.15em', marginBottom: '1rem' }}>POSITIONING MATRIX — CLICK BUBBLES TO SELECT</div>
            <canvas ref={canvasRef} width={500} height={320} onClick={handleCanvasClick} onMouseMove={handleCanvasMove} style={{ width: '100%', height: 'auto', borderRadius: '4px' }} />
            <div style={{ display: 'flex', gap: '16px', marginTop: '10px', flexWrap: 'wrap' }}>
              {companies.map(c => (
                <div key={c} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: '#64748b' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: getCompanyColor(c) }} />
                  {c}
                </div>
              ))}
            </div>
          </div>
          <div style={{ background: '#111118', border: '1px solid #1e1e2e', borderRadius: '6px', padding: '1.25rem', flex: 1 }}>
            <div style={{ fontSize: '11px', color: '#76b900', letterSpacing: '0.15em', marginBottom: '1rem' }}>AI ANALYSIS — POWERED BY OPENAI</div>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '1rem' }}>
              <input value={aiQuery} onChange={(e) => setAiQuery(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') askAI(); }}
                placeholder="e.g. Where is NVIDIA most vulnerable?"
                style={{ flex: 1, background: '#0a0a0f', border: '1px solid #1e1e2e', borderRadius: '4px', padding: '10px 12px', color: '#e2e8f0', fontFamily: 'inherit', fontSize: '12px', outline: 'none' }} />
              <button onClick={askAI} disabled={aiLoading} style={{ padding: '10px 16px', background: aiLoading ? '#1e1e2e' : '#76b900', color: '#000', border: 'none', borderRadius: '4px', cursor: aiLoading ? 'not-allowed' : 'pointer', fontFamily: 'inherit', fontSize: '12px', fontWeight: 700, whiteSpace: 'nowrap' }}>
                {aiLoading ? '...' : 'ASK'}
              </button>
            </div>
            <div style={{ display: 'flex', gap: '6px', marginBottom: '1rem', flexWrap: 'wrap' }}>
              {['AMD threat level?', 'Intel vs Qualcomm?', 'CUDA moat strength?'].map(q => (
                <button key={q} onClick={() => setAiQuery(q)} style={{ padding: '5px 10px', background: 'transparent', border: '1px solid #1e1e2e', borderRadius: '20px', color: '#64748b', fontFamily: 'inherit', fontSize: '10px', cursor: 'pointer' }}>{q}</button>
              ))}
            </div>
            {aiResponse && (
              <div style={{ background: '#0a0a0f', border: '1px solid #1e1e2e', borderRadius: '4px', padding: '1rem', fontSize: '13px', lineHeight: 1.7, color: '#e2e8f0', maxHeight: '200px', overflowY: 'auto' }}>
                {aiResponse}
              </div>
            )}
            {!aiResponse && !aiLoading && (
              <div style={{ fontSize: '12px', color: '#64748b', fontStyle: 'italic' }}>Ask a question about the competitive landscape to get AI-powered insights.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}