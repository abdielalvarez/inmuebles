/**
 * Lead Pipe - Inmuebles Landing (Herencias)
 * Form handling, validation, and submission
 */

(function() {
  'use strict';

  // ===========================================
  // DOM Elements
  // ===========================================
  const form = document.getElementById('leadForm');
  const formCard = document.getElementById('formCard');
  const submitBtn = document.getElementById('submitBtn');
  const successAlert = document.getElementById('successAlert');
  const errorAlert = document.getElementById('errorAlert');
  const retryBtn = document.getElementById('retryBtn');

  // Form fields
  const nameInput = document.getElementById('name');
  const phoneInput = document.getElementById('phone');
  const intencionInput = document.getElementById('intencion');
  const esPropietarioSelect = document.getElementById('es_propietario');
  const tieneEscrituraSelect = document.getElementById('tiene_escritura');
  const estaHipotecadaSelect = document.getElementById('esta_hipotecada');
  const esHerederoSelect = document.getElementById('es_heredero');
  const servicioContainer = document.getElementById('servicioContainer');
  const servicioInput = document.getElementById('servicio');
  const delegacionContainer = document.getElementById('delegacionContainer');
  const delegacionInput = document.getElementById('delegacion');

  // Delegaciones list for autocomplete
  const DELEGACIONES = [
    'Álvaro Obregón',
    'Azcapotzalco',
    'Benito Juárez',
    'Coyoacán',
    'Cuajimalpa de Morelos',
    'Cuauhtémoc',
    'Gustavo A. Madero',
    'Iztacalco',
    'Iztapalapa',
    'La Magdalena Contreras',
    'Miguel Hidalgo',
    'Milpa Alta',
    'Tláhuac',
    'Tlalpan',
    'Venustiano Carranza',
    'Xochimilco',
    'Otro'
  ];

  // Servicios list for autocomplete
  const SERVICIOS = [
    'Regularización del inmueble',
    'Asesoría Legal',
    'Venta del inmueble',
    'Renta del inmueble',
    'Testamento',
    'Donación del inmueble',
    'Otros servicios legales'
  ];

  // Autocomplete instances (initialized later)
  let delegacionAutocomplete;
  let servicioAutocomplete;

  // Error elements
  const nameError = document.getElementById('nameError');
  const phoneError = document.getElementById('phoneError');
  const intencionError = document.getElementById('intencionError');
  const esPropietarioError = document.getElementById('esPropietarioError');
  const tieneEscrituraError = document.getElementById('tieneEscrituraError');
  const estaHipotecadaError = document.getElementById('estaHipotecadaError');
  const esHerederoError = document.getElementById('esHerederoError');
  const servicioError = document.getElementById('servicioError');
  const delegacionError = document.getElementById('delegacionError');

  // ===========================================
  // Valid Mexican Mobile Prefixes
  // ===========================================
  const VALID_MEXICAN_PREFIXES = [
    // Major cities
    '55', '56', // CDMX
    '33',       // Guadalajara
    '81',       // Monterrey
    '222',      // Puebla
    '442',      // Querétaro
    '449',      // Aguascalientes
    '614',      // Chihuahua
    '656',      // Ciudad Juárez
    '664',      // Tijuana
    '667',      // Culiacán
    '686',      // Mexicali
    '722',      // Toluca
    '744',      // Acapulco
    '777',      // Cuernavaca
    '833',      // Tampico
    '844',      // Saltillo
    '867',      // Matamoros
    '868',      // Nuevo Laredo
    '871',      // Torreón
    '951',      // Oaxaca
    '961',      // Tuxtla Gutiérrez
    '981',      // Campeche
    '984',      // Playa del Carmen
    '998',      // Cancún
    // Other common area codes
    '228', '229', // Veracruz
    '241', '246', // Tlaxcala
    '271', '272', // Córdoba/Orizaba
    '312', '314', // Colima
    '341', '342', // Michoacán
    '351', '352', // Morelia area
    '378', '392', // Jalisco
    '411', '412', // San Luis Potosí
    '415', '417', // San Miguel de Allende
    '418', '419', // Guanajuato
    '427', '428', // Irapuato
    '431', '432', // León
    '434', '435', // Salamanca
    '441', '443', // Morelia
    '444', '445', // SLP city
    '452', '453', // Uruapan
    '461', '462', // Celaya
    '464', '465', // Acámbaro
    '466', '467', // Pénjamo
    '468', '469', // Salvatierra
    '471', '472', // Silao
    '473', '474', // Guanajuato city
    '475', '476', // San Francisco
    '477', '478', // León
    '492', '493', // Zacatecas
    '494', '495', // Fresnillo
    '496', '498', // Sombrerete
    '612', '613', // La Paz
    '615', '616', // Chihuahua area
    '618', '619', // Durango
    '621', '622', // Hermosillo
    '623', '624', // Los Cabos
    '625', '626', // Ciudad Obregón
    '627', '628', // Navojoa
    '631', '632', // Nogales
    '633', '634', // Agua Prieta
    '637', '638', // Cananea
    '641', '642', // Guaymas
    '644', '645', // Ciudad Obregón
    '646', '647', // Ensenada
    '651', '652', // San Quintín
    '653', '654', // San Felipe
    '657', '658', // Tecate
    '662', '663', // Hermosillo
    '668', '669', // Los Mochis/Mazatlán
    '671', '672', // Durango area
    '673', '674', // Gómez Palacio
    '675', '676', // Lerdo
    '677', '678', // Parral
    '687', '688', // Los Mochis
    '694', '695', // Guasave
    '712', '713', // Valle de Bravo
    '714', '715', // Atlacomulco
    '716', '717', // Zinacantepec
    '718', '719', // Tenango
    '721', '723', // Toluca area
    '724', '725', // Texcoco
    '726', '727', // Chalco
    '728', '729', // Amecameca
    '731', '732', // Cuernavaca area
    '733', '734', // Taxco
    '735', '736', // Iguala
    '737', '738', // Cuautla
    '739', '741', // Jojutla
    '742', '743', // Chilpancingo
    '745', '746', // Zihuatanejo
    '747', '748', // Chilapa
    '749', '751', // Ciudad Altamirano
    '752', '753', // Lázaro Cárdenas
    '754', '755', // Petatlán
    '756', '757', // Zihuatanejo area
    '758', '759', // Atoyac
    '761', '762', // Iguala area
    '763', '764', // Teloloapan
    '765', '766', // Arcelia
    '767', '768', // Huitzuco
    '769', '771', // Pachuca
    '772', '773', // Tula
    '774', '775', // Tulancingo
    '776', '778', // Actopan
    '779', '781', // Poza Rica
    '782', '783', // Tuxpan
    '784', '785', // Papantla
    '786', '787', // Álamo
    '788', '789', // Tantoyuca
    '791', '797', // Huauchinango
    '821', '823', // Linares
    '824', '825', // Montemorelos
    '826', '828', // Cadereyta
    '829', '831', // Ciudad Victoria
    '834', '835', // Ciudad Mante
    '836', '838', // Reynosa
    '841', '842', // Ramos Arizpe
    '845', '846', // Ciudad Acuña
    '861', '862', // Piedras Negras
    '863', '864', // Nueva Rosita
    '866', '869', // Monclova
    '872', '873', // Gómez Palacio area
    '877', '878', // Piedras Negras area
    '891', '892', // Ciudad Miguel Alemán
    '893', '894', // Valle Hermoso
    '897', '899', // Nuevo Laredo area
    '913', '914', // Villahermosa area
    '916', '917', // Tenosique
    '918', '919', // Palenque
    '921', '922', // Coatzacoalcos
    '923', '924', // Minatitlán
    '931', '932', // Cárdenas
    '933', '934', // Villahermosa
    '936', '937', // Macuspana
    '938', '939', // Ciudad del Carmen
    '941', '942', // Frontera
    '943', '944', // Teapa
    '952', '953', // Huajuapan
    '954', '958', // Puerto Escondido/Huatulco
    '962', '963', // Tapachula
    '964', '965', // Tonalá
    '966', '967', // San Cristóbal
    '968', '969', // Mérida
    '971', '972', // Juchitán
    '982', '983', // Chetumal
    '985', '986', // Valladolid
    '987', '988', // Cozumel
    '991', '992', // Ticul
    '993', '994', // Villahermosa city
    '995', '996', // Escárcega
    '997', '999', // Mérida city
  ];

  // ===========================================
  // Phone Validation & Formatting
  // ===========================================

  /**
   * Remove all non-digit characters from a string
   */
  function stripNonDigits(value) {
    return value.replace(/\D/g, '');
  }

  /**
   * Normalize text by removing accents/diacritics and converting to lowercase
   */
  function normalizeText(str) {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  }

  /**
   * Format phone number as: XX XXXX XXXX
   */
  function formatPhoneNumber(digits) {
    if (digits.length <= 2) {
      return digits;
    } else if (digits.length <= 6) {
      return digits.slice(0, 2) + ' ' + digits.slice(2);
    } else {
      return digits.slice(0, 2) + ' ' + digits.slice(2, 6) + ' ' + digits.slice(6, 10);
    }
  }

  /**
   * Check if phone number has a valid Mexican prefix
   */
  function hasValidMexicanPrefix(digits) {
    if (digits.length < 2) return true; // Not enough digits to validate yet

    // Check 2-digit prefixes
    const twoDigitPrefix = digits.slice(0, 2);
    if (VALID_MEXICAN_PREFIXES.includes(twoDigitPrefix)) {
      return true;
    }

    // Check 3-digit prefixes
    if (digits.length >= 3) {
      const threeDigitPrefix = digits.slice(0, 3);
      if (VALID_MEXICAN_PREFIXES.includes(threeDigitPrefix)) {
        return true;
      }
    }

    return false;
  }

  /**
   * Validate phone number - just 10 digits
   */
  function validatePhone(digits) {
    if (digits.length === 0) {
      return { valid: false, error: 'El teléfono es requerido' };
    }

    if (digits.length !== 10) {
      return { valid: false, error: 'El teléfono debe tener exactamente 10 dígitos' };
    }

    return { valid: true, error: '' };
  }

  // ===========================================
  // Autocomplete Component
  // ===========================================

  class Autocomplete {
    constructor(container, options) {
      this.container = container;
      this.input = container.querySelector('.autocomplete-input');
      this.arrow = container.querySelector('.autocomplete-arrow');
      this.dropdown = container.querySelector('.autocomplete-dropdown');
      this.options = options.options || [];
      this.freeSolo = options.freeSolo !== false;
      this.onChange = options.onChange || (() => {});
      this.isOpen = false;
      this.selectedValue = '';
      this.highlightedIndex = -1;
      this.filteredOptions = [...this.options];

      this.init();
    }

    init() {
      this.renderOptions();
      this.bindEvents();
    }

    bindEvents() {
      // Input events
      this.input.addEventListener('input', () => this.handleInput());
      this.input.addEventListener('focus', () => this.open());
      this.input.addEventListener('blur', (e) => this.handleBlur(e));
      this.input.addEventListener('keydown', (e) => this.handleKeydown(e));

      // Arrow button
      this.arrow.addEventListener('click', () => this.toggle());
      this.arrow.addEventListener('mousedown', (e) => e.preventDefault());

      // Dropdown option clicks
      this.dropdown.addEventListener('mousedown', (e) => {
        e.preventDefault();
        const option = e.target.closest('.autocomplete-option');
        if (option) {
          this.selectValue(option.dataset.value);
        }
      });
    }

    handleInput() {
      const query = this.input.value.toLowerCase().trim();
      this.filter(query);
      this.open();

      // If typing and value changed, notify
      const isCustom = !this.options.includes(this.input.value);
      this.onChange(this.input.value, isCustom);
    }

    handleBlur(e) {
      // Delay close to allow click on options
      setTimeout(() => {
        this.close();
        // Finalize value on blur
        const value = this.input.value.trim();
        if (value) {
          const isCustom = !this.options.includes(value);
          this.selectedValue = value;
          this.onChange(value, isCustom);
        }
      }, 150);
    }

    handleKeydown(e) {
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          if (!this.isOpen) {
            this.open();
          } else {
            this.highlightNext();
          }
          break;
        case 'ArrowUp':
          e.preventDefault();
          this.highlightPrev();
          break;
        case 'Enter':
          e.preventDefault();
          if (this.isOpen && this.highlightedIndex >= 0) {
            const highlighted = this.dropdown.querySelector('.highlighted');
            if (highlighted) {
              this.selectValue(highlighted.dataset.value);
            }
          } else if (this.input.value.trim()) {
            // Accept custom value
            const value = this.input.value.trim();
            const isCustom = !this.options.includes(value);
            this.selectedValue = value;
            this.onChange(value, isCustom);
            this.close();
          }
          break;
        case 'Escape':
          this.close();
          break;
        case 'Tab':
          this.close();
          break;
      }
    }

    filter(query) {
      if (!query) {
        this.filteredOptions = [...this.options];
      } else {
        const normalizedQuery = normalizeText(query);
        this.filteredOptions = this.options.filter(opt =>
          normalizeText(opt).includes(normalizedQuery)
        );
      }
      this.highlightedIndex = -1;
      this.renderOptions(query);
    }

    renderOptions(query = '') {
      this.dropdown.innerHTML = '';

      if (this.filteredOptions.length === 0 && !this.freeSolo) {
        return;
      }

      this.filteredOptions.forEach((opt, index) => {
        const li = document.createElement('li');
        li.className = 'autocomplete-option';
        li.dataset.value = opt;
        li.setAttribute('role', 'option');

        // Highlight matching text (using normalized comparison for accent-insensitive matching)
        if (query) {
          const normalizedOpt = normalizeText(opt);
          const normalizedQuery = normalizeText(query);
          const matchIndex = normalizedOpt.indexOf(normalizedQuery);
          if (matchIndex >= 0) {
            const before = opt.slice(0, matchIndex);
            const match = opt.slice(matchIndex, matchIndex + query.length);
            const after = opt.slice(matchIndex + query.length);
            li.innerHTML = `${before}<mark>${match}</mark>${after}`;
          } else {
            li.textContent = opt;
          }
        } else {
          li.textContent = opt;
        }

        if (opt === this.selectedValue) {
          li.classList.add('selected');
        }

        this.dropdown.appendChild(li);
      });
    }

    highlightNext() {
      const items = this.dropdown.querySelectorAll('.autocomplete-option');
      if (items.length === 0) return;

      if (this.highlightedIndex >= 0) {
        items[this.highlightedIndex].classList.remove('highlighted');
      }

      this.highlightedIndex = (this.highlightedIndex + 1) % items.length;
      items[this.highlightedIndex].classList.add('highlighted');
      items[this.highlightedIndex].scrollIntoView({ block: 'nearest' });
    }

    highlightPrev() {
      const items = this.dropdown.querySelectorAll('.autocomplete-option');
      if (items.length === 0) return;

      if (this.highlightedIndex >= 0) {
        items[this.highlightedIndex].classList.remove('highlighted');
      }

      this.highlightedIndex = this.highlightedIndex <= 0
        ? items.length - 1
        : this.highlightedIndex - 1;

      items[this.highlightedIndex].classList.add('highlighted');
      items[this.highlightedIndex].scrollIntoView({ block: 'nearest' });
    }

    selectValue(value) {
      this.selectedValue = value;
      this.input.value = value;
      this.close();

      const isCustom = !this.options.includes(value);
      this.onChange(value, isCustom);
    }

    open() {
      if (this.isOpen) return;
      this.isOpen = true;
      this.container.classList.add('open');
      this.input.setAttribute('aria-expanded', 'true');
    }

    close() {
      if (!this.isOpen) return;
      this.isOpen = false;
      this.container.classList.remove('open');
      this.input.setAttribute('aria-expanded', 'false');
      this.highlightedIndex = -1;
      // Remove all highlights
      this.dropdown.querySelectorAll('.highlighted').forEach(el => el.classList.remove('highlighted'));
    }

    toggle() {
      if (this.isOpen) {
        this.close();
      } else {
        this.filter('');
        this.open();
        this.input.focus();
      }
    }

    getValue() {
      return this.selectedValue || this.input.value.trim();
    }

    setValue(value) {
      this.selectedValue = value;
      this.input.value = value;
    }

    reset() {
      this.selectedValue = '';
      this.input.value = '';
      this.close();
    }
  }

  // ===========================================
  // Form Validation
  // ===========================================

  /**
   * Validate name field
   */
  function validateName(value) {
    const trimmed = value.trim();
    if (trimmed.length === 0) {
      return { valid: false, error: 'El nombre es requerido' };
    }
    if (trimmed.length < 2) {
      return { valid: false, error: 'El nombre debe tener al menos 2 caracteres' };
    }
    return { valid: true, error: '' };
  }

  /**
   * Validate intención field
   */
  function validateIntencion(value) {
    const trimmed = value.trim();
    if (trimmed.length === 0) {
      return { valid: false, error: 'Este campo es requerido' };
    }
    return { valid: true, error: '' };
  }

  /**
   * Validate select field (yes/no/don't know)
   */
  function validateSelect(value) {
    if (!value) {
      return { valid: false, error: 'Selecciona una opción' };
    }
    return { valid: true, error: '' };
  }

  /**
   * Validate servicio field
   */
  function validateServicio(value) {
    if (!value) {
      return { valid: false, error: 'Selecciona un servicio' };
    }
    return { valid: true, error: '' };
  }

  /**
   * Validate delegación field
   */
  function validateDelegacion(value) {
    if (!value) {
      return { valid: false, error: 'Selecciona una delegación' };
    }
    return { valid: true, error: '' };
  }


  /**
   * Show error for a field
   */
  function showFieldError(input, errorEl, message) {
    input.classList.add('error');
    errorEl.textContent = message;
  }

  /**
   * Clear error for a field
   */
  function clearFieldError(input, errorEl) {
    input.classList.remove('error');
    errorEl.textContent = '';
    errorEl.classList.remove('hint');
  }

  /**
   * Validate entire form
   */
  function validateForm() {
    let isValid = true;

    // Validate name
    const nameResult = validateName(nameInput.value);
    if (!nameResult.valid) {
      showFieldError(nameInput, nameError, nameResult.error);
      isValid = false;
    } else {
      clearFieldError(nameInput, nameError);
    }

    // Validate phone
    const phoneDigits = stripNonDigits(phoneInput.value);
    const phoneResult = validatePhone(phoneDigits);
    if (!phoneResult.valid) {
      showFieldError(phoneInput, phoneError, phoneResult.error);
      isValid = false;
    } else {
      clearFieldError(phoneInput, phoneError);
    }

    // Validate intención
    const intencionResult = validateIntencion(intencionInput.value);
    if (!intencionResult.valid) {
      showFieldError(intencionInput, intencionError, intencionResult.error);
      isValid = false;
    } else {
      clearFieldError(intencionInput, intencionError);
    }

    // Validate es_propietario
    const esPropietarioResult = validateSelect(esPropietarioSelect.value);
    if (!esPropietarioResult.valid) {
      showFieldError(esPropietarioSelect, esPropietarioError, esPropietarioResult.error);
      isValid = false;
    } else {
      clearFieldError(esPropietarioSelect, esPropietarioError);
    }

    // Validate tiene_escritura
    const tieneEscrituraResult = validateSelect(tieneEscrituraSelect.value);
    if (!tieneEscrituraResult.valid) {
      showFieldError(tieneEscrituraSelect, tieneEscrituraError, tieneEscrituraResult.error);
      isValid = false;
    } else {
      clearFieldError(tieneEscrituraSelect, tieneEscrituraError);
    }

    // Validate esta_hipotecada
    const estaHipotecadaResult = validateSelect(estaHipotecadaSelect.value);
    if (!estaHipotecadaResult.valid) {
      showFieldError(estaHipotecadaSelect, estaHipotecadaError, estaHipotecadaResult.error);
      isValid = false;
    } else {
      clearFieldError(estaHipotecadaSelect, estaHipotecadaError);
    }

    // Validate es_heredero
    const esHerederoResult = validateSelect(esHerederoSelect.value);
    if (!esHerederoResult.valid) {
      showFieldError(esHerederoSelect, esHerederoError, esHerederoResult.error);
      isValid = false;
    } else {
      clearFieldError(esHerederoSelect, esHerederoError);
    }

    // Validate servicio
    const servicioValue = servicioAutocomplete ? servicioAutocomplete.getValue() : '';
    const servicioResult = validateServicio(servicioValue);
    if (!servicioResult.valid) {
      showFieldError(servicioInput, servicioError, servicioResult.error);
      isValid = false;
    } else {
      clearFieldError(servicioInput, servicioError);
    }

    // Validate delegación
    const delegacionValue = delegacionAutocomplete ? delegacionAutocomplete.getValue() : '';
    const delegacionResult = validateDelegacion(delegacionValue);
    if (!delegacionResult.valid) {
      showFieldError(delegacionInput, delegacionError, delegacionResult.error);
      isValid = false;
    } else {
      clearFieldError(delegacionInput, delegacionError);
    }


    return isValid;
  }

  /**
   * Check if all required fields have values (without showing errors)
   * Used to enable/disable submit button
   */
  function isFormComplete() {
    const nameValue = nameInput.value.trim();
    const phoneDigits = stripNonDigits(phoneInput.value);
    const intencionValue = intencionInput.value.trim();
    const delegacionValue = delegacionAutocomplete ? delegacionAutocomplete.getValue() : '';
    const servicioValue = servicioAutocomplete ? servicioAutocomplete.getValue() : '';

    return (
      nameValue.length >= 2 &&
      phoneDigits.length === 10 &&
      intencionValue.length >= 1 &&
      delegacionValue.length > 0 &&
      servicioValue.length > 0 &&
      esPropietarioSelect.value !== '' &&
      tieneEscrituraSelect.value !== '' &&
      estaHipotecadaSelect.value !== '' &&
      esHerederoSelect.value !== ''
    );
  }

  /**
   * Update submit button enabled/disabled state
   */
  function updateSubmitButtonState() {
    submitBtn.disabled = !isFormComplete();
  }

  // ===========================================
  // Form State Management
  // ===========================================

  /**
   * Set form to loading state
   */
  function setLoadingState(loading) {
    const inputs = form.querySelectorAll('input, select');

    if (loading) {
      submitBtn.disabled = true;
      submitBtn.classList.add('loading');
      submitBtn.querySelector('.btn-text').textContent = 'Enviando...';
      inputs.forEach(input => input.disabled = true);
      form.classList.add('form-loading');
    } else {
      submitBtn.disabled = false;
      submitBtn.classList.remove('loading');
      submitBtn.querySelector('.btn-text').textContent = 'QUIERO QUE ME CONTACTEN';
      inputs.forEach(input => input.disabled = false);
      form.classList.remove('form-loading');
    }
  }

  /**
   * Show success state
   */
  function showSuccess() {
    form.style.display = 'none';
    errorAlert.style.display = 'none';
    successAlert.style.display = 'block';
    form.reset();
    // Reset select has-value classes
    [esPropietarioSelect, tieneEscrituraSelect, estaHipotecadaSelect, esHerederoSelect].forEach(select => {
      select.classList.remove('has-value');
    });
    // Reset autocomplete states
    if (delegacionAutocomplete) {
      delegacionAutocomplete.reset();
    }
    if (servicioAutocomplete) {
      servicioAutocomplete.reset();
    }
  }

  /**
   * Show error state
   */
  function showError() {
    errorAlert.style.display = 'block';
    successAlert.style.display = 'none';
  }

  /**
   * Reset to form state (for retry)
   */
  function resetToForm() {
    form.style.display = 'block';
    errorAlert.style.display = 'none';
    successAlert.style.display = 'none';
    setLoadingState(false);
  }

  // ===========================================
  // Form Submission
  // ===========================================

  /**
   * Submit form data to endpoint
   */
  async function submitForm() {
    const phoneDigits = stripNonDigits(phoneInput.value);
    const boroughValue = delegacionAutocomplete ? delegacionAutocomplete.getValue() : '';
    const servicioValue = servicioAutocomplete ? servicioAutocomplete.getValue() : '';

    // Transform select values: si → "yes", no → "no", no_se → "unknown"
    const toAnswer = (val) => val === 'si' ? 'yes' : val === 'no' ? 'no' : 'unknown';

    const data = {
      name: nameInput.value.trim(),
      phone: '52' + phoneDigits,
      borough: boroughValue,
      state: CONFIG.STATE,
      country: CONFIG.COUNTRY,
      service: CONFIG.SERVICE,
      service_category: CONFIG.SERVICE_CATEGORY, // "real_property" from CONFIG
      information: {                              // NEW: nested object for user answers
        service_type: servicioValue,              // User's answer to "Servicio que necesitas"
        intention: intencionInput.value.trim(),
        is_owner: toAnswer(esPropietarioSelect.value),
        is_heir: toAnswer(esHerederoSelect.value),
        has_deed: toAnswer(tieneEscrituraSelect.value),
        is_mortgaged: toAnswer(estaHipotecadaSelect.value)
      },
      source: {
        type: CONFIG.SOURCE_TYPE,
        domain: window.location.hostname
      }
    };

    try {
      const response = await fetch(CONFIG.ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return { success: true };
    } catch (error) {
      console.error('Form submission error:', error);
      return { success: false, error: error.message };
    }
  }

  // ===========================================
  // Event Listeners
  // ===========================================

  // Helper function to show hint (gray text, not error)
  function showFieldHint(input, errorEl, message) {
    input.classList.remove('error');
    errorEl.textContent = message;
    errorEl.classList.add('hint');
    errorEl.classList.remove('error-text');
  }

  // Phone input: block non-numeric, no formatting (raw digits only)
  phoneInput.addEventListener('input', function(e) {
    let digits = stripNonDigits(e.target.value);

    // Limit to 10 digits
    if (digits.length > 10) {
      digits = digits.slice(0, 10);
    }

    // Set raw digits (no formatting)
    e.target.value = digits;

    // While typing: show hint in gray if not complete, clear if complete
    if (digits.length > 0 && digits.length < 10) {
      // Show gray hint while typing
      showFieldHint(phoneInput, phoneError, '10 dígitos requeridos');
    } else {
      // 10 digits or empty - clear hint
      clearFieldError(phoneInput, phoneError);
    }

    updateSubmitButtonState();
  });

  // Phone blur: validate and show error in red if invalid
  phoneInput.addEventListener('blur', function(e) {
    const digits = stripNonDigits(e.target.value);

    // Remove hint class
    phoneError.classList.remove('hint');

    if (digits.length === 0) {
      // Empty is okay on blur (will be caught on submit)
      clearFieldError(phoneInput, phoneError);
      return;
    }

    const result = validatePhone(digits);
    if (!result.valid) {
      showFieldError(phoneInput, phoneError, result.error);
    } else {
      clearFieldError(phoneInput, phoneError);
    }
  });

  // Phone focus: if has content but incomplete, show hint
  phoneInput.addEventListener('focus', function(e) {
    const digits = stripNonDigits(e.target.value);
    if (digits.length > 0 && digits.length < 10) {
      showFieldHint(phoneInput, phoneError, '10 dígitos requeridos');
    }
  });

  // Prevent non-numeric keypress on phone
  phoneInput.addEventListener('keypress', function(e) {
    // Allow control keys
    if (e.ctrlKey || e.metaKey || e.key === 'Backspace' || e.key === 'Delete' ||
        e.key === 'ArrowLeft' || e.key === 'ArrowRight' || e.key === 'Tab') {
      return;
    }

    // Block non-numeric
    if (!/^\d$/.test(e.key)) {
      e.preventDefault();
    }
  });

  // Select field change handlers - add has-value class for floating label
  [esPropietarioSelect, tieneEscrituraSelect, estaHipotecadaSelect, esHerederoSelect].forEach(select => {
    select.addEventListener('change', function() {
      if (this.value) {
        this.classList.add('has-value');
      } else {
        this.classList.remove('has-value');
      }
      updateSubmitButtonState();
    });
  });

  // Name input handler for submit button state
  nameInput.addEventListener('input', updateSubmitButtonState);

  // Intencion input handler - update counter and submit button state
  const intencionCounter = document.getElementById('intencionCounter');
  intencionInput.addEventListener('input', function() {
    const len = this.value.length;
    intencionCounter.textContent = len + '/300';
    updateSubmitButtonState();
  });

  // Delegación change handler - called by autocomplete
  function handleDelegacionChange(value, isCustom) {
    // Clear error when value changes
    if (value) {
      clearFieldError(delegacionInput, delegacionError);
    }
    updateSubmitButtonState();
  }

  // Servicio change handler - called by autocomplete
  function handleServicioChange(value, isCustom) {
    // Clear error when value changes
    if (value) {
      clearFieldError(servicioInput, servicioError);
    }
    updateSubmitButtonState();
  }

  // Initialize submit button as disabled
  submitBtn.disabled = true;

  // Form submission
  form.addEventListener('submit', async function(e) {
    e.preventDefault();

    // Validate form
    if (!validateForm()) {
      return;
    }

    // Set loading state
    setLoadingState(true);

    // Submit form
    const result = await submitForm();

    // Handle result
    setLoadingState(false);

    if (result.success) {
      showSuccess();
    } else {
      showError();
    }
  });

  // Retry button
  retryBtn.addEventListener('click', function() {
    resetToForm();
  });

  // ===========================================
  // Initialization
  // ===========================================

  // Check if CONFIG is defined
  if (typeof CONFIG === 'undefined') {
    console.error('CONFIG is not defined. Please create config.js file.');
  }

  // Initialize servicio autocomplete
  if (servicioContainer) {
    servicioAutocomplete = new Autocomplete(servicioContainer, {
      options: SERVICIOS,
      freeSolo: false,
      onChange: handleServicioChange
    });
  }

  // Initialize delegación autocomplete
  if (delegacionContainer) {
    delegacionAutocomplete = new Autocomplete(delegacionContainer, {
      options: DELEGACIONES,
      freeSolo: true,
      onChange: handleDelegacionChange
    });
  }

})();
