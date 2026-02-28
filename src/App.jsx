import { useState, useMemo, useCallback } from 'react';
import SubtypeSelector from './components/SubtypeSelector';
import CommonFields from './components/CommonFields';
import TypeSpecificFields from './components/TypeSpecificFields';
import ServiceAreaFields from './components/ServiceAreaFields';
import JsonPreview from './components/JsonPreview';
import ValidationLinks from './components/ValidationLinks';
import { getDefaultFormState, BUSINESS_SUBTYPES } from './utils/subtypeConfig';
import { buildSchema } from './utils/schemaBuilder';

export default function App() {
  const [formState, setFormState] = useState(getDefaultFormState);

  const updateField = useCallback((field, value) => {
    setFormState(prev => ({ ...prev, [field]: value }));
  }, []);

  const handleSubtypeChange = useCallback((subtypeId) => {
    setFormState(prev => {
      // Initialize type-specific fields with defaults
      const subtype = BUSINESS_SUBTYPES.find(s => s.id === subtypeId);
      const newTypeFields = {};
      if (subtype) {
        subtype.fields.forEach(field => {
          if (field.type === 'toggle' && field.default !== undefined) {
            newTypeFields[field.key] = field.default;
          }
        });
      }
      // Determine if this is a service-area type
      const serviceAreaTypes = ['Plumber', 'Electrician', 'HVACBusiness', 'RealEstateAgent'];
      return {
        ...prev,
        subtype: subtypeId,
        typeFields: newTypeFields,
        isServiceArea: serviceAreaTypes.includes(subtypeId) ? true : prev.isServiceArea,
      };
    });
  }, []);

  const handleTypeFieldsChange = useCallback((typeFields) => {
    setFormState(prev => ({ ...prev, typeFields }));
  }, []);

  const schema = useMemo(() => {
    // Only build if at least a name is present
    if (!formState.name?.trim()) return null;
    return buildSchema(formState);
  }, [formState]);

  const currentSubtype = BUSINESS_SUBTYPES.find(s => s.id === formState.subtype);

  return (
    <div className="min-h-screen bg-abyss bg-glow bg-grid">
      <div className="relative z-10 max-w-6xl mx-auto px-4 py-8 sm:py-12 animate-fadeIn">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm text-galactic">
          <a href="https://seo-tools-tau.vercel.app/" className="text-azure hover:text-white transition-colors">Free Tools</a>
          <span className="mx-2 text-metal">/</span>
          <a href="https://seo-tools-tau.vercel.app/local-business/" className="text-azure hover:text-white transition-colors">Local Business Tools</a>
          <span className="mx-2 text-metal">/</span>
          <span className="text-cloudy">Local Business Schema Generator</span>
        </nav>

        {/* Header */}
        <header className="mb-8 sm:mb-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-azure/10 border border-azure/20 flex items-center justify-center">
              <svg className="w-5 h-5 text-azure" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white">Local Business Schema Generator</h1>
            </div>
          </div>
          <p className="text-cloudy text-sm sm:text-base max-w-2xl">
            Generate JSON-LD structured data for your local business to improve your visibility in Google Search, Maps, and rich results.
            Supports {BUSINESS_SUBTYPES.length} business types with industry-specific fields.
          </p>
        </header>

        {/* Main layout: two columns on desktop */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left: Form */}
          <div className="w-full lg:w-1/2 space-y-6">
            <SubtypeSelector
              value={formState.subtype}
              onChange={handleSubtypeChange}
            />

            {currentSubtype && currentSubtype.fields.length > 0 && (
              <TypeSpecificFields
                subtypeId={formState.subtype}
                typeFields={formState.typeFields}
                onChange={handleTypeFieldsChange}
              />
            )}

            <CommonFields
              formState={formState}
              updateField={updateField}
            />

            <ServiceAreaFields
              isServiceArea={formState.isServiceArea}
              serviceAreas={formState.serviceAreas}
              onToggle={() => updateField('isServiceArea', !formState.isServiceArea)}
              onAreasChange={(areas) => updateField('serviceAreas', areas)}
            />
          </div>

          {/* Right: Preview & Actions — sticky on desktop */}
          <div className="w-full lg:w-1/2">
            <div className="lg:sticky lg:top-6 space-y-6">
              <JsonPreview schema={schema} />
              <ValidationLinks schema={schema} />
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-12 sm:mt-16 pt-6 border-t border-metal/30 text-center">
          <p className="text-sm text-galactic">
            Built by{' '}
            <a
              href="https://www.dreamhost.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-azure hover:text-white transition-colors"
            >
              DreamHost
            </a>
            . Schema markup follows{' '}
            <a
              href="https://schema.org/LocalBusiness"
              target="_blank"
              rel="noopener noreferrer"
              className="text-azure hover:text-white transition-colors"
            >
              Schema.org
            </a>{' '}
            standards.
          </p>
        </footer>
      </div>
    </div>
  );
}
