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

  const fillTestData = useCallback(() => {
    setFormState({
      subtype: 'Restaurant',
      name: 'Sunrise Bakery & Cafe',
      description: 'Sunrise Bakery & Cafe is a family-owned artisan bakery and breakfast cafe in the heart of Portland. We specialize in handcrafted sourdough breads, French pastries, and farm-to-table brunch dishes. Open daily with fresh-baked goods starting at 6am.',
      url: 'https://www.sunrisebakerycafe.com',
      telephone: '(503) 555-0142',
      email: 'hello@sunrisebakerycafe.com',
      streetAddress: '123 Main St',
      addressLocality: 'Portland',
      addressRegion: 'OR',
      postalCode: '97201',
      addressCountry: 'US',
      latitude: '45.5152',
      longitude: '-122.6784',
      openingHours: {
        Monday: { open: '06:00', close: '15:00', closed: false },
        Tuesday: { open: '06:00', close: '15:00', closed: false },
        Wednesday: { open: '06:00', close: '15:00', closed: false },
        Thursday: { open: '06:00', close: '15:00', closed: false },
        Friday: { open: '06:00', close: '16:00', closed: false },
        Saturday: { open: '07:00', close: '16:00', closed: false },
        Sunday: { open: '07:00', close: '14:00', closed: false },
      },
      priceRange: '$$',
      paymentAccepted: ['Cash', 'Credit Card', 'Debit Card', 'Apple Pay', 'Google Pay'],
      socialProfiles: {
        facebook: 'https://facebook.com/sunrisebakerycafe',
        instagram: 'https://instagram.com/sunrisebakerycafe',
        twitter: '',
        linkedin: '',
        youtube: '',
      },
      logo: 'https://www.sunrisebakerycafe.com/logo.png',
      image: 'https://www.sunrisebakerycafe.com/storefront.jpg',
      foundingDate: '2018',
      isServiceArea: false,
      serviceAreas: [''],
      typeFields: {
        servesCuisine: 'Bakery, Cafe, Brunch',
        menu: 'https://www.sunrisebakerycafe.com/menu',
        acceptsReservations: true,
      },
    });
  }, []);

  const currentSubtype = BUSINESS_SUBTYPES.find(s => s.id === formState.subtype);

  return (
    <div className="min-h-screen bg-abyss bg-glow bg-grid">
      <div className="relative z-10 max-w-[1600px] mx-auto px-4 py-8 sm:py-12 animate-fadeIn">
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

        <div className="flex justify-end mb-4">
          <button
            type="button"
            onClick={fillTestData}
            className="px-3 py-1.5 text-xs font-mono bg-prince/20 text-prince border border-prince/30 rounded hover:bg-prince/30 transition-colors focus:outline-none focus:ring-2 focus:ring-prince focus:ring-offset-2 focus:ring-offset-abyss"
          >
            Fill Test Data
          </button>
        </div>

        {/* Main layout: two columns on desktop */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left: Form */}
          <div className="w-full lg:w-1/2 space-y-6">
            <div className="animate-slideUp" style={{ animationDelay: '0s' }}>
              <SubtypeSelector
                value={formState.subtype}
                onChange={handleSubtypeChange}
              />
            </div>

            {currentSubtype && currentSubtype.fields.length > 0 && (
              <div className="animate-slideUp" style={{ animationDelay: '0.08s' }}>
                <TypeSpecificFields
                  subtypeId={formState.subtype}
                  typeFields={formState.typeFields}
                  onChange={handleTypeFieldsChange}
                />
              </div>
            )}

            <div className="animate-slideUp" style={{ animationDelay: '0.16s' }}>
              <CommonFields
                formState={formState}
                updateField={updateField}
              />
            </div>

            <div className="animate-slideUp" style={{ animationDelay: '0.24s' }}>
              <ServiceAreaFields
                isServiceArea={formState.isServiceArea}
                serviceAreas={formState.serviceAreas}
                onToggle={() => updateField('isServiceArea', !formState.isServiceArea)}
                onAreasChange={(areas) => updateField('serviceAreas', areas)}
              />
            </div>
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
