export default function ServiceAreaFields({ isServiceArea, serviceAreas, onToggle, onAreasChange }) {
  const addArea = () => {
    onAreasChange([...serviceAreas, '']);
  };

  const updateArea = (index, value) => {
    const updated = serviceAreas.map((a, i) => (i === index ? value : a));
    onAreasChange(updated);
  };

  const removeArea = (index) => {
    if (serviceAreas.length <= 1) return;
    onAreasChange(serviceAreas.filter((_, i) => i !== index));
  };

  return (
    <div className="card-gradient border border-metal/20 rounded-2xl p-4 sm:p-6">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h2 className="text-lg font-bold text-white">Service Area</h2>
          <p className="text-sm text-galactic mt-0.5">Enable if your business serves customers at their location (e.g., plumbers, electricians, delivery).</p>
        </div>
        <button
          type="button"
          onClick={onToggle}
          className="relative shrink-0 p-2 -m-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-azure focus:ring-offset-2 focus:ring-offset-abyss"
          aria-label="Toggle service area"
        >
          <span className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
            isServiceArea ? 'bg-azure' : 'bg-metal/40'
          }`}>
            <span
              className={`inline-block h-4 w-4 rounded-full bg-white transition-transform duration-200 ${
                isServiceArea ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </span>
        </button>
      </div>

      {isServiceArea && (
        <div className="mt-4 space-y-2 animate-fadeIn">
          <label className="block text-sm font-medium text-cloudy mb-1">
            Service Areas (cities, counties, or regions)
          </label>
          {serviceAreas.map((area, index) => (
            <div key={index} className="flex items-center gap-2">
              <input
                type="text"
                value={area}
                onChange={(e) => updateArea(index, e.target.value)}
                placeholder={`e.g., ${index === 0 ? 'Los Angeles County' : index === 1 ? 'Orange County' : 'San Bernardino County'}`}
                className="flex-1 bg-midnight border border-metal/30 rounded-lg px-3 py-2 text-sm text-white placeholder-galactic focus:outline-none focus:ring-2 focus:ring-azure focus:border-transparent transition-colors"
              />
              {serviceAreas.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeArea(index)}
                  className="p-2.5 text-galactic hover:text-coral transition-colors rounded focus:outline-none focus:ring-2 focus:ring-azure focus:ring-offset-2 focus:ring-offset-abyss min-h-[44px] min-w-[44px] flex items-center justify-center"
                  aria-label="Remove area"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addArea}
            className="flex items-center gap-1.5 text-sm text-azure hover:text-white transition-colors mt-1 min-h-[44px] rounded-lg focus:outline-none focus:ring-2 focus:ring-azure focus:ring-offset-2 focus:ring-offset-abyss"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Add Another Area
          </button>
        </div>
      )}
    </div>
  );
}
