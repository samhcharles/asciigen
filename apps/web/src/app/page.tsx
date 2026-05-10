'use client';

import { Nav } from "@/components/Nav";
import { Btn } from "@/components/Btn";
import { AsciiPreview } from "@/components/AsciiPreview";

const LIBRARY_ITEMS = [
  { title: "Urchin Symbiote", type: "urchin", glint: "prism", desc: "The official Orinadus substrate visual." },
  { title: "Flowing Sphere", type: "sphere", glint: "cloud", desc: "Gentle organic breathing in ASCII." },
  { title: "Monolithic Box", type: "box", glint: "lava", desc: "Hard edges, soft rendering." },
  { title: "Zenith Torus", type: "torus", glint: "prism", desc: "Mathematical perfection in text." },
  { title: "Substrate Pulse", type: "urchin", glint: "cloud", desc: "High-frequency spike oscillation." },
  { title: "Boundless Spikes", type: "urchin", glint: "lava", desc: "Extreme geometric projection." },
];

export default function Home() {
  return (
    <main style={{ minHeight: '100vh', padding: '120px 24px 60px', background: 'var(--o-bg)' }}>
      <Nav />
      
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', 
          gap: '32px' 
        }}>
          {LIBRARY_ITEMS.map((item, i) => (
            <div key={i} style={{
              height: '340px',
              background: 'var(--glass-bg)',
              border: '1px solid var(--glass-border)',
              borderRadius: 'var(--radius-panel)',
              display: 'flex',
              flexDirection: 'column',
              transition: 'all var(--dur-med) var(--ease-quart)',
              cursor: 'pointer',
              overflow: 'hidden',
              position: 'relative'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--glass-border-strong)';
              e.currentTarget.style.background = 'var(--glass-bg-strong)';
              e.currentTarget.style.transform = 'translateY(-4px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--glass-border)';
              e.currentTarget.style.background = 'var(--glass-bg)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
            >
              <div style={{ flex: 1, pointerEvents: 'none' }}>
                <AsciiPreview type={item.type} resolution={0.12} />
              </div>
              
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'flex-end',
                padding: '24px',
                background: 'linear-gradient(to top, rgba(5,5,7,1), rgba(5,5,7,0))',
                marginTop: '-80px',
                zIndex: 2
              }}>
                <div>
                  <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '4px' }}>
                    {item.type}
                  </div>
                  <div style={{ fontSize: '20px', fontWeight: 500, color: 'var(--text-primary)', marginBottom: '4px' }}>
                    {item.title}
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                    {item.desc}
                  </div>
                </div>
                <Btn size="sm" glint={item.glint as any} style={{ padding: '6px 12px', fontSize: '12px' }}>
                  Copy Code
                </Btn>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
