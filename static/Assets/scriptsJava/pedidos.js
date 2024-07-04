document.addEventListener("DOMContentLoaded", function() {
    const pedidoForm = document.getElementById('pedidoForm');
    const emailInput = document.getElementById('correo');
    const emailError = document.getElementById('emailError');
    const cantidadInputs = document.querySelectorAll('.cantidad-producto');
    const totalInput = document.getElementById('total');
    const productCheckboxes = document.querySelectorAll('.form-check-input[name="producto"]');

    emailInput.addEventListener('input', function() {
        validateEmail();
    });

    cantidadInputs.forEach(input => {
        input.addEventListener('input', updateTotal);
    });

    productCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', updateTotal);
    });

    pedidoForm.addEventListener('submit', function(event) {
        if (!validateEmail()) {
            event.preventDefault();
        }
    });

    function validateEmail() {
        const emailValue = emailInput.value;
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (!emailPattern.test(emailValue)) {
            emailError.classList.remove('d-none');
            return false;
        } else {
            emailError.classList.add('d-none');
            return true;
        }
    }

    function updateTotal() {
        let total = 0;

        productCheckboxes.forEach(checkbox => {
            if (checkbox.checked) {
                const cantidadInput = document.getElementById(`cantidad${checkbox.id.replace('producto', '')}`);
                const precio = parseFloat(checkbox.getAttribute('data-precio'));
                const cantidad = parseFloat(cantidadInput.value);
                total += precio * cantidad;
            }
        });

        totalInput.value = `$${total.toFixed(2)}`;
    }
});
