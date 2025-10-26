"use strict";
function updateExperienceValue() {
    const rangeInput = document.getElementById('experienceLevel');
    const valueSpan = document.getElementById('experienceValue');
    if (rangeInput && valueSpan) {
        valueSpan.textContent = rangeInput.value;
    }
}
function handleStudentProofRequirement() {
    const studentEntryRadio = document.getElementById('entryStudent');
    const studentProofGroup = document.getElementById('studentProofGroup');
    const studentProofInput = document.getElementById('studentProof');
    if (studentEntryRadio && studentProofGroup && studentProofInput) {
        const isStudent = studentEntryRadio.checked;
        if (isStudent) {
            studentProofInput.required = true;
            studentProofGroup.classList.add('required-field');
            studentProofGroup.querySelector('label').textContent = 'Comprobante de Estudiante: *';
        }
        else {
            studentProofInput.required = false;
            studentProofGroup.classList.remove('required-field');
            studentProofGroup.querySelector('label').textContent = 'Comprobante de Estudiante:';
        }
    }
}

function displayError(element, message) {
    const formGroup = element.closest('.form-group');
    if (!formGroup)
        return;
    const errorDiv = formGroup.querySelector('.error-message');
    if (errorDiv) {
        errorDiv.textContent = message;
        element.classList.add('input-error');
        element.setAttribute('aria-invalid', 'true');
    }
}

function clearError(element) {
    const formGroup = element.closest('.form-group');
    if (!formGroup)
        return;
    const errorDiv = formGroup.querySelector('.error-message');
    if (errorDiv) {
        errorDiv.textContent = '';
        element.classList.remove('input-error');
        element.setAttribute('aria-invalid', 'false');
    }
}

function validateForm(event) {
    const form = document.getElementById('registrationForm');
    if (!form)
        return;
    // 1. Siempre prevenimos el envío al inicio para que el JS tome el control total.
    event.preventDefault();
    let hasErrors = false;
    const formElements = form.querySelectorAll('input, select, textarea');
    formElements.forEach(clearError);
    // --- 2. VERIFICACIÓN DE CAMPOS REQUERIDOS (HTML5 Validation) ---
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
            }
            else {
                // Para todos los demás campos con fallos de validación (email, pattern, minlength, etc.)
                displayError(element, errorMessage);
                hasErrors = true;
            }
        }
    });
    // --- 3. VALIDACIONES PERSONALIZADAS (Lógica Específica) ---
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const termsCheckbox = document.getElementById('terms');
    const studentEntryRadio = document.getElementById('entryStudent');
    const studentProofInput = document.getElementById('studentProof');
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
    // --- 4. RESULTADO FINAL ---
    if (hasErrors) {
        // El event.preventDefault() ya está al inicio. Simplemente mostramos el feedback.
        alert('❌ Error: Por favor, corrige los errores marcados antes de enviar.');
        // Opcional: Enfocar el primer campo con error para mejor UX
        const firstErrorElement = form.querySelector('.input-error');
        if (firstErrorElement) {
            firstErrorElement.focus();
        }
    }
    else {
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
    const form = document.getElementById('registrationForm');
    const rangeInput = document.getElementById('experienceLevel');
    const entryTypeRadios = document.getElementsByName('entryType');
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
    form.querySelectorAll('input, select, textarea').forEach(element => {
        // Al perder el foco (blur), limpia el error si el campo es válido
        element.addEventListener('blur', (e) => {
            const target = e.target;
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
    if (helpBtn) {
        helpBtn.addEventListener('click', () => {
            alert('¡Bienvenido! Este botón está diseñado para mostrar ayuda contextual. Por ahora, solo muestra este mensaje.');
        });
    }
});
//# sourceMappingURL=script.js.map