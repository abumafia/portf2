// Admin paneli funksiyalari
document.addEventListener('DOMContentLoaded', function() {
    // Tab navigatsiyasi
    setupTabs();
    
    // Ma'lumotlarni yuklash
    loadAdminData();
    
    // Saqlash tugmalari
    setupSaveButtons();
});

// Tab navigatsiyasi
function setupTabs() {
    const tabItems = document.querySelectorAll('[data-tab]');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabItems.forEach(item => {
        item.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Barcha tab kontentlarini yashirish
            tabContents.forEach(content => {
                content.classList.add('hidden');
            });
            
            // Faqat tanlangan tabni ko'rsatish
            document.getElementById(`${tabId}-tab`).classList.remove('hidden');
            
            // Agar buyurtmalar tabi bo'lsa, buyurtmalarni yuklash
            if (tabId === 'orders') {
                loadOrders();
            }
        });
    });
}

// Ma'lumotlarni yuklash
async function loadAdminData() {
    try {
        const response = await fetch('/api/portfolio');
        const data = await response.json();
        
        // Umumiy sozlamalar
        if (data.siteTitle) {
            document.getElementById('site-title').value = data.siteTitle;
        }
        
        if (data.favicon) {
            document.getElementById('favicon').value = data.favicon;
        }
        
        // Men haqimda
        if (data.personName) {
            document.getElementById('person-name').value = data.personName;
        }
        
        if (data.personBio) {
            document.getElementById('person-bio').value = data.personBio;
        }
        
        // Xizmatlar
        if (data.services) {
            renderServices(data.services);
        }
        
        // Galereya
        if (data.gallery) {
            renderGallery(data.gallery);
        }
        
        // Mahsulotlar (xizmatlar bilan bir xil)
        if (data.services) {
            renderProducts(data.services);
        }
        
        // Ijtimoiy tarmoqlar
        if (data.socialMedia) {
            renderSocialMedia(data.socialMedia);
        }
    } catch (error) {
        console.error('Ma\'lumotlarni yuklashda xato:', error);
    }
}

// Xizmatlarni ko'rsatish
function renderServices(services) {
    const container = document.getElementById('services-list');
    if (services && services.length > 0) {
        container.innerHTML = services.map((service, index) => `
            <div class="service-item galaxy-border p-4 rounded-lg mb-4">
                <div class="grid gap-4 md:grid-cols-3 mb-4">
                    <div>
                        <label class="block mb-2">Xizmat nomi</label>
                        <input type="text" class="service-name galaxy-border bg-transparent rounded-lg block w-full p-2.5" value="${service.name || ''}" data-index="${index}">
                    </div>
                    <div>
                        <label class="block mb-2">Narxi</label>
                        <input type="number" class="service-price galaxy-border bg-transparent rounded-lg block w-full p-2.5" value="${service.price || ''}" data-index="${index}">
                    </div>
                    <div>
                        <label class="block mb-2">Tavsifi</label>
                        <input type="text" class="service-desc galaxy-border bg-transparent rounded-lg block w-full p-2.5" value="${service.description || ''}" data-index="${index}">
                    </div>
                </div>
                <button class="remove-service galaxy-border px-4 py-2 rounded-lg hover:bg-meteor transition-all" data-index="${index}">
                    O'chirish
                </button>
            </div>
        `).join('');
        
        // O'chirish tugmalarini sozlash
        container.querySelectorAll('.remove-service').forEach(button => {
            button.addEventListener('click', function() {
                const index = this.getAttribute('data-index');
                services.splice(index, 1);
                renderServices(services);
            });
        });
    } else {
        container.innerHTML = '<p>Hozircha xizmatlar mavjud emas</p>';
    }
}

// Galereyani ko'rsatish
function renderGallery(gallery) {
    const container = document.getElementById('gallery-list');
    if (gallery && gallery.length > 0) {
        container.innerHTML = gallery.map((item, index) => `
            <div class="gallery-item">
                <img src="${item.imageUrl}" alt="${item.title}" class="w-full h-32 object-cover rounded-lg mb-2">
                <input type="text" value="${item.title}" class="galaxy-border bg-transparent rounded-lg block w-full p-2 mb-2" placeholder="Rasm sarlavhasi">
                <button class="remove-gallery galaxy-border px-2 py-1 rounded-lg hover:bg-meteor transition-all text-sm" data-index="${index}">
                    O'chirish
                </button>
            </div>
        `).join('');
        
        // O'chirish tugmalarini sozlash
        container.querySelectorAll('.remove-gallery').forEach(button => {
            button.addEventListener('click', function() {
                const index = this.getAttribute('data-index');
                gallery.splice(index, 1);
                renderGallery(gallery);
            });
        });
    } else {
        container.innerHTML = '<p>Hozircha galereyada rasmlar mavjud emas</p>';
    }
}

// Mahsulotlarni ko'rsatish
function renderProducts(products) {
    const container = document.getElementById('products-list');
    // Xizmatlar bilan bir xil, shuning uchun renderServices ishlatiladi
    renderServices(products);
}

// Ijtimoiy tarmoqlarni ko'rsatish
function renderSocialMedia(socials) {
    const container = document.getElementById('social-list');
    if (socials && socials.length > 0) {
        container.innerHTML = socials.map((social, index) => `
            <div class="social-item galaxy-border p-4 rounded-lg mb-4">
                <div class="grid gap-4 md:grid-cols-2 mb-4">
                    <div>
                        <label class="block mb-2">Platforma</label>
                        <input type="text" class="social-platform galaxy-border bg-transparent rounded-lg block w-full p-2.5" value="${social.platform || ''}" placeholder="Instagram, Telegram, etc." data-index="${index}">
                    </div>
                    <div>
                        <label class="block mb-2">URL</label>
                        <input type="url" class="social-url galaxy-border bg-transparent rounded-lg block w-full p-2.5" value="${social.url || ''}" data-index="${index}">
                    </div>
                </div>
                <button class="remove-social galaxy-border px-4 py-2 rounded-lg hover:bg-meteor transition-all" data-index="${index}">
                    O'chirish
                </button>
            </div>
        `).join('');
        
        // O'chirish tugmalarini sozlash
        container.querySelectorAll('.remove-social').forEach(button => {
            button.addEventListener('click', function() {
                const index = this.getAttribute('data-index');
                socials.splice(index, 1);
                renderSocialMedia(socials);
            });
        });
    } else {
        container.innerHTML = '<p>Hozircha ijtimoiy tarmoqlar mavjud emas</p>';
    }
}

// Buyurtmalarni yuklash
async function loadOrders() {
    try {
        const response = await fetch('/api/orders');
        const orders = await response.json();
        
        const container = document.getElementById('orders-list');
        if (orders && orders.length > 0) {
            container.innerHTML = orders.map(order => `
                <div class="order-item galaxy-border p-4 rounded-lg mb-4">
                    <div class="flex justify-between items-start">
                        <div>
                            <h3 class="text-lg font-bold">${order.productName}</h3>
                            <p>Mijoz: ${order.customerName}</p>
                            <p>Aloqa: ${order.customerContact}</p>
                            <p>Telegram: ${order.telegramUsername}</p>
                            <p>Narx: ${order.price ? order.price.toLocaleString() + ' so\'m' : 'Narx kelishilgan'}</p>
                            <p>Holati: ${order.status}</p>
                            <p>Sana: ${new Date(order.createdAt).toLocaleDateString()}</p>
                        </div>
                        <div>
                            <select class="order-status galaxy-border bg-transparent rounded-lg p-2" data-order="${order._id}">
                                <option value="pending" ${order.status === 'pending' ? 'selected' : ''}>Kutilmoqda</option>
                                <option value="confirmed" ${order.status === 'confirmed' ? 'selected' : ''}>Tasdiqlandi</option>
                                <option value="completed" ${order.status === 'completed' ? 'selected' : ''}>Yakunlandi</option>
                                <option value="cancelled" ${order.status === 'cancelled' ? 'selected' : ''}>Bekor qilindi</option>
                            </select>
                        </div>
                    </div>
                </div>
            `).join('');
            
            // Statusni o'zgartirish
            container.querySelectorAll('.order-status').forEach(select => {
                select.addEventListener('change', async function() {
                    const orderId = this.getAttribute('data-order');
                    const status = this.value;
                    
                    try {
                        const response = await fetch(`/api/order/${orderId}`, {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({ status })
                        });
                        
                        if (response.ok) {
                            alert('Buyurtma holati yangilandi!');
                        } else {
                            alert('Xatolik yuz berdi');
                        }
                    } catch (error) {
                        console.error('Xatolik:', error);
                        alert('Xatolik yuz berdi. Iltimos, keyinroq qayta urunib ko\'ring.');
                    }
                });
            });
        } else {
            container.innerHTML = '<p>Hozircha buyurtmalar mavjud emas</p>';
        }
    } catch (error) {
        console.error('Buyurtmalarni yuklashda xato:', error);
    }
}

// Saqlash tugmalarini sozlash
function setupSaveButtons() {
    // Umumiy sozlamalar
    document.getElementById('save-general').addEventListener('click', saveGeneral);
    
    // Men haqimda
    document.getElementById('save-about').addEventListener('click', saveAbout);
    
    // Xizmatlar
    document.getElementById('save-services').addEventListener('click', saveServices);
    
    // Mahsulotlar
    document.getElementById('save-products').addEventListener('click', saveProducts);
    
    // Ijtimoiy tarmoqlar
    document.getElementById('save-social').addEventListener('click', saveSocial);
    
    // Yangi xizmat qo'shish
    document.getElementById('add-service').addEventListener('click', addNewService);
    
    // Yangi ijtimoiy tarmoq qo'shish
    document.getElementById('add-social').addEventListener('click', addNewSocial);
}

// Umumiy sozlamalarni saqlash
async function saveGeneral() {
    const data = {
        siteTitle: document.getElementById('site-title').value,
        favicon: document.getElementById('favicon').value
    };
    
    try {
        const response = await fetch('/api/portfolio', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        
        if (response.ok) {
            alert('Umumiy sozlamalar saqlandi!');
        } else {
            alert('Xatolik yuz berdi');
        }
    } catch (error) {
        console.error('Xatolik:', error);
        alert('Xatolik yuz berdi. Iltimos, keyinroq qayta urunib ko\'ring.');
    }
}

// Men haqimda ma'lumotlarini saqlash
async function saveAbout() {
    const data = {
        personName: document.getElementById('person-name').value,
        personBio: document.getElementById('person-bio').value
    };
    
    try {
        const response = await fetch('/api/portfolio', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        
        if (response.ok) {
            alert('Ma\'lumotlar saqlandi!');
        } else {
            alert('Xatolik yuz berdi');
        }
    } catch (error) {
        console.error('Xatolik:', error);
        alert('Xatolik yuz berdi. Iltimos, keyinroq qayta urunib ko\'ring.');
    }
}

// Xizmatlarni saqlash
async function saveServices() {
    const services = [];
    document.querySelectorAll('.service-item').forEach(item => {
        services.push({
            name: item.querySelector('.service-name').value,
            price: Number(item.querySelector('.service-price').value),
            description: item.querySelector('.service-desc').value
        });
    });
    
    try {
        const response = await fetch('/api/portfolio', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ services })
        });
        
        if (response.ok) {
            alert('Xizmatlar saqlandi!');
        } else {
            alert('Xatolik yuz berdi');
        }
    } catch (error) {
        console.error('Xatolik:', error);
        alert('Xatolik yuz berdi. Iltimos, keyinroq qayta urunib ko\'ring.');
    }
}

// Mahsulotlarni saqlash (xizmatlar bilan bir xil)
async function saveProducts() {
    await saveServices();
}

// Ijtimoiy tarmoqlarni saqlash
async function saveSocial() {
    const socialMedia = [];
    document.querySelectorAll('.social-item').forEach(item => {
        socialMedia.push({
            platform: item.querySelector('.social-platform').value,
            url: item.querySelector('.social-url').value
        });
    });
    
    try {
        const response = await fetch('/api/portfolio', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ socialMedia })
        });
        
        if (response.ok) {
            alert('Ijtimoiy tarmoqlar saqlandi!');
        } else {
            alert('Xatolik yuz berdi');
        }
    } catch (error) {
        console.error('Xatolik:', error);
        alert('Xatolik yuz berdi. Iltimos, keyinroq qayta urunib ko\'ring.');
    }
}

// Yangi xizmat qo'shish
function addNewService() {
    const container = document.getElementById('services-list');
    const newService = {
        name: '',
        price: 0,
        description: ''
    };
    
    const index = document.querySelectorAll('.service-item').length;
    
    const serviceHtml = `
        <div class="service-item galaxy-border p-4 rounded-lg mb-4">
            <div class="grid gap-4 md:grid-cols-3 mb-4">
                <div>
                    <label class="block mb-2">Xizmat nomi</label>
                    <input type="text" class="service-name galaxy-border bg-transparent rounded-lg block w-full p-2.5" value="" data-index="${index}">
                </div>
                <div>
                    <label class="block mb-2">Narxi</label>
                    <input type="number" class="service-price galaxy-border bg-transparent rounded-lg block w-full p-2.5" value="0" data-index="${index}">
                </div>
                <div>
                    <label class="block mb-2">Tavsifi</label>
                    <input type="text" class="service-desc galaxy-border bg-transparent rounded-lg block w-full p-2.5" value="" data-index="${index}">
                </div>
            </div>
            <button class="remove-service galaxy-border px-4 py-2 rounded-lg hover:bg-meteor transition-all" data-index="${index}">
                O'chirish
            </button>
        </div>
    `;
    
    container.insertAdjacentHTML('beforeend', serviceHtml);
    
    // O'chirish tugmasini sozlash
    const newItem = container.lastElementChild;
    newItem.querySelector('.remove-service').addEventListener('click', function() {
        this.closest('.service-item').remove();
    });
}

// Yangi ijtimoiy tarmoq qo'shish
function addNewSocial() {
    const container = document.getElementById('social-list');
    const index = document.querySelectorAll('.social-item').length;
    
    const socialHtml = `
        <div class="social-item galaxy-border p-4 rounded-lg mb-4">
            <div class="grid gap-4 md:grid-cols-2 mb-4">
                <div>
                    <label class="block mb-2">Platforma</label>
                    <input type="text" class="social-platform galaxy-border bg-transparent rounded-lg block w-full p-2.5" value="" placeholder="Instagram, Telegram, etc." data-index="${index}">
                </div>
                <div>
                    <label class="block mb-2">URL</label>
                    <input type="url" class="social-url galaxy-border bg-transparent rounded-lg block w-full p-2.5" value="" data-index="${index}">
                </div>
            </div>
            <button class="remove-social galaxy-border px-4 py-2 rounded-lg hover:bg-meteor transition-all" data-index="${index}">
                O'chirish
            </button>
        </div>
    `;
    
    container.insertAdjacentHTML('beforeend', socialHtml);
    
    // O'chirish tugmasini sozlash
    const newItem = container.lastElementChild;
    newItem.querySelector('.remove-social').addEventListener('click', function() {
        this.closest('.social-item').remove();
    });
}