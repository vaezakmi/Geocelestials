document.addEventListener('DOMContentLoaded', function() {
    const interest = document.getElementById('interest');
    const nameInput = document.getElementById('name');
    const message = document.getElementById('message');
    const form = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');

    if (interest && nameInput && message) {
        interest.addEventListener('change', function() {
            const name = nameInput.value || '[Your Name]';
            let autoMessage = '';
            switch (this.value) {
                case 'Smartboards':
                    autoMessage = `Hello, my name is ${name}. I am interested in learning more about your Smartboards solutions. Please provide more details.`;
                    break;
                case 'Training':
                    autoMessage = `Hello, my name is ${name}. I would like to inquire about your training programs. Kindly share more information.`;
                    break;
                case 'Demo':
                    autoMessage = `Hello, my name is ${name}. I would like to book a demo for your products. Please let me know the available slots.`;
                    break;
                case 'Other':
                    autoMessage = '';
                    break;
                default:
                    autoMessage = '';
            }
            message.value = autoMessage;
        });
    }

    if (form && formStatus) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(form);

            fetch('https://formspree.io/f/mpwrkwpq', {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    formStatus.innerText = 'Thank you! Your message has been sent.';
                    form.reset();
                } else {
                    formStatus.innerText = 'Oops! There was a problem sending your message.';
                }
            })
            .catch(() => {
                formStatus.innerText = 'Oops! There was a problem sending your message.';
            });
        });
    }
});
