# ✦ AURA BOUTIQUE — Responsive E-Commerce Showcase (WhatsApp Integration)

A modern, high-end minimalist product catalog and e-commerce showcase web application built with zero build step requirements, fully optimized for immediate deployment on **GitHub Pages**.

---

## 🌟 Key Features

1. **Curated Product Catalog**:
   - Displays 8 premium lifestyle products (`product1.JPG` to `product8.JPG`) mapped from `product_description.txt`.
   - Dynamic product grid with search filter, category filter pills (*Lifestyle*, *Wearables*, *Home Decor*, *Stationery*), and sorting (*Price: Low to High*, *Price: High to Low*, *Name A-Z*).

2. **Interactive Product Detail & Quantity Selector**:
   - Quick View / Expand details for any product.
   - Interactive Quantity Selector (`-` / `+` controls) with live total price preview.
   - Product SKU badge (e.g. `PRD-001`) with 1-click clipboard copy.

3. **Direct WhatsApp Ordering (Target: +91 7896147704)**:
   - Clicking any product or "Order via WhatsApp" directs the customer directly to **WhatsApp number `7896147704`** (`https://wa.me/917896147704`).
   - Auto-embeds the **Product ID**, **Product Name**, **Selected Quantity**, and **Total Amount** directly into the prefilled WhatsApp message text:
     ```text
     Hi! I would like to order:
     Product Name: Matte Navy Blue Stainless Steel Water Bottle
     Product ID: PRD-001
     Quantity: 2
     Unit Price: ₹1,200
     Total Amount: ₹2,400

     My Delivery Address: 
     ```
   - Displays notice text: `"To buy please whatsapp or call at 7896147704 with product id and address"`.

4. **Shopping Bag Drawer**:
   - Interactive slide-out cart drawer tracking quantity and running subtotal.
   - Batch WhatsApp checkout feature for purchasing multiple products at once.

5. **Aesthetics & UX**:
   - Modern glassmorphic styling, smooth hover effects, micro-animations, and Google Fonts (*Plus Jakarta Sans* & *Playfair Display*).
   - Light/Dark theme toggle with automatic `localStorage` preference memory.
   - Fluid responsive design (Desktop, Tablet, Mobile).

---

## 📦 Products Metadata Table

| Product ID | Image File | Product Name & Description | Price (INR) | Category |
| :--- | :--- | :--- | :--- | :--- |
| `PRD-001` | `product1.JPG` | Matte navy blue stainless steel insulated water bottle with natural bamboo cap | ₹1,200 | Lifestyle |
| `PRD-002` | `product2.JPG` | Minimalist analog watch with matte metallic case and tan brown leather strap | ₹1,500 | Wearables |
| `PRD-003` | `product3.JPG` | Warm olive green ribbed knit beanie winter cap with folded cuff | ₹850 | Wearables |
| `PRD-004` | `product4.JPG` | Geometric brass and clear glass polyhedron terrarium with live air plant | ₹2,200 | Home Decor |
| `PRD-005` | `product5.JPG` | Modern matte white ceramic coffee mug with black handle and wooden coaster | ₹950 | Lifestyle |
| `PRD-006` | `product6.JPG` | Handcrafted rustic brown leather bound journal with brass pen and elastic band | ₹1,800 | Stationery |
| `PRD-007` | `product7.JPG` | Premium charcoal grey soft cotton crewneck t-shirt | ₹1,100 | Wearables |
| `PRD-008` | `product8.JPG` | Fresh rosette succulent plant in two-tone dipped terracotta ceramic pot | ₹750 | Home Decor |

---

## 🚀 How to Deploy on GitHub Pages

Follow these step-by-step instructions to publish your website for free on GitHub Pages:

### Step 1: Initialize Git and Push to GitHub

1. Open your terminal in this project directory (`Activity-4`).
2. Initialize a git repository and commit your files:
   ```bash
   git init
   git add .
   git commit -m "Initial commit - AURA Boutique E-Commerce Showcase with WhatsApp ordering"
   ```
3. Create a new public repository on [GitHub](https://github.com/new) named `aura-boutique` (or any preferred repository name).
4. Link your local repository to GitHub and push:
   ```bash
   git branch -M main
   git remote add origin https://github.com/YOUR_GITHUB_USERNAME/aura-boutique.git
   git push -u origin main
   ```

### Step 2: Enable GitHub Pages

1. Navigate to your repository page on GitHub.
2. Click on **Settings** (top navigation tab).
3. On the left sidebar under **Code and automation**, click **Pages**.
4. Under **Build and deployment**:
   - **Source**: Select `Deploy from a branch`.
   - **Branch**: Choose `main` branch and `/ (root)` folder.
5. Click **Save**.

---

## 🛠️ Local Testing

You can test the application locally in any browser by double-clicking `index.html` or running a simple local HTTP server:

```bash
python -m http.server 8080
```
Then visit `http://localhost:8080` in your web browser.
