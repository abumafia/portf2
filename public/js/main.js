// DOM yuklangandan so'ng
document.addEventListener('DOMContentLoaded', function() {
    // Yulduzlar effekti
    createStars();
    
    // Sayt ma'lumotlarini yuklash
    loadSiteData();
    
    // Xizmatlarni yuklash
    loadServices();
    
    // Mahsulotlarni yuklash
    loadProducts();
    
    // Galereyani yuklash
    loadGallery();
    
    // Ijtimoiy tarmoqlarni yuklash
    loadSocialMedia();
    
    // Buyurtma formasi
    setupOrderForm();
});

// Yulduzlar effektini yaratish
function createStars() {
    const container = document.getElementById('stars-container');
    for (let i = 0; i < 100; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        star.style.width = Math.random() * 3 + 'px';
        star.style.height = star.style.width;
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.animationDuration = (Math.random() * 5 + 3) + 's';
        star.style.animationDelay = Math.random() * 5 + 's';
        container.appendChild(star);
    }
}

// Sayt ma'lumotlarini yuklash
async function loadSiteData() {
    try {
        const response = await fetch('https://portf2.onrender.com/api/portfolio');
        const data = await response.json();
        
        // Sayt sarlavhasi
        if (data.siteTitle) {
            document.getElementById('site-title').textContent = data.siteTitle;
            document.title = data.siteTitle;
        }
        
        // Favicon
        if (data.favicon) {
            let link = document.querySelector("link[rel~='icon']");
            if (!link) {
                link = document.createElement('link');
                link.rel = 'icon';
                document.head.appendChild(link);
            }
            link.href = data.favicon;
        }
        
        // Shaxs haqida ma'lumot
        if (data.personName) {
            document.getElementById('person-name').textContent = data.personName;
        }
        
        if (data.personBio) {
            document.getElementById('about-content').innerHTML = data.personBio;
        }
    } catch (error) {
        console.error('Ma\'lumotlarni yuklashda xato:', error);
    }
}

// Xizmatlarni yuklash
async function loadServices() {
    try {
        const response = await fetch('https://portf2.onrender.com/api/portfolio');
        const data = await response.json();
        
        const container = document.getElementById('services-container');
        if (data.services && data.services.length > 0) {
            container.innerHTML = data.services.map(service => `
                <div class="cosmic-card hologram-effect p-6 rounded-2xl">
                    <h3 class="text-xl font-bold mb-3 text-neon">${service.name}</h3>
                    <p class="mb-4">${service.description || ''}</p>
                    <p class="text-stardust text-2xl font-bold">${service.price ? service.price.toLocaleString() + ' so\'m' : 'Narx kelishilgan'}</p>
                </div>
            `).join('');
        } else {
            container.innerHTML = '<p>Hozircha xizmatlar mavjud emas</p>';
        }
    } catch (error) {
        console.error('Xizmatlarni yuklashda xato:', error);
    }
}

// Mahsulotlarni yuklash
async function loadProducts() {
    try {
        const response = await fetch('https://portf2.onrender.com/api/portfolio');
        const data = await response.json();
        
        const container = document.getElementById('products-container');
        const select = document.getElementById('product');
        
        if (data.services && data.services.length > 0) {
            // Mahsulotlar konteyneri
            container.innerHTML = data.services.map(service => `
                <div class="cosmic-card hologram-effect p-6 rounded-2xl">
                    <h3 class="text-xl font-bold mb-3 text-neon">${service.name}</h3>
                    <p class="mb-4">${service.description || ''}</p>
                    <p class="text-stardust text-2xl font-bold mb-4">${service.price ? service.price.toLocaleString() + ' so\'m' : 'Narx kelishilgan'}</p>
                    <button class="galaxy-border px-4 py-2 rounded-lg hover:bg-neon hover:text-space transition-all" data-product="${service.name}" data-price="${service.price || 0}">
                        Buyurtma berish
                    </button>
                </div>
            `).join('');
            
            // Select elementini to'ldirish
            select.innerHTML = '<option value="">Mahsulotni tanlang</option>' + 
                data.services.map(service => 
                    `<option value="${service.name}" data-price="${service.price || 0}">${service.name}</option>`
                ).join('');
        } else {
            container.innerHTML = '<p>Hozircha mahsulotlar mavjud emas</p>';
            select.innerHTML = '<option value="">Mahsulotlar mavjud emas</option>';
        }
        
        // Mahsulot tanlanganda narxni ko'rsatish
        select.addEventListener('change', function() {
            const selectedOption = this.options[this.selectedIndex];
            const price = selectedOption.getAttribute('data-price');
            document.getElementById('price').value = price ? Number(price).toLocaleString() + ' so\'m' : 'Narx kelishilgan';
        });
        
        // Buyurtma berish tugmasi
        container.querySelectorAll('button').forEach(button => {
            button.addEventListener('click', function() {
                const product = this.getAttribute('data-product');
                const price = this.getAttribute('data-price');
                
                document.getElementById('product').value = product;
                document.getElementById('price').value = price ? Number(price).toLocaleString() + ' so\'m' : 'Narx kelishilgan';
                
                document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
            });
        });
    } catch (error) {
        console.error('Mahsulotlarni yuklashda xato:', error);
    }
}

// Galereyani yuklash
async function loadGallery() {
    try {
        const response = await fetch('https://portf2.onrender.com/api/portfolio');
        const data = await response.json();
        
        const container = document.getElementById('gallery-container');
        if (data.gallery && data.gallery.length > 0) {
            container.innerHTML = data.gallery.map(item => `
                <div class="cosmic-card overflow-hidden rounded-lg">
                    <img src="${item.imageUrl}" alt="${item.title}" class="w-full h-48 object-cover">
                    <div class="p-3">
                        <p class="text-sm">${item.title}</p>
                    </div>
                </div>
            `).join('');
        } else {
            container.innerHTML = '<p>Hozircha galereyada rasmlar mavjud emas</p>';
        }
    } catch (error) {
        console.error('Galereyani yuklashda xato:', error);
    }
}

// Ijtimoiy tarmoqlarni yuklash
async function loadSocialMedia() {
    try {
        const response = await fetch('https://portf2.onrender.com/api/portfolio');
        const data = await response.json();
        
        const container = document.getElementById('social-icons');
        if (data.socialMedia && data.socialMedia.length > 0) {
            container.innerHTML = data.socialMedia.map(social => `
                <a href="${social.url}" target="_blank" class="text-2xl hover:text-neon transition-colors">
                    <i class="fab fa-${social.platform.toLowerCase()}"></i>
                </a>
            `).join('');
        }
        
        const contactContainer = document.getElementById('contact-info');
        if (contactContainer && data.socialMedia && data.socialMedia.length > 0) {
            contactContainer.innerHTML = data.socialMedia.map(social => `
                <div class="cosmic-card hologram-effect p-4 rounded-lg">
                    <i class="fab fa-${social.platform.toLowerCase()} text-3xl mb-2 text-neon"></i>
                    <p class="text-sm">${social.platform}</p>
                    <a href="${social.url}" target="_blank" class="text-xs">${social.url}</a>
                </div>
            `).join('');
        }
    } catch (error) {
        console.error('Ijtimoiy tarmoqlarni yuklashda xato:', error);
    }
}

// Buyurtma formasi
function setupOrderForm() {
    const form = document.getElementById('order-form');
    if (form) {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const formData = {
                productName: document.getElementById('product').value,
                price: document.getElementById('price').value,
                customerName: document.getElementById('customer_name').value,
                customerContact: document.getElementById('customer_contact').value,
                telegramUsername: document.getElementById('telegram_username').value,
                screenshot: document.getElementById('screenshot').value // Haqiqiy loyihada faylni yuklash kerak
            };
            
            try {
                const response = await fetch('https://portf2.onrender.com/api/order', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });
                
                const result = await response.json();
                if (response.ok) {
                    alert('Buyurtmangiz qabul qilindi! Tez orada siz bilan bog\'lanamiz.');
                    form.reset();
                } else {
                    alert('Xatolik yuz berdi: ' + result.message);
                }
            } catch (error) {
                console.error('Xatolik:', error);
                alert('Xatolik yuz berdi. Iltimos, keyinroq qayta urunib ko\'ring.');
            }
        });
    }
}
