import { useState } from 'react';
import { BUSINESS_SUBTYPES } from '../utils/subtypeConfig';

function TagsInput({ label, value = [], onChange, placeholder }) {
  const [input, setInput] = useState('');

  const addTag = () => {
    const trimmed = input.trim();
    if (trimmed && !value.includes(trimmed)) {
      onChange([...value, trimmed]);
      setInput('');
    }
  };

  const removeTag = (index) => {
    onChange(value.filter((_, i) => i !== index));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag();
    }
    if (e.key === 'Backspace' && !input && value.length > 0) {
      removeTag(value.length - 1);
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium text-cloudy mb-1">{label}</label>
      <div className="flex flex-wrap gap-1.5 mb-2">
        {value.map((tag, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-1 bg-azure/10 border border-azure/30 text-azure text-sm px-2.5 py-1 rounded-lg"
          >
            {tag}
            <button
              type="button"
              onClick={() => removeTag(i)}
              className="text-azure/60 hover:text-white transition-colors p-1.5 -mr-1 rounded focus:outline-none focus:ring-2 focus:ring-azure"
              aria-label={`Remove ${tag}`}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
          </span>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="flex-1 bg-midnight border border-metal/30 rounded-lg px-3 py-2 text-sm text-white placeholder-galactic focus:outline-none focus:ring-2 focus:ring-azure focus:border-transparent transition-colors"
        />
        <button
          type="button"
          onClick={addTag}
          disabled={!input.trim()}
          className="px-3 py-2 bg-azure/10 border border-azure/30 text-azure rounded-lg text-sm hover:bg-azure/20 transition-colors disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-azure focus:ring-offset-2 focus:ring-offset-abyss"
        >
          Add
        </button>
      </div>
      <p className="text-xs text-galactic mt-1">Press Enter to add, Backspace to remove last</p>
    </div>
  );
}

function ServicePricingInput({ label, value = [], onChange, placeholder }) {
  const addService = () => {
    onChange([...value, { name: '', price: '' }]);
  };

  const updateService = (index, field, val) => {
    const updated = value.map((svc, i) =>
      i === index ? { ...svc, [field]: val } : svc
    );
    onChange(updated);
  };

  const removeService = (index) => {
    onChange(value.filter((_, i) => i !== index));
  };

  return (
    <div>
      <label className="block text-sm font-medium text-cloudy mb-2">{label}</label>
      <div className="space-y-2">
        {value.map((svc, i) => (
          <div key={i} className="flex items-center gap-2">
            <input
              type="text"
              value={svc.name}
              onChange={(e) => updateService(i, 'name', e.target.value)}
              placeholder={placeholder || 'Service name'}
              className="flex-1 bg-midnight border border-metal/30 rounded-lg px-3 py-2 text-sm text-white placeholder-galactic focus:outline-none focus:ring-2 focus:ring-azure focus:border-transparent transition-colors"
            />
            <div className="relative">
              <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-galactic text-sm">$</span>
              <input
                type="number"
                value={svc.price}
                onChange={(e) => updateService(i, 'price', e.target.value)}
                placeholder="Price"
                className="w-24 bg-midnight border border-metal/30 rounded-lg pl-6 pr-2 py-2 text-sm text-white placeholder-galactic focus:outline-none focus:ring-2 focus:ring-azure focus:border-transparent transition-colors"
              />
            </div>
            <button
              type="button"
              onClick={() => removeService(i)}
              className="p-2.5 text-galactic hover:text-coral transition-colors rounded focus:outline-none focus:ring-2 focus:ring-azure focus:ring-offset-2 focus:ring-offset-abyss min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Remove service"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
              </svg>
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={addService}
        className="mt-2 flex items-center gap-1.5 text-sm text-azure hover:text-white transition-colors min-h-[44px] rounded-lg focus:outline-none focus:ring-2 focus:ring-azure focus:ring-offset-2 focus:ring-offset-abyss"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
        Add Service
      </button>
    </div>
  );
}

function AgeRangeInput({ label, value = {}, onChange }) {
  return (
    <div>
      <label className="block text-sm font-medium text-cloudy mb-2">{label}</label>
      <div className="flex items-center gap-3">
        <div className="flex-1">
          <label className="block text-xs text-galactic mb-1">Minimum Age (months)</label>
          <input
            type="number"
            value={value.min || ''}
            onChange={(e) => onChange({ ...value, min: e.target.value })}
            placeholder="6"
            min="0"
            className="w-full bg-midnight border border-metal/30 rounded-lg px-3 py-2 text-sm text-white placeholder-galactic focus:outline-none focus:ring-2 focus:ring-azure focus:border-transparent transition-colors"
          />
        </div>
        <span className="text-galactic mt-4">to</span>
        <div className="flex-1">
          <label className="block text-xs text-galactic mb-1">Maximum Age (years)</label>
          <input
            type="number"
            value={value.max || ''}
            onChange={(e) => onChange({ ...value, max: e.target.value })}
            placeholder="12"
            min="0"
            className="w-full bg-midnight border border-metal/30 rounded-lg px-3 py-2 text-sm text-white placeholder-galactic focus:outline-none focus:ring-2 focus:ring-azure focus:border-transparent transition-colors"
          />
        </div>
      </div>
    </div>
  );
}

export default function TypeSpecificFields({ subtypeId, typeFields, onChange }) {
  const subtype = BUSINESS_SUBTYPES.find(s => s.id === subtypeId);
  if (!subtype || subtype.fields.length === 0) return null;

  const updateTypeField = (key, value) => {
    onChange({ ...typeFields, [key]: value });
  };

  return (
    <div className="card-gradient border border-metal/20 rounded-2xl p-4 sm:p-6 animate-fadeIn">
      <h2 className="text-lg font-bold text-white mb-1">{subtype.label} Details</h2>
      <p className="text-sm text-galactic mb-4">Fields specific to {subtype.label.toLowerCase()} businesses.</p>

      <div className="space-y-4">
        {subtype.fields.map((field) => {
          const value = typeFields[field.key];

          switch (field.type) {
            case 'text':
            case 'url':
              return (
                <div key={field.key}>
                  <label className="block text-sm font-medium text-cloudy mb-1">{field.label}</label>
                  <input
                    type={field.type}
                    value={value || ''}
                    onChange={(e) => updateTypeField(field.key, e.target.value)}
                    placeholder={field.placeholder}
                    className="w-full bg-midnight border border-metal/30 rounded-lg px-3 py-2 text-sm text-white placeholder-galactic focus:outline-none focus:ring-2 focus:ring-azure focus:border-transparent transition-colors"
                  />
                </div>
              );

            case 'select':
              return (
                <div key={field.key}>
                  <label className="block text-sm font-medium text-cloudy mb-1">{field.label}</label>
                  <select
                    value={value || ''}
                    onChange={(e) => updateTypeField(field.key, e.target.value)}
                    className="w-full bg-midnight border border-metal/30 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-azure focus:border-transparent transition-colors"
                  >
                    <option value="">Select...</option>
                    {field.options.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>
              );

            case 'toggle':
              return (
                <div key={field.key} className="flex items-center justify-between">
                  <label className="text-sm font-medium text-cloudy">{field.label}</label>
                  <button
                    type="button"
                    onClick={() => updateTypeField(field.key, value === undefined ? !field.default : !value)}
                    className="relative p-2 -m-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-azure focus:ring-offset-2 focus:ring-offset-abyss"
                    aria-label={`Toggle ${field.label}`}
                  >
                    <span className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                      (value === undefined ? field.default : value) ? 'bg-azure' : 'bg-metal/40'
                    }`}>
                      <span
                        className={`inline-block h-4 w-4 rounded-full bg-white transition-transform duration-200 ${
                          (value === undefined ? field.default : value) ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </span>
                  </button>
                </div>
              );

            case 'tags':
              return (
                <TagsInput
                  key={field.key}
                  label={field.label}
                  value={value || []}
                  onChange={(v) => updateTypeField(field.key, v)}
                  placeholder={field.placeholder}
                />
              );

            case 'servicePricing':
              return (
                <ServicePricingInput
                  key={field.key}
                  label={field.label}
                  value={value || []}
                  onChange={(v) => updateTypeField(field.key, v)}
                  placeholder={field.placeholder}
                />
              );

            case 'ageRange':
              return (
                <AgeRangeInput
                  key={field.key}
                  label={field.label}
                  value={value || {}}
                  onChange={(v) => updateTypeField(field.key, v)}
                />
              );

            default:
              return null;
          }
        })}
      </div>
    </div>
  );
}
