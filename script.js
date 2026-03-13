document.addEventListener('DOMContentLoaded', () => {
    // ---- 1. Scroll Active Nav Link Update ----
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // ---- 2. Intersection Observer for Slide Animations ----
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: stop observing once it's visible so it doesn't animate out
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // ---- 3. Editable "Tentang" Section with LocalStorage ----
    const aboutText = document.getElementById('aboutText');
    const editBtn = document.getElementById('editBtn');
    const saveBtn = document.getElementById('saveBtn');
    const saveIndicator = document.getElementById('saveIndicator');

    // Load saved data if exists
    const savedData = localStorage.getItem('neonPersonaAboutData');
    if (savedData) {
        aboutText.innerHTML = savedData;
    }

    let isEditing = false;

    editBtn.addEventListener('click', () => {
        if (!isEditing) {
            // Start editing
            aboutText.setAttribute('contenteditable', 'true');
            aboutText.focus();
            editBtn.textContent = 'Batal Edit';
            saveBtn.classList.remove('hidden');
            saveIndicator.classList.add('hidden');
            isEditing = true;
        } else {
            // Cancel editing
            aboutText.setAttribute('contenteditable', 'false');
            editBtn.textContent = 'Edit Deskripsi';
            saveBtn.classList.add('hidden');
            isEditing = false;
            // Restore original text if canceled without saving
            const revertedData = localStorage.getItem('neonPersonaAboutData');
            if (revertedData) {
                aboutText.innerHTML = revertedData;
            } else {
                // If never saved before, we just keep default html but reset editable state.
                // Ideally reload default original HTML, but this is fine for now.
            }
        }
    });

    saveBtn.addEventListener('click', () => {
        // Save editing
        const currentHtml = aboutText.innerHTML;
        localStorage.setItem('neonPersonaAboutData', currentHtml);
        
        aboutText.setAttribute('contenteditable', 'false');
        editBtn.textContent = 'Edit Deskripsi';
        saveBtn.classList.add('hidden');
        saveIndicator.classList.remove('hidden');
        isEditing = false;

        // Hide indicator after 3s
        setTimeout(() => {
            saveIndicator.classList.add('hidden');
        }, 3000);
    });
});
