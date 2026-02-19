/**
 * Lead Pipe Configuration
 * Partner-specific settings for this landing page.
 */
const CONFIG = {
  // API Endpoints (unified - /lead handles both legacy and dynamic payloads)
  ENDPOINT: 'https://leadpipe-server.onrender.com/lead',
  GEO_API: 'https://leadpipe-server.onrender.com/geo',
  CATALOGS_API: 'https://leadpipe-server.onrender.com/catalogs',
  PARTNER_CATEGORIES_API: 'https://leadpipe-server.onrender.com/partner-categories',

  // Partner & Category IDs (for dynamic templates)
  PARTNER_ID: 1,                       // FK to partners table
  CATEGORY_ID: 1,                      // FK to categories_catalog table
  BRAND_ID: 1,                         // FK to brands table

  // Legacy fields (kept for backward compatibility)
  SERVICE: 'inheritance',
  SERVICE_ID: 1,                       // FK to services table
  SERVICE_CATEGORY: 'real_property',   // Asset type slug for this landing

  // Form settings
  SOURCE_TYPE: 'gestionatuherencia-form',
  DEFAULT_STATE_NAME: 'Ciudad de México', // Pre-selected state
  COUNTRY: 'Mexico',
  LANG: 'es'                           // Language for templates
};
