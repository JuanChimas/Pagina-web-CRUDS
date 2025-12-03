document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('formRegistro');
    const mensajeExito = document.getElementById('mensajeExito');
    const btnEnviar = document.querySelector('.btn-enviar');

    if (form) {
        form.addEventListener('submit', function(e) {
            // 1. DETENEMOS el envío normal (para que no busque procesar.php)
            e.preventDefault();

            const phoneInput = document.getElementById('phone');
            
            // 2. Validación simple (Solo números)
            if (!/^\d+$/.test(phoneInput.value.trim())) {
                alert('Por favor, ingresa un número de teléfono válido (solo números).');
                return;
            }

            // 3. Feedback visual (Botón "Enviando...")
            const textoOriginal = btnEnviar.textContent;
            btnEnviar.textContent = 'Enviando...';
            btnEnviar.disabled = true;

            // 4. Preparamos los datos para Netlify
            const formData = new FormData(form);
            const data = new URLSearchParams(formData).toString();

            // 5. Enviamos usando fetch (AJAX)
            fetch("/", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: data
            })
            .then(() => {
                // ÉXITO: Ocultamos el form y mostramos el mensaje
                form.style.display = 'none';
                if(mensajeExito) {
                    mensajeExito.style.display = 'block';
                } else {
                    alert("¡Gracias! Hemos recibido tus datos correctamente.");
                    window.location.reload();
                }
            })
            .catch((error) => {
                // ERROR
                console.error('Error:', error);
                alert("Hubo un problema al enviar el formulario. Intenta de nuevo.");
                
                // Restauramos el botón
                btnEnviar.textContent = textoOriginal;
                btnEnviar.disabled = false;
            });
        });
    }
});
