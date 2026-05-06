document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Dynamic Footer Year
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();

    // 2. Fetch and Render Menu XML
    const menuContainer = document.getElementById('dynamic-menu');
    if (menuContainer) {
        fetch('menu.xml')
            .then(res => res.text())
            .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
            .then(xml => {
                let html = '';

                // Render Meals
                html += '<h2 style="color:#1a1a1a; margin-top:2rem; border-bottom:2px solid #c5a059;">Meals</h2>';
                html += '<div class="grid-container" style="margin-top:1.5rem;">';
                const meals = xml.querySelectorAll('meals item');
                meals.forEach(item => {
                    const name = item.querySelector('name').textContent;
                    const price = item.querySelector('price').textContent;
                    const desc = item.querySelector('description').textContent;
                    const img = item.querySelector('image').textContent; // <-- Nueva línea
                    
                    html += `
                        <div class="card">
                            <img src="${img}" class="card-img" alt="${name}">
                            <h3>${name}</h3>
                            <span class="price">${price}</span>
                            <p>${desc}</p>
                        </div>`;
                });
                html += '</div>';

                // Render Coffee
                html += '<h2 style="color:#1a1a1a; margin-top:2rem; border-bottom:2px solid #c5a059;">Coffee & Hot Chocolates</h2>';
                const note = xml.querySelector('coffee_and_hot_chocolates note').textContent;
                html += `<p style="font-style:italic; color:#b85c38; margin: 1rem 0;">* ${note}</p>`;
                html += '<div class="grid-container">';
                const coffees = xml.querySelectorAll('coffee_and_hot_chocolates item');
                coffees.forEach(item => {
                    const size = item.querySelector('size').textContent;
                    const price = item.querySelector('price').textContent;
                    const img = item.querySelector('image').textContent; // <-- Nueva línea

                    html += `
                        <div class="card" style="border-left-color:#1a1a1a;">
                            <img src="${img}" class="card-img" alt="Coffee ${size}">
                            <h3>Size: ${size}</h3>
                            <span class="price">${price}</span>
                        </div>`;
                });
                html += '</div>';

                // Render Other Beverages
                html += '<h2 style="color:#1a1a1a; margin-top:2rem; border-bottom:2px solid #c5a059;">Other Beverages</h2>';
                html += '<div class="grid-container" style="margin-top:1.5rem;">';
                const others = xml.querySelectorAll('other_beverages item');
                others.forEach(item => {
                    const name = item.querySelector('name').textContent;
                    const price = item.querySelector('price').textContent;
                    const img = item.querySelector('image').textContent; // <-- Nueva línea

                    html += `
                        <div class="card" style="border-left-color:#1a1a1a;">
                            <img src="${img}" class="card-img" alt="${name}">
                            <h3>${name}</h3>
                            <span class="price">${price}</span>
                        </div>`;
                });
                html += '</div>';

                menuContainer.innerHTML = html;
            })
            .catch(err => console.error("Error loading menu:", err));
    }

    // 3. Fetch and Render Branches XML
    const branchesContainer = document.getElementById('dynamic-branches');
    if (branchesContainer) {
        fetch('branches.xml')
            .then(res => res.text())
            .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
            .then(xml => {
                let html = '<div class="grid-container">';
                const branches = xml.querySelectorAll('branch');
                branches.forEach(branch => {
                    const address = branch.querySelector('address').textContent;
                    const contact = branch.querySelector('contact').textContent;
                    const hours = branch.querySelector('opening_hours').textContent;
                    html += `
                        <div class="card" style="border-left-color:#b85c38;">
                            <h3>📍 Branch Location</h3>
                            <p><strong>Address:</strong> ${address}</p>
                            <p style="margin: 10px 0;"><strong>Contact:</strong> ${contact}</p>
                            <p><strong>Hours:</strong> ${hours}</p>
                        </div>`;
                });
                html += '</div>';
                branchesContainer.innerHTML = html;
            })
            .catch(err => console.error("Error loading branches:", err));
    }

    // 4. Form Validation (Cyber Security)
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            
            if (name === "" || email === "") {
                alert("Please fill in all required fields.");
                return;
            }
            if (!email.includes("@")) {
                alert("Please enter a valid email address.");
                return;
            }
            alert("Thank you! Your enquiry has been sent securely.");
            contactForm.reset();
        });
    }
});