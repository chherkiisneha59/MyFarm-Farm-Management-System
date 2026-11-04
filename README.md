# MyFarm – Growing with Nature 🌾

A modern, attractive, responsive agricultural website created for a family-owned farm cultivating crops on its own land.

---

## 🌐 Live Website

> **Live Demo:** [https://myfarm-farmmanagement.vercel.app/](https://myfarm-farmmanagement.vercel.app/)

---

## 🌿 About the Farm & Project

**MyFarm – Growing with Nature** represents an authentic family-run agricultural business. Cultivating their own generational farmland with care, devotion, and respect for the soil, this website showcases real farm crops, honest farming practices, and contact details for visitors and buyers.

* **Live URL:** [https://myfarm-farmmanagement.vercel.app/](https://myfarm-farmmanagement.vercel.app/)
* **Theme:** Fresh Green, White, and Earthy Brown
* **Tech Stack:** HTML5, CSS3, Vanilla JavaScript (Zero build step, fully static & fast)

---

## 🌟 Key Features & Sections

1. **Home (Hero Section):**
   - High-impact agricultural field background with soft gradient overlay.
   - Main heading: *"Welcome to MyFarm – Growing with Nature"*
   - Tagline: *"From Our Fields to Your Future."*
   - Honest introduction to the family farm and core agricultural values (Soil Stewardship, Responsible Care, Pure Harvest).
   - "Explore Our Farm" & "View Our Crops" call-to-action buttons.

2. **About Us:**
   - The genuine story of the family-owned farm working generational land.
   - Highlights the balance of traditional farming wisdom and responsible agriculture.
   - Realistic visuals of farmers working in lush green crop fields.

3. **Our Crops:**
   - Dedicated crop cards for **Wheat**, **Soybean**, **Rice (Paddy)**, **Maize (Corn)**, **Gram (Chickpeas)**, and **Mustard**.
   - Category filtering (*All Crops*, *Cereals & Grains*, *Oilseeds & Pulses*).
   - Interactive **Crop Cultivation Details modal** displaying soil conditions, water requirements, sowing/harvesting periods, and farming methods.
   - **Editable Data Structure**: All crop details are cleanly organized in `js/crops-data.js` so you can easily update, add, or customize crop information.

4. **Farming Practices:**
   - Step-by-step 5-stage agricultural process:
     1. *Land Preparation & Soil Tilling*
     2. *Seed Selection & Precision Sowing*
     3. *Conscious Irrigation & Water Management*
     4. *Natural Crop Care & Plant Nourishment*
     5. *Timely Harvesting & Proper Storage*
   - Illustrated with clean icons and authentic field images.

5. **Our Gallery:**
   - Interactive photo showcase with category filtering (*Field Views*, *Crops & Blossoms*, *Daily Farm Life*, *Harvest Season*).
   - Full-screen lightbox modal with image previews, captions, next/previous navigation, and keyboard arrow/ESC key controls.

6. **Contact Us & Location:**
   - Professional placeholder contact details (phone numbers, email addresses, farm homestead address).
   - Farm coordinates & visiting hours advisory.
   - Fully functional contact form with client-side validation, loading state, and toast notification confirmation.

7. **Header & Footer:**
   - Top announcement / seasonal status bar.
   - Sticky navigation bar with frosted-glass effect, scroll spy highlighting, and mobile hamburger menu.
   - Comprehensive footer with quick navigation links, crop links, office contact details, and copyright.
   - Floating "Back to Top" button.

---

## 📁 Project Structure

```text
MyFarm/
│
├── index.html          # Main HTML5 semantic structure
├── css/
│   └── styles.css      # Custom CSS variables, responsive design, animations
├── js/
│   ├── crops-data.js   # Editable crop database (names, seasons, soil, images)
│   └── script.js       # Navigation, filtering, modal, lightbox, and form logic
└── README.md           # Documentation and editing guide
```

---

## 🚀 How to Run Locally

Because this project is built using pure **HTML5, CSS3, and modern Vanilla JavaScript**, it requires no build tools or package managers:

1. Double-click `index.html` to open it in any web browser (Chrome, Edge, Firefox, Safari).
2. Alternatively, you can serve it via Python:
   ```bash
   python -m http.server 8000
   ```
   and navigate to [http://localhost:8000](http://localhost:8000).

---

## ✏️ How to Edit Content

### 1. Modifying or Adding Crops:
Open `js/crops-data.js`. You will find the `cropsData` array where each crop is defined as an object:
```javascript
{
  id: "wheat",
  name: "Wheat",
  hindiName: "गेंहू (Gehun)",
  category: "cereals",
  season: "Rabi (Winter Season)",
  sowingPeriod: "October – November",
  harvestPeriod: "March – April",
  image: "...",
  shortDescription: "...",
  fullDescription: "...",
  soilType: "...",
  waterRequirement: "...",
  farmingMethod: "..."
}
```
Simply edit any field or add another crop entry to immediately update the website.

### 2. Updating Contact Information:
Open `index.html` and search for `<section id="contact">` or `site-footer` to customize your actual phone numbers, email addresses, or physical farm address.

### 3. Theme Colors:
Open `css/styles.css`. At the top under `:root`, you can adjust the green and brown color values:
```css
:root {
  --green-700: #2d6a4f;
  --green-800: #1b4332;
  --brown-700: #7f5539;
  --brown-800: #582f0e;
  /* ... */
}
```
