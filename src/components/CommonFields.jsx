import { useState } from 'react';
import { PAYMENT_METHODS, PRICE_RANGES, SOCIAL_PLATFORMS } from '../utils/subtypeConfig';
import OpeningHours from './OpeningHours';

function TextInput({ label, value, onChange, placeholder, type = 'text', helpText, required }) {
  return (
    <div>
      <label className="block text-sm font-medium text-cloudy mb-1">
        {label}
        {required && <span className="text-coral ml-1">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-midnight border border-metal/30 rounded-lg px-3 py-2 text-sm text-white placeholder-galactic focus:outline-none focus:ring-2 focus:ring-azure focus:border-transparent transition-colors"
      />
      {helpText && <p className="text-xs text-galactic mt-1">{helpText}</p>}
    </div>
  );
}

function TextArea({ label, value, onChange, placeholder, rows = 3 }) {
  return (
    <div>
      <label className="block text-sm font-medium text-cloudy mb-1">{label}</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className="w-full bg-midnight border border-metal/30 rounded-lg px-3 py-2 text-sm text-white placeholder-galactic focus:outline-none focus:ring-2 focus:ring-azure focus:border-transparent transition-colors resize-y"
      />
    </div>
  );
}

export default function CommonFields({ formState, updateField }) {
  const [geoLoading, setGeoLoading] = useState(false);
  const [geoError, setGeoError] = useState('');
  const [showSocial, setShowSocial] = useState(false);

  const handleGeolocation = () => {
    if (!navigator.geolocation) {
      setGeoError('Geolocation is not supported by your browser.');
      return;
    }
    setGeoLoading(true);
    setGeoError('');
    navigator.geolocation.getCurrentPosition(
      (position) => {
        updateField('latitude', position.coords.latitude.toFixed(6));
        updateField('longitude', position.coords.longitude.toFixed(6));
        setGeoLoading(false);
      },
      (err) => {
        setGeoError(`Could not get location: ${err.message}`);
        setGeoLoading(false);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  const togglePayment = (method) => {
    const current = formState.paymentAccepted || [];
    if (current.includes(method)) {
      updateField('paymentAccepted', current.filter(m => m !== method));
    } else {
      updateField('paymentAccepted', [...current, method]);
    }
  };

  const updateSocial = (platform, value) => {
    updateField('socialProfiles', {
      ...formState.socialProfiles,
      [platform]: value,
    });
  };

  return (
    <div className="space-y-6">
      {/* Basic Info */}
      <div className="card-gradient border border-metal/20 rounded-2xl p-4 sm:p-6">
        <h2 className="text-lg font-bold text-white mb-4">Business Information</h2>
        <div className="space-y-4">
          <TextInput
            label="Business Name"
            value={formState.name}
            onChange={(v) => updateField('name', v)}
            placeholder="e.g., Joe's Pizza Palace"
            required
          />
          <TextArea
            label="Business Description"
            value={formState.description}
            onChange={(v) => updateField('description', v)}
            placeholder="A brief description of your business, services, and what makes you unique..."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <TextInput
              label="Website URL"
              value={formState.url}
              onChange={(v) => updateField('url', v)}
              placeholder="https://example.com"
              type="url"
            />
            <TextInput
              label="Phone Number"
              value={formState.telephone}
              onChange={(v) => updateField('telephone', v)}
              placeholder="+1-555-123-4567"
              type="tel"
            />
          </div>
          <TextInput
            label="Email Address"
            value={formState.email}
            onChange={(v) => updateField('email', v)}
            placeholder="contact@example.com"
            type="email"
          />
        </div>
      </div>

      {/* Address */}
      <div className="card-gradient border border-metal/20 rounded-2xl p-4 sm:p-6">
        <h2 className="text-lg font-bold text-white mb-4">Address</h2>
        <div className="space-y-4">
          <TextInput
            label="Street Address"
            value={formState.streetAddress}
            onChange={(v) => updateField('streetAddress', v)}
            placeholder="123 Main Street, Suite 100"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <TextInput
              label="City"
              value={formState.addressLocality}
              onChange={(v) => updateField('addressLocality', v)}
              placeholder="Los Angeles"
            />
            <TextInput
              label="State / Region"
              value={formState.addressRegion}
              onChange={(v) => updateField('addressRegion', v)}
              placeholder="CA"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <TextInput
              label="ZIP / Postal Code"
              value={formState.postalCode}
              onChange={(v) => updateField('postalCode', v)}
              placeholder="90001"
            />
            <TextInput
              label="Country"
              value={formState.addressCountry}
              onChange={(v) => updateField('addressCountry', v)}
              placeholder="US"
              helpText="Two-letter country code (e.g., US, CA, GB)"
            />
          </div>
        </div>
      </div>

      {/* Geo Coordinates */}
      <div className="card-gradient border border-metal/20 rounded-2xl p-4 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-white">Geo Coordinates</h2>
          <button
            type="button"
            onClick={handleGeolocation}
            disabled={geoLoading}
            className="flex items-center gap-1.5 text-sm text-azure hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed min-h-[44px] px-2 -mr-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-azure focus:ring-offset-2 focus:ring-offset-abyss"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
            </svg>
            {geoLoading ? 'Getting location...' : 'Use My Location'}
          </button>
        </div>
        {geoError && (
          <p className="text-sm text-coral mb-3">{geoError}</p>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <TextInput
            label="Latitude"
            value={formState.latitude}
            onChange={(v) => updateField('latitude', v)}
            placeholder="34.052235"
          />
          <TextInput
            label="Longitude"
            value={formState.longitude}
            onChange={(v) => updateField('longitude', v)}
            placeholder="-118.243683"
          />
        </div>
        <p className="text-xs text-galactic mt-2">
          Tip: Find your coordinates on{' '}
          <a
            href="https://www.google.com/maps"
            target="_blank"
            rel="noopener noreferrer"
            className="text-azure hover:text-white transition-colors"
          >
            Google Maps
          </a>{' '}
          by right-clicking your location.
        </p>
      </div>

      {/* Opening Hours */}
      <div className="card-gradient border border-metal/20 rounded-2xl p-4 sm:p-6">
        <OpeningHours
          hours={formState.openingHours}
          onChange={(hours) => updateField('openingHours', hours)}
        />
      </div>

      {/* Price Range & Payment */}
      <div className="card-gradient border border-metal/20 rounded-2xl p-4 sm:p-6">
        <h2 className="text-lg font-bold text-white mb-4">Pricing & Payment</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-cloudy mb-2">Price Range</label>
            <div className="flex flex-wrap gap-2">
              {PRICE_RANGES.map(({ value, label }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => updateField('priceRange', formState.priceRange === value ? '' : value)}
                  className={`px-3 py-2.5 min-h-[44px] rounded-lg text-sm border transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-azure focus:ring-offset-2 focus:ring-offset-abyss ${
                    formState.priceRange === value
                      ? 'border-azure bg-azure/10 text-white'
                      : 'border-metal/30 text-galactic hover:text-cloudy hover:border-metal/50'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-cloudy mb-2">Payment Methods Accepted</label>
            <div className="flex flex-wrap gap-2">
              {PAYMENT_METHODS.map((method) => {
                const isActive = (formState.paymentAccepted || []).includes(method);
                return (
                  <button
                    key={method}
                    type="button"
                    onClick={() => togglePayment(method)}
                    className={`px-3 py-2.5 min-h-[44px] rounded-lg text-sm border transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-azure focus:ring-offset-2 focus:ring-offset-abyss ${
                      isActive
                        ? 'border-turtle bg-turtle/10 text-turtle'
                        : 'border-metal/30 text-galactic hover:text-cloudy hover:border-metal/50'
                    }`}
                  >
                    {method}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Images & Branding */}
      <div className="card-gradient border border-metal/20 rounded-2xl p-4 sm:p-6">
        <h2 className="text-lg font-bold text-white mb-4">Images & Branding</h2>
        <div className="space-y-4">
          <TextInput
            label="Logo URL"
            value={formState.logo}
            onChange={(v) => updateField('logo', v)}
            placeholder="https://example.com/logo.png"
            type="url"
            helpText="Direct URL to your business logo image"
          />
          <TextInput
            label="Business Photo URL"
            value={formState.image}
            onChange={(v) => updateField('image', v)}
            placeholder="https://example.com/storefront.jpg"
            type="url"
            helpText="Photo of your storefront or business"
          />
          <TextInput
            label="Year Established"
            value={formState.foundingDate}
            onChange={(v) => updateField('foundingDate', v)}
            placeholder="2015"
            helpText="Year or full date (e.g., 2015 or 2015-03-15)"
          />
        </div>
      </div>

      {/* Social Profiles */}
      <div className="card-gradient border border-metal/20 rounded-2xl p-4 sm:p-6">
        <button
          type="button"
          onClick={() => setShowSocial(!showSocial)}
          className="flex items-center justify-between w-full text-left min-h-[44px] focus:outline-none focus:ring-2 focus:ring-azure focus:ring-offset-2 focus:ring-offset-abyss rounded-lg"
        >
          <h2 className="text-lg font-bold text-white">Social Profiles</h2>
          <svg
            className={`w-5 h-5 text-galactic transition-transform duration-200 ${showSocial ? 'rotate-180' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
          </svg>
        </button>
        {showSocial && (
          <div className="space-y-3 mt-4 animate-fadeIn">
            {SOCIAL_PLATFORMS.map(({ key, label, placeholder }) => (
              <TextInput
                key={key}
                label={label}
                value={formState.socialProfiles[key] || ''}
                onChange={(v) => updateSocial(key, v)}
                placeholder={placeholder}
                type="url"
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
