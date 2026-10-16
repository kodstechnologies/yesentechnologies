export const COMPARE: [string, string, string, string][] = [
  ["Connection to utility grid", "Runs in parallel with the grid", "Grid-connected, with battery storage", "Independent of the grid"],
  ["Battery storage", "No", "Yes", "Yes"],
  ["Main components", "Solar panels, grid-tie inverter, net meter", "Solar panels, hybrid inverter with built-in MPPT, battery bank, net meter", "Solar panels, bidirectional inverter, MPPT charge controller, batteries"],
  ["Surplus solar energy", "Exported to the grid under applicable net-metering rules", "Charges the battery first, then can be exported to the grid", "Charges the battery bank"],
  ["During a grid outage", "Stops supplying power; no backup", "Keeps supplying loads from solar and battery", "Keeps supplying loads, within the limits of array and battery sizing"],
  ["When the sun is not available", "Grid supplies the load", "Battery supplies the load; grid or generator supports when the battery is discharged", "Battery supplies the load; an optional generator can support when the battery is discharged"],
  ["Typical fit", "Reliable grid, goal of cutting electricity bills", "Reliable or weak grid, cutting bills and keeping power during outages", "No grid, or a grid too weak to rely on"],
  ["Cost and complexity", "Generally the lowest cost and simplest to install", "Batteries add cost and maintenance", "Batteries add cost and maintenance"],
];

export const FAQS = [
  ["Which system is right for me: grid-tie, hybrid or off-grid?", "Choose grid-tie if your grid supply is reliable and your goal is to reduce bills. Choose hybrid if you also want power during outages. Choose off-grid if there is no grid connection or the grid is too weak to rely on. We confirm the choice after assessing your load and site."],
  ["Will a grid-tie system power my building during a power cut?", "No. Grid-tie inverters shut down when the grid is down, for safety. If you need power during outages, a hybrid system with batteries is the right option."],
  ["Can you install all three system types for homes, businesses and industry?", "Yes. Grid-tie, hybrid and off-grid systems are available for residential, commercial and industrial projects, from 3 kWp rooftops to solar farms of 1 MWp."],
  ["Do I need batteries?", "Not for grid-tie. Hybrid and off-grid systems use a battery bank, which adds cost and maintenance but lets you use stored solar energy when the sun is not available."],
  ["How much can I save with solar?", "Savings depend on your system size, consumption and tariff. We give you a savings estimate in your proposal, based on your own electricity usage."],
  ["Is a government subsidy available?", "Yes, for eligible homes. The PM Surya Ghar scheme offers up to ₹78,000 for grid-connected residential rooftop systems of 3 kW and above. It does not cover commercial or industrial installations."],
  ["What is net metering and how does it help?", "Net metering records the surplus power you export to the grid and credits it against the power you draw from it, reducing your bill. Eligibility and credit terms are set by your utility and regulator."],
  ["How long does installation take?", "It depends on the system's capacity and your site. Your proposal includes a schedule."],
  ["Will solar work on cloudy or rainy days?", "Yes. Panels still generate in cloudy weather, though at reduced output. With a hybrid or off-grid system, batteries store energy for later use."],
  ["What maintenance does a solar system need?", "Periodic cleaning of the panels and routine system checks. Systems with batteries need additional battery care. We offer after-sales support."],
  ["Can I start with grid-tie and add batteries later?", "Sometimes. It depends on the inverter and design chosen at the start, so tell us at the survey stage if you may want backup power later."],
  ["Which solar panel type should I choose?", "Monocrystalline panels generate the most power from a given area and suit space-limited roofs. Polycrystalline panels cost less but are less efficient. Thin-film modules need much more space and are generally unsuited to residential rooftops. We recommend a type once we know your site."],
];

/** Per-system summary for sub-pages, drawn only from the comparison table and FAQs. */
export const SYSTEM_SUMMARY = {
  "grid-tie": { col: 0, intro: "A grid-tie system runs in parallel with the utility grid and has no battery storage. It generally has the lowest cost and is the simplest to install, suiting sites with a reliable grid where the goal is cutting electricity bills.", faqs: ["Will a grid-tie system power my building during a power cut?", "Can I start with grid-tie and add batteries later?", "What is net metering and how does it help?"], extra: [] as string[] },
  hybrid: { col: 1, intro: "A hybrid system is grid-connected with battery storage. It suits reliable or weak grids, cutting bills and keeping power during outages.", faqs: ["Do I need batteries?"], extra: ["Backup option: choose hybrid if power cuts are a concern.", "Subsidy eligibility for systems with battery storage is confirmed at proposal stage."] },
  "off-grid": { col: 2, intro: "An off-grid system is independent of the utility grid and stores energy in a battery bank. It suits sites with no grid, or a grid too weak to rely on.", faqs: ["Do I need batteries?"], extra: [] as string[] },
} as const;
