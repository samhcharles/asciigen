'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Nav } from '@/components/Nav';
import { Btn } from '@/components/Btn';
import { AsciiEngine, DEFAULT_CHARS } from '@asciigen/engine';
import { generateConfigFromPrompt, SceneConfig } from '@/lib/ai';

export default function Studio() {
  const [prompt, setPrompt] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [asciiPreview, setAsciiPreview] = useState<string[]>([]);
  const [config, setConfig] = useState<SceneConfig | null>(null);
  const engine = useRef(new AsciiEngine());
  const animationFrame = useRef<number>();

  useEffect(() => {
    const text = "Asciigen by Orinadus. High performance ASCII backgrounds. One daemon. Boundless spikes. ".repeat(10);
    let offset = 0;

    const animate = () => {
      offset = (offset + 1) % text.length;
      const shiftedText = text.slice(offset) + text.slice(0, offset);
      
      // Use the engine to reflow the text
      const lines = engine.current.reflowText(shiftedText, 400); // 400px width
      setAsciiPreview(lines.slice(0, 20)); // Show top 20 lines

      animationFrame.current = requestAnimationFrame(animate);
    };

    animate();
    return () => {
      if (animationFrame.current) cancelAnimationFrame(animationFrame.current);
    };
  }, []);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      console.log('Dropped file:', files[0].name);
    }
  };

  const handleGenerate = async () => {
    const newConfig = await generateConfigFromPrompt(prompt);
    setConfig(newConfig);
    console.log('AI Generated Config:', newConfig);
    // In a real app, we'd update the engine parameters here
  };

  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Nav />

      <div style={{ 
        flex: 1, 
        display: 'flex', 
        paddingTop: 'var(--nav-h)', 
        height: '100vh',
        overflow: 'hidden'
      }}>
        {/* Sidebar */}
        <aside style={{
          width: '320px',
          background: 'var(--nav-bg)',
          backdropFilter: 'var(--glass-blur-panel)',
          borderRight: '1px solid var(--glass-border)',
          display: 'flex',
          flexDirection: 'column',
          padding: '24px',
          gap: '24px',
          zIndex: 10
        }}>
          <div>
            <h2 style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              AI Generator
            </h2>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe your animation..."
              style={{
                width: '100%',
                height: '100px',
                background: 'var(--input-bg)',
                border: '1px solid var(--btn-border)',
                borderRadius: '8px',
                padding: '12px',
                color: 'var(--o-fg)',
                fontFamily: 'inherit',
                fontSize: '13px',
                resize: 'none',
                outline: 'none',
                marginBottom: '12px',
                transition: 'border-color var(--dur-fast)'
              }}
            />
            <Btn glint="prism" filled style={{ width: '100%' }} onClick={handleGenerate}>
              Generate with AI
            </Btn>
          </div>

          <div style={{ borderTop: '1px solid var(--glass-border)', paddingTop: '24px' }}>
            <h2 style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Configuration
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Mode</span>
                <span style={{ color: 'var(--o-fg)' }}>{config?.type || 'Text Reflow'}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Density</span>
                <span style={{ color: 'var(--o-fg)' }}>High</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Preview Area */}
        <section 
          style={{ 
            flex: 1, 
            position: 'relative',
            background: '#000',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '48px',
            overflow: 'hidden'
          }}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {isDragging && (
            <div style={{
              position: 'absolute',
              inset: '24px',
              border: '2px dashed var(--btn-border-hov)',
              borderRadius: '24px',
              background: 'rgba(255, 255, 255, 0.05)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 20,
              pointerEvents: 'none',
              backdropFilter: 'blur(8px)'
            }}>
              <span style={{ fontSize: '16px', color: 'var(--text-primary)' }}>Drop asset to convert</span>
            </div>
          )}

          {/* ASCII Animation Preview */}
          <div style={{
            fontFamily: 'monospace',
            fontSize: '10px',
            lineHeight: '1.2',
            color: 'var(--o-fg)',
            whiteSpace: 'pre',
            userSelect: 'none',
            opacity: 0.8
          }}>
            {asciiPreview.map((line, i) => (
              <div key={i}>{line}</div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
