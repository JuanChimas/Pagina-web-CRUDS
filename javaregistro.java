// script.js
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('formRegistro');

    form.addEventListener('submit', function(e) {
        // Aquí podrías agregar validaciones extra si quisieras detener el envío
        const phone = document.getElementById('phone').value;
        
        // Ejemplo: Validar que el teléfono solo tenga números
        if (!/^\d+$/.test(phone.replace(/\s/g, ''))) {
            alert('Por favor, ingresa un número de teléfono válido.');
            e.preventDefault(); // Detiene el envío si hay error
            return;
        }

        // Si todo está bien, el formulario se enviará a procesar.php
        // Opcional: Mostrar un texto de "Cargando..." en el botón
        const btn = document.querySelector('.btn-enviar');
        btn.textContent = 'Procesando...';
        btn.disabled = true;
    });
});