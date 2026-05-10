'use client';

import React from 'react';
import { Btn } from './Btn';

export function Nav() {
  return (
    <nav style={{
      position: 'fixed',
      top: '12px',
      left: '12px',
      right: '12px',
      height: 'var(--nav-h)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 20px',
      background: 'var(--nav-bg)',
      backdropFilter: 'var(--glass-blur-nav)',
      border: '1px solid var(--glass-border)',
      boxShadow: 'var(--glass-shadow)',
      borderRadius: '14px',
      zIndex: 1000,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <div style={{
          width: '24px',
          height: '24px',
          background: 'var(--o-fg)',
          borderRadius: '4px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '14px',
          fontWeight: 900,
          color: 'var(--o-bg)',
        }}>A</div>
        <span style={{ fontSize: '16px', fontWeight: 600, letterSpacing: '-0.02em' }}>asciigen</span>
      </div>

      <div style={{ display: 'flex', gap: '8px' }}>
        <Btn glint="prism" filled href="/studio">
          Generate your own
        </Btn>
      </div>
    </nav>
  );
}
