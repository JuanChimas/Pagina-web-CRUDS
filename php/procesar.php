<?php
// procesar.php

// 1. Configuración de la Base de Datos
$host = 'localhost';
$dbuser = 'root';      // Usuario por defecto en XAMPP
$dbpass = '';          // Contraseña por defecto (vacía) en XAMPP
$dbname = 'indata_db'; // El nombre de la base de datos que creamos en el SQL

// Conexión a la base de datos
$conec = mysqli_connect($host, $dbuser, $dbpass, $dbname);

// Verificar conexión
if (!$conec) {
    die("Falló la conexión: " . mysqli_connect_error());
}

// 2. Verificar si se enviaron datos por POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    // Recibir y limpiar datos (para seguridad básica)
    $empresa = mysqli_real_escape_string($conec, $_POST['companyName']);
    $contacto = mysqli_real_escape_string($conec, $_POST['contactName']);
    $email = mysqli_real_escape_string($conec, $_POST['email']);
    $telefono = mysqli_real_escape_string($conec, $_POST['phone']);
    $giro = mysqli_real_escape_string($conec, $_POST['industry']);
    $necesidades = mysqli_real_escape_string($conec, $_POST['needs']);

    // 3. Insertar en la Base de Datos
    $insertar = "INSERT INTO leads (nombre_empresa, nombre_contacto, email, telefono, giro_negocio, necesidades) 
                 VALUES ('$empresa', '$contacto', '$email', '$telefono', '$giro', '$necesidades')";

    $resultado = mysqli_query($conec, $insertar);

    if ($resultado) {
        // --- ÉXITO AL GUARDAR ---

        // 4. Enviar Correo Electrónico
        
        // A) Correo para TI (Administrador)
        $para_admin = "tu_correo@gmail.com"; // ¡PON TU CORREO AQUÍ!
        $asunto_admin = "Nuevo Registro InData: $empresa";
        $mensaje_admin = "
        Se ha registrado un nuevo cliente potencial:
        
        Empresa: $empresa
        Contacto: $contacto
        Email: $email
        Teléfono: $telefono
        Giro: $giro
        Necesidades: $necesidades
        ";
        
        // B) Correo para el CLIENTE (Confirmación)
        $para_cliente = $email;
        $asunto_cliente = "Bienvenido a InData - Registro Exitoso";
        $mensaje_cliente = "
        Hola $contacto,
        
        Gracias por registrar a $empresa en InData. Hemos recibido tus datos correctamente.
        
        Nuestro equipo técnico analizará tus necesidades y te contactará pronto para tu demostración gratuita.
        
        Atentamente,
        El equipo de InData
        ";

        // Cabeceras para que el correo se vea bien
        $headers = "From: no-reply@indata.com" . "\r\n" .
                   "Reply-To: contacto@indata.com" . "\r\n" .
                   "X-Mailer: PHP/" . phpversion();

        // NOTA: La función mail() requiere un servidor de correo configurado (ver explicación abajo)
        @mail($para_admin, $asunto_admin, $mensaje_admin, $headers);
        @mail($para_cliente, $asunto_cliente, $mensaje_cliente, $headers);

        // Redirigir a una página de agradecimiento o volver con mensaje
        echo "<script>
                alert('¡Registro guardado exitosamente! Hemos enviado un correo de confirmación.');
                window.location.href = 'registro.html';
              </script>";
    } else {
        echo "Error al guardar: " . mysqli_error($conec);
    }

} else {
    // Si intentan entrar directo a este archivo sin enviar formulario
    header('Location: registro.html');
}

// Cerrar conexión
mysqli_close($conec);
?>