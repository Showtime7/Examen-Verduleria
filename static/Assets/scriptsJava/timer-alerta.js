document.addEventListener('DOMContentLoaded', (event) => {
    const alerts = document.querySelectorAll('.alert.show');
    alerts.forEach(alert => {
        setTimeout(() => {
            alert.classList.remove('show');
            alert.classList.add('fade-out');
        }, 2000); // 2000 ms = 2 segundos
    });
});
