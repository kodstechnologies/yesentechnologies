import solarRows from '@/assets/advisory-solar-rows.jpg.asset.json';
import solarField from '@/assets/advisory-solar-field.jpg.asset.json';
import solarAerial from '@/assets/advisory-hero-solar-aerial.jpg.asset.json';
import gridLines from '@/assets/advisory-grid-lines.jpg.asset.json';

export type SolarServiceKey = 'grid-tie' | 'off-grid' | 'hybrid' | 'microgrid';
export type SolarService = {
  key: SolarServiceKey; number: string; title: string; quoteType: string;
  hero: string; heroAlt: string; subtitle: string; summary: string; markers: string[];
  premise: string; intro: string; applications: { title: string; body: string }[];
  nodes: { label: string; detail: string; kind: 'solar' | 'inverter' | 'battery' | 'grid' | 'loads' | 'control' }[];
  modes: { label: string; title: string; body: string; active: number[]; note: string }[];
  designTitle: string; designIntro: string; decisions: { title: string; body: string }[];
  detailImage: string; detailAlt: string; boundary: string;
  deliverables: { title: string; body: string }[];
  faqs: { q: string; a: string }[];
  sources: { label: string; url: string }[];
};
const sources = {
  rooftop: { label: 'MNRE · Grid-connected rooftop solar', url: 'https://mnre.gov.in/en/grid-connected-solar-rooftop-programme/' },
  storage: { label: 'U.S. DOE · Solar-plus-storage', url: 'https://www.energy.gov/eere/solar/articles/solar-plus-storage-101' },
  backup: { label: 'Berkeley Lab · Solar + storage backup study', url: 'https://eta-publications.lbl.gov/sites/default/files/year2_pvess_backup_report_v2.pdf' },
  microgrid: { label: 'U.S. DOE · Microgrid overview', url: 'https://www.energy.gov/sites/default/files/2024-02/46060_DOE_GDO_Microgrid_Overview_Fact_Sheet_RELEASE_508.pdf' },
  design: { label: 'Sandia · Microgrid conceptual design', url: 'https://www.sandia.gov/app/uploads/sites/273/2022/05/ETI_SNL_Microgrid_Guidebook_2022_SAND2022-4842-R_FINAL.pdf' },
};

export const SOLAR_SERVICES: Record<SolarServiceKey, SolarService> = {
  'grid-tie': {
    key: 'grid-tie', number: '01', title: 'Grid Tie Solar', quoteType: 'Grid Tie',
    hero: solarRows.url, heroAlt: 'Real photograph of ground-mounted photovoltaic panels in sunlight',
    subtitle: 'Your site. Your solar. Connected.',
    summary: 'Turn available roof or land into generation that serves your daytime demand. Keep the utility connection for the hours when solar is not enough.',
    markers: ['On-site consumption', 'Utility interconnection', 'Export where permitted'],
    premise: 'Design for the energy you actually use.',
    intro: 'A grid-connected solar system works alongside your existing supply. The strongest design starts with when your building consumes electricity—not simply how many panels fit on the roof. Load patterns, shading and your utility’s export rules shape the system together.',
    applications: [
      { title: 'Commercial rooftops', body: 'Offices, retail and hospitality sites with regular daytime electrical demand.' },
      { title: 'Industrial facilities', body: 'Production loads, usable roof area and the existing transformer assessed as one electrical system.' },
      { title: 'Homes & institutions', body: 'Rooftops and carports evaluated against consumption, structure and local connection requirements.' },
    ],
    nodes: [{ label: 'Solar array', detail: 'DC generation', kind: 'solar' }, { label: 'Grid-tie inverter', detail: 'Synchronised AC', kind: 'inverter' }, { label: 'Site loads', detail: 'Local consumption', kind: 'loads' }, { label: 'Utility grid', detail: 'Import / permitted export', kind: 'grid' }],
    modes: [
      { label: 'Daytime', title: 'Solar meets the load first.', body: 'While sunlight is available, the inverter converts the array’s DC output into AC for the site. The grid supplies the difference whenever demand exceeds solar production.', active: [0, 1, 2, 3], note: 'Self-consumption depends on how closely generation and demand overlap.' },
      { label: 'Surplus', title: 'Export is a connection decision.', body: 'Where the utility permits it, unused generation flows through the metering arrangement to the grid. Where export is restricted, an export-limiting design may be needed.', active: [0, 1, 3], note: 'Net metering, export limits and credit rates depend on the local utility and applicable rules.' },
      { label: 'Grid outage', title: 'Standard grid-tie solar shuts down.', body: 'The inverter’s anti-islanding protection stops it energising a failed utility circuit. Solar panels alone do not provide backup; that requires a separately engineered storage and isolation arrangement.', active: [], note: 'If outage support is a priority, compare the Hybrid Solar option.' },
    ],
    designTitle: 'Roof area is only the beginning.',
    designIntro: 'We assess the physical site and the electrical connection before settling on array size or inverter architecture.',
    decisions: [
      { title: 'Consumption & tariff', body: 'Bills and interval data reveal daytime usage, demand peaks and the value of self-consumption versus export.' },
      { title: 'Structure & shading', body: 'Roof loading, waterproofing, access routes, shading and orientation inform mounting and array layout.' },
      { title: 'Connection & protection', body: 'Supply capacity, metering, inverter settings, earthing and utility requirements define the connection design.' },
      { title: 'Yield & maintenance', body: 'An energy-yield assessment considers weather, temperature and system losses. Cleaning access and monitoring are designed in.' },
    ],
    detailImage: solarAerial.url, detailAlt: 'Aerial photograph of a solar array with access lanes between panel blocks',
    boundary: 'A lower bill is an outcome to assess—not a fixed percentage to promise. Export economics and site demand matter as much as panel capacity.',
    deliverables: [
      { title: 'Assess the site', body: 'Consumption review, shading assessment and structural and electrical site inputs.' },
      { title: 'Engineer the connection', body: 'Array layout, single-line design and utility application support appropriate to the location.' },
      { title: 'Build & verify', body: 'Installation checks, protection testing and commissioning against the agreed design.' },
      { title: 'Handover with visibility', body: 'As-built information, monitoring configuration and an operating and maintenance plan.' },
    ],
    faqs: [
      { q: 'Is grid-tie solar the same as net metering?', a: 'No. Grid tie describes the electrical connection. Net metering is one possible billing arrangement for exported electricity. Availability, eligible capacity and settlement terms are set by the local utility and regulator.' },
      { q: 'Will it power my building in a blackout?', a: 'A conventional grid-tie system will not. Anti-islanding protection shuts it down when the utility supply fails. Backup requires storage, suitable inverter controls and safe isolation from the grid.' },
      { q: 'Can a system operate without exporting?', a: 'An export-limited arrangement may be possible using compatible metering and inverter controls. Its suitability, approval requirements and effect on unused generation must be assessed for your connection.' },
      { q: 'What should I share for a feasibility review?', a: 'Recent electricity bills, site location, available roof or land information, supply details and—if available—interval consumption data. Tell us about planned load changes and any backup requirement.' },
    ], sources: [sources.rooftop, sources.storage],
  },
  'off-grid': {
    key: 'off-grid', number: '02', title: 'Off Grid Solar', quoteType: 'Off Grid',
    hero: solarField.url, heroAlt: 'Real photograph of a ground-mounted solar array under changing cloud cover',
    subtitle: 'Power beyond the grid.',
    summary: 'Solar, storage and a local power supply designed around the way a remote site operates—even when there is no utility connection to fall back on.',
    markers: ['Standalone supply', 'Battery autonomy', 'Optional generator integration'],
    premise: 'Independence needs an energy plan.',
    intro: 'An off-grid system must produce, store and deliver the energy its site needs. The design balances daily consumption with seasonal solar availability, battery reserve and the consequences of running short. Essential and deferrable loads should be agreed before equipment is selected.',
    applications: [
      { title: 'Remote buildings', body: 'Homes and field facilities where extending a utility connection is impractical.' },
      { title: 'Hospitality & island sites', body: 'Guest and operational loads planned against occupancy, weather and fuel logistics.' },
      { title: 'Telecom & monitoring', body: 'Unattended equipment with defined continuous loads and a clear service-access strategy.' },
    ],
    nodes: [{ label: 'Solar array', detail: 'Harvest daylight', kind: 'solar' }, { label: 'Charge control', detail: 'Regulate charging', kind: 'control' }, { label: 'Battery storage', detail: 'Usable energy reserve', kind: 'battery' }, { label: 'Standalone inverter', detail: 'Local AC supply', kind: 'inverter' }, { label: 'Site loads', detail: 'Prioritised demand', kind: 'loads' }],
    modes: [
      { label: 'Daylight', title: 'Serve demand. Rebuild the reserve.', body: 'Solar generation supplies current loads and charges the battery through the selected power-conversion arrangement. The array must support both tasks within the available solar window.', active: [0, 1, 2, 3, 4], note: 'Array sizing considers recovery after low-sun periods, not just an average day.' },
      { label: 'After sunset', title: 'The battery becomes the source.', body: 'Stored energy supplies the standalone inverter and the agreed loads. Available runtime depends on usable battery energy, load power, conversion losses and the reserve held for battery protection.', active: [2, 3, 4], note: 'Energy capacity and inverter power are separate design decisions.' },
      { label: 'Low solar', title: 'Protect the essential services.', body: 'During an extended low-generation period, controls can reduce deferrable demand. Where included in the design, a generator supports supply or recharges storage before the battery reaches its operating limit.', active: [2, 3, 4], note: 'Autonomy is specified against a load and weather scenario; it is not unlimited power.' },
    ],
    designTitle: 'Size for the difficult days.',
    designIntro: 'A dependable standalone design is built around energy balance, starting loads and a realistic low-sun operating strategy.',
    decisions: [
      { title: 'Daily energy budget', body: 'Inventory appliances, operating hours, seasonal usage and which loads can be deferred.' },
      { title: 'Peak & starting power', body: 'Pumps, compressors and motors can demand short power surges beyond their normal running load.' },
      { title: 'Usable storage & weather', body: 'Set autonomy using usable capacity, battery operating limits, losses and local seasonal solar conditions.' },
      { title: 'Safety & site access', body: 'Battery location, environmental protection, temperature management and maintenance logistics influence equipment selection.' },
    ],
    detailImage: solarRows.url, detailAlt: 'Photovoltaic panels mounted above an open field',
    boundary: 'Off grid does not automatically mean generator free. Extended poor weather and high seasonal loads may justify a dispatchable backup source.',
    deliverables: [
      { title: 'Define the loads', body: 'An appliance and operating-hours inventory, with essential loads and growth needs agreed.' },
      { title: 'Model the energy balance', body: 'PV and storage sizing against seasonal resource, autonomy and recovery requirements.' },
      { title: 'Integrate & test', body: 'Charging, inverter, battery protection and any generator controls checked together.' },
      { title: 'Prepare the operator', body: 'Monitoring, reserve settings, maintenance access and a low-energy response plan.' },
    ],
    faqs: [
      { q: 'How many days will the battery last?', a: 'Autonomy depends on the agreed load, usable battery capacity, losses and reserve settings. We define the low-sun scenario before sizing storage rather than applying a universal number of days.' },
      { q: 'Can it run air conditioning, pumps or refrigeration?', a: 'Potentially, but these loads need explicit assessment. The inverter must handle running and starting power, while generation and storage must support their operating hours and seasonal usage.' },
      { q: 'Is a backup generator always required?', a: 'No. The decision depends on solar variability, autonomy targets, site access and the cost or consequence of interrupted supply. A generator may be appropriate where extended low-sun periods cannot be covered economically with storage alone.' },
      { q: 'How should I plan for future demand?', a: 'Share expected new equipment and usage changes early. Expansion depends on inverter capability, charging limits, battery compatibility and the physical and electrical space reserved in the original design.' },
    ], sources: [sources.storage, sources.design],
  },
  hybrid: {
    key: 'hybrid', number: '03', title: 'Hybrid Solar', quoteType: 'Hybrid',
    hero: solarRows.url, heroAlt: 'Real photograph of photovoltaic panel rows beneath a clear sky',
    subtitle: 'Generate. Store. Stay prepared.',
    summary: 'Combine solar generation, battery storage and the utility grid. Use energy on your terms, with an engineered reserve for the loads that matter most.',
    markers: ['Solar + storage', 'Critical-load backup', 'Energy management'],
    premise: 'Savings and resilience are different objectives.',
    intro: 'A hybrid system can shift solar energy into later hours and support selected loads during a utility outage. But a battery used every evening is not necessarily holding the reserve you need for a blackout. A good design makes that trade-off explicit.',
    applications: [
      { title: 'Homes with essential loads', body: 'Lighting, communications and refrigeration selected for backup rather than assuming whole-home support.' },
      { title: 'Commercial operations', body: 'Defined business loads supported within an agreed power and outage-duration envelope.' },
      { title: 'Existing solar sites', body: 'Storage integration evaluated against the installed inverter, wiring and connection permissions.' },
    ],
    nodes: [{ label: 'Solar array', detail: 'Daytime generation', kind: 'solar' }, { label: 'Power conversion', detail: 'AC / DC integration', kind: 'inverter' }, { label: 'Battery storage', detail: 'Reserve & dispatch', kind: 'battery' }, { label: 'Protected loads', detail: 'Backup circuits', kind: 'loads' }, { label: 'Utility grid', detail: 'Isolated during outage', kind: 'grid' }],
    modes: [
      { label: 'Solar hours', title: 'Supply the site and charge storage.', body: 'Solar serves available demand and charges the battery within its control limits. Import or permitted export is managed through the connection arrangement and chosen operating strategy.', active: [0, 1, 2, 3, 4], note: 'PV output must be considered alongside simultaneous demand and the required charging window.' },
      { label: 'Evening', title: 'Use stored energy deliberately.', body: 'Battery discharge can support later consumption or an agreed tariff strategy. The energy manager holds a minimum reserve where outage readiness takes priority over daily discharge.', active: [1, 2, 3, 4], note: 'Tariff shifting and demand-charge reduction only have value where the local tariff supports them.' },
      { label: 'Grid outage', title: 'Separate from the grid. Support the essentials.', body: 'A backup-capable design isolates the utility connection and establishes a local supply for protected circuits. Compatible solar can continue contributing while the islanded system stays within its operating limits.', active: [0, 1, 2, 3], note: 'Transfer time and supported loads are equipment-specific; hybrid solar is not automatically a no-break UPS.' },
    ],
    designTitle: 'Define what stays on.',
    designIntro: 'Backup power begins with a circuit list and a duration target—not with a battery catalogue.',
    decisions: [
      { title: 'Critical-load selection', body: 'Identify the circuits, operating hours and starting currents that must be supported during an outage.' },
      { title: 'Power versus energy', body: 'Inverter power determines what can run at once; usable battery energy determines how long it can run.' },
      { title: 'Reserve & dispatch', body: 'Choose the balance between daily self-consumption, tariff operation and the energy held for outages.' },
      { title: 'Integration & isolation', body: 'Assess AC or DC coupling, existing equipment, transfer arrangements and protection in both grid and backup modes.' },
    ],
    detailImage: solarField.url, detailAlt: 'Solar panels beneath a partly cloudy sky',
    boundary: 'Whole-site backup is not assumed. Large loads, medical equipment and no-break applications require a separate continuity assessment.',
    deliverables: [
      { title: 'Agree the priorities', body: 'A consumption review and protected-load schedule, with an outage scenario.' },
      { title: 'Design the integration', body: 'PV, battery and inverter architecture, backup circuits and isolation strategy.' },
      { title: 'Verify operating modes', body: 'Charge, discharge, grid-loss and reconnection functions tested against the agreed scope.' },
      { title: 'Set the controls', body: 'Reserve levels, monitoring and operator guidance aligned with the intended use.' },
    ],
    faqs: [
      { q: 'Can batteries be added to my existing solar?', a: 'Often, subject to an equipment and connection review. AC-coupled storage or a revised DC-coupled arrangement may be suitable. Compatibility, available space, protection and backup behaviour must all be checked.' },
      { q: 'Will the entire building have backup?', a: 'Only if the system is designed for it. Many hybrid installations support a separate set of essential circuits. Large motors, heating or cooling loads may exceed the selected inverter or battery capability.' },
      { q: 'Will solar recharge the battery during a power cut?', a: 'It can in a compatible, correctly configured backup-capable system. This depends on the inverter architecture, islanding controls, available sunlight and battery operating limits; it should be verified during commissioning.' },
      { q: 'Is hybrid solar a replacement for a UPS?', a: 'Not automatically. Changeover time and power quality vary by equipment. Sensitive or no-break loads may still require a dedicated UPS or another continuity arrangement.' },
    ], sources: [sources.storage, sources.backup],
  },
  microgrid: {
    key: 'microgrid', number: '04', title: 'Solar Microgrids', quoteType: 'Microgrid',
    hero: solarAerial.url, heroAlt: 'Real aerial photograph of distributed solar arrays and internal access roads',
    subtitle: 'One network. Coordinated power.',
    summary: 'Bring local generation, storage and multiple loads under one control strategy—for campuses, communities and sites that need a defined path to energy resilience.',
    markers: ['Defined electrical boundary', 'Coordinated resources', 'Grid-connected or islanded'],
    premise: 'A microgrid is a system—not just a larger array.',
    intro: 'A microgrid coordinates interconnected loads and energy resources within a defined electrical boundary. It may operate with the utility grid or independently. Its controller, protection scheme and ability to establish a stable local supply are as important as the generation capacity.',
    applications: [
      { title: 'Campuses & institutions', body: 'Multiple buildings with a shared strategy for essential services, generation and load priorities.' },
      { title: 'Islands & communities', body: 'Solar, storage and dispatchable generation assessed alongside local distribution and operator capacity.' },
      { title: 'Industrial clusters', body: 'Coordinated energy resources around production loads, power quality and operational continuity.' },
    ],
    nodes: [{ label: 'Local resources', detail: 'PV / storage / generators', kind: 'solar' }, { label: 'Microgrid controller', detail: 'Coordinated dispatch', kind: 'control' }, { label: 'Local network', detail: 'Prioritised loads', kind: 'loads' }, { label: 'Grid interface', detail: 'Controlled connection', kind: 'grid' }],
    modes: [
      { label: 'Connected', title: 'Operate as a coordinated local network.', body: 'The controller manages local resources and the exchange with the utility, within the site’s electrical limits and connection rules. Demand forecasts and resource availability inform dispatch.', active: [0, 1, 2, 3], note: 'The microgrid’s electrical boundary and point of connection must be clearly defined.' },
      { label: 'Islanded', title: 'Balance power without the utility.', body: 'When intentionally separated from the utility, a suitable resource establishes voltage and frequency. Controls balance generation and consumption, with load prioritisation where resources are constrained.', active: [0, 1, 2], note: 'Islanding needs grid-forming capability and coordinated protection; a standard PV inverter is not enough.' },
      { label: 'Restoration', title: 'Restart and reconnect by design.', body: 'Black-start capability, if included, provides a defined sequence to restore the local network. Reconnection to the utility requires synchronisation, protection checks and agreed switching logic.', active: [0, 1, 2, 3], note: 'Black start and seamless transfer are capabilities to specify and test, not assumptions.' },
    ],
    designTitle: 'Engineer the network, not only the generation.',
    designIntro: 'The first decisions establish resilience goals, electrical boundaries and who will operate the system.',
    decisions: [
      { title: 'Resilience & load priorities', body: 'Define essential services, outage scenarios, allowable interruptions and how non-essential demand will be managed.' },
      { title: 'Resource & network studies', body: 'Assess solar, storage, existing generators, distribution assets and the aggregated load profile.' },
      { title: 'Control & protection', body: 'Review voltage and frequency control, fault protection, communications and switching in connected and islanded modes.' },
      { title: 'Operations & cybersecurity', body: 'Plan operator responsibilities, secure control access, maintenance, spares and recovery procedures.' },
    ],
    detailImage: gridLines.url, detailAlt: 'Real photograph of transmission infrastructure at sunset',
    boundary: 'A microgrid’s resilience comes from its complete operating design. Adding solar and batteries alone does not establish safe islanding or black-start capability.',
    deliverables: [
      { title: 'Set the system boundary', body: 'Stakeholder needs, critical loads, existing assets and the point of utility connection.' },
      { title: 'Study the architecture', body: 'Resource mix, distribution, storage, control and protection assessed together.' },
      { title: 'Integrate & demonstrate', body: 'Controller interfaces and the agreed switching, islanding and restoration scenarios tested.' },
      { title: 'Plan long-term operation', body: 'Operating procedures, secure monitoring and maintenance responsibilities established.' },
    ],
    faqs: [
      { q: 'How is a microgrid different from off-grid solar?', a: 'Off-grid solar describes a standalone supply. A microgrid describes a coordinated local network with a defined electrical boundary, potentially multiple sources and loads, and system-level control. It can be off grid or connected to a utility.' },
      { q: 'Can existing generators be integrated?', a: 'Potentially. Generator controls, ratings, protection and communications need review. Their dispatch strategy must coordinate with storage, solar and the loads in each intended operating mode.' },
      { q: 'Does a microgrid guarantee uninterrupted power?', a: 'No universal guarantee applies. Continuity depends on generation and storage availability, transfer behaviour, load priorities and the outage scenario specified. Critical no-break loads may need additional equipment.' },
      { q: 'What is needed before a feasibility study?', a: 'A site and network plan, consumption and critical-load data, existing resource details, utility connection information, resilience objectives and an understanding of ownership and operating responsibilities.' },
    ], sources: [sources.microgrid, sources.design],
  },
};
