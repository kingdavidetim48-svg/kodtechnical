/**
 * KOD Technical Services — Verified Company Constants & Route Configuration
 * Source of truth: Chapter 1 Audit & Chapter 2 Visual Identity
 */

export const COMPANY_INFO = {
  name: "KOD Technical Services",
  shortName: "KOD Technical",
  tagline: "Rotating Equipment Engineering & Industrial Procurement",
  headquarters: "#41 Stellian Road, Off Elelenwo, Port-Harcourt, Rivers State, Nigeria",
  addressShort: "Port Harcourt, Rivers State, Nigeria",
  operatingHours: "Monday – Friday: 8:00 AM – 5:00 PM (Emergency Callout Available)",
  primaryPhone: "+234 (0) 803 727 0249",
  primaryPhoneRaw: "+2348037270249",
  alternatePhone: "+234 (0) 807 177 1174",
  alternatePhoneRaw: "+2348071771174",
  primaryEmail: "info@kodtechnical.com",
  whatsappUrl: "https://wa.me/2348037270249?text=Hello%20KOD%20Technical%2C%20I%20would%20like%20to%20inquire%20about%20your%20engineering%20services.",
  coreValues: [
    {
      title: "Integrity",
      description: "Conducting all procurement, servicing, and inspection activities with ethical compliance and complete transparency.",
    },
    {
      title: "Commitment",
      description: "Dedicated adherence to client operating uptime, technical requirements, and service delivery schedules.",
    },
    {
      title: "Excellence",
      description: "Applying high technical standards, disciplined workmanship, and quality control to every maintenance intervention.",
    },
  ],
  mission: "To be recognized as a leader in oil-and-gas servicing through operational excellence and uncompromising service delivery.",
  vision: "To compete favorably with international service providers through leading-edge technology.",
};

export const NAVIGATION_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "Contact", href: "/contact" },
];

export interface DetailedService {
  id: string;
  slug: string;
  title: string;
  summary: string;
  category: "Industrial Supply" | "Precision Maintenance" | "Rotating Machinery";
  tags: string[];
  scope: string;
  involves: string[];
  equipmentAndApplications: string[];
  customerRequirements: string[];
}

export const ENGINEERING_SERVICES: DetailedService[] = [
  {
    id: "01",
    slug: "procurement-services",
    title: "Procurement Services",
    summary: "Strategic sourcing and technical supply of certified oilfield equipment, industrial machinery replacement components, mechanical seals, and process valves.",
    category: "Industrial Supply",
    tags: ["Machinery Spares", "Mechanical Seals", "Process Valves"],
    scope: "KOD Technical Services provides dependable technical procurement for oil and gas facilities, petrochemical operations, and industrial plants across Nigeria. We source specialized replacement parts and assemblies required to keep rotating equipment and process lines running safely.",
    involves: [
      "Specification verification against plant operating datasheets and component serial numbers.",
      "Sourcing genuine mechanical seals, impellers, shafts, wear rings, bearings, and heavy process valves.",
      "Logistical coordination and inspection upon delivery to our Port Harcourt engineering center or client site.",
      "Traceability review to prevent counterfeit or sub-grade replacement components in critical process lines.",
    ],
    equipmentAndApplications: [
      "Centrifugal and positive displacement pump replacement parts.",
      "Single, double, and cartridge mechanical seal arrangements.",
      "Gate, globe, check, and ball valves for hydrocarbon service.",
      "Industrial drive couplings, flexible elements, and precision shim packs.",
    ],
    customerRequirements: [
      "Equipment make, model number, and manufacturer serial plate data.",
      "Fluid service specifications, operating pressures, and process temperatures.",
      "Required turnaround timeframe and site delivery location.",
    ],
  },
  {
    id: "02",
    slug: "oem-representation",
    title: "OEM Representation",
    summary: "Commercial and technical representation connecting industrial equipment manufacturers with asset operators in the Nigerian energy sector.",
    category: "Industrial Supply",
    tags: ["Manufacturer Channel", "Equipment Supply", "Technical Liaison"],
    scope: "We serve as a trusted in-country technical liaison between international industrial equipment manufacturers and local facility operators. Our team assists with local technical support, equipment inquiries, and application engineering.",
    involves: [
      "Acting as the local point of contact for manufacturer product lines and specialized component catalogs.",
      "Facilitating engineering communications between facility superintendents and original manufacturers.",
      "Assisting operators with correct sizing, material metallurgy selection, and replacement part identification.",
      "Coordinating factory engineering documentation, operation manuals, and technical advisories.",
    ],
    equipmentAndApplications: [
      "Industrial pumping equipment and packaged skid units.",
      "Mechanical sealing systems and auxiliary support plans.",
      "Speed reducers, industrial gear drives, and power transmission components.",
    ],
    customerRequirements: [
      "New plant design parameters or replacement equipment criteria.",
      "Existing equipment nameplate details for legacy equipment upgrades.",
      "Application specifications for severe, sour, or erosive service duties.",
    ],
  },
  {
    id: "03",
    slug: "maintenance-and-repair",
    title: "General Maintenance",
    summary: "Routine servicing, scheduled preventative upkeep, and rapid corrective maintenance for industrial machinery and plant utility assets.",
    category: "Precision Maintenance",
    tags: ["Preventative Servicing", "Plant Upkeep", "Corrective Repair"],
    scope: "Planned preventative maintenance is essential to avoid costly, unscheduled plant trips. KOD Technical Services supports continuous facility reliability through routine servicing, lubrication checks, component inspections, and scheduled maintenance shutdowns.",
    involves: [
      "Scheduled mechanical inspections of pumps, drivers, couplings, and auxiliary systems.",
      "Bearing lubrication verification, seal gland packing replacement, and filter servicing.",
      "Identification of early mechanical wear, abnormal casing temperatures, and minor leakages.",
      "Compilation of maintenance logs and servicing recommendations for plant engineers.",
    ],
    equipmentAndApplications: [
      "Process fluid transfer pumps and chemical dosing skids.",
      "Cooling tower water circulation systems and service water pumps.",
      "Plant air compressor units and auxiliary drive equipment.",
      "Industrial gear drives, conveyor drives, and electric motor packages.",
    ],
    customerRequirements: [
      "Asset operating schedules and designated maintenance windows.",
      "Historical maintenance logs and recurring operating issues.",
      "Facility safety induction protocols and work-permit requirements.",
    ],
  },
  {
    id: "04",
    slug: "precision-alignment",
    title: "Laser & Precision Alignment",
    summary: "Accurate optical and laser alignment of coupled shafts, drivers, and driven equipment to eliminate excessive vibration and prevent premature bearing failure.",
    category: "Precision Maintenance",
    tags: ["Laser Alignment", "Coupling Setup", "Shaft Runout"],
    scope: "Misalignment is one of the leading causes of premature bearing, seal, and coupling failure in rotating machinery. Our technicians use calibrated precision laser alignment tools to correct angular and parallel shaft offsets between drivers and driven machinery.",
    involves: [
      "Pre-alignment inspection including soft foot detection, runout checks, and pipe strain assessment.",
      "Mounting calibrated digital laser transmitter and detector units on coupled shafts.",
      "Calculation and correction of angular and parallel offsets using precision stainless steel shims.",
      "Verification of cold alignment targets to account for expected thermal growth during continuous operation.",
      "Documenting final alignment coordinates and providing sign-off reports for asset records.",
    ],
    equipmentAndApplications: [
      "Motor-driven and diesel-driven centrifugal pumps.",
      "Turbine-to-generator and turbine-to-compressor shaft couplings.",
      "Heavy industrial gearboxes, blowers, and induced-draft fans.",
      "Vertical pumps and cardan-shaft industrial drives.",
    ],
    customerRequirements: [
      "Machine train layout, driver rating, and operating RPM.",
      "Driver and driven unit thermal expansion estimates where known.",
      "Lockout/tagout (LOTO) clearance and site electrical isolation.",
    ],
  },
  {
    id: "05",
    slug: "equipment-overhaul",
    title: "Rotating Equipment Overhaul",
    summary: "Comprehensive teardown, internal component cleaning, dimensional inspection, dynamic balancing, and reassembly of severe-duty industrial pumps and machinery.",
    category: "Rotating Machinery",
    tags: ["Complete Disassembly", "Rotor Balancing", "Rebuild & Testing"],
    scope: "When rotating machinery experiences performance degradation or mechanical failure, our Port Harcourt workshop and field teams perform complete overhaul servicing. We disassemble equipment down to bare components to inspect, refurbish, balance, and rebuild to dependable operating condition.",
    involves: [
      "Systematic disassembly, mechanical cleaning, and photographic documentation of component condition.",
      "Dimensional measurement of shaft journals, bearing bores, and wear ring clearances.",
      "Dynamic balancing of rotating impellers, rotors, and shaft assemblies to minimize residual unbalance.",
      "Replacement of worn bearings, mechanical seals, gaskets, O-rings, and fasteners.",
      "Precision reassembly, setting of internal clearances, and mechanical rotation verification.",
    ],
    equipmentAndApplications: [
      "Multi-stage high-pressure export and boiler feed pumps.",
      "Single-stage end-suction and horizontal split-case centrifugal pumps.",
      "Industrial screw, gear, and reciprocating positive displacement pumps.",
      "Heavy industrial speed reducers and multi-shaft gearboxes.",
    ],
    customerRequirements: [
      "Equipment cross-sectional drawings and factory clearance specifications if available.",
      "Description of operating fault (excessive noise, vibration, loss of flow or pressure).",
      "Delivery to our Port Harcourt machine shop or site overhaul access arrangements.",
    ],
  },
  {
    id: "06",
    slug: "equipment-retrofitting",
    title: "Equipment Retrofitting",
    summary: "Modernization and re-engineering of legacy rotating equipment to enhance hydraulic efficiency, upgrade sealing arrangements, and adapt to changed process conditions.",
    category: "Rotating Machinery",
    tags: ["Component Upgrades", "Seal Modernization", "Hydraulic Adaptation"],
    scope: "Industrial plants frequently experience changes in operating conditions such as fluid viscosity, operating pressure, or environmental regulations. Rather than purchasing costly new equipment, our retrofitting services modify and upgrade existing machinery.",
    involves: [
      "Evaluation of existing equipment against modified plant operating parameters.",
      "Retrofitting outdated gland packing stuffing boxes with modern cartridge mechanical seals.",
      "Machining casing chambers and stuffing box heads to accommodate upgraded components.",
      "Impeller trimming or replacement to align pump head-capacity performance with actual duty points.",
      "Upgrading component metallurgy for enhanced corrosion, erosion, or sour service resistance.",
    ],
    equipmentAndApplications: [
      "Legacy process pumps requiring modern mechanical seal conversions.",
      "Pumps requiring impeller modifications for updated flow and pressure demands.",
      "Older industrial gearboxes requiring upgraded bearing arrangements or modern lubrication systems.",
    ],
    customerRequirements: [
      "Current operating parameters versus original equipment design rating.",
      "Fluid composition data including presence of solids, H2S, or corrosive chemicals.",
      "Physical dimensions and dimensional constraints of the existing installation skid.",
    ],
  },
  {
    id: "07",
    slug: "condition-monitoring",
    title: "Condition Monitoring",
    summary: "Predictive diagnostics including vibration analysis and operating temperature assessment to detect mechanical defects before catastrophic failure occurs.",
    category: "Precision Maintenance",
    tags: ["Vibration Diagnostics", "Predictive Monitoring", "Defect Detection"],
    scope: "Condition monitoring allows plant maintenance teams to transition from reactive firefighting to planned, predictive interventions. By analyzing vibration signatures and thermal patterns, KOD Technical Services detects unbalance, misalignment, bearing degradation, and looseness early.",
    involves: [
      "Periodic or routine vibration data collection across bearing housings and machine casings.",
      "Spectrum analysis to identify characteristic frequencies of bearing faults, gear mesh wear, and unbalance.",
      "Thermal screening of bearing housings, electrical couplings, and mechanical seal flush plans.",
      "Trending operating conditions over time to forecast remaining component life and schedule repairs.",
      "Delivering actionable diagnostic reports with specific maintenance recommendations.",
    ],
    equipmentAndApplications: [
      "Continuous-duty crude export pumps, water injection units, and booster skids.",
      "Large industrial electric motors and turbomachinery drives.",
      "Critical plant gear drives, overhead fans, and cooling water circulating units.",
    ],
    customerRequirements: [
      "Access to machinery during normal operating load and steady-state temperature.",
      "Machine speed (RPM), bearing part numbers, and gear tooth counts where available.",
      "Baseline or historic operational vibration readings if previously recorded.",
    ],
  },
  {
    id: "08",
    slug: "equipment-installation",
    title: "Equipment Installation",
    summary: "Turnkey mechanical placement, soleplate leveling, foundation anchoring, grouting, and initial piping alignment for new and relocated rotating equipment.",
    category: "Industrial Supply",
    tags: ["Turnkey Placement", "Soleplate Leveling", "Foundation Setup"],
    scope: "A precision installation is the foundation of long rotating equipment life. KOD Technical Services handles mechanical equipment positioning, leveling, anchoring, and grouting to ensure machinery sits on a stable, strain-free base before piping connection.",
    involves: [
      "Site foundation inspection, surface preparation, and anchor bolt positioning checks.",
      "Precision leveling and elevation adjustment of equipment baseplates and soleplates using precision shims.",
      "Assisting with epoxy or cementitious baseplate grouting to eliminate voids and provide rigid dampening.",
      "Monitoring suction and discharge piping hookup to identify and prevent excessive pipe strain on pump nozzles.",
      "Performing preliminary cold shaft alignment prior to piping final torque-up.",
    ],
    equipmentAndApplications: [
      "New skid-mounted pump packages and modular chemical injection units.",
      "Replacement pumps and motors installed onto existing concrete plinths.",
      "Industrial fans, blowers, and heavy drive assemblies.",
    ],
    customerRequirements: [
      "Foundation drawings, anchor bolt schematics, and equipment load data.",
      "Crane and rigging access for heavy machinery positioning.",
      "Piping isometric drawings and flange connection schedules.",
    ],
  },
  {
    id: "09",
    slug: "pre-commissioning",
    title: "Pre-Commissioning",
    summary: "Comprehensive QA/QC inspections, instrument loop verification, rotational direction checks, and line flushing before equipment startup.",
    category: "Rotating Machinery",
    tags: ["Cold Verification", "Direction Checks", "QA/QC Protocol"],
    scope: "Before any newly installed or overhauled equipment is started up, thorough pre-commissioning checks must verify that all mechanical, electrical, and piping interfaces are safe and compliant with installation checklists.",
    involves: [
      "Piping cleanliness verification, suction strainer inspection, and line flushing checks.",
      "Driver rotation direction (bump-test) uncoupled from driven machinery to prevent reverse rotation damage.",
      "Coupling assembly, guard installation, and mechanical seal auxiliary piping verification.",
      "Checking lube oil levels, seal flush supply pressure, and instrument sensor connections.",
      "Completing standardized pre-commissioning verification checklists and handover records.",
    ],
    equipmentAndApplications: [
      "Newly installed or overhauled process and utility pumps.",
      "Lubrication circulation consoles and mechanical seal barrier fluid plans.",
      "Motor and engine drives following major mechanical servicing.",
    ],
    customerRequirements: [
      "Plant pre-commissioning schedule and operations handover criteria.",
      "Utility readiness (power supply, flush fluid, seal buffer liquid).",
      "Sign-off protocol involving vendor, mechanical contractor, and client representatives.",
    ],
  },
  {
    id: "10",
    slug: "commissioning",
    title: "Commissioning & Startup",
    summary: "Controlled live equipment startup, hot alignment verification, baseline operational parameter recording, and smooth operational handover.",
    category: "Rotating Machinery",
    tags: ["Live Startup", "Hot Alignment", "Operating Baseline"],
    scope: "Commissioning brings machinery safely into live operating service. Our engineering team assists operators during initial startup, monitoring real-time temperatures, pressures, and vibration to ensure smooth mechanical operation and formal sign-off.",
    involves: [
      "Pre-startup safety checks and coordination with control room and field operators.",
      "Controlled startup monitoring including suction and discharge pressure build, flow rates, and seal behavior.",
      "Immediate vibration and bearing temperature measurement during ramp-up and steady state.",
      "Hot alignment verification after machinery reaches full operating thermal equilibrium.",
      "Establishing permanent baseline telemetry records for future predictive maintenance.",
    ],
    equipmentAndApplications: [
      "Primary process pumps on hydrocarbons, produced water, and chemical services.",
      "High-pressure boiler feedwater, cooling, and utility pump systems.",
      "Turnaround machinery returns to active production duty.",
    ],
    customerRequirements: [
      "Operating fluids available at design suction head and process temperature.",
      "Plant operators and instrumentation technicians available on site.",
      "Formal commissioning checklists and client acceptance forms.",
    ],
  },
  {
    id: "11",
    slug: "ultra-modern-machine-shop",
    title: "Ultra-Modern Machine Shop & Pump Servicing",
    summary: "Precision lathe turning, shaft straightening, casing line-boring, dynamic balancing, and specialized pump servicing in our Port Harcourt engineering center.",
    category: "Precision Maintenance",
    tags: ["Port Harcourt Center", "Shaft Machining", "Casing Line-Boring"],
    scope: "Located at our headquarters on Stellian Road in Port Harcourt, our engineering machine shop provides specialized mechanical machining and refurbishing capabilities to restore damaged, eroded, or worn rotating components without waiting for overseas replacements.",
    involves: [
      "Precision lathe machining for turning pump shafts, sleeve components, and custom spacers.",
      "Shaft runout measurement and hydraulic press straightening to OEM tolerances.",
      "Horizontal line-boring and sleeve installation for worn pump casing bearing bores.",
      "Wear ring manufacturing and clearance machining to restore internal hydraulic efficiency.",
      "Hydrostatic testing of refurbished casings to verify pressure boundary integrity.",
    ],
    equipmentAndApplications: [
      "Centrifugal pump shafts, impellers, casing wear rings, and seal glands.",
      "Severely worn split-case and multi-stage pump casing halves.",
      "Specialized bushings, couplings, and mechanical adapter plates.",
      "Severe-service pump assemblies requiring complete workshop refurbishment.",
    ],
    customerRequirements: [
      "Delivery of components or complete assemblies to our Port Harcourt workshop.",
      "Original equipment dimensional tolerances or sample mating parts.",
      "Clear description of observed defects, wear patterns, or operating history.",
    ],
  },
];
