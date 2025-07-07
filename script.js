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

 // Sticky Navbar on Scroll
    window.onscroll = function() { stickyNav() };
    var navbar = document.querySelector("nav");
    var sticky = navbar.offsetTop;

    function stickyNav() {
        if (window.pageYOffset >= sticky) {
            navbar.classList.add("sticky");
        } else {
            navbar.classList.remove("sticky");
        }
    }

    // Hamburger Menu Toggle
    const hamburger = document.getElementById("hamburger");
    const navLinks = document.querySelector(".nav-links");

    hamburger.addEventListener("click", () => {
        navLinks.classList.toggle("active");
    });

    // Add Active Class on Click
    const navItems = document.querySelectorAll(".nav-links li a");
    navItems.forEach(item => {
        item.addEventListener("click", () => {
            navItems.forEach(link => link.classList.remove("active"));
            item.classList.add("active");
        });
    });
     // Scroll Animation: Adding "show" class to service cards when in view
    window.addEventListener('scroll', () => {
        const serviceCards = document.querySelectorAll('.service-card');
        const scrollPosition = window.scrollY + window.innerHeight;

        serviceCards.forEach(card => {
            if (card.offsetTop + card.offsetHeight < scrollPosition) {
                card.classList.add('show');
            }
        });
    });
    document.getElementById('contact-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    const form = e.target;
    const status = document.getElementById('form-status');
    status.textContent = "Sending...";
    status.style.color = "#fff";
    try {
        const data = new FormData(form);
        const res = await fetch(form.action, {
            method: "POST",
            body: data,
            headers: { 'Accept': 'application/json' }
        });
        if (res.ok) {
            status.textContent = "Thank you! Your message has been sent.";
            status.style.color = "#4CAF50";
            form.reset();
        } else {
            status.textContent = "Oops! Something went wrong. Please try again.";
            status.style.color = "#ff4444";
        }
    } catch {
        status.textContent = "Network error. Please try again.";
        status.style.color = "#ff4444";
    }
});