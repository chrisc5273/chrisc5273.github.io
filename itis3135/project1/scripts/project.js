document.addEventListener("DOMContentLoaded", function() {

    // --- 1. Glossary Page: Live Search ---
    const searchInput = document.getElementById('glossarySearch');
    const glossaryList = document.getElementById('glossaryList');
    
    if (searchInput) {
        searchInput.addEventListener('keyup', function() {
            const filter = searchInput.value.toLowerCase();
            const terms = glossaryList.getElementsByTagName('dt');
            const definitions = glossaryList.getElementsByTagName('dd');

            for (let i = 0; i < terms.length; i++) {
                let termText = terms[i].textContent || terms[i].innerText;
                if (termText.toLowerCase().indexOf(filter) > -1) {
                    terms[i].style.display = "";
                    definitions[i].style.display = "";
                } else {
                    terms[i].style.display = "none";
                    definitions[i].style.display = "none";
                }
            }
        });
    }

    // --- 2. Diagrams Page: Lightbox Gallery ---
    const galleryImages = document.querySelectorAll('.gallery-img');
    const lightbox = document.getElementById('lightbox');
    
    if (lightbox) {
        const lightboxImg = document.getElementById('lightbox-img');
        const lightboxCaption = document.getElementById('lightbox-caption');
        const closeBtn = document.getElementById('close-lightbox');

        galleryImages.forEach(img => {
            img.addEventListener('click', function() {
                lightbox.style.display = "flex";
                lightboxImg.src = this.src; // Use placeholder URL
                lightboxCaption.textContent = this.dataset.caption; // Get caption from data-
            });
        });

        // Close lightbox
        closeBtn.addEventListener('click', function() {
            lightbox.style.display = "none";
        });
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) { // Close if clicking on background
                lightbox.style.display = "none";
            }
        });
    }

    // --- 3. Resources Page: AJAX Call ---
    const resourcesContainer = document.getElementById('resources-container');
    
    if (resourcesContainer) {
        fetch('links.json')
            .then(response => response.json())
            .then(data => {
                resourcesContainer.innerHTML = ''; // Clear "Loading..."
                data.forEach(item => {
                    resourcesContainer.innerHTML += `
                        <div class="resource-item">
                            <h4><a href="${item.url}" target="_blank">${item.title}</a></h4>
                            <p>${item.desc}</p>
                        </div>
                    `;
                });
            })
            .catch(error => {
                console.error('Error fetching resources:', error);
                resourcesContainer.innerHTML = '<p>Error loading resources. Please try again later.</p>';
            });
    }

    // --- 4. Contact Page: Form Validation ---
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Stop default submission

            let isValid = true;
            
            // Get fields
            const email = document.getElementById('contactEmail');
            const message = document.getElementById('contactMsg');
            const emailError = document.getElementById('email-error');
            const msgError = document.getElementById('msg-error');

            // Reset errors
            emailError.textContent = '';
            msgError.textContent = '';

            // Email validation
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email.value)) {
                emailError.textContent = 'Please enter a valid email address.';
                isValid = false;
            }

            // Message validation
            if (message.value.trim().length < 10) {
                msgError.textContent = 'Message must be at least 10 characters long.';
                isValid = false;
            }

            if (isValid) {
                // On success, hide form and show message
                contactForm.style.display = 'none';
                document.getElementById('form-success-msg').style.display = 'block';
            }
        });
    }

});