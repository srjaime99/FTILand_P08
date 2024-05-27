document.addEventListener('DOMContentLoaded', function () {
    const nombreInput = document.getElementById('nombre');
    const emailInput = document.getElementById('email');
    const sugerenciasInput = document.getElementById('sugerencias');
    const submitButton = document.querySelector('input[type="submit"]');

    nombreInput.addEventListener('input', validarNombre);
    emailInput.addEventListener('input', validarEmail);
    sugerenciasInput.addEventListener('input', validarSugerencias);

    function validarNombre() {
        if (nombreInput.value.trim() === '' || !/^[a-zA-Z\s]+$/.test(nombreInput.value)) {
            nombreInput.classList.remove('valid');
            nombreInput.classList.add('invalid');
        } else {
            nombreInput.classList.remove('invalid');
            nombreInput.classList.add('valid');
        }
        validarFormulario();
    }

    function validarEmail() {
        if (emailInput.value.trim() === '' || !/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/.test(emailInput.value)) {
            emailInput.classList.remove('valid');
            emailInput.classList.add('invalid');
        } else {
            emailInput.classList.remove('invalid');
            emailInput.classList.add('valid');
        }
        validarFormulario();
    }

    function validarSugerencias() {
        if (sugerenciasInput.value.trim() === '') {
            sugerenciasInput.classList.remove('valid');
            sugerenciasInput.classList.add('invalid');
        } else {
            sugerenciasInput.classList.remove('invalid');
            sugerenciasInput.classList.add('valid');
        }
        validarFormulario();
    }

    function validarFormulario() {
        if (nombreInput.classList.contains('valid') && emailInput.classList.contains('valid') && sugerenciasInput.classList.contains('valid')) {
            submitButton.disabled = false;
        } else {
            submitButton.disabled = true;
        }
    }

    document.querySelector('form').addEventListener('submit', function(event) {
        event.preventDefault();
        var nombre = nombreInput.value;
        var email = emailInput.value;
        var sugerencias = sugerenciasInput.value;

        sendData(nombre, email, sugerencias);
        nombreInput.classList.remove('valid');
        emailInput.classList.remove('valid');
        sugerenciasInputq.classList.remove('valid');
    });
});

function sendData(nombre, email, sugerencias) {
    var xhr = new XMLHttpRequest();

    xhr.open('POST', 'https://samuelencinas.dev/sugerencias_parque', true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
            console.log('Solicitud exitosa');
            document.getElementById('nombre').value = '';
            document.getElementById('email').value = '';
            document.getElementById('sugerencias').value = '';
            $('#successModal').modal('show');
            document.querySelector('input[type="submit"]').disabled = true;
        } else {
            console.error('Error en la solicitud:', xhr.statusText);
        }
    };

    // Convertir los datos del formulario a formato JSON
    var data = JSON.stringify({
        nombre: nombre,
        email: email,
        sugerencias: sugerencias
    });

    // Enviar la solicitud con los datos del formulario
    xhr.send(data);
}
