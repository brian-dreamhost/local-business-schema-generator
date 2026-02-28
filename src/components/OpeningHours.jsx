import { DAYS_OF_WEEK } from '../utils/subtypeConfig';

export default function OpeningHours({ hours, onChange }) {
  const updateDay = (day, field, value) => {
    onChange({
      ...hours,
      [day]: {
        ...hours[day],
        [field]: value,
      },
    });
  };

  const toggleClosed = (day) => {
    onChange({
      ...hours,
      [day]: {
        ...hours[day],
        closed: !hours[day].closed,
      },
    });
  };

  const applyToAll = (sourceDay) => {
    const source = hours[sourceDay];
    const updated = {};
    DAYS_OF_WEEK.forEach(({ key }) => {
      updated[key] = { ...source };
    });
    onChange(updated);
  };

  const applyToWeekdays = (sourceDay) => {
    const source = hours[sourceDay];
    const updated = { ...hours };
    DAYS_OF_WEEK.forEach(({ key }) => {
      if (key !== 'Saturday' && key !== 'Sunday') {
        updated[key] = { ...source };
      }
    });
    onChange(updated);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <label className="block text-sm font-semibold text-white">Opening Hours</label>
      </div>

      <div className="space-y-2">
        {DAYS_OF_WEEK.map(({ key, short }) => {
          const dayHours = hours[key];
          return (
            <div key={key} className="flex items-center gap-2 sm:gap-3">
              <span className="text-sm text-cloudy w-10 shrink-0 font-medium">{short}</span>

              <button
                type="button"
                onClick={() => toggleClosed(key)}
                className="relative shrink-0 p-2 -m-2 focus:outline-none focus:ring-2 focus:ring-azure focus:ring-offset-2 focus:ring-offset-abyss rounded-lg"
                aria-label={`Toggle ${key} open/closed`}
              >
                <span className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors duration-200 ${
                  !dayHours.closed ? 'bg-azure' : 'bg-metal/40'
                }`}>
                  <span
                    className={`inline-block h-3.5 w-3.5 rounded-full bg-white transition-transform duration-200 ${
                      !dayHours.closed ? 'translate-x-[18px]' : 'translate-x-[3px]'
                    }`}
                  />
                </span>
              </button>

              {dayHours.closed ? (
                <span className="text-sm text-galactic italic">Closed</span>
              ) : (
                <div className="flex items-center gap-1 sm:gap-2 flex-1 min-w-0">
                  <input
                    type="time"
                    value={dayHours.open}
                    onChange={(e) => updateDay(key, 'open', e.target.value)}
                    className="bg-midnight border border-metal/30 rounded-lg px-1.5 sm:px-2 py-1 text-sm text-white focus:outline-none focus:ring-2 focus:ring-azure focus:border-transparent flex-1 min-w-0 sm:flex-none sm:w-auto"
                  />
                  <span className="text-galactic text-xs shrink-0">to</span>
                  <input
                    type="time"
                    value={dayHours.close}
                    onChange={(e) => updateDay(key, 'close', e.target.value)}
                    className="bg-midnight border border-metal/30 rounded-lg px-1.5 sm:px-2 py-1 text-sm text-white focus:outline-none focus:ring-2 focus:ring-azure focus:border-transparent flex-1 min-w-0 sm:flex-none sm:w-auto"
                  />
                </div>
              )}

              {key === 'Monday' && (
                <div className="hidden sm:flex gap-1 shrink-0">
                  <button
                    type="button"
                    onClick={() => applyToWeekdays('Monday')}
                    className="text-xs text-azure hover:text-white transition-colors px-2 py-1.5 min-h-[44px] min-w-[44px] flex items-center justify-center rounded border border-metal/20 hover:border-azure/40 focus:outline-none focus:ring-2 focus:ring-azure focus:ring-offset-2 focus:ring-offset-abyss"
                    title="Apply Monday hours to all weekdays"
                  >
                    Weekdays
                  </button>
                  <button
                    type="button"
                    onClick={() => applyToAll('Monday')}
                    className="text-xs text-azure hover:text-white transition-colors px-2 py-1.5 min-h-[44px] min-w-[44px] flex items-center justify-center rounded border border-metal/20 hover:border-azure/40 focus:outline-none focus:ring-2 focus:ring-azure focus:ring-offset-2 focus:ring-offset-abyss"
                    title="Apply Monday hours to all days"
                  >
                    All
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Mobile apply buttons */}
      <div className="flex sm:hidden gap-2 mt-3">
        <button
          type="button"
          onClick={() => applyToWeekdays('Monday')}
          className="text-xs text-azure hover:text-white transition-colors px-3 py-2.5 min-h-[44px] rounded border border-metal/20 hover:border-azure/40 focus:outline-none focus:ring-2 focus:ring-azure focus:ring-offset-2 focus:ring-offset-abyss"
        >
          Apply Mon to Weekdays
        </button>
        <button
          type="button"
          onClick={() => applyToAll('Monday')}
          className="text-xs text-azure hover:text-white transition-colors px-3 py-2.5 min-h-[44px] rounded border border-metal/20 hover:border-azure/40 focus:outline-none focus:ring-2 focus:ring-azure focus:ring-offset-2 focus:ring-offset-abyss"
        >
          Apply Mon to All
        </button>
      </div>
    </div>
  );
}
