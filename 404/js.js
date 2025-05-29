document.getElementById('your-form-id').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const formData = {
        name: document.querySelector('[name="name"]').value,
        phone: document.querySelector('[name="phone"]').value,
        service: document.querySelector('[name="service"]').value,
        budget: document.querySelector('[name="budget"]').value,
        message: document.querySelector('[name="message"]').value
    };
    
    try {
        const response = await fetch('save_application.php', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(formData)
        });
        
        const result = await response.json();
        
        if (result.success) {
            alert('Заявка отправлена успешно!');
            this.reset(); // Clear form
        } else {
            alert('Ошибка: ' + result.message);
        }
    } catch (error) {
        alert('Ошибка отправки: ' + error.message);
    }
});