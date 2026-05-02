/**
 * BRYAN'S CAFÉ - CORE APP SCRIPT
 * Handles Dynamic Year, XML Menu Loading, and Form Feedback.
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. REQUERIMIENTO: Actualización automática del año 
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // 2. REQUERIMIENTO: Notificación de formulario [cite: 284]
    const enquiryForm = document.getElementById('enquiryForm');
    if (enquiryForm) {
        enquiryForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert("Thank you for your enquiry! Your message has been sent successfully.");
            enquiryForm.reset();
        });
    }

    // 3. REQUERIMIENTO: Carga de Menú desde XML 
    if (document.getElementById('product-list')) {
        loadData('menu.xml', renderMenu);
    }
    
    // 4. REQUERIMIENTO: Carga de Sucursales desde XML 
    if (document.getElementById('branches-display')) {
        loadData('branches.xml', renderBranches);
    }
});

/**
 * Función genérica para cargar archivos XML
 */
async function loadData(url, callback) {
    try {
        const response = await fetch(url);
        const text = await response.text();
        const xml = new DOMParser().parseFromString(text, "text/xml");
        callback(xml);
    } catch (err) {
        console.error(`Error loading ${url}:`, err);
    }
}

function renderMenu(xml) {
    const container = document.getElementById('product-list'); // O el ID que uses
    const items = xml.querySelectorAll('item');
    let html = '';

    items.forEach(item => {
        // Aquí se obtiene la ruta 'assets/imagen.jpg' directamente del XML
        const imagePath = item.querySelector('image').textContent;
        const name = item.querySelector('name').textContent;
        const price = item.querySelector('price').textContent;
        const desc = item.querySelector('description').textContent;

        html += `
            <article class="card">
                <div class="card-img" style="background-image: url('${imagePath}')"></div>
                <div class="card-body">
                    <span class="card-price">$${price}</span>
                    <h3 class="card-title">${name}</h3>
                    <p>${desc}</p>
                </div>
            </article>`;
    });
    container.innerHTML = html;
}

function renderBranches(xml) {
    const container = document.getElementById('branches-display');
    const branches = xml.querySelectorAll('branch');
    let html = '';
    branches.forEach(b => {
        html += `
            <div class="branch-card">
                <h3>Location</h3>
                <p><strong>Address:</strong> ${b.querySelector('address').textContent}</p>
                <p><strong>Contact:</strong> ${b.querySelector('contact').textContent}</p>
                <p><strong>Hours:</strong> ${b.querySelector('opening_hours').textContent}</p>
                <a href="${b.querySelector('map_link').textContent}" target="_blank">View Map</a>
            </div>`;
    });
    container.innerHTML = html;
}