'use client';

import { useEffect, useState } from 'react';
import DOMPurify from 'dompurify';

export default function HtmlRenderer({ html }) {
  const [safeHtml, setSafeHtml] = useState('');

  useEffect(() => {
    // Only runs in browser
    setSafeHtml(DOMPurify.sanitize(html));
  }, [html]);

  if (!safeHtml) return null;

  return (
    <div
      className="prose"
      dangerouslySetInnerHTML={{ __html: safeHtml }}
    />
  );
}
