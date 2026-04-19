'use client';
import { useState } from 'react';
import { competitiveData } from '../lib/data';

export default function Dashboard() {
  const [selectedCompany, setSelectedCompany] = useState(null);
  const data = competitiveData[2025];
  const companies = Object.keys(data);

  const getColor = (vuln) => vuln < 3 ? 'rgb(34, 197, 94)' : vuln < 7 ? 'rgb(249, 115, 22)' : 'rgb(239, 68, 68)';

  return (
    <div style={{ padding: '2rem', maxWidth: '1400px', margin: '0 auto', fontFamily: 'system-ui' }}>
      <h1 style={{ fontSize: '32px', fontWeight: 600, marginBottom: '1rem' }}>Nvidia datacenter competitive positioning</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', marginBottom: '2rem' }}>
        {companies.map((comp) => (
          <button key={comp} onClick={() => setSelectedCompany(comp)} style={{ padding: '12px', backgroundColor: selectedCompany === comp ? '#f0f4f8' : 'white', border: '1px solid #e2e8f0', borderRadius: '6px', cursor: 'pointer', fontWeight: 500 }}>
            {comp}
          </button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '2rem' }}>
        <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '1.25rem' }}>
          <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '8px' }}>Market share</div>
          <div style={{ fontSize: '32px', fontWeight: 700 }}>{selectedCompany ? data[selectedCompany].marketShare.toFixed(1) : '—'}%</div>
        </div>
        <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '1.25rem' }}>
          <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '8px' }}>TAM growth</div>
          <div style={{ fontSize: '32px', fontWeight: 700 }}>{selectedCompany ? data[selectedCompany].tamGrowth : '—'}%</div>
        </div>
        <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '1.25rem' }}>
          <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '8px' }}>Vulnerability</div>
          <div style={{ fontSize: '32px', fontWeight: 700, color: getColor(selectedCompany ? data[selectedCompany].vulnerability : 5) }}>{selectedCompany ? data[selectedCompany].vulnerability.toFixed(1) : '—'}/10</div>
        </div>
      </div>

      {selectedCompany && (
        <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '1.5rem', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '1rem' }}>{selectedCompany} profile</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '1rem' }}>
            {['techMaturity', 'ecosystem', 'scale', 'brand'].map((key, idx) => (
              <div key={idx}>
                <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '6px', fontWeight: 600 }}>{key}</div>
                <div style={{ height: '8px', background: '#e2e8f0', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${(data[selectedCompany][key] / 10) * 100}%`, background: data[selectedCompany][key] >= 8 ? '#22c55e' : '#f97316' }} />
                </div>
                <div style={{ fontSize: '13px', fontWeight: 700, marginTop: '4px' }}>{data[selectedCompany][key].toFixed(1)}/10</div>
              </div>
            ))}
          </div>
          <p style={{ fontSize: '13px', color: '#475569', margin: 0 }}>{data[selectedCompany].narrative}</p>
        </div>
      )}

      <div style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '1.5rem' }}>
        <h2 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '1rem' }}>Export</h2>
        <button onClick={() => { const json = JSON.stringify(data, null, 2); const blob = new Blob([json], { type: 'application/json' }); const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = 'nvidia-analysis.json'; a.click(); }} style={{ padding: '10px 18px', background: '#0f172a', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 600, marginRight: '12px' }}>
          Export JSON
        </button>
      </div>
    </div>
  );
}
