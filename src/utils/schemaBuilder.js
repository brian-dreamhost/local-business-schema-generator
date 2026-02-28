import { BUSINESS_SUBTYPES, DAYS_OF_WEEK } from './subtypeConfig';

/**
 * Build a JSON-LD schema object from the form state.
 * Only includes fields that have values — no empty strings or nulls.
 */
export function buildSchema(formState) {
  const subtype = BUSINESS_SUBTYPES.find(s => s.id === formState.subtype);
  if (!subtype) return null;

  const schema = {
    '@context': 'https://schema.org',
    '@type': subtype.schemaType,
  };

  // Basic fields
  addIfPresent(schema, 'name', formState.name);
  addIfPresent(schema, 'description', formState.description);
  addIfPresent(schema, 'url', formState.url);
  addIfPresent(schema, 'telephone', formState.telephone);
  addIfPresent(schema, 'email', formState.email);

  // Address
  const address = buildAddress(formState);
  if (address) {
    schema.address = address;
  }

  // Geo coordinates
  if (formState.latitude && formState.longitude) {
    schema.geo = {
      '@type': 'GeoCoordinates',
      latitude: parseFloat(formState.latitude),
      longitude: parseFloat(formState.longitude),
    };
  }

  // Opening hours
  const hoursSpecs = buildOpeningHours(formState.openingHours);
  if (hoursSpecs.length > 0) {
    schema.openingHoursSpecification = hoursSpecs;
  }

  // Price range
  addIfPresent(schema, 'priceRange', formState.priceRange);

  // Payment accepted
  if (formState.paymentAccepted && formState.paymentAccepted.length > 0) {
    schema.paymentAccepted = formState.paymentAccepted.join(', ');
  }

  // Logo and image
  addIfPresent(schema, 'logo', formState.logo);
  addIfPresent(schema, 'image', formState.image);

  // Founding date
  addIfPresent(schema, 'foundingDate', formState.foundingDate);

  // Social profiles via sameAs
  const sameAs = buildSameAs(formState.socialProfiles);
  if (sameAs.length > 0) {
    schema.sameAs = sameAs;
  }

  // Service area
  if (formState.isServiceArea) {
    const areas = buildServiceAreas(formState.serviceAreas);
    if (areas.length > 0) {
      schema.areaServed = areas.length === 1 ? areas[0] : areas;
    }
  }

  // Type-specific fields
  addTypeSpecificFields(schema, formState.subtype, formState.typeFields);

  return schema;
}

function addIfPresent(obj, key, value) {
  if (value && String(value).trim() !== '') {
    obj[key] = value;
  }
}

function buildAddress(state) {
  const parts = {
    '@type': 'PostalAddress',
  };
  let hasContent = false;

  if (state.streetAddress) { parts.streetAddress = state.streetAddress; hasContent = true; }
  if (state.addressLocality) { parts.addressLocality = state.addressLocality; hasContent = true; }
  if (state.addressRegion) { parts.addressRegion = state.addressRegion; hasContent = true; }
  if (state.postalCode) { parts.postalCode = state.postalCode; hasContent = true; }
  if (state.addressCountry) { parts.addressCountry = state.addressCountry; hasContent = true; }

  return hasContent ? parts : null;
}

function buildOpeningHours(hours) {
  if (!hours) return [];

  const specs = [];

  // Group days with same hours
  const dayGroups = {};
  DAYS_OF_WEEK.forEach(({ key }) => {
    const dayHours = hours[key];
    if (!dayHours || dayHours.closed) return;

    const timeKey = `${dayHours.open}-${dayHours.close}`;
    if (!dayGroups[timeKey]) {
      dayGroups[timeKey] = [];
    }
    dayGroups[timeKey].push(key);
  });

  Object.entries(dayGroups).forEach(([timeKey, days]) => {
    const [opens, closes] = timeKey.split('-');
    specs.push({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: days.length === 1 ? days[0] : days,
      opens,
      closes,
    });
  });

  return specs;
}

function buildSameAs(profiles) {
  if (!profiles) return [];
  return Object.values(profiles).filter(v => v && v.trim() !== '');
}

function buildServiceAreas(areas) {
  if (!areas) return [];
  return areas
    .filter(a => a && a.trim() !== '')
    .map(area => ({
      '@type': 'AdministrativeArea',
      name: area.trim(),
    }));
}

function addTypeSpecificFields(schema, subtypeId, typeFields) {
  if (!typeFields) return;

  const subtype = BUSINESS_SUBTYPES.find(s => s.id === subtypeId);
  if (!subtype) return;

  subtype.fields.forEach(field => {
    const value = typeFields[field.key];
    if (value === undefined || value === null || value === '') return;

    switch (field.type) {
      case 'text':
      case 'url':
        if (String(value).trim()) {
          schema[field.key] = value;
        }
        break;

      case 'select':
        if (value) {
          schema[field.key] = value;
        }
        break;

      case 'toggle':
        schema[field.key] = Boolean(value);
        break;

      case 'tags':
        if (Array.isArray(value) && value.length > 0) {
          const filtered = value.filter(v => v && v.trim() !== '');
          if (filtered.length > 0) {
            // For availableService, use Service type
            if (field.key === 'availableService') {
              schema.hasOfferCatalog = {
                '@type': 'OfferCatalog',
                name: 'Services',
                itemListElement: filtered.map(svc => ({
                  '@type': 'OfferCatalog',
                  name: svc,
                  itemListElement: [{
                    '@type': 'Offer',
                    itemOffered: {
                      '@type': 'Service',
                      name: svc,
                    },
                  }],
                })),
              };
            } else if (field.key === 'practiceArea') {
              // For attorneys, list as knowsAbout
              schema.knowsAbout = filtered;
            } else if (field.key === 'amenityFeature') {
              schema.amenityFeature = filtered.map(a => ({
                '@type': 'LocationFeatureSpecification',
                name: a,
                value: true,
              }));
            } else if (field.key === 'productCategories') {
              schema.hasOfferCatalog = {
                '@type': 'OfferCatalog',
                name: 'Products',
                itemListElement: filtered.map(cat => ({
                  '@type': 'OfferCatalog',
                  name: cat,
                })),
              };
            } else if (field.key === 'animalTypes') {
              // Custom property — not standard Schema.org but useful
              // We'll add as description addendum
              // Actually better to skip non-standard — store as additionalProperty
              schema.additionalProperty = filtered.map(animal => ({
                '@type': 'PropertyValue',
                name: 'Animals Treated',
                value: animal,
              }));
            } else if (field.key === 'specialties') {
              schema.knowsAbout = filtered;
            } else if (field.key === 'brand') {
              schema.brand = filtered.map(b => ({
                '@type': 'Brand',
                name: b,
              }));
            } else if (field.key === 'programs') {
              schema.hasOfferCatalog = {
                '@type': 'OfferCatalog',
                name: 'Programs',
                itemListElement: filtered.map(p => ({
                  '@type': 'OfferCatalog',
                  name: p,
                })),
              };
            } else {
              schema[field.key] = filtered;
            }
          }
        }
        break;

      case 'servicePricing':
        if (Array.isArray(value) && value.length > 0) {
          const validServices = value.filter(s => s.name && s.name.trim());
          if (validServices.length > 0) {
            schema.hasOfferCatalog = {
              '@type': 'OfferCatalog',
              name: 'Services',
              itemListElement: validServices.map(svc => {
                const offer = {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'Service',
                    name: svc.name,
                  },
                };
                if (svc.price) {
                  offer.price = svc.price;
                  offer.priceCurrency = 'USD';
                }
                return {
                  '@type': 'OfferCatalog',
                  name: svc.name,
                  itemListElement: [offer],
                };
              }),
            };
          }
        }
        break;

      case 'ageRange':
        if (value && (value.min || value.max)) {
          schema.additionalProperty = [
            ...(schema.additionalProperty || []),
          ];
          if (value.min) {
            schema.additionalProperty.push({
              '@type': 'PropertyValue',
              name: 'Minimum Age',
              value: value.min,
              unitText: 'months',
            });
          }
          if (value.max) {
            schema.additionalProperty.push({
              '@type': 'PropertyValue',
              name: 'Maximum Age',
              value: value.max,
              unitText: 'years',
            });
          }
        }
        break;

      default:
        break;
    }
  });

  // Handle special toggle fields that map to non-standard keys
  if (typeFields.legalAid !== undefined && subtypeId === 'Attorney' || subtypeId === 'LegalService') {
    if (typeFields.legalAid) {
      schema.makesOffer = [{
        '@type': 'Offer',
        name: 'Free Consultation',
        price: '0',
        priceCurrency: 'USD',
      }];
    }
  }

  // Emergency service for home services
  if (typeFields.hasOfferCatalog !== undefined) {
    const homeTypes = ['Plumber', 'Electrician', 'HVACBusiness'];
    if (homeTypes.includes(subtypeId) && typeFields.hasOfferCatalog) {
      schema.additionalProperty = [
        ...(schema.additionalProperty || []),
        {
          '@type': 'PropertyValue',
          name: 'Emergency Service',
          value: 'Available',
        },
      ];
    }
    // Online ordering for Store
    if (subtypeId === 'Store' && typeFields.hasOfferCatalog) {
      schema.potentialAction = {
        '@type': 'OrderAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: schema.url || '',
          actionPlatform: 'https://schema.org/DesktopWebPlatform',
        },
      };
    }
  }
}

/**
 * Format JSON with syntax highlighting spans for display.
 */
export function syntaxHighlight(json) {
  if (typeof json !== 'string') {
    json = JSON.stringify(json, null, 2);
  }
  // Escape HTML
  json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  return json.replace(
    /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+-]?\d+)?)/g,
    (match) => {
      let cls = 'text-tangerine'; // numbers
      if (/^"/.test(match)) {
        if (/:$/.test(match)) {
          cls = 'text-prince'; // keys
          // Remove the colon for class assignment, add it back
        } else {
          cls = 'text-turtle'; // strings
        }
      } else if (/true|false/.test(match)) {
        cls = 'text-azure'; // booleans
      } else if (/null/.test(match)) {
        cls = 'text-galactic'; // null
      }
      return `<span class="${cls}">${match}</span>`;
    }
  );
}

/**
 * Generate the final <script> tag for embedding.
 */
export function generateScriptTag(schema, minified = false) {
  const jsonStr = minified
    ? JSON.stringify(schema)
    : JSON.stringify(schema, null, 2);

  return `<script type="application/ld+json">\n${jsonStr}\n</script>`;
}
