// ───────────────────────────────────────────────────────────────────────────
//  PROJECT APEX — build data
//  Pricing reflects US street prices researched mid-June 2026. Each part links
//  the sources used. Edit prices here in one place; the whole site updates.
// ───────────────────────────────────────────────────────────────────────────

export const PRICE_AS_OF = 'June 15, 2026';

export const META = {
  name: 'Project APEX',
  subtitle: 'A no-compromise Ryzen 9 9950X3D × RTX 4090 flagship in a Lian Li O11D EVO',
  caseName: 'Lian Li O11D EVO RGB',
};

// art:  which animated SVG explainer to render (see app/components/PartArt.js)
// slot: anchor used by the 3D exploded view (see app/components/Build3D.js)

export const PARTS = [
  {
    id: 'cpu',
    category: 'Processor',
    name: 'AMD Ryzen 9 9950X3D',
    brand: 'AMD',
    accent: '#ed1c24',
    art: 'cpu',
    slot: 'cpu',
    tagline: '16 Zen 5 cores with second-gen 3D V-Cache — the fastest do-everything desktop chip.',
    price: { current: 679, low: 679, high: 729, msrp: 699 },
    quantity: 1,
    specs: [
      { label: 'Cores / Threads', value: '16C / 32T' },
      { label: 'Architecture', value: 'Zen 5 (4 nm)' },
      { label: 'Base / Boost', value: '4.3 / 5.7 GHz' },
      { label: 'Cache', value: '144 MB (L2+L3, 3D V-Cache)' },
      { label: 'TDP', value: '170 W (200 W PPT)' },
      { label: 'Socket', value: 'AM5' },
    ],
    howItWorks: {
      summary:
        'A stacked block of extra L3 cache (3D V-Cache) sits on the CCD so games keep their working set on-die — huge frame-rate wins — while 16 full Zen 5 cores chew through rendering and compiles.',
      steps: [
        'Instructions stream into the cores from system memory.',
        'A 3D-stacked V-Cache layer feeds data back in ~nanoseconds, avoiding slow RAM trips.',
        '16 cores execute in parallel; smart scheduling keeps games on the cache-rich die.',
      ],
    },
    alternatives: [
      { name: 'Ryzen 9 9950X3D2 Dual Edition', note: 'Newer 2026 dual-3D-cache variant; ~$899.', price: 899, current: true },
    ],
    sources: [
      { label: 'Amazon price ($679, Jun 2026)', url: 'https://camelcamelcamel.com/product/B0DVZSG8D5' },
      { label: 'AMD launch MSRP $699', url: 'https://www.techradar.com/computing/cpu/amd-officially-announces-price-and-release-date-for-ryzen-9-9900x3d-and-9950x3d-processors' },
    ],
  },
  {
    id: 'gpu',
    category: 'Graphics Card',
    name: 'NVIDIA GeForce RTX 4090',
    brand: 'NVIDIA',
    accent: '#76b900',
    art: 'gpu',
    slot: 'gpu',
    tagline: '24 GB of Ada Lovelace muscle — 4K maxed, ray-traced, DLSS-accelerated.',
    price: { current: 2550, low: 2450, high: 2900, msrp: 1599, elevated: true },
    quantity: 1,
    specs: [
      { label: 'CUDA Cores', value: '16,384' },
      { label: 'Memory', value: '24 GB GDDR6X' },
      { label: 'Memory Bus', value: '384-bit (1008 GB/s)' },
      { label: 'Boost Clock', value: '~2.52 GHz' },
      { label: 'Ray Tracing', value: '3rd-gen RT + 4th-gen Tensor' },
      { label: 'Board Power', value: '450 W (12VHPWR)' },
    ],
    howItWorks: {
      summary:
        'Thousands of CUDA cores rasterize geometry in parallel; dedicated RT cores trace light bounces while Tensor cores run DLSS to reconstruct extra frames — all kept cool by a triple-slot vapor chamber.',
      steps: [
        'Scene geometry is shaded across 16,384 CUDA cores at once.',
        'RT cores compute realistic reflections, shadows and global illumination.',
        'Tensor cores apply DLSS upscaling / frame-gen for higher FPS.',
        'A vapor chamber + triple fans dump 450 W of heat out of the card.',
      ],
    },
    alternatives: [
      { name: 'RTX 5090 (Blackwell)', note: 'Current gen; 32GB GDDR7, ~30% faster — but ~$4,250 street.', price: 4249, current: true },
      { name: 'RTX 5080 (Blackwell)', note: 'Current gen; ~4090-class raster, 16GB, ~$1,250.', price: 1249, current: true },
      { name: 'RTX 4080 Super', note: 'Lower cost, ~85% of the performance at 4K.' },
    ],
    sources: [
      { label: 'June 2026 street price ($2,450–2,755)', url: 'https://bestvaluegpu.com/history/new-and-used-rtx-4090-price-history-and-specs/' },
      { label: 'RTX 5090/5080 June 2026 pricing', url: 'https://bestvaluegpu.com/history/new-and-used-rtx-5090-price-history-and-specs/' },
      { label: 'Original MSRP $1,599', url: 'https://swappa.com/prices/nvidia-geforce-rtx-4090-founders-edition' },
    ],
  },
  {
    id: 'mobo',
    category: 'Motherboard',
    name: 'ASUS ROG Strix X670E-E Gaming WiFi',
    brand: 'ASUS',
    accent: '#ff2d75',
    art: 'mobo',
    slot: 'mobo',
    tagline: 'An 18+2-stage AM5 foundation with PCIe 5.0, four M.2 slots and WiFi 6E.',
    price: { current: 489, low: 350, high: 700, msrp: 499 },
    quantity: 1,
    specs: [
      { label: 'Chipset', value: 'AMD X670E' },
      { label: 'Socket', value: 'AM5 (LGA 1718)' },
      { label: 'VRM', value: '18 + 2 power stages' },
      { label: 'Memory', value: '4× DDR5, up to 8000+ (OC)' },
      { label: 'Expansion', value: 'PCIe 5.0 x16 + 4× M.2' },
      { label: 'Networking', value: '2.5 GbE + WiFi 6E' },
    ],
    howItWorks: {
      summary:
        'The board is the nervous system: the VRM converts 12 V into clean, low-ripple voltage for the CPU, while the chipset fans out high-speed PCIe and USB lanes to every component.',
      steps: [
        'VRM phases step 12 V down to ~1.2 V and smooth it for the CPU.',
        'The X670E chipset routes PCIe 5.0 lanes to GPU and NVMe storage.',
        'Traces carry DDR5, USB, and networking signals across the PCB.',
      ],
    },
    alternatives: [
      { name: 'ASUS ROG Strix X870E-E Gaming WiFi', note: 'Current gen; WiFi 7, USB4, native PCIe 5.0 M.2; ~$470.', price: 470, current: true },
      { name: 'MSI MPG X670E Carbon WiFi', note: 'Similar tier, stealthy black aesthetic.' },
    ],
    sources: [
      { label: 'Price history (low $350 – high $700)', url: 'https://pangoly.com/en/price-history/asus-rog-strix-x670e-e-gaming-wifi' },
      { label: 'X870E-E pricing (current gen)', url: 'https://pangoly.com/en/price-history/asus-rog-strix-x870e-e-gaming-wifi' },
    ],
  },
  {
    id: 'ram',
    category: 'Memory',
    name: '32 GB DDR5-6000 CL30 (2×16 GB) EXPO',
    brand: 'G.SKILL / Corsair',
    accent: '#9b7dff',
    art: 'ram',
    slot: 'ram',
    tagline: 'The Ryzen sweet spot — 6000 MT/s at CL30 with one-click EXPO timings.',
    price: { current: 174, low: 160, high: 210, msrp: 180 },
    quantity: 1,
    specs: [
      { label: 'Capacity', value: '32 GB (2 × 16 GB)' },
      { label: 'Speed', value: 'DDR5-6000 MT/s' },
      { label: 'Latency', value: 'CL30 (30-38-38)' },
      { label: 'Profile', value: 'AMD EXPO + Intel XMP' },
      { label: 'Voltage', value: '1.35 V' },
      { label: 'Form Factor', value: 'UDIMM' },
    ],
    howItWorks: {
      summary:
        '6000 MT/s keeps the memory clock in 1:1 sync with the Ryzen Infinity Fabric for the lowest latency, and the EXPO profile applies tuned timings instantly in BIOS.',
      steps: [
        'EXPO profile loads validated 6000 / CL30 timings on boot.',
        'Data shuttles between RAM and CPU in tight 1:1 fabric sync.',
        'Dual-channel doubles the path width for more bandwidth.',
      ],
    },
    alternatives: [
      { name: 'DDR5-6400 CL32 CUDIMM', note: 'Current-gen clocked memory; needs X870E + 9000-series for full speed.', current: true },
      { name: '64 GB (2×32 GB) DDR5-6000', note: 'Double the capacity for heavy multitasking / VMs.' },
    ],
    sources: [
      { label: 'DDR5-6000 CL30 kits ~$160–210', url: 'https://pangoly.com/en/price-history/kingston-fury-beast-32gb-ddr5-6000-amd-expo' },
    ],
  },
  {
    id: 'ssd',
    category: 'Storage',
    name: 'Samsung 990 Pro 2 TB NVMe Gen4',
    brand: 'Samsung',
    accent: '#3b82f6',
    art: 'ssd',
    slot: 'ssd',
    tagline: '7,450 MB/s of PCIe 4.0 NVMe — near-instant loads for OS, games and projects.',
    price: { current: 389, low: 369, high: 430, msrp: 250, elevated: true },
    quantity: 1,
    specs: [
      { label: 'Capacity', value: '2 TB' },
      { label: 'Interface', value: 'PCIe 4.0 ×4 NVMe' },
      { label: 'Seq. Read', value: 'up to 7,450 MB/s' },
      { label: 'Seq. Write', value: 'up to 6,900 MB/s' },
      { label: 'Form Factor', value: 'M.2 2280' },
      { label: 'Endurance', value: '1,200 TBW' },
    ],
    howItWorks: {
      summary:
        'NAND flash stores data with no moving parts; the controller talks to the CPU directly over four PCIe 4.0 lanes, so reads happen in microseconds instead of milliseconds.',
      steps: [
        'The controller maps file requests to NAND flash cells.',
        'Four PCIe 4.0 lanes carry data straight to the CPU.',
        'A DRAM cache and SLC buffer keep bursts blisteringly fast.',
      ],
    },
    alternatives: [
      { name: 'Samsung 9100 Pro 2 TB (Gen5)', note: 'Current gen; up to 14,700 MB/s on PCIe 5.0; ~$350.', price: 350, current: true },
      { name: 'WD Black SN8100 2 TB (Gen5)', note: 'Current-gen PCIe 5.0 rival, excellent efficiency.', current: true },
      { name: 'WD Black SN850X 2 TB', note: 'Comparable Gen4 speed, often a few dollars cheaper.' },
    ],
    sources: [
      { label: 'Samsung 990 Pro 2TB ~$389 (Jun 2026)', url: 'https://pangoly.com/en/price-history/samsung-990-pro-2tb' },
      { label: 'Samsung 9100 Pro Gen5 pricing', url: 'https://pangoly.com/en/compare/ssd/samsung-9100-pro-2tb-vs-western-digital-wd-black-sn8100-2tb' },
    ],
  },
  {
    id: 'psu',
    category: 'Power Supply',
    name: 'Corsair RM1000x Shift (1000 W Gold)',
    brand: 'Corsair',
    accent: '#f4c042',
    art: 'psu',
    slot: 'psu',
    tagline: 'Fully modular ATX 3.1 with native 12V-2x6 — headroom for the 4090 and then some.',
    price: { current: 189, low: 160, high: 220, msrp: 199 },
    quantity: 1,
    specs: [
      { label: 'Wattage', value: '1000 W' },
      { label: 'Efficiency', value: '80+ Gold' },
      { label: 'Standard', value: 'ATX 3.1 / PCIe 5.1' },
      { label: 'GPU Cable', value: 'Native 12V-2x6 (600 W)' },
      { label: 'Modularity', value: 'Fully modular (side interface)' },
      { label: 'Fan', value: 'Zero-RPM mode' },
    ],
    howItWorks: {
      summary:
        'It rectifies wall AC into smooth DC rails, delivering 12 V to the GPU and CPU on demand. The side-mounted connectors make cabling in a dual-chamber case clean and short.',
      steps: [
        'AC from the wall is rectified and filtered.',
        'Transformers + regulation produce stable 12 V / 5 V / 3.3 V rails.',
        'Modular cables deliver only the power each part needs.',
      ],
    },
    alternatives: [
      { name: 'Seasonic Prime TX-1000', note: '80+ Titanium, premium efficiency.' },
    ],
    sources: [
      { label: 'RM1000x Shift listing & deals', url: 'https://www.corsair.com/us/en/p/psu/cp-9020253-na/rm1000x-shift-80-plus-gold-fully-modular-atx-power-supply-cp-9020253-na' },
    ],
  },
  {
    id: 'cooler',
    category: 'CPU Cooler',
    name: 'Arctic Liquid Freezer III 360',
    brand: 'Arctic',
    accent: '#22d3ee',
    art: 'cooler',
    slot: 'cooler',
    tagline: 'A 360 mm AIO that out-cools coolers twice its price — tames the 9950X3D with ease.',
    price: { current: 119, low: 100, high: 130, msrp: 128 },
    quantity: 1,
    specs: [
      { label: 'Radiator', value: '360 mm (3 × 120)' },
      { label: 'Pump', value: 'Integrated, PWM-controlled' },
      { label: 'Fans', value: '3 × P12 Pro PWM' },
      { label: 'VRM Fan', value: 'Built-in 40 mm' },
      { label: 'Cold Plate', value: 'Nickel-plated copper' },
      { label: 'Sockets', value: 'AM5 / LGA1700+' },
    ],
    howItWorks: {
      summary:
        'A pump pushes coolant across the hot CPU cold plate; the warmed liquid flows to the radiator where three fans blow the heat into airflow and out of the case.',
      steps: [
        'Cold plate absorbs heat from the CPU lid.',
        'Pump circulates coolant up to the radiator.',
        'Radiator fins shed heat; fans exhaust it from the case.',
      ],
    },
    alternatives: [
      { name: 'NZXT Kraken Plus 360', note: 'LCD display, RGB-forward styling.' },
    ],
    sources: [
      { label: 'Liquid Freezer III 360 ~$100–130', url: 'https://pangoly.com/en/price-history/arctic-liquid-freezer-iii-360' },
    ],
  },
  {
    id: 'fans',
    category: 'Case Fans',
    name: 'Arctic P12 Pro PWM ×10',
    brand: 'Arctic',
    accent: '#34d399',
    art: 'fans',
    slot: 'fans',
    tagline: 'Ten high-static-pressure 120 mm fans — bottom & side intake, top & rear exhaust.',
    price: { current: 90, low: 72, high: 180, msrp: 90 },
    quantity: 10,
    specs: [
      { label: 'Count', value: '10 × 120 mm' },
      { label: 'Type', value: 'High static pressure PWM' },
      { label: 'Speed', value: '200–3000 RPM' },
      { label: 'Bearing', value: 'Fluid dynamic' },
      { label: 'Layout', value: '3 bottom / 3 side rad / 3 top / 1 rear' },
      { label: 'Airflow', value: 'Intake-positive pressure' },
    ],
    howItWorks: {
      summary:
        'Intake fans on the bottom and side feed cool air straight onto the GPU and radiator; top and rear exhaust pull the hot air out, creating a clean front-to-back, bottom-to-top flow.',
      steps: [
        'Bottom + side fans pull cool outside air in (positive pressure).',
        'Air is forced across the GPU and through the radiator.',
        'Top + rear fans exhaust the heated air out of the case.',
      ],
    },
    alternatives: [
      { name: 'Lian Li UNI FAN SL120', note: 'Daisy-chain RGB that matches the O11D EVO.' },
      { name: 'Noctua NF-F12 PWM', note: 'Quietest option for exhaust positions.' },
    ],
    sources: [
      { label: 'P12 Pro PST 5-pack $35.99 (≈$7.20/fan)', url: 'https://ssdbuddy.com/arctic-p12-pro-pst-review-2026/' },
    ],
  },
  {
    id: 'case',
    category: 'Case',
    name: 'Lian Li O11D EVO RGB',
    brand: 'Lian Li',
    accent: '#e5e7eb',
    art: 'case',
    slot: 'case',
    tagline: 'A dual-chamber showcase chassis built for big radiators and clean cable runs.',
    price: { current: 159, low: 150, high: 170, msrp: 169 },
    quantity: 1,
    specs: [
      { label: 'Form Factor', value: 'Mid-tower (E-ATX)' },
      { label: 'Layout', value: 'Dual chamber' },
      { label: 'Radiator', value: 'Up to 420 mm' },
      { label: 'Glass', value: 'Front + side tempered' },
      { label: 'Fan Mounts', value: '10 × 120 mm' },
      { label: 'Design', value: 'Reversible chassis + ARGB strips' },
    ],
    howItWorks: {
      summary:
        'A dual-chamber design hides the PSU and cables behind the motherboard tray, leaving the main chamber an open, glass-wrapped stage for the GPU, board and cooling.',
      steps: [
        'Front chamber stages the motherboard, GPU and radiators.',
        'Rear chamber conceals the PSU, drives and all cabling.',
        'Tempered glass on two sides puts the build on display.',
      ],
    },
    alternatives: [
      { name: 'Lian Li O11D EVO RGB V2', note: 'Current-gen 2026 refresh; improved airflow & modularity; ~$170.', price: 170, current: true },
    ],
    sources: [
      { label: 'O11D EVO RGB ~$159–170', url: 'https://pangoly.com/en/price-history/lian-li-o11d-evo-rgb' },
    ],
  },
];

export const TOTALS = (() => {
  const low = PARTS.reduce((s, p) => s + p.price.low, 0);
  const high = PARTS.reduce((s, p) => s + p.price.high, 0);
  const current = PARTS.reduce((s, p) => s + p.price.current, 0);
  return { low, high, current };
})();
