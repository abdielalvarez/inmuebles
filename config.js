/**
 * Lead Pipe Configuration
 * Partner-specific settings for this landing page.
 */
const CONFIG = {
  ENDPOINT: 'https://leadpipe-server.onrender.com/lead',
  GEO_API: 'https://leadpipe-server.onrender.com/geo',
  CATALOGS_API: 'https://leadpipe-server.onrender.com/catalogs',
  SERVICE: 'inheritance',
  SERVICE_ID: 1,                       // FK to services table
  SERVICE_CATEGORY: 'real_property',   // Asset type slug for this landing
  CATEGORY_ID: 1,                      // FK to categories_catalog table
  SOURCE_TYPE: 'gestionatuherencia-form',
  DEFAULT_STATE_NAME: 'Ciudad de México', // Pre-selected state
  COUNTRY: 'Mexico'
};
