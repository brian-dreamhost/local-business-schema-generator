import { useState, useMemo } from 'react';

export default function ValidationLinks({ schema }) {
  const [showGuide, setShowGuide] = useState(false);

  const googleUrl = useMemo(() => {
    if (!schema) return '#';
    // Google Rich Results Test accepts a code snippet parameter
    const code = encodeURIComponent(JSON.stringify(schema, null, 2));
    return `https://search.google.com/test/rich-results?code=${code}`;
  }, [schema]);

  const schemaOrgUrl = useMemo(() => {
    if (!schema) return '#';
    const code = encodeURIComponent(JSON.stringify(schema, null, 2));
    return `https://validator.schema.org/#url=data:application/ld%2Bjson,${code}`;
  }, [schema]);

  return (
    <div className="space-y-4">
      {/* Validation Buttons */}
      <div className="card-gradient border border-metal/20 rounded-2xl p-4 sm:p-6">
        <h2 className="text-lg font-bold text-white mb-3">Validate Your Schema</h2>
        <p className="text-sm text-galactic mb-4">Test your schema markup to ensure it is valid and eligible for rich results in Google Search.</p>

        <div className="flex flex-col sm:flex-row gap-3">
          <a
            href={googleUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center justify-center gap-2 px-4 py-2.5 min-h-[44px] rounded-lg text-sm font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-azure focus:ring-offset-2 focus:ring-offset-abyss ${
              schema
                ? 'bg-azure text-white hover:bg-azure-hover'
                : 'bg-metal/20 text-galactic cursor-not-allowed pointer-events-none'
            }`}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
            </svg>
            Test with Google Rich Results
          </a>
          <a
            href={schemaOrgUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center justify-center gap-2 px-4 py-2.5 min-h-[44px] rounded-lg text-sm font-medium border transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-azure focus:ring-offset-2 focus:ring-offset-abyss ${
              schema
                ? 'border-metal/30 text-cloudy hover:text-white hover:border-metal/50'
                : 'border-metal/20 text-galactic cursor-not-allowed pointer-events-none'
            }`}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
            </svg>
            Test with Schema.org Validator
          </a>
        </div>
      </div>

      {/* Installation Guide */}
      <div className="card-gradient border border-metal/20 rounded-2xl p-4 sm:p-6">
        <button
          type="button"
          onClick={() => setShowGuide(!showGuide)}
          className="flex items-center justify-between w-full text-left min-h-[44px] focus:outline-none focus:ring-2 focus:ring-azure focus:ring-offset-2 focus:ring-offset-abyss rounded-lg"
        >
          <div>
            <h2 className="text-lg font-bold text-white">Where to Add This to Your Website</h2>
            <p className="text-sm text-galactic mt-0.5">Step-by-step instructions for popular platforms</p>
          </div>
          <svg
            className={`w-5 h-5 text-galactic transition-transform duration-200 shrink-0 ml-2 ${showGuide ? 'rotate-180' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
          </svg>
        </button>

        {showGuide && (
          <div className="mt-4 space-y-4 animate-fadeIn">
            {/* WordPress */}
            <div className="border border-metal/20 rounded-xl p-4">
              <h3 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
                <span className="w-6 h-6 rounded bg-azure/10 text-azure flex items-center justify-center text-xs font-bold">W</span>
                WordPress
              </h3>
              <ol className="text-sm text-cloudy space-y-1.5 list-decimal list-inside">
                <li>Install a plugin like <span className="text-azure">Rank Math SEO</span> or <span className="text-azure">Yoast SEO</span></li>
                <li>Go to the page/post editor for your homepage</li>
                <li>Look for the Schema/Structured Data section in the SEO settings</li>
                <li>Choose &ldquo;Custom Schema&rdquo; or &ldquo;Code Snippet&rdquo; and paste the JSON-LD</li>
                <li>Alternatively, paste the <code className="bg-midnight px-1.5 py-0.5 rounded text-xs text-turtle">&lt;script&gt;</code> tag into your theme&apos;s <code className="bg-midnight px-1.5 py-0.5 rounded text-xs text-turtle">&lt;head&gt;</code> section</li>
              </ol>
            </div>

            {/* Wix */}
            <div className="border border-metal/20 rounded-xl p-4">
              <h3 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
                <span className="w-6 h-6 rounded bg-azure/10 text-azure flex items-center justify-center text-xs font-bold">Wx</span>
                Wix
              </h3>
              <ol className="text-sm text-cloudy space-y-1.5 list-decimal list-inside">
                <li>Go to <span className="text-azure">Settings &rarr; Custom Code</span> (under Advanced)</li>
                <li>Click <span className="text-azure">+ Add Custom Code</span></li>
                <li>Paste the full <code className="bg-midnight px-1.5 py-0.5 rounded text-xs text-turtle">&lt;script&gt;</code> tag</li>
                <li>Set placement to &ldquo;Head&rdquo; and apply to &ldquo;Home Page&rdquo; (or specific pages)</li>
                <li>Click Apply and Publish</li>
              </ol>
            </div>

            {/* Squarespace */}
            <div className="border border-metal/20 rounded-xl p-4">
              <h3 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
                <span className="w-6 h-6 rounded bg-azure/10 text-azure flex items-center justify-center text-xs font-bold">Sq</span>
                Squarespace
              </h3>
              <ol className="text-sm text-cloudy space-y-1.5 list-decimal list-inside">
                <li>Go to <span className="text-azure">Settings &rarr; Advanced &rarr; Code Injection</span></li>
                <li>Paste the <code className="bg-midnight px-1.5 py-0.5 rounded text-xs text-turtle">&lt;script&gt;</code> tag in the &ldquo;Header&rdquo; section</li>
                <li>For page-specific schema, edit the page and add a Code Block</li>
                <li>Save and publish your changes</li>
              </ol>
            </div>

            {/* Raw HTML */}
            <div className="border border-metal/20 rounded-xl p-4">
              <h3 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
                <span className="w-6 h-6 rounded bg-azure/10 text-azure flex items-center justify-center text-xs font-bold">&lt;/&gt;</span>
                HTML / Custom Website
              </h3>
              <ol className="text-sm text-cloudy space-y-1.5 list-decimal list-inside">
                <li>Copy the <code className="bg-midnight px-1.5 py-0.5 rounded text-xs text-turtle">&lt;script&gt;</code> tag version above</li>
                <li>Open your homepage HTML file</li>
                <li>Paste it inside the <code className="bg-midnight px-1.5 py-0.5 rounded text-xs text-turtle">&lt;head&gt;</code> section, before the closing <code className="bg-midnight px-1.5 py-0.5 rounded text-xs text-turtle">&lt;/head&gt;</code> tag</li>
                <li>Deploy/upload the updated file</li>
              </ol>
            </div>

            <div className="bg-azure/5 border border-azure/20 rounded-xl p-4">
              <p className="text-sm text-cloudy">
                <span className="font-semibold text-azure">Pro tip:</span> After adding your schema, use the Google Rich Results Test above to verify it is recognized correctly. Changes may take a few days to appear in search results.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
