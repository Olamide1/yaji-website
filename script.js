document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.getElementById('navbar');
    const navbarBurgers = Array.from(document.querySelectorAll('.navbar-burger'));

    // Add scroll event listener
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Navbar burger toggle
    navbarBurgers.forEach(el => {
        el.addEventListener('click', () => {
            const targetId = el.dataset.target;
            const targetElement = document.getElementById(targetId);

            el.classList.toggle('is-active');
            targetElement.classList.toggle('is-active');
        });
    });

    // Handle form submission
    const form = document.getElementById('contact-form');
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const formData = new FormData(form);

        fetch(form.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        }).then(response => {
            if (response.ok) {
                alert('Thank you for your message! We will get back to you soon.');
                form.reset();
            } else {
                response.json().then(data => {
                    if (Object.hasOwn(data, 'errors')) {
                        alert(data["errors"].map(error => error["message"]).join(", "));
                    } else {
                        alert('Oops! There was a problem submitting your form');
                    }
                })
            }
        }).catch(error => {
            alert('Oops! There was a problem submitting your form');
        });
    });
});
