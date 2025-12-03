document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('formRegistro');
    const mensajeExito = document.getElementById('mensajeExito');
    const btnEnviar = document.querySelector('.btn-enviar');

    // Escuchamos el evento cuando el usuario intenta enviar el formulario
    form.addEventListener('submit', function(e) {
        // 1. Evitamos que la página se recargue (comportamiento normal de un form)
        e.preventDefault();

        // 2. Validación básica del teléfono (Solo números)
        const phoneInput = document.getElementById('phone');
        const phoneValue = phoneInput.value.trim();
        
        // Expresión regular: solo permite dígitos del 0 al 9
        if (!/^\d+$/.test(phoneValue)) {
            alert('Por favor, ingresa un número de teléfono válido (solo números, sin espacios ni guiones).');
            phoneInput.focus();
            return; // Detenemos la función aquí si hay error
        }

        // 3. Cambiamos el botón para dar feedback al usuario
        const textoOriginal = btnEnviar.textContent;
        btnEnviar.textContent = 'Enviando...';
        btnEnviar.disabled = true;

        // 4. Preparamos los datos para Netlify
        // Netlify espera los datos como "application/x-www-form-urlencoded"
        const formData = new FormData(form);
        const data = new URLSearchParams(formData).toString();

        // 5. Enviamos los datos usando fetch (AJAX)
        fetch('/', {
            method: 'POST',
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: data
        })
        .then(() => {
            // --- ÉXITO ---
            // Ocultamos el formulario y mostramos el mensaje de gracias
            form.style.display = 'none';
            if (mensajeExito) {
                mensajeExito.style.display = 'block';
            } else {
                // Fallback por si no existe el div de mensaje
                alert("¡Gracias! Hemos recibido tus datos.");
                form.reset();
                btnEnviar.textContent = textoOriginal;
                btnEnviar.disabled = false;
                form.style.display = 'block';
            }
        })
        .catch((error) => {
            // --- ERROR ---
            console.error('Error de envío:', error);
            alert('Hubo un problema al enviar el formulario. Por favor revisa tu conexión e inténtalo de nuevo.');
            
            // Restauramos el botón
            btnEnviar.textContent = textoOriginal;
            btnEnviar.disabled = false;
        });
    });
});