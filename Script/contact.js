document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded');
    
    const form = document.getElementById('simpleForm');
    const button = document.querySelector('.btn-submit');
    
    // Force form submission on button click
    button.addEventListener('click', function(e) {
        e.preventDefault(); // Prevent default button behavior
        console.log('Button clicked! Now checking form...');
        
        // Get form data
        const formData = new FormData(form);
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        
        console.log('Email:', email);
        console.log('Phone:', phone);
        
        // Simple validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^\d{10}$/;
        
        let isValid = true;
        
        // Remove existing errors
        document.querySelectorAll('.error-message').forEach(el => el.remove());
        
        // Check email
        if (!email || !emailRegex.test(email)) {
            console.log('Email validation failed');
            showError('email', 'Please enter a valid email address');
            isValid = false;
        }
        
        // Check phone (if provided)
        if (phone && !phoneRegex.test(phone)) {
            console.log('Phone validation failed');
            showError('phone', 'Phone number must be exactly 10 digits');
            isValid = false;
        }
        
        // Check required fields
        const requiredFields = ['fullName', 'email', 'subject', 'userInput'];
        requiredFields.forEach(fieldId => {
            const field = document.getElementById(fieldId);
            if (!field.value.trim()) {
                console.log(`Required field ${fieldId} is empty`);
                showError(fieldId, 'This field is required');
                isValid = false;
            }
        });
        
        if (isValid) {
            console.log('Form is valid, submitting to Formspree...');
            form.submit(); // Force form submission
        } else {
            console.log('Form validation failed');
        }
    });
    
    function showError(fieldId, message) {
        const field = document.getElementById(fieldId);
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message invalid-feedback';
        errorDiv.textContent = message;
        field.parentNode.insertAdjacentElement('afterend', errorDiv);
        field.classList.add('is-invalid');
    }
});
