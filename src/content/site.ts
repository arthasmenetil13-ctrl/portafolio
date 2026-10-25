export type Lang = "es" | "en";

export type CaseState = "watching" | "new" | "due";

export type BoardRow = {
  radicado: string;
  court: string;
  action: string;
  term: string;
};

export type Node = {
  id: string;
  title: string;
  detail: string;
};

export type Tech = {
  id: string;
  name: string;
  icon?: string;
  powers: string[];
};

export type Entry = {
  title: string;
  place: string;
  from: string;
  to: string;
  length?: string;
  points?: string[];
};

export type Cert = { name: string; issuer: string; date: string };

export const contact = {
  email: "carlosllanos437@gmail.com",
  linkedin: "https://www.linkedin.com/in/carlos-llanos11/",
  github: "https://github.com/arthasmenetil13-ctrl",
  project: "https://www.estadosjudiciales.ai/",
};

// Synthetic rows for the board demo. Labelled "datos de ejemplo" on the page.
const rows: BoardRow[] = [
  {
    radicado: "70001-40-03-002-2026-00148-00",
    court: "Juzgado 2 Civil Municipal · Sincelejo",
    action: "Auto que fija fecha de audiencia",
    term: "3 días hábiles",
  },
  {
    radicado: "70001-31-05-001-2025-00377-00",
    court: "Juzgado 1 Laboral del Circuito · Sincelejo",
    action: "Traslado de excepciones",
    term: "10 días hábiles",
  },
  {
    radicado: "23001-31-03-004-2026-00052-00",
    court: "Juzgado 4 Civil del Circuito · Montería",
    action: "Auto admite demanda",
    term: "20 días hábiles",
  },
  {
    radicado: "08001-40-03-011-2025-00911-00",
    court: "Juzgado 11 Civil Municipal · Barranquilla",
    action: "Sentencia de primera instancia",
    term: "3 días hábiles",
  },
];

const rowsEn: BoardRow[] = rows.map((r, i) => ({
  ...r,
  action: [
    "Order setting the hearing date",
    "Notice of defences filed",
    "Order admitting the claim",
    "First-instance ruling",
  ][i],
  term: ["3 business days", "10 business days", "20 business days", "3 business days"][i],
}));

const nodesEs: Node[] = [
  { id: "source", title: "Juzgados", detail: "Publicaciones diarias de estados" },
  { id: "worker", title: "Vigilancia diaria", detail: "Workers en Python, programados con GitHub Actions" },
  { id: "db", title: "Base de datos", detail: "PostgreSQL en Neon, con pgvector" },
  { id: "api", title: "API", detail: "FastAPI, SQLAlchemy y Alembic, en Render" },
  { id: "web", title: "Aplicación web", detail: "Next.js, React y TypeScript" },
  { id: "alerts", title: "Avisos", detail: "Correo con Resend y WhatsApp Cloud API" },
  { id: "pay", title: "Suscripciones", detail: "Pagos con Wompi por webhooks" },
  { id: "ai", title: "Documentos con IA", detail: "API de Claude" },
];

const nodesEn: Node[] = [
  { id: "source", title: "Courts", detail: "Daily docket publications" },
  { id: "worker", title: "Daily watch", detail: "Python workers scheduled with GitHub Actions" },
  { id: "db", title: "Database", detail: "PostgreSQL on Neon, with pgvector" },
  { id: "api", title: "API", detail: "FastAPI, SQLAlchemy and Alembic, on Render" },
  { id: "web", title: "Web app", detail: "Next.js, React and TypeScript" },
  { id: "alerts", title: "Alerts", detail: "Email with Resend and WhatsApp Cloud API" },
  { id: "pay", title: "Subscriptions", detail: "Wompi payments via webhooks" },
  { id: "ai", title: "AI documents", detail: "Claude API" },
];

export const stack: Tech[] = [
  { id: "next", name: "Next.js", icon: "nextdotjs", powers: ["web"] },
  { id: "ts", name: "TypeScript", icon: "typescript", powers: ["web"] },
  { id: "react", name: "React", icon: "react", powers: ["web"] },
  { id: "py", name: "Python", icon: "python", powers: ["worker", "api"] },
  { id: "fastapi", name: "FastAPI", icon: "fastapi", powers: ["api"] },
  { id: "pg", name: "PostgreSQL", icon: "postgresql", powers: ["db"] },
  { id: "gha", name: "GitHub Actions", icon: "githubactions", powers: ["worker"] },
  { id: "render", name: "Render", icon: "render", powers: ["api"] },
  { id: "resend", name: "Resend", icon: "resend", powers: ["alerts"] },
  { id: "wa", name: "WhatsApp Cloud API", icon: "whatsapp", powers: ["alerts"] },
  { id: "wompi", name: "Wompi", icon: "card", powers: ["pay"] },
  { id: "claude", name: "Claude API", icon: "claude", powers: ["ai"] },
  { id: "docker", name: "Docker", icon: "docker", powers: ["api"] },
];

const certs: Cert[] = [
  { name: "Diplomado en Programación en JavaScript", issuer: "Politécnico de Colombia", date: "dic 2025" },
  { name: "Google Cybersecurity", issuer: "Google", date: "sept 2025" },
  { name: "Junior Cybersecurity Analyst Career Path", issuer: "Cisco", date: "ago 2025" },
  { name: "Bootcamp Programación", issuer: "MinTIC · Universidad Tecnológica de Bolívar", date: "jun 2025" },
  { name: "Scrum Fundamentals Certified", issuer: "SCRUMstudy", date: "abr 2025" },
];

const es = {
  lang: "es" as Lang,
  meta: {
    title: "Carlos Llanos · Desarrollador full stack",
    description:
      "Desarrollador full stack en Sincelejo, Colombia. Construí y opero Estados Judiciales, una plataforma en producción para abogados litigantes. Next.js, FastAPI, PostgreSQL.",
  },
  switchLabel: "English",
  switchHref: "/en",
  switchAria: "Ver el sitio en inglés",
  name: "Carlos Llanos",
  role: "Desarrollador full stack",
  place: "Sincelejo, Colombia · Trabajo remoto",
  board: {
    title: "Hoy se vigila",
    sample: "Datos de ejemplo",
    cols: { radicado: "Radicado", court: "Despacho", state: "Estado" },
    states: { watching: "Vigilando", new: "Actuación nueva", due: "Término corre" } as Record<CaseState, string>,
    rows,
    alertTitle: "Así llega el aviso",
    viaWhatsapp: "Por WhatsApp",
    viaEmail: "Por correo",
    emailSubject: "Asunto",
    alertLead: "Nueva actuación en tu proceso",
    alertTerm: "Término",
    caption:
      "Estados Judiciales revisa a diario los estados de los juzgados y le avisa al abogado cuando su proceso se mueve.",
  },
  actions: {
    write: "Escríbeme",
    project: "Ver Estados Judiciales",
    linkedin: "LinkedIn",
    github: "GitHub",
  },
  project: {
    title: "Estados Judiciales",
    lead:
      "Una plataforma por suscripción para abogados litigantes en Colombia. Vigila sus procesos todos los días, controla los términos y les avisa por correo y WhatsApp cuando hay una actuación nueva.",
    since: "En producción desde septiembre de 2026",
    did: "Lo que hice, de punta a punta",
    points: [
      "Diseñé y construí el frontend en Next.js, React y TypeScript, y la API en Python con FastAPI.",
      "Modelé la base de datos en PostgreSQL con migraciones en Alembic y roles separados por servicio.",
      "Automaticé la vigilancia diaria con workers en Python programados en GitHub Actions.",
      "Integré los avisos por correo (Resend) y por WhatsApp Cloud API con plantillas aprobadas por Meta.",
      "Conecté las suscripciones con la pasarela Wompi y la generación de documentos con la API de Claude.",
    ],
    visit: "Visitar estadosjudiciales.ai",
    mapTitle: "Cómo está armado",
    mapHint: "Toca una tecnología para ver qué parte del sistema mueve.",
    mapAll: "Todo",
    branchLabel: "Servicios conectados a la API",
    nodes: nodesEs,
  },
  shop: {
    title: "En el taller",
    note: "Lo próximo que voy a construir y publicar, uno por uno.",
    badge: "En construcción",
    items: [
      { title: "API de festivos y días hábiles de Colombia", detail: "Para calcular plazos sin pelear con la Ley Emiliani." },
      { title: "Starter SaaS de código abierto", detail: "Login, pagos con Wompi y correos, listo para arrancar un producto." },
      { title: "Tracker de postulaciones", detail: "Un tablero para seguir cada vacante a la que aplico." },
    ],
  },
  history: {
    title: "Trayectoria",
    work: "Experiencia",
    study: "Formación",
    certs: "Certificaciones",
    workItems: [
      {
        title: "Asistente técnico en soluciones digitales",
        place: "Login Project S.A.S · Sincelejo",
        from: "abr 2022",
        to: "abr 2025",
        length: "3 años 1 mes",
        points: [
          "Aplicaciones web en React.js con componentes reutilizables.",
          "Automatización de procesos y despliegues a producción.",
          "Soporte de procesos ETL y bases de datos SQL. Trabajo con Scrum.",
        ],
      },
      {
        title: "Profesor de inglés",
        place: "Corporación Universitaria del Caribe (CECAR)",
        from: "feb 2022",
        to: "jun 2023",
        length: "1 año 5 meses",
      },
    ] as Entry[],
    studyItems: [
      {
        title: "Ingeniería de Sistemas",
        place: "Corporación Universitaria del Caribe (CECAR)",
        from: "2020",
        to: "dic 2026",
        length: "Grado en diciembre",
      },
      {
        title: "Licenciatura en Inglés",
        place: "Corporación Universitaria del Caribe (CECAR)",
        from: "2019",
        to: "2023",
      },
    ] as Entry[],
    certItems: certs,
  },
  close: {
    title: "¿Hablamos?",
    lead: "Busco un rol remoto como desarrollador full stack o backend. Respondo en español o en inglés.",
    footer: "Rotulado a mano en Sincelejo · Hecho con Next.js",
  },
};

export type Dict = typeof es;

const en: Dict = {
  ...es,
  lang: "en",
  meta: {
    title: "Carlos Llanos · Full stack developer",
    description:
      "Full stack developer in Sincelejo, Colombia. I built and run Estados Judiciales, a production platform for litigation lawyers. Next.js, FastAPI, PostgreSQL.",
  },
  switchLabel: "Español",
  switchHref: "/",
  switchAria: "View the site in Spanish",
  role: "Full stack developer",
  place: "Sincelejo, Colombia · Remote work",
  board: {
    title: "Watching today",
    sample: "Sample data",
    cols: { radicado: "Case number", court: "Court", state: "Status" },
    states: { watching: "Watching", new: "New action", due: "Deadline running" },
    rows: rowsEn,
    alertTitle: "The alert the lawyer gets",
    viaWhatsapp: "On WhatsApp",
    viaEmail: "By email",
    emailSubject: "Subject",
    alertLead: "New action on your case",
    alertTerm: "Deadline",
    caption:
      "Estados Judiciales checks Colombian court dockets every day and alerts the lawyer when their case moves.",
  },
  actions: {
    write: "Email me",
    project: "See Estados Judiciales",
    linkedin: "LinkedIn",
    github: "GitHub",
  },
  project: {
    ...es.project,
    lead:
      "A subscription platform for litigation lawyers in Colombia. It watches their cases every day, tracks deadlines and alerts them by email and WhatsApp when there is a new court action.",
    since: "In production since September 2026",
    did: "What I did, end to end",
    points: [
      "Designed and built the frontend in Next.js, React and TypeScript, and the API in Python with FastAPI.",
      "Modelled the PostgreSQL database with Alembic migrations and separate roles per service.",
      "Automated the daily watch with Python workers scheduled on GitHub Actions.",
      "Integrated email (Resend) and WhatsApp Cloud API alerts with Meta-approved templates.",
      "Connected subscriptions to the Wompi payment gateway and document generation to the Claude API.",
    ],
    visit: "Visit estadosjudiciales.ai",
    mapTitle: "How it is built",
    mapHint: "Tap a technology to see which part of the system it runs.",
    mapAll: "All",
    branchLabel: "Services wired to the API",
    nodes: nodesEn,
  },
  shop: {
    title: "In the workshop",
    note: "What I am building and publishing next, one at a time.",
    badge: "Under construction",
    items: [
      { title: "Colombian holidays and business-days API", detail: "Deadline maths without fighting the Emiliani law." },
      { title: "Open source SaaS starter", detail: "Login, Wompi payments and email, ready to start a product." },
      { title: "Job application tracker", detail: "A board to follow every role I apply to." },
    ],
  },
  history: {
    title: "Track record",
    work: "Experience",
    study: "Education",
    certs: "Certifications",
    workItems: [
      {
        title: "Digital solutions technical assistant",
        place: "Login Project S.A.S · Sincelejo",
        from: "Apr 2022",
        to: "Apr 2025",
        length: "3 yrs 1 mo",
        points: [
          "React.js web applications built from reusable components.",
          "Process automation and production deployments.",
          "ETL and SQL database support. Scrum teams.",
        ],
      },
      {
        title: "English teacher",
        place: "Corporación Universitaria del Caribe (CECAR)",
        from: "Feb 2022",
        to: "Jun 2023",
        length: "1 yr 5 mo",
      },
    ],
    studyItems: [
      {
        title: "Systems Engineering",
        place: "Corporación Universitaria del Caribe (CECAR)",
        from: "2020",
        to: "Dec 2026",
        length: "Graduating in December",
      },
      {
        title: "B.Ed. in English",
        place: "Corporación Universitaria del Caribe (CECAR)",
        from: "2019",
        to: "2023",
      },
    ],
    certItems: certs.map((c) => ({
      ...c,
      date: c.date.replace("dic", "Dec").replace("sept", "Sep").replace("ago", "Aug").replace("abr", "Apr"),
    })),
  },
  close: {
    title: "Let's talk",
    lead: "I am looking for a remote full stack or backend role. I work in English or Spanish.",
    footer: "Hand-lettered in Sincelejo · Built with Next.js",
  },
};

export const dict: Record<Lang, Dict> = { es, en };
