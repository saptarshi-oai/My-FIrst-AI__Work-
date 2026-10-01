/**
 * AURA BOUTIQUE - CATALOG APP LOGIC
 * Direct WhatsApp Ordering to 7896147704 with Embedded Product ID & Quantity
 */

document.addEventListener('DOMContentLoaded', () => {
    // ------------------------------------------------------------------
    // TARGET WHATSAPP CONFIGURATION
    // ------------------------------------------------------------------
    const TARGET_PHONE_RAW = '7896147704';
    const TARGET_WHATSAPP_NUM = '917896147704';

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
    let selectedQuantity = 1;
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
    const modalQtyInput = document.getElementById('modal-qty-input');
    const qtyMinusBtn = document.getElementById('qty-minus');
    const qtyPlusBtn = document.getElementById('qty-plus');
    const totalPricePreview = document.getElementById('total-price-preview');
    const modalWhatsappDirectBtn = document.getElementById('modal-whatsapp-direct-btn');
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
    const buySummaryQtyTag = document.getElementById('buy-summary-qty-tag');
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
    // WHATSAPP LINK GENERATOR WITH PRODUCT ID & QUANTITY EMBEDDED
    // ------------------------------------------------------------------
    function generateWhatsAppLink(product, quantity = 1) {
        if (!product) return '#';
        const total = product.price * quantity;
        const textMessage = `Hi! I would like to order:
Product Name: ${product.name}
Product ID: ${product.id}
Quantity: ${quantity}
Unit Price: ₹${product.price.toLocaleString('en-IN')}
Total Amount: ₹${total.toLocaleString('en-IN')}

My Delivery Address: `;

        return `https://wa.me/${TARGET_WHATSAPP_NUM}?text=${encodeURIComponent(textMessage)}`;
    }

    // ------------------------------------------------------------------
    // RENDER CATALOG GRID
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
        productGrid.innerHTML = filtered.map(product => {
            const waDirectLink = generateWhatsAppLink(product, 1);
            return `
                <div class="product-card" data-id="${product.id}">
                    <div class="card-image-wrap">
                        <img src="${product.image}" alt="${product.name}" loading="lazy">
                        <span class="card-tag">${product.badge}</span>
                        <div class="quick-view-overlay">
                            <button class="quick-view-btn" onclick="openDetailModal('${product.id}')">Quick View / Details</button>
                            <a href="${waDirectLink}" target="_blank" rel="noopener noreferrer" class="card-wa-overlay-btn" onclick="e => e.stopPropagation()">
                                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                                </svg>
                                <span>Order on WhatsApp</span>
                            </a>
                        </div>
                    </div>
                    <div class="card-content">
                        <span class="card-sku">${product.id}</span>
                        <h3 class="card-title">${product.name}</h3>
                        <div class="card-price-row">
                            <span class="card-price">₹${product.price.toLocaleString('en-IN')}</span>
                            <button class="card-buy-btn" onclick="openBuyModal('${product.id}', event)">
                                <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                                </svg>
                                <span>Order Now</span>
                            </button>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }

    // Attach Click Delegate for Product Cards (Clicking anywhere opens product details)
    productGrid.addEventListener('click', (e) => {
        const card = e.target.closest('.product-card');
        if (card && !e.target.closest('.card-buy-btn') && !e.target.closest('.quick-view-btn') && !e.target.closest('.card-wa-overlay-btn')) {
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
    // DETAIL MODAL LOGIC WITH QUANTITY CONTROLS
    // ------------------------------------------------------------------
    window.openDetailModal = function(productId) {
        const product = PRODUCTS.find(p => p.id === productId);
        if (!product) return;

        selectedProduct = product;
        selectedQuantity = 1;
        modalQtyInput.value = 1;

        modalProductImage.src = product.image;
        modalProductImage.alt = product.name;
        modalCategoryBadge.textContent = product.category;
        modalSkuBadge.textContent = product.id;
        modalProductTitle.textContent = product.name;
        modalProductPrice.textContent = `₹${product.price.toLocaleString('en-IN')}`;
        modalProductDesc.textContent = product.description;

        updateDetailModalTotal();

        detailModalBackdrop.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    };

    function updateDetailModalTotal() {
        if (!selectedProduct) return;
        const total = selectedProduct.price * selectedQuantity;
        totalPricePreview.textContent = `Total: ₹${total.toLocaleString('en-IN')}`;
        
        // Update live WhatsApp link with quantity and Product ID embedded
        modalWhatsappDirectBtn.href = generateWhatsAppLink(selectedProduct, selectedQuantity);
    }

    qtyMinusBtn.addEventListener('click', () => {
        if (selectedQuantity > 1) {
            selectedQuantity -= 1;
            modalQtyInput.value = selectedQuantity;
            updateDetailModalTotal();
        }
    });

    qtyPlusBtn.addEventListener('click', () => {
        if (selectedQuantity < 99) {
            selectedQuantity += 1;
            modalQtyInput.value = selectedQuantity;
            updateDetailModalTotal();
        }
    });

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
            showToast(`Product ID ${selectedProduct.id} copied!`);
            setTimeout(() => {
                copySkuText.textContent = 'Copy ID';
            }, 2000);
        });
    });

    modalAddCartBtn.addEventListener('click', () => {
        if (selectedProduct) {
            addToCart(selectedProduct, selectedQuantity);
            closeDetailModal();
        }
    });

    // ------------------------------------------------------------------
    // BUY CONTACT MODAL (Direct Order Assistance)
    // ------------------------------------------------------------------
    window.openBuyModal = function(productId, e) {
        if (e) e.stopPropagation();
        const product = PRODUCTS.find(p => p.id === productId);
        if (!product) return;

        selectedProduct = product;
        const qty = selectedQuantity || 1;

        buySummaryImg.src = product.image;
        buySummaryImg.alt = product.name;
        buySummarySku.textContent = product.id;
        buySummaryTitle.textContent = product.name;
        buySummaryPrice.textContent = `₹${(product.price * qty).toLocaleString('en-IN')}`;
        buySummaryQtyTag.textContent = `Quantity: ${qty}`;

        // Ensure EXACT required notice text is displayed with 7896147704
        mandatoryOrderText.textContent = `To buy please whatsapp or call at ${TARGET_PHONE_RAW} with product id and address`;

        // Update WhatsApp link with embedded quantity and SKU
        whatsappOrderLink.href = generateWhatsAppLink(product, qty);

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
        const textToCopy = `To buy please whatsapp or call at ${TARGET_PHONE_RAW} with product id: ${selectedProduct ? selectedProduct.id : ''} (Qty: ${selectedQuantity})`;
        navigator.clipboard.writeText(textToCopy).then(() => {
            showToast('Order details copied to clipboard!');
        });
    });

    // ------------------------------------------------------------------
    // CART DRAWER LOGIC
    // ------------------------------------------------------------------
    function addToCart(product, qty = 1) {
        const existing = cart.find(item => item.id === product.id);
        if (existing) {
            existing.quantity += qty;
        } else {
            cart.push({ ...product, quantity: qty });
        }
        updateCartUI();
        showToast(`Added ${qty} × ${product.name} to your bag`);
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

        let summaryText = `Hi! I would like to order the following items from AURA Boutique:\n\n`;
        cart.forEach((item, index) => {
            summaryText += `${index + 1}. [Product ID: ${item.id}] ${item.name}\n   Quantity: ${item.quantity} | Total: ₹${item.price * item.quantity}\n`;
        });
        const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        summaryText += `\nTotal Amount: ₹${subtotal.toLocaleString('en-IN')}\n\nMy Delivery Address: `;

        window.open(`https://wa.me/${TARGET_WHATSAPP_NUM}?text=${encodeURIComponent(summaryText)}`, '_blank');
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
