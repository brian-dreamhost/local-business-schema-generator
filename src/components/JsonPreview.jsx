import { useState, useMemo } from 'react';
import { syntaxHighlight, generateScriptTag } from '../utils/schemaBuilder';

export default function JsonPreview({ schema }) {
  const [minified, setMinified] = useState(false);
  const [copied, setCopied] = useState(false);
  const [copyMode, setCopyMode] = useState('json'); // 'json' or 'script'

  const jsonString = useMemo(() => {
    if (!schema) return '';
    return minified ? JSON.stringify(schema) : JSON.stringify(schema, null, 2);
  }, [schema, minified]);

  const highlightedJson = useMemo(() => {
    if (!schema) return '';
    return syntaxHighlight(schema);
  }, [schema]);

  const highlightedMinified = useMemo(() => {
    if (!schema) return '';
    const min = JSON.stringify(schema);
    return syntaxHighlight(min);
  }, [schema]);

  const scriptTag = useMemo(() => {
    if (!schema) return '';
    return generateScriptTag(schema, minified);
  }, [schema, minified]);

  const handleCopy = async () => {
    const text = copyMode === 'script' ? scriptTag : jsonString;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.left = '-9999px';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const lineCount = jsonString.split('\n').length;

  if (!schema) {
    return (
      <div className="card-gradient border border-metal/20 rounded-2xl p-4 sm:p-6">
        <h2 className="text-lg font-bold text-white mb-4">JSON-LD Preview</h2>
        <div className="bg-midnight rounded-xl p-6 text-center">
          <svg className="w-12 h-12 mx-auto text-galactic mb-3" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" />
          </svg>
          <p className="text-galactic text-sm">Fill in your business details to see the generated JSON-LD schema here.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="card-gradient border border-metal/20 rounded-2xl p-4 sm:p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-white">JSON-LD Preview</h2>
        <span className="text-xs text-galactic">{lineCount} lines</span>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-1 bg-midnight rounded-lg p-0.5">
          <button
            type="button"
            onClick={() => setCopyMode('json')}
            className={`px-2.5 py-1.5 min-h-[44px] rounded-md text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-azure ${
              copyMode === 'json' ? 'bg-azure/20 text-azure' : 'text-galactic hover:text-cloudy'
            }`}
          >
            JSON-LD
          </button>
          <button
            type="button"
            onClick={() => setCopyMode('script')}
            className={`px-2.5 py-1.5 min-h-[44px] rounded-md text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-azure ${
              copyMode === 'script' ? 'bg-azure/20 text-azure' : 'text-galactic hover:text-cloudy'
            }`}
          >
            {'<script> Tag'}
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setMinified(!minified)}
            className="text-xs text-galactic hover:text-cloudy transition-colors min-h-[44px] px-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-azure focus:ring-offset-2 focus:ring-offset-abyss"
          >
            {minified ? 'Formatted' : 'Minified'}
          </button>

          <button
            type="button"
            onClick={handleCopy}
            className={`flex items-center gap-1.5 px-3 py-2 min-h-[44px] rounded-lg text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-azure focus:ring-offset-2 focus:ring-offset-abyss ${
              copied
                ? 'bg-turtle/20 text-turtle border border-turtle/30'
                : 'bg-azure text-white hover:bg-azure-hover'
            }`}
          >
            {copied ? (
              <>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
                Copied!
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9.75a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184" />
                </svg>
                Copy
              </>
            )}
          </button>
        </div>
      </div>

      {/* Code preview */}
      <div className="bg-midnight rounded-xl overflow-hidden">
        {copyMode === 'script' && (
          <div className="px-4 py-2 border-b border-metal/20">
            <span className="text-xs text-galactic font-mono">
              {'<script type="application/ld+json">'}
            </span>
          </div>
        )}
        <pre className="json-preview overflow-x-auto p-4 text-sm font-mono leading-relaxed max-h-[600px] overflow-y-auto">
          <code
            dangerouslySetInnerHTML={{
              __html: minified ? highlightedMinified : highlightedJson,
            }}
          />
        </pre>
        {copyMode === 'script' && (
          <div className="px-4 py-2 border-t border-metal/20">
            <span className="text-xs text-galactic font-mono">{'</script>'}</span>
          </div>
        )}
      </div>
    </div>
  );
}
