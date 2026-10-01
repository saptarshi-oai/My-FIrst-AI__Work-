/**
 * AURA BOUTIQUE - CATALOG APP LOGIC
 * Single Page Application for GitHub Pages
 */

document.addEventListener('DOMContentLoaded', () => {
    // ------------------------------------------------------------------
    // PRODUCT DATA STORE (Derived from product_description.txt)
    // ------------------------------------------------------------------
    const PRODUCTS = [
        {
            id: 'PRD-001',
            image: 'product1.JPG',
            name: 'Matte Navy Blue Stainless Steel Water Bottle',
            description: 'Matte navy blue stainless steel insulated water bottle with natural bamboo cap. Keeps drinks cold for up to 24 hours and hot for 12 hours.',
            price: 1200,
            category: 'Lifestyle',
            badge: 'Bestseller'
        },
        {
            id: 'PRD-002',
            image: 'product2.JPG',
            name: 'Minimalist Analog Watch with Tan Leather Strap',
            description: 'Minimalist analog watch with matte metallic case and tan brown leather strap. Water-resistant quartz movement with ultra-sleek dial.',
            price: 1500,
            category: 'Wearables',
            badge: 'Trending'
        },
        {
            id: 'PRD-003',
            image: 'product3.JPG',
            name: 'Warm Olive Green Ribbed Knit Beanie Cap',
            description: 'Warm olive green ribbed knit beanie winter cap with folded cuff. Crafted from ultra-soft stretch knit for all-day cozy warmth.',
            price: 850,
            category: 'Wearables',
            badge: 'Essential'
        },
        {
            id: 'PRD-004',
            image: 'product4.JPG',
            name: 'Geometric Brass Glass Polyhedron Terrarium',
            description: 'Geometric brass and clear glass polyhedron terrarium with live air plant. Perfect centerpiece for modern desk or home aesthetics.',
            price: 2200,
            category: 'Home Decor',
            badge: 'Handcrafted'
        },
        {
            id: 'PRD-005',
            image: 'product5.JPG',
            name: 'Matte White Ceramic Mug with Wooden Coaster',
            description: 'Modern matte white ceramic coffee mug with black handle and wooden coaster. Ergonomic grip with heat-retaining ceramic wall.',
            price: 950,
            category: 'Lifestyle',
            badge: 'Popular'
        },
        {
            id: 'PRD-006',
            image: 'product6.JPG',
            name: 'Handcrafted Leather Bound Journal & Brass Pen',
            description: 'Handcrafted rustic brown leather bound journal with brass pen and elastic band. Contains 240 pages of premium eco-friendly unruled paper.',
            price: 1800,
            category: 'Stationery',
            badge: 'Artisanal'
        },
        {
            id: 'PRD-007',
            image: 'product7.JPG',
            name: 'Charcoal Grey Soft Cotton Crewneck T-Shirt',
            description: 'Premium charcoal grey soft cotton crewneck t-shirt. Pre-shrunk 100% combed cotton for superior comfort and timeless drape.',
            price: 1100,
            category: 'Wearables',
            badge: 'Classic'
        },
        {
            id: 'PRD-008',
            image: 'product8.JPG',
            name: 'Rosette Succulent in Dipped Terracotta Pot',
            description: 'Fresh rosette succulent plant in two-tone dipped terracotta ceramic pot. Low-maintenance indoor plant with vibrant green rosettes.',
            price: 750,
            category: 'Home Decor',
            badge: 'Fresh'
        }
    ];

    // State Variables
    let currentFilter = 'all';
    let searchQuery = '';
    let currentSort = 'featured';
    let selectedProduct = null;
    let cart = [];

    // DOM Elements
    const productGrid = document.getElementById('product-grid');
    const resultsCount = document.getElementById('results-count');
    const emptyState = document.getElementById('empty-state');
    const searchInput = document.getElementById('search-input');
    const clearSearchBtn = document.getElementById('clear-search-btn');
    const categoryPills = document.getElementById('category-pills');
    const sortSelect = document.getElementById('sort-select');
    const themeToggleBtn = document.getElementById('theme-toggle');

    // Detail Modal Elements
    const detailModalBackdrop = document.getElementById('detail-modal-backdrop');
    const closeDetailModalBtn = document.getElementById('close-detail-modal');
    const modalProductImage = document.getElementById('modal-product-image');
    const modalCategoryBadge = document.getElementById('modal-category-badge');
    const modalSkuBadge = document.getElementById('modal-sku-badge');
    const copySkuBtn = document.getElementById('copy-sku-btn');
    const copySkuText = document.getElementById('copy-sku-text');
    const modalProductTitle = document.getElementById('modal-product-title');
    const modalProductPrice = document.getElementById('modal-product-price');
    const modalProductDesc = document.getElementById('modal-product-desc');
    const modalBuyNowBtn = document.getElementById('modal-buy-now-btn');
    const modalAddCartBtn = document.getElementById('modal-add-cart-btn');

    // Buy Contact Modal Elements
    const buyModalBackdrop = document.getElementById('buy-modal-backdrop');
    const closeBuyModalBtn = document.getElementById('close-buy-modal');
    const mandatoryOrderText = document.getElementById('mandatory-order-text');
    const copyNoticeBtn = document.getElementById('copy-notice-btn');
    const buySummaryImg = document.getElementById('buy-summary-img');
    const buySummarySku = document.getElementById('buy-summary-sku');
    const buySummaryTitle = document.getElementById('buy-summary-title');
    const buySummaryPrice = document.getElementById('buy-summary-price');
    const whatsappOrderLink = document.getElementById('whatsapp-order-link');

    // Cart Elements
    const cartToggleBtn = document.getElementById('cart-toggle-btn');
    const cartBadgeCount = document.getElementById('cart-badge-count');
    const cartDrawerBackdrop = document.getElementById('cart-drawer-backdrop');
    const closeCartBtn = document.getElementById('close-cart-btn');
    const cartDrawerItems = document.getElementById('cart-drawer-items');
    const cartSubtotalPrice = document.getElementById('cart-subtotal-price');
    const cartItemCount = document.getElementById('cart-item-count');
    const checkoutCartBtn = document.getElementById('checkout-cart-btn');

    // Toast Container
    const toastContainer = document.getElementById('toast-container');

    // ------------------------------------------------------------------
    // THEME SETUP
    // ------------------------------------------------------------------
    const savedTheme = localStorage.getItem('aura-theme') || 'light';
    if (savedTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
    }

    themeToggleBtn.addEventListener('click', () => {
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        const newTheme = isDark ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('aura-theme', newTheme);
        showToast(isDark ? 'Switched to Light mode' : 'Switched to Dark mode');
    });

    // ------------------------------------------------------------------
    // RENDER PRODUCTS
    // ------------------------------------------------------------------
    function renderCatalog() {
        let filtered = PRODUCTS.filter(product => {
            const matchesCategory = currentFilter === 'all' || product.category === currentFilter;
            const q = searchQuery.toLowerCase();
            const matchesSearch = product.name.toLowerCase().includes(q) ||
                                  product.description.toLowerCase().includes(q) ||
                                  product.id.toLowerCase().includes(q);
            return matchesCategory && matchesSearch;
        });

        // Sorting
        if (currentSort === 'price-low') {
            filtered.sort((a, b) => a.price - b.price);
        } else if (currentSort === 'price-high') {
            filtered.sort((a, b) => b.price - a.price);
        } else if (currentSort === 'name-asc') {
            filtered.sort((a, b) => a.name.localeCompare(b.name));
        }

        resultsCount.textContent = `Showing ${filtered.length} of ${PRODUCTS.length} products`;

        if (filtered.length === 0) {
            productGrid.innerHTML = '';
            emptyState.classList.remove('hidden');
            return;
        }

        emptyState.classList.add('hidden');
        productGrid.innerHTML = filtered.map(product => `
            <div class="product-card" data-id="${product.id}">
                <div class="card-image-wrap">
                    <img src="${product.image}" alt="${product.name}" loading="lazy">
                    <span class="card-tag">${product.badge}</span>
                    <div class="quick-view-overlay">
                        <button class="quick-view-btn" onclick="openDetailModal('${product.id}')">Quick View</button>
                    </div>
                </div>
                <div class="card-content">
                    <span class="card-sku">${product.id}</span>
                    <h3 class="card-title">${product.name}</h3>
                    <div class="card-price-row">
                        <span class="card-price">₹${product.price.toLocaleString('en-IN')}</span>
                        <button class="card-buy-btn" onclick="openBuyModal('${product.id}', event)">Buy Now</button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    // Attach Click Delegate for Product Cards
    productGrid.addEventListener('click', (e) => {
        const card = e.target.closest('.product-card');
        if (card && !e.target.closest('.card-buy-btn') && !e.target.closest('.quick-view-btn')) {
            const productId = card.getAttribute('data-id');
            openDetailModal(productId);
        }
    });

    // Filter Pills Click
    categoryPills.addEventListener('click', (e) => {
        if (e.target.classList.contains('pill-btn')) {
            categoryPills.querySelectorAll('.pill-btn').forEach(btn => btn.classList.remove('active'));
            e.target.classList.add('active');
            currentFilter = e.target.getAttribute('data-category');
            renderCatalog();
        }
    });

    // Search Input Logic
    searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value.trim();
        if (searchQuery.length > 0) {
            clearSearchBtn.classList.add('show');
        } else {
            clearSearchBtn.classList.remove('show');
        }
        renderCatalog();
    });

    clearSearchBtn.addEventListener('click', () => {
        searchInput.value = '';
        searchQuery = '';
        clearSearchBtn.classList.remove('show');
        renderCatalog();
    });

    // Sort Selection
    sortSelect.addEventListener('change', (e) => {
        currentSort = e.target.value;
        renderCatalog();
    });

    document.getElementById('reset-filter-btn')?.addEventListener('click', () => {
        currentFilter = 'all';
        searchQuery = '';
        currentSort = 'featured';
        searchInput.value = '';
        clearSearchBtn.classList.remove('show');
        categoryPills.querySelectorAll('.pill-btn').forEach(btn => btn.classList.remove('active'));
        categoryPills.querySelector('[data-category="all"]').classList.add('active');
        sortSelect.value = 'featured';
        renderCatalog();
    });

    // ------------------------------------------------------------------
    // DETAIL MODAL LOGIC
    // ------------------------------------------------------------------
    window.openDetailModal = function(productId) {
        const product = PRODUCTS.find(p => p.id === productId);
        if (!product) return;

        selectedProduct = product;
        modalProductImage.src = product.image;
        modalProductImage.alt = product.name;
        modalCategoryBadge.textContent = product.category;
        modalSkuBadge.textContent = product.id;
        modalProductTitle.textContent = product.name;
        modalProductPrice.textContent = `₹${product.price.toLocaleString('en-IN')}`;
        modalProductDesc.textContent = product.description;

        detailModalBackdrop.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    };

    function closeDetailModal() {
        detailModalBackdrop.classList.add('hidden');
        document.body.style.overflow = '';
    }

    closeDetailModalBtn.addEventListener('click', closeDetailModal);
    detailModalBackdrop.addEventListener('click', (e) => {
        if (e.target === detailModalBackdrop) closeDetailModal();
    });

    // Copy SKU ID
    copySkuBtn.addEventListener('click', () => {
        if (!selectedProduct) return;
        navigator.clipboard.writeText(selectedProduct.id).then(() => {
            copySkuText.textContent = 'Copied!';
            showToast(`Product ID ${selectedProduct.id} copied to clipboard!`);
            setTimeout(() => {
                copySkuText.textContent = 'Copy ID';
            }, 2000);
        });
    });

    modalBuyNowBtn.addEventListener('click', () => {
        if (selectedProduct) {
            closeDetailModal();
            openBuyModal(selectedProduct.id);
        }
    });

    modalAddCartBtn.addEventListener('click', () => {
        if (selectedProduct) {
            addToCart(selectedProduct);
            closeDetailModal();
        }
    });

    // ------------------------------------------------------------------
    // BUY CONTACT MODAL (WhatsApp / Call Direct Ordering)
    // ------------------------------------------------------------------
    window.openBuyModal = function(productId, e) {
        if (e) e.stopPropagation();
        const product = PRODUCTS.find(p => p.id === productId);
        if (!product) return;

        selectedProduct = product;
        buySummaryImg.src = product.image;
        buySummaryImg.alt = product.name;
        buySummarySku.textContent = product.id;
        buySummaryTitle.textContent = product.name;
        buySummaryPrice.textContent = `₹${product.price.toLocaleString('en-IN')}`;

        // Ensure EXACT required notice text is displayed
        mandatoryOrderText.textContent = 'To buy please whatsapp or call at 9000000000 with product id and address';

        // Set up WhatsApp Deep Link with pre-filled message
        const phone = '919000000000';
        const message = `Hi! I would like to order:
Product Name: ${product.name}
Product ID: ${product.id}
Price: ₹${product.price}

My Delivery Address: `;
        whatsappOrderLink.href = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

        buyModalBackdrop.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    };

    function closeBuyModal() {
        buyModalBackdrop.classList.add('hidden');
        document.body.style.overflow = '';
    }

    closeBuyModalBtn.addEventListener('click', closeBuyModal);
    buyModalBackdrop.addEventListener('click', (e) => {
        if (e.target === buyModalBackdrop) closeBuyModal();
    });

    copyNoticeBtn.addEventListener('click', () => {
        const textToCopy = `To buy please whatsapp or call at 9000000000 with product id: ${selectedProduct ? selectedProduct.id : ''}`;
        navigator.clipboard.writeText(textToCopy).then(() => {
            showToast('Order details copied to clipboard!');
        });
    });

    // ------------------------------------------------------------------
    // CART DRAWER LOGIC
    // ------------------------------------------------------------------
    function addToCart(product) {
        const existing = cart.find(item => item.id === product.id);
        if (existing) {
            existing.quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        updateCartUI();
        showToast(`Added ${product.name} to your bag`);
    }

    function updateCartUI() {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

        cartBadgeCount.textContent = totalItems;
        cartItemCount.textContent = totalItems;
        cartSubtotalPrice.textContent = `₹${subtotal.toLocaleString('en-IN')}`;

        if (cart.length === 0) {
            cartDrawerItems.innerHTML = `
                <div style="text-align:center; padding: 2rem; color: var(--text-muted);">
                    <p>Your shopping bag is empty.</p>
                </div>
            `;
            return;
        }

        cartDrawerItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-info">
                    <h4 class="cart-item-title">${item.name}</h4>
                    <p class="cart-item-price">Qty ${item.quantity} × ₹${item.price.toLocaleString('en-IN')}</p>
                </div>
                <button class="cart-item-remove" onclick="removeFromCart('${item.id}')" title="Remove item">&times;</button>
            </div>
        `).join('');
    }

    window.removeFromCart = function(productId) {
        cart = cart.filter(item => item.id !== productId);
        updateCartUI();
        showToast('Item removed from shopping bag');
    };

    cartToggleBtn.addEventListener('click', () => {
        cartDrawerBackdrop.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    });

    closeCartBtn.addEventListener('click', () => {
        cartDrawerBackdrop.classList.add('hidden');
        document.body.style.overflow = '';
    });

    cartDrawerBackdrop.addEventListener('click', (e) => {
        if (e.target === cartDrawerBackdrop) {
            cartDrawerBackdrop.classList.add('hidden');
            document.body.style.overflow = '';
        }
    });

    checkoutCartBtn.addEventListener('click', () => {
        if (cart.length === 0) {
            showToast('Your bag is empty!');
            return;
        }

        const phone = '919000000000';
        let summaryText = 'Hi! I would like to order the following items:\n\n';
        cart.forEach((item, index) => {
            summaryText += `${index + 1}. [${item.id}] ${item.name} (Qty: ${item.quantity}) - ₹${item.price * item.quantity}\n`;
        });
        const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        summaryText += `\nTotal Subtotal: ₹${subtotal}\n\nMy Delivery Address: `;

        window.open(`https://wa.me/${phone}?text=${encodeURIComponent(summaryText)}`, '_blank');
    });

    // ------------------------------------------------------------------
    // TOAST NOTIFICATIONS
    // ------------------------------------------------------------------
    function showToast(message) {
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.innerHTML = `<span>✓</span> <span>${message}</span>`;
        toastContainer.appendChild(toast);
        setTimeout(() => {
            toast.remove();
        }, 3000);
    }

    // Keydown Esc to close active modals
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeDetailModal();
            closeBuyModal();
            cartDrawerBackdrop.classList.add('hidden');
            document.body.style.overflow = '';
        }
    });

    // Initial Catalog Render
    renderCatalog();
});
