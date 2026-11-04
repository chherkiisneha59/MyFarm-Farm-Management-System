const cropsData = [
  {
    id: "wheat",
    name: "Wheat",
    hindiName: "गेंहू (Gehun)",
    category: "cereals",
    categoryLabel: "Cereal & Grain",
    season: "Rabi (Winter Season)",
    sowingPeriod: "October – November",
    harvestPeriod: "March – April",
    image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=900&q=80",
    shortDescription: "Our primary winter cereal crop, grown on fertile, well-tilled loamy soil to produce golden, protein-rich grains.",
    fullDescription: "Wheat is the cornerstone of our winter farming cycle. Cultivated in well-prepared, leveled soil during the cooler months, our wheat receives measured irrigation at crucial stages like crown root initiation and flowering. We allow the crop to ripen naturally under the spring sun, ensuring rich golden kernels of high nutritional quality.",
    soilType: "Well-drained Fertile Loam",
    waterRequirement: "Moderate (4-5 timely irrigations)",
    farmingMethod: "Traditional line sowing with balanced organic compost"
  },
  {
    id: "soybean",
    name: "Soybean",
    hindiName: "सोयाबीन (Soybean)",
    category: "pulses",
    categoryLabel: "Oilseed & Legume",
    season: "Kharif (Monsoon Season)",
    sowingPeriod: "June – July (Onset of Monsoon)",
    harvestPeriod: "September – October",
    image: "https://images.unsplash.com/photo-1599818818809-5a8b792e3a1f?auto=format&fit=crop&w=900&q=80",
    shortDescription: "A vital monsoon crop that enriches our soil naturally through nitrogen fixation while yielding nutrient-dense beans.",
    fullDescription: "Soybean plays a vital dual role on our land. As a legume, its root nodules fix atmospheric nitrogen directly into the soil, naturally boosting fertility for future crop rotations. Sown right with the arrival of the monsoon rains, our soybean crops develop healthy broad green foliage and rich pod clusters.",
    soilType: "Well-aerated Black and Loamy Soil",
    waterRequirement: "Rainfed with timely drainage management",
    farmingMethod: "Crop rotation companion, zero synthetic hormones"
  },
  {
    id: "rice",
    name: "Rice (Paddy)",
    hindiName: "धान / चावल (Paddy)",
    category: "cereals",
    categoryLabel: "Cereal & Grain",
    season: "Kharif (Monsoon Season)",
    sowingPeriod: "June – July (Nursery & Transplanting)",
    harvestPeriod: "October – November",
    image: "https://images.unsplash.com/photo-1536657464919-892534f60d6e?auto=format&fit=crop&w=900&q=80",
    shortDescription: "Cultivated in nourished wet paddy fields, carefully transplanted by hand and nourished with clean farm waters.",
    fullDescription: "Our paddy fields represent traditional craftsmanship. Seedlings are initially nurtured in a dedicated nursery bed before being carefully transplanted into prepared, puddled fields. We maintain optimal standing water levels and practice natural weeding to ensure sturdy panicles and aromatic, clean grain harvest.",
    soilType: "Clayey & Silt Loam with good water retention",
    waterRequirement: "High (controlled bund water management)",
    farmingMethod: "Puddled field transplanting with biological pest monitoring"
  },
  {
    id: "maize",
    name: "Maize (Corn)",
    hindiName: "मक्का (Makka)",
    category: "cereals",
    categoryLabel: "Cereal & Grain",
    season: "Kharif & Spring",
    sowingPeriod: "June – July / February",
    harvestPeriod: "September – October / May",
    image: "https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=900&q=80",
    shortDescription: "Fast-growing, tall sun-loving crop bearing wholesome cobs filled with golden, sweet, and energy-dense kernels.",
    fullDescription: "Maize thrives under generous sunshine across our well-drained acreage. Grown with careful row spacing to maximize sunlight and airflow, maize stalks grow strong and tall. We pay close attention to ear formation and silking stages, harvesting the cobs when the kernels achieve complete maturity.",
    soilType: "Deep, rich loam with good drainage",
    waterRequirement: "Moderate (critical at tasseling & silking stages)",
    farmingMethod: "Ridge and furrow sowing for optimal aeration"
  },
  {
    id: "gram",
    name: "Gram (Chickpeas)",
    hindiName: "चना (Chana)",
    category: "pulses",
    categoryLabel: "Pulses & Legume",
    season: "Rabi (Winter Season)",
    sowingPeriod: "October – November",
    harvestPeriod: "February – March",
    image: "https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?auto=format&fit=crop&w=900&q=80",
    shortDescription: "Drought-hardy pulse crop with deep taproots that restore soil vitality while providing protein-rich desi chickpeas.",
    fullDescription: "Gram is one of the most resilient crops on our family farm. It thrives in residual soil moisture after the monsoon and requires minimal supplemental water. Its deep taproot system loosens subsoil layers, and the plant leaves deposit vital organic matter back into our fields upon maturity.",
    soilType: "Deep Loam or Medium-Heavy Black Soil",
    waterRequirement: "Low (thrives on residual moisture, 1-2 light waterings)",
    farmingMethod: "Deep seed placement with organic seed inoculants"
  },
  {
    id: "mustard",
    name: "Mustard",
    hindiName: "सरसों (Sarson)",
    category: "pulses",
    categoryLabel: "Oilseed",
    season: "Rabi (Winter Season)",
    sowingPeriod: "October – November",
    harvestPeriod: "February – March",
    image: "https://images.unsplash.com/photo-1588661661623-10023e38711e?auto=format&fit=crop&w=900&q=80",
    shortDescription: "Vibrant golden-yellow winter blooms that attract beneficial pollinators and produce traditional oil-rich seeds.",
    fullDescription: "During the heart of winter, our farm turns into a breathtaking sea of yellow with blooming mustard flowers. Mustard is not only a prized traditional oilseed with high natural oil content, but its abundant flowering also supports local honeybees and beneficial pollinating insects across our entire farm ecosystem.",
    soilType: "Light to Heavy Loam with good internal drainage",
    waterRequirement: "Low to Moderate (requires watering at pre-bloom)",
    farmingMethod: "Timely sowing to avoid aphids, intercropped with pulses"
  }
];

function getAllCrops() {
  return cropsData;
}

function getCropsByCategory(category) {
  if (category === "all") return cropsData;
  return cropsData.filter(crop => crop.category === category);
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = { cropsData, getAllCrops, getCropsByCategory };
}
