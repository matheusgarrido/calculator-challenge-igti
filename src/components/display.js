import React from 'react';

export default function Display({ value }) {
  return (
    <main>
      <label>{value || '0'}</label>
    </main>
  );
}
