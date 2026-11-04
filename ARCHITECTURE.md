# Website Architecture: MyFarm – Growing with Nature 🌾

This document details the architectural design, system decomposition, data flow, and front-end engineering principles behind **MyFarm – Growing with Nature**.

---

## 1. High-Level Architectural Diagram

```mermaid
flowchart TD
    Client["Client Browser (Desktop / Tablet / Mobile)"]
    
    subgraph UI_Layer["Presentation Layer (View)"]
        HTML["index.html (Semantic HTML5 Document)"]
        CSS["css/styles.css (Design System & Tokens)"]
        GoogleFonts["Google Fonts CDN (Plus Jakarta Sans & Lora)"]
    end

    subgraph Data_Layer["Data & Configuration Layer"]
        CropsData["js/crops-data.js (Structured JSON-like Crop Entities)"]
        GalleryData["js/script.js (In-memory Gallery Media Registry)"]
    end

    subgraph Logic_Layer["Client-Side Controller / Logic Layer"]
        Script["js/script.js (Vanilla ES6+ Engine)"]
        NavModule["Navigation & ScrollSpy Observer"]
        CropsModule["Crops Filter & Modal Controller"]
        GalleryModule["Gallery & Lightbox Controller"]
        FormModule["Contact Validation & Toast Dispatcher"]
    end

    subgraph Hosting_Layer["Infrastructure & Hosting"]
        GitHub["GitHub VCS (main branch)"]
        Vercel["Vercel Edge Network (Global CDN)"]
    end

    Client -->|HTTP GET /| Vercel
    GitHub -->|Auto Deploy Webhook| Vercel
    Vercel --> HTML
    HTML --> CSS
    HTML --> GoogleFonts
    HTML --> CropsData
    HTML --> Script
    Script --> NavModule
    Script --> CropsModule
    Script --> GalleryModule
    Script --> FormModule
    CropsData --> CropsModule
    GalleryData --> GalleryModule
```

---

## 2. Architectural Principles & Patterns

The architecture follows **JAMstack (JavaScript, APIs, Markup)** with a **Model-View-Controller (MVC)** separation on the client side:

| Layer | Corresponding Component | Responsibility |
| :--- | :--- | :--- |
| **Model (Data)** | `js/crops-data.js` | Stores structured domain data (crop names, botanical tags, seasons, soil requirements, water cycles, descriptions, and media links). Decoupled from HTML representation so non-technical farm owners can update crops without touching markups. |
| **View (Presentation)** | `index.html`, `css/styles.css` | Semantic HTML5 structure with ARIA landmark roles, responsive layout grids, and design tokens for color, typography, elevation, and responsiveness. |
| **Controller (Logic)** | `js/script.js` | Event handling, state management (modal open/closed, current active filter, lightbox index), dynamic DOM rendering, and user input validation. |

---

## 3. Component & DOM Hierarchy

```mermaid
graph TD
    App["index.html Root"]
    
    App --> TopBar["Top Bar: Seasonal Notification & Fast Contact Link"]
    App --> Header["Header / Navbar: Brand Logo, Desktop Links, CTA, Mobile Toggle"]
    
    App --> Main["main (Page Content)"]
    Main --> SecHero["Section 1: Hero (#home)"]
    Main --> SecAbout["Section 2: About Us (#about)"]
    Main --> SecCrops["Section 3: Our Crops (#crops)"]
    Main --> SecPractices["Section 4: Farming Practices (#practices)"]
    Main --> SecGallery["Section 5: Our Gallery (#gallery)"]
    Main --> SecContact["Section 6: Contact & Location (#contact)"]
    
    App --> Footer["Site Footer: Brand Bio, Quick Links, Crops Directory, Location"]
    
    App --> Modals["Overlay Components"]
    Modals --> CropModal["#cropModal (Detailed Cultivation Specs)"]
    Modals --> LightboxModal["#lightboxModal (Fullscreen Image Viewer)"]
    Modals --> Toast["#toastNotice (Submission Feedback)"]
    Modals --> BackToTop["#backToTopBtn (Scroll to Top)"]
```

---

## 4. Subsystem Breakdown

### 4.1. Navigation & ScrollSpy Engine
* **Observer:** Continuously observes window scroll position relative to section bounding boxes (`#home`, `#about`, `#crops`, `#practices`, `#gallery`, `#contact`).
* **Active State:** Dynamically updates `.nav-link.active` with bottom bar indicators.
* **Frosted Glass Blur:** Appends `.scrolled` state to navbar after passing `scrollY > 30px`.
* **Mobile Drawer:** Accessible drawer triggered via `aria-expanded` toggle with outside-click and route-click auto-close listeners.

### 4.2. Crops Data & Rendering Engine
* **Source of Truth:** Array of objects in `cropsData`.
* **Filtering:** Instant DOM re-render without page refresh based on the selected category (`all`, `cereals`, `pulses`).
* **Detail Modal:** Intercepts `data-open-crop` button events, matches crop entity by `id`, populates metadata specs into modal markup, and locks background scroll (`body.style.overflow = 'hidden'`).

### 4.3. Interactive Gallery & Lightbox Controller
* **Data Set:** Curated photography registry categorizing shots into `fields`, `crops`, `farm-life`, and `harvest`.
* **Lightbox State Machine:**
  * Tracks `currentLightboxIndex`.
  * Responds to keyboard shortcuts: `Escape` (dismiss), `ArrowRight` (next), `ArrowLeft` (previous).
  * Smooth cyclic navigation (`(index + 1) % length`).

### 4.4. Contact & Validation Subsystem
* **Client-Side Validation:** Validates full name length ($\ge 2$ characters), email structure (standard RFC-compliant regex), and message body ($\ge 10$ characters).
* **Feedback Pipeline:** Shows an animated loading spinner on the submit button, clears form inputs, and dispatches a persistent 5-second animated toast notification.

---

## 5. Design System & CSS Token Architecture

```mermaid
flowchart LR
    Tokens["CSS Root Variables (:root)"]
    
    Tokens --> Greens["Green Palette\n#1b4332, #2d6a4f, #52b788, #d8f3dc"]
    Tokens --> Browns["Earthy Brown Palette\n#582f0e, #7f5539, #b08968, #f8f4ee"]
    Tokens --> Typography["Typography\nLora (Editorial Serif)\nPlus Jakarta Sans (UI Sans)"]
    Tokens --> Layout["Grid & Flexbox\n1240px Max Width\nAdaptive Multi-column Breakpoints"]
```

### Responsive Breakpoint Strategy
* **Desktop ($> 1024\text{px}$):** Multi-column grids (3-column crop cards, 3-column gallery, 2-column contact split).
* **Tablet ($769\text{px} - 1024\text{px}$):** 2-column grids with adjusted hero padding and stacked practice cards.
* **Mobile ($\le 768\text{px}$):** Single-column layout, off-canvas sliding mobile menu, stacked forms and footers.

---

## 6. Hosting & CI/CD Pipeline

```mermaid
sequenceDiagram
    autonumber
    actor Dev as Developer / Owner
    participant Git as Local Git Repo
    participant GitHub as GitHub (origin/main)
    participant Vercel as Vercel Edge Server
    actor User as End User

    Dev->>Git: git commit -m "..."
    Dev->>GitHub: git push origin main
    GitHub->>Vercel: Automatic Deploy Webhook Trigger
    Vercel->>Vercel: Instant Static Asset Compilation & CDN Invalidation
    User->>Vercel: HTTPS Request (myfarm-farmmanagement.vercel.app)
    Vercel-->>User: Gzip/Brotli Cached Static Assets (< 100ms TTFB)
```

