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
  const delegacionSelect = document.getElementById('delegacion');
  const ubicacionOtroGroup = document.getElementById('ubicacionOtroGroup');
  const ubicacionOtroInput = document.getElementById('ubicacionOtro');
  const coloniaInput = document.getElementById('colonia');

  // Error elements
  const nameError = document.getElementById('nameError');
  const phoneError = document.getElementById('phoneError');
  const delegacionError = document.getElementById('delegacionError');
  const ubicacionOtroError = document.getElementById('ubicacionOtroError');
  const coloniaError = document.getElementById('coloniaError');

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
   * Validate delegación field
   */
  function validateDelegacion(value) {
    if (!value) {
      return { valid: false, error: 'Selecciona una delegación' };
    }
    return { valid: true, error: '' };
  }

  /**
   * Validate ubicación otro field (only if delegación is "Otro")
   */
  function validateUbicacionOtro(value, delegacion) {
    if (delegacion === 'Otro' && value.trim().length === 0) {
      return { valid: false, error: 'Ingresa tu estado o ubicación' };
    }
    return { valid: true, error: '' };
  }

  /**
   * Validate colonia field
   */
  function validateColonia(value) {
    if (value.trim().length === 0) {
      return { valid: false, error: 'La colonia es requerida' };
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

    // Validate delegación
    const delegacionResult = validateDelegacion(delegacionSelect.value);
    if (!delegacionResult.valid) {
      showFieldError(delegacionSelect, delegacionError, delegacionResult.error);
      isValid = false;
    } else {
      clearFieldError(delegacionSelect, delegacionError);
    }

    // Validate ubicación otro (if applicable)
    if (delegacionSelect.value === 'Otro') {
      const ubicacionResult = validateUbicacionOtro(ubicacionOtroInput.value, delegacionSelect.value);
      if (!ubicacionResult.valid) {
        showFieldError(ubicacionOtroInput, ubicacionOtroError, ubicacionResult.error);
        isValid = false;
      } else {
        clearFieldError(ubicacionOtroInput, ubicacionOtroError);
      }
    }

    // Validate colonia
    const coloniaResult = validateColonia(coloniaInput.value);
    if (!coloniaResult.valid) {
      showFieldError(coloniaInput, coloniaError, coloniaResult.error);
      isValid = false;
    } else {
      clearFieldError(coloniaInput, coloniaError);
    }

    return isValid;
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
    // Reset select label state
    delegacionSelect.classList.remove('has-value');
    // Hide ubicación otro field
    ubicacionOtroGroup.style.display = 'none';
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

    const data = {
      name: nameInput.value.trim(),
      phone: phoneDigits,
      borough: delegacionSelect.value,
      neighborhood: coloniaInput.value.trim(),
      service: CONFIG.SERVICE,
      partner_slug: CONFIG.PARTNER_SLUG,
      source: CONFIG.SOURCE,
      domain: window.location.hostname,
      state: CONFIG.STATE,
      country: CONFIG.COUNTRY
    };

    // Add other_location if borough is "Otro"
    if (delegacionSelect.value === 'Otro') {
      data.other_location = ubicacionOtroInput.value.trim();
    }

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

  // Delegación change: show/hide ubicación otro field
  delegacionSelect.addEventListener('change', function(e) {
    // Add class for floating label
    if (e.target.value) {
      e.target.classList.add('has-value');
    } else {
      e.target.classList.remove('has-value');
    }

    // Show/hide ubicación otro
    if (e.target.value === 'Otro') {
      ubicacionOtroGroup.style.display = 'block';
      ubicacionOtroGroup.classList.add('slide-down');
      ubicacionOtroInput.required = true;
    } else {
      ubicacionOtroGroup.style.display = 'none';
      ubicacionOtroGroup.classList.remove('slide-down');
      ubicacionOtroInput.required = false;
      ubicacionOtroInput.value = '';
      clearFieldError(ubicacionOtroInput, ubicacionOtroError);
    }
  });

  // Clear errors on input
  nameInput.addEventListener('input', function() {
    if (nameInput.value.trim().length >= 2) {
      clearFieldError(nameInput, nameError);
    }
  });

  coloniaInput.addEventListener('input', function() {
    if (coloniaInput.value.trim().length > 0) {
      clearFieldError(coloniaInput, coloniaError);
    }
  });

  ubicacionOtroInput.addEventListener('input', function() {
    if (ubicacionOtroInput.value.trim().length > 0) {
      clearFieldError(ubicacionOtroInput, ubicacionOtroError);
    }
  });

  delegacionSelect.addEventListener('change', function() {
    if (delegacionSelect.value) {
      clearFieldError(delegacionSelect, delegacionError);
    }
  });

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

  // Initialize select state on page load
  // Ensure select doesn't have has-value class if empty
  if (delegacionSelect.value && delegacionSelect.value !== '') {
    delegacionSelect.classList.add('has-value');
  } else {
    delegacionSelect.classList.remove('has-value');
  }

})();
