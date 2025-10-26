type FormElements = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

function updateExperienceValue(): void {
    const rangeInput = document.getElementById('experienceLevel') as HTMLInputElement;
    const valueSpan = document.getElementById('experienceValue') as HTMLSpanElement;
    
    if (rangeInput && valueSpan) {
        valueSpan.textContent = rangeInput.value;
    }
}


function handleStudentProofRequirement(): void {
    const studentEntryRadio = document.getElementById('entryStudent') as HTMLInputElement;
    const studentProofGroup = document.getElementById('studentProofGroup') as HTMLElement;
    const studentProofInput = document.getElementById('studentProof') as HTMLInputElement;

    if (studentEntryRadio && studentProofGroup && studentProofInput) {
        const isStudent = studentEntryRadio.checked;
        
        if (isStudent) {
            studentProofInput.required = true;
            studentProofGroup.classList.add('required-field');
            studentProofGroup.querySelector('label')!.textContent = 'Comprobante de Estudiante: *';
        } else {
            studentProofInput.required = false;
            studentProofGroup.classList.remove('required-field');
            studentProofGroup.querySelector('label')!.textContent = 'Comprobante de Estudiante:';
        }
    }
}

function displayError(element: FormElements, message: string): void {
    const formGroup = element.closest('.form-group');
    if (!formGroup) return;

    const errorDiv = formGroup.querySelector('.error-message') as HTMLElement;
    
    if (errorDiv) {
        errorDiv.textContent = message;
        element.classList.add('input-error');
        element.setAttribute('aria-invalid', 'true');
    }
}

function clearError(element: FormElements): void {
    const formGroup = element.closest('.form-group');
    if (!formGroup) return;

    const errorDiv = formGroup.querySelector('.error-message') as HTMLElement;
    
    if (errorDiv) {
        errorDiv.textContent = '';
        element.classList.remove('input-error');
        element.setAttribute('aria-invalid', 'false');
    }
}


function validateForm(event: Event): void {
    const form = document.getElementById('registrationForm') as HTMLFormElement;
    if (!form) return;
    
    // 1. Siempre prevenimos el envío al inicio para que el JS tome el control total.
    event.preventDefault(); 
    
    let hasErrors = false;
    
    const formElements = form.querySelectorAll<FormElements>('input, select, textarea');
    formElements.forEach(clearError);

    // VERIFICACIÓN DE CAMPOS REQUERIDOS (HTML5 Validation) ---
    // Iteramos sobre todos los campos para verificar las reglas nativas (required, email, minlength)

    formElements.forEach(element => {
        // Utilizamos la función checkValidity() para evaluar todas las reglas HTML5 de golpe.
        if (!element.checkValidity()) {
            
            let errorMessage = element.validationMessage;
            
            // Si es un campo requerido y está vacío, mostramos el mensaje personalizado.
            if (element.required && element.value.trim() === '') {
                 errorMessage = 'Este campo es obligatorio.';
            } 
            // Para <select> requerido vacío (cuando el value es "")
            else if (element.tagName === 'SELECT' && element.required && element.value === '') {
                 errorMessage = 'Debe seleccionar una opción.';
            }

            // Para radio buttons requeridos (si no se selecciona uno, el error aparece en el grupo)
            if (element.type === 'radio' && element.required) {
                const radioGroup = form.querySelectorAll(`input[name="${element.name}"]:checked`);
                if (radioGroup.length === 0) {
                    // Solo mostramos el error una vez por grupo de radio buttons
                    const errorContainer = document.getElementById(`error-${element.name}`);
                    if (errorContainer && errorContainer.textContent === '') {
                        errorContainer.textContent = 'Debe seleccionar el tipo de entrada.';
                        element.classList.add('input-error'); // Marcar el primer radio con error si es necesario
                    }
                    hasErrors = true;
                }
            } else {
                // Para todos los demás campos con fallos de validación (email, pattern, minlength, etc.)
                displayError(element, errorMessage);
                hasErrors = true;
            }
        }
    });

    // --- 3. VALIDACIONES PERSONALIZADAS (Lógica Específica) ---
    
    const passwordInput = document.getElementById('password') as HTMLInputElement;
    const confirmPasswordInput = document.getElementById('confirmPassword') as HTMLInputElement;
    const termsCheckbox = document.getElementById('terms') as HTMLInputElement;
    const studentEntryRadio = document.getElementById('entryStudent') as HTMLInputElement;
    const studentProofInput = document.getElementById('studentProof') as HTMLInputElement;

    // A) Confirmación de Contraseña
    if (passwordInput.value !== confirmPasswordInput.value) {
        displayError(confirmPasswordInput, 'Las contraseñas no coinciden.');
        hasErrors = true;
    }
    
    // B) Términos y Condiciones (checkValidity() falla, pero aseguramos mensaje claro)
    if (!termsCheckbox.checked) {
        displayError(termsCheckbox, 'Debe aceptar los términos y condiciones.');
        hasErrors = true;
    }
    
    // C) Lógica Condicional: Comprobante de Estudiante 
    if (studentEntryRadio.checked && studentProofInput.files?.length === 0) {
        displayError(studentProofInput, 'Como estudiante, debe subir un comprobante.');
        hasErrors = true;
    }

    if (hasErrors) {
        // El event.preventDefault() ya está al inicio. Simplemente mostramos el feedback.
        alert('Error: Por favor, Complete o corriga los errores que se muestran en el formulario.');
        
        // Opcional: Enfocar el primer campo con error para mejor UX
        const firstErrorElement = form.querySelector('.input-error') as FormElements;
        if (firstErrorElement) {
             firstErrorElement.focus();
        }

    } else {
        // Éxito: El formulario pasa la validación.
        console.log('Formulario validado y listo para enviar al servidor.');
        alert('🎉 ¡Registro exitoso!');
        // form.submit(); // Descomentar para envío real
    }
}

/**
 * Inicializa todos los event listeners y comportamientos.
 */
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registrationForm') as HTMLFormElement;
    const rangeInput = document.getElementById('experienceLevel') as HTMLInputElement;
    const entryTypeRadios = document.getElementsByName('entryType') as NodeListOf<HTMLInputElement>;
    
    // Inicializaciones de Rango
    updateExperienceValue(); 
    if (rangeInput) {
        rangeInput.addEventListener('input', updateExperienceValue);
    }
    
    // Inicialización de Lógica Condicional (Tipo de Entrada)
    handleStudentProofRequirement(); 
    entryTypeRadios.forEach(radio => {
        radio.addEventListener('change', handleStudentProofRequirement);
    });

    // Validación al enviar el formulario
    if (form) {
        form.addEventListener('submit', validateForm);
    }
    
    // Limpieza de errores al interactuar con los campos (para mejor UX)
    form.querySelectorAll<FormElements>('input, select, textarea').forEach(element => {
        // Al perder el foco (blur), limpia el error si el campo es válido
        element.addEventListener('blur', (e) => {
             const target = e.target as FormElements;
             if (target.checkValidity() && target.id !== 'confirmPassword') {
                 clearError(target);
             }
        });
        
        // Limpieza específica para campos de confirmación/términos
        if (element.id === 'password' || element.id === 'confirmPassword' || element.id === 'terms' || element.id === 'studentProof') {
             element.addEventListener('input', () => clearError(element));
        }
    });

    // Botón de Soporte con un comportamiento simple 
    const helpBtn = document.getElementById('helpBtn');
    if(helpBtn) {
        helpBtn.addEventListener('click', () => {
            alert('¡Bienvenido! Este botón está diseñado para mostrar ayuda contextual. Por ahora, solo muestra este mensaje.');
        });
    }

});