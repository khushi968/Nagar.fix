document.addEventListener('DOMContentLoaded', () => {
    const reportForm = document.getElementById('reportForm');
    const enhanceBtn = document.getElementById('enhanceBtn');
    const autoCatBtn = document.getElementById('autoCatBtn');
    const descInput = document.getElementById('description');
    const catSelect = document.getElementById('category');
    const severityInput = document.getElementById('severity');

    if (enhanceBtn) {
        enhanceBtn.addEventListener('click', async () => {
            const text = descInput.value;
            if (!text) return alert('Please enter a description first');

            enhanceBtn.textContent = 'Enhancing...';
            enhanceBtn.disabled = true;

            const enhanced = await AI.enhanceDescription(text);
            descInput.value = enhanced;

            // Auto detect severity when enhancing
            const severity = await AI.detectSeverity(enhanced);
            severityInput.value = severity;

            enhanceBtn.textContent = '✨ Enhance with AI';
            enhanceBtn.disabled = false;
        });
    }

    if (autoCatBtn) {
        autoCatBtn.addEventListener('click', async () => {
            const text = descInput.value;
            if (!text) return alert('Please enter a description first');

            autoCatBtn.textContent = 'Detecting...';
            const category = await AI.detectCategory(text);

            // Select the option if it exists
            const options = Array.from(catSelect.options);
            const match = options.find(opt => opt.value === category);
            if (match) {
                catSelect.value = category;
            } else {
                catSelect.value = 'Other';
            }

            autoCatBtn.textContent = 'Auto-Categorize';
        });
    }

    if (reportForm) {
        reportForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const submitBtn = reportForm.querySelector('button[type="submit"]');
            submitBtn.disabled = true;
            submitBtn.textContent = 'Submitting...';

            const report = {
                name: document.getElementById('name').value,
                location: document.getElementById('location').value,
                description: document.getElementById('description').value,
                category: document.getElementById('category').value,
                severity: document.getElementById('severity').value || 'Medium',
                imageUrl: null // Image upload not implemented in this demo
            };

            try {
                await Storage.createReport(report);
                alert('Report submitted successfully!');
                window.location.href = 'index.html';
            } catch (error) {
                console.error(error);
                alert('Failed to submit report.');
                submitBtn.disabled = false;
                submitBtn.textContent = 'Submit Report';
            }
        });
    }
});
