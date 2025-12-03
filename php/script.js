document.addEventListener('DOMContentLoaded', function() {
    // Obtenemos las referencias a los elementos del HTML
    const form = document.getElementById('formRegistro');
    const mensajeExito = document.getElementById('mensajeExito');
    const btnEnviar = document.querySelector('.btn-enviar');

    // Escuchamos cuando alguien le da clic a "Enviar"
    form.addEventListener('submit', function(e) {
        
        // 1. IMPORTANTE: Detenemos el envío normal para hacerlo nosotros manual
        e.preventDefault();

        // 2. Validación de Teléfono (Solo números)
        const phoneInput = document.getElementById('phone');
        const phoneValue = phoneInput.value.trim();

        // Si el teléfono tiene letras o espacios, mostramos error y paramos
        if (!/^\d+$/.test(phoneValue)) {
            alert('Por favor, ingresa un número de teléfono válido (solo números, sin guiones ni espacios).');
            phoneInput.focus();
            return;
        }

        // 3. Cambiamos el botón para que el usuario sepa que está cargando
        const textoOriginal = btnEnviar.textContent;
        btnEnviar.textContent = 'Enviando...';
        btnEnviar.disabled = true;

        // 4. Preparamos los datos para Netlify
        // Netlify necesita que los datos vayan "codificados como URL"
        const formData = new FormData(form);
        const data = new URLSearchParams(formData).toString();

        // 5. Enviamos los datos a Netlify usando fetch (AJAX)
        fetch("/", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: data
        })
        .then(() => {
            // --- SI TODO SALIÓ BIEN ---
            // Ocultamos el formulario
            form.style.display = 'none';
            // Mostramos el mensaje de éxito
            if (mensajeExito) {
                mensajeExito.style.display = 'block';
            } else {
                alert("¡Gracias! Hemos recibido tus datos correctamente.");
                window.location.reload();
            }
        })
        .catch((error) => {
            // --- SI HUBO UN ERROR ---
            console.error('Error:', error);
            alert("Hubo un problema al enviar el formulario. Intenta de nuevo.");
            
            // Regresamos el botón a la normalidad
            btnEnviar.textContent = textoOriginal;
            btnEnviar.disabled = false;
        });
    });
});
