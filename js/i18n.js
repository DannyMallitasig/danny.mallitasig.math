/* Public, source-backed content for Danny Mallitasig's academic profile. */
const sources = {
  thesis: "https://theses.fr/s400774",
  lama: "https://lama-umr8050.fr/membres/mallitasig.danny",
  amarunThesis: "https://www.amarun.org/index.php/materiales/tesis-de-maestria",
  amarunLesson: "https://www.amarun.org/images/amarun/materiales/EDP/teoria-medida/2025-Mallitasig-Teoria-geometrica-de-la-medida/2025-Mallitasig-Leccion1.pdf",
  cjc: "https://cjcma2026.sciencesconf.org/",
  anais: "https://anais.math.cnrs.fr/conferences/ecole-dautomne-2025/premieres-journees-de-laxe-analyse-fonctionnelle-harmonique-et-probabilitesecole-dautomne-danais-2025-programme/",
  egmo: "https://www.egmo.org/egmos/egmo15/countries/country24/",
  amarun: "https://www.amarun.org/",
  upec: "https://www.u-pec.fr/",
  epn: "https://www.epn.edu.ec/",
  modemat: "https://modemat.org/index.php/en/personal/sgonzalez"
};

const commonResearch = {
  es: [
    { id: "multifractal", title: "An&aacute;lisis multifractal", desc: "Estudio de la regularidad local, los exponentes de H&ouml;lder y los espectros multifractales de funciones y medidas.", tags: ["Espectros", "Dimensi&oacute;n de Hausdorff"] },
    { id: "wavelets", title: "Ond&iacute;culas y regularidad", desc: "Uso de coeficientes y l&iacute;deres de ond&iacute;culas para describir regularidad puntual y construcciones multiescala.", tags: ["Wavelet leaders", "Regularidad local"] },
    { id: "measure", title: "Geometr&iacute;a de la medida", desc: "Herramientas de teor&iacute;a geom&eacute;trica de la medida y dimensiones fractales en problemas de an&aacute;lisis.", tags: ["Medidas", "Fractales"] }
  ],
  en: [
    { id: "multifractal", title: "Multifractal analysis", desc: "Local regularity, H&ouml;lder exponents, and multifractal spectra of functions and measures.", tags: ["Spectra", "Hausdorff dimension"] },
    { id: "wavelets", title: "Wavelets and regularity", desc: "Wavelet coefficients and leaders for pointwise regularity and multiscale constructions.", tags: ["Wavelet leaders", "Local regularity"] },
    { id: "measure", title: "Geometric measure theory", desc: "Geometric measure theory tools and fractal dimensions in analysis problems.", tags: ["Measures", "Fractals"] }
  ],
  fr: [
    { id: "multifractal", title: "Analyse multifractale", desc: "R&eacute;gularit&eacute; locale, exposants de H&ouml;lder et spectres multifractals de fonctions et de mesures.", tags: ["Spectres", "Dimension de Hausdorff"] },
    { id: "wavelets", title: "Ondelettes et r&eacute;gularit&eacute;", desc: "Coefficients et leaders d'ondelettes pour la r&eacute;gularit&eacute; ponctuelle et les constructions multi&eacute;chelles.", tags: ["Wavelet leaders", "R&eacute;gularit&eacute; locale"] },
    { id: "measure", title: "Th&eacute;orie g&eacute;om&eacute;trique de la mesure", desc: "Outils de th&eacute;orie g&eacute;om&eacute;trique de la mesure et dimensions fractales en analyse.", tags: ["Mesures", "Fractales"] }
  ]
};

function publicationItems(lang) {
  const labels = {
    es: { thesis: "Tesis doctoral en preparaci&oacute;n", master: "Memoria de Master 2", lesson: "Material docente" },
    en: { thesis: "Doctoral thesis in progress", master: "Master 2 thesis", lesson: "Teaching material" },
    fr: { thesis: "Th&egrave;se de doctorat en pr&eacute;paration", master: "M&eacute;moire de Master 2", lesson: "Document p&eacute;dagogique" }
  }[lang];
  const copy = {
    es: { thesisTitle: "Prescription de comportements multifractals", masterTitle: "Prescription of multifractal behavior of functions and measures", masterAbstract: "Memoria de Master 2 en Analyse et Applications, registrada por AMARUN con fecha 20.09.2024.", lessonTitle: "Lecciones de teor&iacute;a geom&eacute;trica de la medida", lessonAbstract: "Material docente publicado por AMARUN. La primera lecci&oacute;n trata, entre otros temas, la dimensi&oacute;n de caja y el conjunto de Cantor.", thesisAbstract: "Tesis doctoral en preparaci&oacute;n en LAMA, UPEC, bajo la direcci&oacute;n de St&eacute;phane Seuret y Athanasios Batakis." },
    en: { thesisTitle: "Prescription de comportements multifractals", masterTitle: "Prescription of multifractal behavior of functions and measures", masterAbstract: "Master 2 thesis in Analysis and Applications, listed by AMARUN with the date 20 September 2024.", lessonTitle: "Lessons on geometric measure theory", lessonAbstract: "Teaching material published by AMARUN. The first lesson discusses, among other topics, box dimension and the Cantor set.", thesisAbstract: "Doctoral thesis in preparation at LAMA, UPEC, supervised by St&eacute;phane Seuret and Athanasios Batakis." },
    fr: { thesisTitle: "Prescription de comportements multifractals", masterTitle: "Prescription of multifractal behavior of functions and measures", masterAbstract: "M&eacute;moire de Master 2 en Analyse et Applications, r&eacute;pertori&eacute; par AMARUN le 20.09.2024.", lessonTitle: "Le&ccedil;ons de th&eacute;orie g&eacute;om&eacute;trique de la mesure", lessonAbstract: "Document p&eacute;dagogique publi&eacute; par AMARUN. La premi&egrave;re le&ccedil;on traite notamment de la dimension de bo&icirc;te et de l'ensemble de Cantor.", thesisAbstract: "Th&egrave;se de doctorat en pr&eacute;paration au LAMA, UPEC, sous la direction de St&eacute;phane Seuret et Athanasios Batakis." }
  }[lang];
  return [
    { id: "pub-phd-thesis", type: "thesis", title: copy.thesisTitle, authors: "Danny Mallitasig", directors: lang === "es" ? "Dir.: St&eacute;phane Seuret &amp; Athanasios Batakis" : lang === "en" ? "Supervisors: St&eacute;phane Seuret &amp; Athanasios Batakis" : "Dir. : St&eacute;phane Seuret &amp; Athanasios Batakis", venue: labels.thesis + " — Universit&eacute; Paris-Est Cr&eacute;teil (LAMA)", year: lang === "es" ? "Desde 2024" : lang === "en" ? "Since 2024" : "Depuis 2024", officialUrl: sources.thesis, abstract: copy.thesisAbstract, bibtex: "@phdthesis{mallitasig2024thesis,\n  title={Prescription de comportements multifractals},\n  author={Mallitasig, Danny},\n  school={Universite Paris-Est Creteil},\n  year={in progress},\n  note={Supervisors: Stephane Seuret and Athanasios Batakis}\n}" },
    { id: "pub-master-thesis", type: "thesis", title: copy.masterTitle, authors: "Danny Mallitasig", directors: lang === "fr" ? "Dir. : St&eacute;phane Seuret" : lang === "en" ? "Supervised by St&eacute;phane Seuret" : "Dir.: St&eacute;phane Seuret", venue: labels.master + " — Universit&eacute; Gustave Eiffel / AMARUN", year: "2024", officialUrl: sources.amarunThesis, abstract: copy.masterAbstract, bibtex: "@mastersthesis{mallitasig2024master,\n  title={Prescription of multifractal behavior of functions and measures},\n  author={Mallitasig, Danny},\n  school={Universite Gustave Eiffel},\n  year={2024},\n  note={Reference: AMARUN}\n}" },
    { id: "pub-pedagogy-amarun", type: "pedagogy", title: copy.lessonTitle, authors: "Danny Mallitasig", venue: "AMARUN — " + labels.lesson, year: "2025", officialUrl: sources.amarunLesson, abstract: copy.lessonAbstract, bibtex: "@misc{mallitasig2025lesson,\n  title={Lessons on geometric measure theory},\n  author={Mallitasig, Danny},\n  publisher={AMARUN},\n  year={2025}\n}" }
  ];
}

function talkItems(lang) {
  const text = {
    es: [
      { title: "Congr&egrave;s des Jeunes Chercheur.e.s en Math&eacute;matiques Appliqu&eacute;es (CJC-MA 2026)", role: "Comit&eacute; de organizaci&oacute;n", date: "2 — 4 de marzo de 2026", place: "Champs-sur-Marne, Francia", org: "SMAI", link: sources.cjc, desc: "El sitio oficial incluye a Danny Mallitasig (UPEC–LAMA) en el comit&eacute; de organizaci&oacute;n." },
      { title: "&Eacute;cole d'automne d'ANAIS 2025", role: "Ponente", date: "2025", place: "Universit&eacute; Gustave Eiffel, Francia", org: "Axe Analyse fonctionnelle, harmonique et probabilit&eacute;s", link: sources.anais, desc: "El programa oficial registra la presentaci&oacute;n «Prescription de comportements multifractals multivari&eacute;s»." }
    ],
    en: [
      { title: "Congr&egrave;s des Jeunes Chercheur.e.s en Math&eacute;matiques Appliqu&eacute;es (CJC-MA 2026)", role: "Organizing committee", date: "March 2–4, 2026", place: "Champs-sur-Marne, France", org: "SMAI", link: sources.cjc, desc: "The official congress site lists Danny Mallitasig (UPEC–LAMA) on the organizing committee." },
      { title: "ANAIS Autumn School 2025", role: "Speaker", date: "2025", place: "Universit&eacute; Gustave Eiffel, France", org: "Functional, harmonic analysis and probability axis", link: sources.anais, desc: "The official programme lists the presentation “Prescription de comportements multifractals multivari&eacute;s”." }
    ],
    fr: [
      { title: "Congr&egrave;s des Jeunes Chercheur.e.s en Math&eacute;matiques Appliqu&eacute;es (CJC-MA 2026)", role: "Comit&eacute; d'organisation", date: "2–4 mars 2026", place: "Champs-sur-Marne, France", org: "SMAI", link: sources.cjc, desc: "Le site officiel inclut Danny Mallitasig (UPEC–LAMA) dans le comit&eacute; d'organisation." },
      { title: "&Eacute;cole d'automne d'ANAIS 2025", role: "Orateur", date: "2025", place: "Universit&eacute; Gustave Eiffel, France", org: "Axe Analyse fonctionnelle, harmonique et probabilit&eacute;s", link: sources.anais, desc: "Le programme officiel recense l'expos&eacute; «Prescription de comportements multifractals multivari&eacute;s»." }
    ]
  };
  return text[lang];
}

const translations = {
  es: {
    nav: { about: "Biograf&iacute;a", research: "Investigaci&oacute;n", publications: "Producci&oacute;n cient&iacute;fica", talks: "Charlas", teaching: "Docencia", cv: "Trayectoria", contact: "Contacto", downloadCv: "Curriculum Vitae" },
    hero: { name: "Danny Mallitasig", role: "Doctorando en Matem&aacute;ticas", team: "Analyse harmonique, multifractale et diophantienne", btnDownloadCv: "Ver CV acad&eacute;mico", thesesRecord: "Ficha oficial en Theses.fr", copyEmail: "Copiar correo institucional", emailCopied: "Correo copiado al portapapeles", statusBadge: "Doctorado en curso desde 2024", officeBadge: "Despacho: P2 244 — UPEC" },
    about: { title: "Perfil acad&eacute;mico", subtitle: "Afiliaci&oacute;n, tesis y l&iacute;neas de trabajo", p1: "Danny Mallitasig es doctorando en matem&aacute;ticas en el <strong>LAMA (UMR CNRS 8050)</strong> de la <strong>Universit&eacute; Paris-Est Cr&eacute;teil (UPEC)</strong>.", p2: "La ficha oficial de LAMA indica que pertenece al equipo de <em>Analyse harmonique, multifractale et diophantienne</em> y que su tesis est&aacute; dirigida por St&eacute;phane Seuret y Athanasios Batakis.", p3: "Su trabajo aborda problemas de an&aacute;lisis multifractal, regularidad local y teor&iacute;a geom&eacute;trica de la medida. Esta p&aacute;gina enlaza &uacute;nicamente registros y materiales p&uacute;blicos.", p4: "Tambi&eacute;n aparece en materiales docentes publicados por AMARUN y en registros oficiales de actividades matem&aacute;ticas internacionales.", thesisCardTitle: "Tesis doctoral", thesisTitle: "Prescription de comportements multifractals", thesisTitleTrans: "Registro p&uacute;blico en Theses.fr", thesisDirectors: "Directores: St&eacute;phane Seuret &amp; Athanasios Batakis", thesesUrlLabel: "Abrir registro en Theses.fr", quickFactsTitle: "Datos p&uacute;blicos", facts: [{ label: "Instituci&oacute;n", val: "UPEC" }, { label: "Laboratorio", val: "LAMA — UMR CNRS 8050" }, { label: "Equipo", val: "Analyse harmonique, multifractale et diophantienne" }, { label: "Despacho", val: "P2 244" }, { label: "Correo", val: "danny.mallitasig@u-pec.fr" }] },
    research: { title: "L&iacute;neas de investigaci&oacute;n", subtitle: "An&aacute;lisis, regularidad y geometr&iacute;a fractal", intro: "La descripci&oacute;n resume las &aacute;reas que aparecen en la ficha de LAMA y en el programa de ANAIS 2025." },
    publications: { title: "Publicaciones", subtitle: "Trabajos declarados en el CV", filterAll: "Todos", filterPreprints: "Preprints", filterThesis: "Tesis", filterPedagogy: "Docencia", copyBibtex: "Copiar BibTeX", viewThesesFr: "Abrir fuente oficial", viewAmarunRecord: "Abrir en AMARUN", abstract: "Descripci&oacute;n" },
    talks: { title: "Charlas y actividades", subtitle: "Participaciones con programa o p&aacute;gina oficial", verifiedBadge: "Fuente p&uacute;blica" },
    teaching: { title: "Docencia y divulgaci&oacute;n", subtitle: "Materiales y actividades verificables", universityTitle: "Docencia universitaria", outreachTitle: "AMARUN y olimpiadas", courses: [{ name: "Materiales de teor&iacute;a geom&eacute;trica de la medida", institution: "AMARUN", period: "2025", desc: "Lecciones publicadas en la Comisi&oacute;n de Pedagog&iacute;a de AMARUN." }], outreach: [{ name: "European Girls' Mathematical Olympiad (EGMO 2026)", role: "Gu&iacute;a de Eslovenia", link: sources.egmo, desc: "La p&aacute;gina oficial de EGMO 2026 registra a Danny Mallitasig como gu&iacute;a de la delegaci&oacute;n de Eslovenia." }] },
    cvSection: { title: "Trayectoria acad&eacute;mica", subtitle: "Hitos respaldados por fuentes p&uacute;blicas", downloadPrompt: "Consulta el CV acad&eacute;mico:", timeline: [{ year: "Desde 2024", title: "Doctorado en Matem&aacute;ticas", institution: "UPEC — LAMA (UMR CNRS 8050)", detail: "Tesis: Prescription de comportements multifractals. Direcci&oacute;n: St&eacute;phane Seuret y Athanasios Batakis." }, { year: "2024", title: "Master 2", institution: "Universit&eacute; Gustave Eiffel", detail: "Memoria: Prescription of multifractal behavior of functions and measures. Registro p&uacute;blico en AMARUN." }, { year: "2025", title: "Material docente AMARUN", institution: "Comisi&oacute;n de Pedagog&iacute;a", detail: "Lecciones de teor&iacute;a geom&eacute;trica de la medida con enlace p&uacute;blico." }] },
    contact: { title: "Contacto institucional", subtitle: "Datos de contacto publicados por LAMA", officeTitle: "Despacho en LAMA / UPEC", officeDesc: "Bureau P2 244\nLaboratoire d'Analyse et de Math&eacute;matiques Appliqu&eacute;es\nUniversit&eacute; Paris-Est Cr&eacute;teil\n61 avenue du G&eacute;n&eacute;ral de Gaulle\n94010 Cr&eacute;teil Cedex, France", emailLabel: "Correo institucional", emailOfficial: "danny.mallitasig@u-pec.fr", hoursLabel: "Correspondencia", hoursVal: "Se recomienda escribir previamente por correo.", formTitle: "Enviar un mensaje", namePlaceholder: "Nombre y apellidos", emailPlaceholder: "correo@institucion.edu", subjectPlaceholder: "Asunto", msgPlaceholder: "Mensaje", sendBtn: "Preparar correo", successMsg: "Borrador preparado en tu cliente de correo.", verifiedProfiles: "Fuentes oficiales" },
    footer: { copyright: "Danny Mallitasig — Doctorando, LAMA / UPEC.", affiliations: "UPEC · LAMA · AMARUN", note: "Contenido revisado contra fuentes p&uacute;blicas enlazadas." }
  },
  en: {
    nav: { about: "Biography", research: "Research", publications: "Scientific work", talks: "Talks", teaching: "Teaching", cv: "Background", contact: "Contact", downloadCv: "Academic CV" },
    hero: { name: "Danny Mallitasig", role: "PhD student in Mathematics", team: "Harmonic, multifractal and Diophantine analysis", btnDownloadCv: "View academic CV", thesesRecord: "Official Theses.fr record", copyEmail: "Copy institutional email", emailCopied: "Email copied to clipboard", statusBadge: "PhD in progress since 2024", officeBadge: "Office: P2 244 — UPEC" },
    about: { title: "Academic profile", subtitle: "Affiliation, thesis and research areas", p1: "My name is Danny Mallitasig. I hold a degree in Mathematics from the Escuela Polit&eacute;cnica Nacional (Ecuador). I was awarded the Labez B&eacute;zout Scholarship to pursue my Master 2 at Universit&eacute; Gustave Eiffel. I am currently a PhD student at Paris-Est Cr&eacute;teil University, working within the <a href='https://lama-umr8050.fr/' target='_blank' rel='noopener noreferrer'>LAMA</a> laboratory, and a recipient of the MathPhDInFrance (Marie Sklodowska-Curie) fellowship awarded by the Fondation Sciences Math&eacute;matiques de Paris (FSMP).", p2: "My research interests lie in multifractal and harmonic analysis. My doctoral research focuses on prescribing multivariate multifractal behaviour, under the supervision of <a href='https://sites.math.u-pem.fr/sseuret/' target='_blank' rel='noopener noreferrer'>St&eacute;phane Seuret</a> and <a href='https://www.idpoisson.fr/batakis/' target='_blank' rel='noopener noreferrer'>Athanasios Batakis</a>.", p3: "I am a member of the research group &quot;Grupo de An&aacute;lisis y Ecuaciones en Derivadas Parciales (<a href='https://amarun.org/index.php/actividades/grupos-de-investigacion/35-actividades/grupos-de-investigacion/ganedp/169-ganedp-2' target='_blank' rel='noopener noreferrer'>GANEDP</a>)&quot;.", p4: "", thesisCardTitle: "Doctoral thesis", thesisTitle: "Prescription de comportements multifractals", thesisTitleTrans: "Public record at Theses.fr", thesisDirectors: "Supervisors: St&eacute;phane Seuret &amp; Athanasios Batakis", thesesUrlLabel: "Open Theses.fr record", quickFactsTitle: "Public facts", facts: [{ label: "Institution", val: "UPEC" }, { label: "Laboratory", val: "LAMA — UMR CNRS 8050" }, { label: "Team", val: "Harmonic, multifractal and Diophantine analysis" }, { label: "Office", val: "P2 244" }, { label: "Email", val: "danny.mallitasig@u-pec.fr" }] },
    research: { title: "Research areas", subtitle: "Analysis, regularity and fractal geometry", intro: "This summary reflects the areas named in the LAMA profile and the ANAIS 2025 programme." },
    publications: { title: "Publications", subtitle: "Works listed in the CV", filterAll: "All", filterPreprints: "Preprints", filterThesis: "Theses", filterPedagogy: "Teaching", copyBibtex: "Copy BibTeX", viewThesesFr: "Open official source", viewAmarunRecord: "Open on AMARUN", abstract: "Description" },
    talks: { title: "Talks and activities", subtitle: "Participation with an official programme or page", verifiedBadge: "Public source" },
    teaching: { title: "Teaching and outreach activities", subtitle: "Verifiable materials and activities", universityTitle: "University teaching", outreachTitle: "AMARUN and olympiads", courses: [{ name: "Geometric measure theory materials", institution: "AMARUN", period: "2025", desc: "Lessons published by the AMARUN Pedagogical Committee." }], outreach: [{ name: "European Girls' Mathematical Olympiad (EGMO 2026)", role: "Guide for Slovenia", link: sources.egmo, desc: "The official EGMO 2026 page lists Danny Mallitasig as a guide for the Slovenian delegation." }] },
    cvSection: { title: "Academic background", subtitle: "Milestones supported by public sources", downloadPrompt: "View the academic CV:", timeline: [{ year: "Since 2024", title: "PhD in Mathematics", institution: "UPEC — LAMA (UMR CNRS 8050)", detail: "Thesis: Prescription de comportements multifractals. Supervisors: St&eacute;phane Seuret and Athanasios Batakis." }, { year: "2024", title: "Master 2", institution: "Universit&eacute; Gustave Eiffel", detail: "Thesis: Prescription of multifractal behavior of functions and measures. Public AMARUN record." }, { year: "2025", title: "AMARUN teaching material", institution: "Pedagogical Committee", detail: "Lessons on geometric measure theory with a public link." }] },
    contact: { title: "Institutional contact", subtitle: "Contact details published by LAMA", officeTitle: "LAMA / UPEC office", officeDesc: "Office P2 244\nLaboratoire d'Analyse et de Math&eacute;matiques Appliqu&eacute;es\nUniversit&eacute; Paris-Est Cr&eacute;teil\n61 avenue du G&eacute;n&eacute;ral de Gaulle\n94010 Cr&eacute;teil Cedex, France", emailLabel: "Institutional email", emailOfficial: "danny.mallitasig@u-pec.fr", hoursLabel: "Correspondence", hoursVal: "Please write by email in advance.", formTitle: "Send a message", namePlaceholder: "Full name", emailPlaceholder: "email@institution.edu", subjectPlaceholder: "Subject", msgPlaceholder: "Message", sendBtn: "Prepare email", successMsg: "Draft prepared in your email client.", verifiedProfiles: "Official sources" },
    footer: { copyright: "Danny Mallitasig — PhD student, LAMA / UPEC.", affiliations: "UPEC · LAMA · AMARUN", note: "Content checked against the linked public sources." }
  },
  fr: {
    nav: { about: "Profil", research: "Recherche", publications: "Travaux", talks: "Expos&eacute;s", teaching: "Enseignement", cv: "Parcours", contact: "Contact", downloadCv: "CV acad&eacute;mique" },
    hero: { name: "Danny Mallitasig", role: "Doctorant en math&eacute;matiques", team: "Analyse harmonique, multifractale et diophantienne", btnDownloadCv: "Voir le CV acad&eacute;mique", thesesRecord: "Notice officielle Theses.fr", copyEmail: "Copier le courriel institutionnel", emailCopied: "Courriel copi&eacute;", statusBadge: "Doctorat en pr&eacute;paration depuis 2024", officeBadge: "Bureau : P2 244 — UPEC" },
    about: { title: "Profil acad&eacute;mique", subtitle: "Affiliation, th&egrave;se et domaines de recherche", p1: "Danny Mallitasig est doctorant en math&eacute;matiques au <strong>LAMA (UMR CNRS 8050)</strong>, &agrave; l'<strong>Universit&eacute; Paris-Est Cr&eacute;teil (UPEC)</strong>.", p2: "La fiche officielle du LAMA le rattache &agrave; l'&eacute;quipe Analyse harmonique, multifractale et diophantienne et indique St&eacute;phane Seuret et Athanasios Batakis comme directeurs.", p3: "Ses travaux concernent l'analyse multifractale, la r&eacute;gularit&eacute; locale et la th&eacute;orie g&eacute;om&eacute;trique de la mesure. Cette page ne renvoie qu'&agrave; des sources publiques.", p4: "Il appara&icirc;t &eacute;galement dans des documents p&eacute;dagogiques publi&eacute;s par AMARUN et dans des programmes officiels.", thesisCardTitle: "Th&egrave;se de doctorat", thesisTitle: "Prescription de comportements multifractals", thesisTitleTrans: "Notice publique sur Theses.fr", thesisDirectors: "Directeurs : St&eacute;phane Seuret &amp; Athanasios Batakis", thesesUrlLabel: "Ouvrir la notice Theses.fr", quickFactsTitle: "Informations publiques", facts: [{ label: "Institution", val: "UPEC" }, { label: "Laboratoire", val: "LAMA — UMR CNRS 8050" }, { label: "&Eacute;quipe", val: "Analyse harmonique, multifractale et diophantienne" }, { label: "Bureau", val: "P2 244" }, { label: "Courriel", val: "danny.mallitasig@u-pec.fr" }] },
    research: { title: "Domaines de recherche", subtitle: "Analyse, r&eacute;gularit&eacute; et g&eacute;om&eacute;trie fractale", intro: "Ce r&eacute;sum&eacute; reprend les domaines mentionn&eacute;s par le LAMA et dans le programme ANAIS 2025." },
    publications: { title: "Publications", subtitle: "Travaux indiqu&eacute;s dans le CV", filterAll: "Tous", filterPreprints: "Pr&eacute;publications", filterThesis: "Th&egrave;ses", filterPedagogy: "P&eacute;dagogie", copyBibtex: "Copier BibTeX", viewThesesFr: "Ouvrir la source officielle", viewAmarunRecord: "Ouvrir sur AMARUN", abstract: "Description" },
    talks: { title: "Expos&eacute;s et activit&eacute;s", subtitle: "Participations avec programme ou page officielle", verifiedBadge: "Source publique" },
    teaching: { title: "Enseignement et m&eacute;diation", subtitle: "Documents et activit&eacute;s v&eacute;rifiables", universityTitle: "Enseignement universitaire", outreachTitle: "AMARUN et olympiades", courses: [{ name: "Documents de th&eacute;orie g&eacute;om&eacute;trique de la mesure", institution: "AMARUN", period: "2025", desc: "Le&ccedil;ons publi&eacute;es par la Commission de P&eacute;dagogie d'AMARUN." }], outreach: [{ name: "European Girls' Mathematical Olympiad (EGMO 2026)", role: "Guide de la Slov&eacute;nie", link: sources.egmo, desc: "La page officielle d'EGMO 2026 indique Danny Mallitasig comme guide de la d&eacute;l&eacute;gation slov&egrave;ne." }] },
    cvSection: { title: "Parcours acad&eacute;mique", subtitle: "Rep&egrave;res soutenus par des sources publiques", downloadPrompt: "Consultez le CV acad&eacute;mique :", timeline: [{ year: "Depuis 2024", title: "Doctorat en math&eacute;matiques", institution: "UPEC — LAMA (UMR CNRS 8050)", detail: "Th&egrave;se : Prescription de comportements multifractals. Directeurs : St&eacute;phane Seuret et Athanasios Batakis." }, { year: "2024", title: "Master 2", institution: "Universit&eacute; Gustave Eiffel", detail: "M&eacute;moire : Prescription of multifractal behavior of functions and measures. Notice publique AMARUN." }, { year: "2025", title: "Document p&eacute;dagogique AMARUN", institution: "Commission de P&eacute;dagogie", detail: "Le&ccedil;ons de th&eacute;orie g&eacute;om&eacute;trique de la mesure avec lien public." }] },
    contact: { title: "Contact institutionnel", subtitle: "Coordonn&eacute;es publi&eacute;es par le LAMA", officeTitle: "Bureau au LAMA / UPEC", officeDesc: "Bureau P2 244\nLaboratoire d'Analyse et de Math&eacute;matiques Appliqu&eacute;es\nUniversit&eacute; Paris-Est Cr&eacute;teil\n61 avenue du G&eacute;n&eacute;ral de Gaulle\n94010 Cr&eacute;teil Cedex, France", emailLabel: "Courriel institutionnel", emailOfficial: "danny.mallitasig@u-pec.fr", hoursLabel: "Correspondance", hoursVal: "Merci d'&eacute;crire au pr&eacute;alable par courriel.", formTitle: "Envoyer un message", namePlaceholder: "Nom et pr&eacute;nom", emailPlaceholder: "courriel@institution.fr", subjectPlaceholder: "Objet", msgPlaceholder: "Message", sendBtn: "Pr&eacute;parer le courriel", successMsg: "Brouillon pr&eacute;par&eacute; dans votre messagerie.", verifiedProfiles: "Sources officielles" },
    footer: { copyright: "Danny Mallitasig — Doctorant, LAMA / UPEC.", affiliations: "UPEC · LAMA · AMARUN", note: "Contenu v&eacute;rifi&eacute; au regard des sources publiques li&eacute;es." }
  }
};

function cvPublicationItems(lang) {
  return [
    { id: "pub-bivariate-2025", type: "preprint", title: "Prescription of bivariate multifractal spectrum", authors: "S. Seuret, D. Mallitasig", venue: "Proceedings of the conference IWW25", year: "2025", citation: "S. Seuret, D. Mallitasig. Prescription of bivariate multifractal spectrum. Proceedings of the conference IWW25, 2025.", officialUrl: "https://sites.math.u-pem.fr/sseuret/publications/Prescription-bivariate.pdf", awardNote: { label: "This paper was awarded with the", linkText: "Best paper award of IWW25", url: "https://iww.itu.edu.tr/" }, bibtex: "@inproceedings{seuret2025bivariate,\n  title={Prescription of bivariate multifractal spectrum},\n  author={Seuret, S. and Mallitasig, D.},\n  booktitle={Proceedings of the conference IWW25},\n  year={2025}\n}" },
    { id: "pub-multivariate-2026", type: "preprint", title: "Prescription of Multivariate Multifractal Behavior", authors: "D. Mallitasig", venue: "Preprint", year: "2026", citation: "D. Mallitasig. Prescription of Multivariate Multifractal Behavior [Preprint]. 2026.", officialUrl: "https://hal.science/hal-05585092v1/document", bibtex: "@article{mallitasig2026multivariate,\n  title={Prescription of Multivariate Multifractal Behavior},\n  author={Mallitasig, D.},\n  year={2026},\n  note={Preprint}\n}" }
  ];
}

function cvTalkItems(lang) {
  const speaker = lang === "es" ? "Ponente invitado" : lang === "en" ? "Invited speaker" : "Orateur invit&eacute;";
  const speakerPlain = lang === "es" ? "Ponente" : lang === "en" ? "Speaker" : "Orateur";
  const poster = lang === "es" ? "Presentaci&oacute;n de p&oacute;ster" : lang === "en" ? "Poster presentation" : "Pr&eacute;sentation d'affiche";
  const participant = lang === "es" ? "Participaci&oacute;n" : lang === "en" ? "Participation" : "Participation";
  return [
    { title: "SLAM Workshop 2026", role: speaker, date: "2026", place: "Li&egrave;ge, B&eacute;lgica", org: "SLAM", link: "https://sites.google.com/view/scamliege" },
    { title: "VI International Conference on Analysis and Partial Differential Equations", role: speaker, date: "2026", place: "Online", org: "International conference", desc: "Participaci&oacute;n registrada en el CV como ponencia invitada." },
    { title: "BME Fractal Geometry Seminar", role: speakerPlain, date: "2026", place: "Budapest, Hungr&iacute;a", org: "BME", link: "https://bmefractalseminar.pages.dev/", desc: "Seminario registrado en el CV como ponencia." },
    { title: "International Summer School on Geometric Measure Theory and Related Fields", role: speaker, date: "2026", place: "Hangzhou, China", org: "International Summer School", link: "http://sflmen.h3i.buaa.edu.cn/info/1005/1146.htm", desc: "Escuela internacional registrada en el CV como ponencia invitada." },
    { title: "Fractals and Related Fields V", role: speakerPlain, date: "2026", place: "Isla de Porquerolles, Francia", org: "Conference", link: "https://farf5.math.cnrs.fr/", desc: "Participaci&oacute;n registrada en el CV como ponencia." },
    { title: "Journ&eacute;e des Jeunes de l'IDP", role: poster, date: "2026", place: "Orl&eacute;ans, Francia", org: "Institut Denis Poisson", desc: "Participaci&oacute;n registrada en el CV con presentaci&oacute;n de p&oacute;ster." },
    { title: "Ergodic theory, fractal geometry and Diophantine approximation", role: poster, date: "2026", place: "Varsovia, Polonia", org: "Conference", link: "https://sites.google.com/impan.pl/simons-cfd2026/home-page", desc: "Participaci&oacute;n registrada en el CV con presentaci&oacute;n de p&oacute;ster." },
    { title: "XII Conferencia de Matem&aacute;ticos Ecuatorianos en Par&iacute;s", role: speaker, date: "2026", place: "Par&iacute;s, Francia", org: "Conferencia de Matem&aacute;ticos Ecuatorianos", desc: "Participaci&oacute;n registrada en el CV como ponencia invitada." },
    { title: "PhD students' seminar at Sorbonne University", role: speaker, date: "2026", place: "Par&iacute;s, Francia", org: "Sorbonne University", desc: "Seminario de doctorandos registrado en el CV como ponencia invitada." },
    { title: "Premi&egrave;res journ&eacute;es de l'axe Analyse Fonctionnelle, Harmonique et Probabilit&eacute;s — &Eacute;cole d'automne d'ANAIS", role: speakerPlain, date: "2025", place: "Vannes, Francia", org: "ANAIS", link: sources.anais, desc: "Presentaci&oacute;n registrada en el programa oficial y en el CV." },
    { title: "VII Jornadas Ecuatorianas de Matem&aacute;tica", role: speaker, date: "2025", place: "Online", org: "Jornadas Ecuatorianas de Matem&aacute;tica", desc: "Participaci&oacute;n registrada en el CV como ponencia invitada." },
    { title: "PhD students' seminar at Paris-Est Cr&eacute;teil University", role: speaker, date: "2025", place: "Cr&eacute;teil, Francia", org: "Universit&eacute; Paris-Est Cr&eacute;teil", desc: "Seminario de doctorandos registrado en el CV como ponencia invitada." },
    { title: "Diophantine approximation and related fields", role: participant, date: "2025", place: "York, Reino Unido", org: "Conference", desc: "Participaci&oacute;n registrada en el CV." },
    { title: "Summer school in Geometric Measure Theory", role: participant, date: "2025", place: "Hangzhou, China", org: "Summer school", desc: "Participaci&oacute;n registrada en el CV." },
    { title: "Deuxi&egrave;mes Journ&eacute;es de l'axe Analyse Multifractale et Applications", role: participant, date: "2025", place: "Agay, Francia", org: "Research meeting", desc: "Participaci&oacute;n registrada en el CV." },
    { title: "Journ&eacute;es Parisiennes d'Analyse G&eacute;om&eacute;trique", role: participant, date: "2025", place: "Par&iacute;s, Francia", org: "Research meeting", desc: "Participaci&oacute;n registrada en el CV." },
    { title: "Premi&egrave;res Rencontres d'ANAIS", role: participant, date: "2024", place: "Par&iacute;s, Francia", org: "ANAIS", desc: "Participaci&oacute;n registrada en el CV." },
    { title: "S&eacute;minaire Cristollien d'Analyse Multifractale", role: participant, date: "Cada seis semanas", place: "Par&iacute;s, Francia", org: "Seminario", desc: "Participaci&oacute;n peri&oacute;dica indicada en el CV." },
    { title: "S&eacute;minaire COOL", role: participant, date: "Mensual", place: "Par&iacute;s, Francia", org: "Seminario", desc: "Participaci&oacute;n mensual indicada en el CV." }
  ];
}

function cvTeachingItems(lang) {
  const labels = lang === "es" ? { present: "Presente", course: "Curso", committee: "Comit&eacute; cient&iacute;fico", vice: "Vicepresidencia de divulgaci&oacute;n" } : lang === "en" ? { present: "Present", course: "Course", committee: "Scientific committee member", vice: "Vice President of Outreach" } : { present: "Pr&eacute;sent", course: "Cours", committee: "Comit&eacute; scientifique", vice: "Vice-pr&eacute;sidence de la m&eacute;diation" };
  return {
    courses: [
      { name: "Calculus 2", institution: (lang === "en" ? "Licence L1 · " : "L1 · ") + "Universit&eacute; Paris-Est Cr&eacute;teil", period: "2026", desc: labels.course + " de calcul pour &eacute;tudiants de L1." },
      { name: lang === "en" ? "Calculus in several variables and linear algebra" : "Analyse vectorielle et alg&egrave;bre lin&eacute;aire", institution: (lang === "en" ? "Licence L2 · " : "L2 · ") + "Universit&eacute; Paris-Est Cr&eacute;teil", period: "2025", desc: lang === "en" ? "L2 teaching in calculus in several variables and linear algebra." : "Enseignement de niveau L2 en analyse vectorielle et alg&egrave;bre lin&eacute;aire." },
      { name: "Calculus 2", institution: (lang === "en" ? "Licence L1 · " : "L1 · ") + "Universit&eacute; Paris-Est Cr&eacute;teil", period: "2025", desc: labels.course + " de calcul pour &eacute;tudiants de L1." },
      { name: "Introduction to Multifractal analysis", institution: (lang === "en" ? "Master · " : "M2 · ") + "Summer School AMARUN", period: "2025", desc: lang === "en" ? "Introduction to Multifractal analysis for Master students." : "Introduction &agrave; l'analyse multifractale pour &eacute;tudiants de Master 2." }
    ],
    outreach: [
      { name: "Congr&egrave;s des Jeunes Chercheur.e.s en Math&eacute;matiques Appliqu&eacute;es (CJC-MA)", role: labels.committee, link: sources.cjc, desc: "Le CV indique la participation au comit&eacute; scientifique en 2026." },
      { name: "Association of Mathematics and Applied Mathematics Students of the Escuela Polit&eacute;cnica Nacional", role: labels.vice, desc: "Vicepresidencia de divulgaci&oacute;n durante 2022–2023 en la Escuela Polit&eacute;cnica Nacional." }
    ]
  };
}

const interfaceTranslations = {
  es: {
    meta: { title: "Danny Mallitasig — Investigador Doctoral en Matemáticas | LAMA, UPEC & AMARUN" },
    ui: { themeToggle: "Cambiar tema", menu: "Menú", officialSite: "Sitio oficial", website: "Sitio web", bibtexTitle: "Cita en formato BibTeX", close: "Cerrar", copyBibtex: "Copiar BibTeX", toastCopied: "Mensaje copiado", bibtexCopied: "Cita BibTeX copiada al portapapeles", emailCopied: "Correo copiado al portapapeles", copyEmailTitle: "Copiar correo" },
    hero: { labLabel: "Laboratorio:", teamLabel: "Equipo:", institutionLabel: "Institución:", team: "Équipe Analyse Harmonique, Multifractale et Diophantienne (AHMD)" },
    publications: { badges: { thesis: "Tesis académica", preprint: "Preprint / investigación", pedagogy: "Monografía docente AMARUN" }, viewOfficial: "Ver enlace oficial" },
    contact: { nameLabel: "Nombre", emailFieldLabel: "Correo electrónico", subjectLabel: "Asunto", messageLabel: "Mensaje", defaultSubject: "Contacto académico", mailFrom: "De", draftFallback: "Borrador preparado en tu cliente de correo" },
    footer: { backToTop: "Subir al inicio" }
  },
  en: {
    meta: { title: "Danny Mallitasig — PhD student in Mathematics | LAMA, UPEC & AMARUN" },
    ui: { themeToggle: "Toggle theme", menu: "Menu", officialSite: "Official website", website: "Website", bibtexTitle: "BibTeX citation", close: "Close", copyBibtex: "Copy BibTeX", toastCopied: "Copied", bibtexCopied: "BibTeX citation copied to clipboard", emailCopied: "Email copied to clipboard", copyEmailTitle: "Copy email" },
    hero: { labLabel: "Laboratory:", teamLabel: "Research group:", institutionLabel: "Institution:", team: "Équipe Analyse Harmonique, Multifractale et Diophantienne (AHMD)" },
    publications: { badges: { thesis: "Academic thesis", preprint: "Preprint / research", pedagogy: "AMARUN teaching monograph" }, viewOfficial: "View official link" },
    teaching: { universityTitle: "Teaching", outreachTitle: "Outreach activities" },
    contact: { nameLabel: "Name", emailFieldLabel: "Email", subjectLabel: "Subject", messageLabel: "Message", defaultSubject: "Academic enquiry", mailFrom: "From", draftFallback: "Draft prepared in your email client" },
    footer: { backToTop: "Back to top" }
  },
  fr: {
    meta: { title: "Danny Mallitasig — Doctorant en mathématiques | LAMA, UPEC & AMARUN" },
    ui: { themeToggle: "Changer de thème", menu: "Menu", officialSite: "Site officiel", website: "Site web", bibtexTitle: "Citation BibTeX", close: "Fermer", copyBibtex: "Copier BibTeX", toastCopied: "Message copié", bibtexCopied: "Citation BibTeX copiée dans le presse-papiers", emailCopied: "Courriel copié", copyEmailTitle: "Copier le courriel" },
    hero: { labLabel: "Laboratoire :", teamLabel: "Équipe :", institutionLabel: "Institution :", team: "Équipe Analyse Harmonique, Multifractale et Diophantienne (AHMD)" },
    publications: { badges: { thesis: "Thèse académique", preprint: "Prépublication / recherche", pedagogy: "Monographie pédagogique AMARUN" }, viewOfficial: "Voir le lien officiel" },
    contact: { nameLabel: "Nom", emailFieldLabel: "Courriel", subjectLabel: "Objet", messageLabel: "Message", defaultSubject: "Contact académique", mailFrom: "De", draftFallback: "Brouillon préparé dans votre messagerie" },
    footer: { backToTop: "Retour en haut" }
  }
};

Object.keys(interfaceTranslations).forEach(lang => {
  Object.keys(interfaceTranslations[lang]).forEach(section => {
    translations[lang][section] = { ...(translations[lang][section] || {}), ...interfaceTranslations[lang][section] };
  });
});

Object.keys(translations).forEach(lang => {
  translations[lang].research.areas = commonResearch[lang];
  translations[lang].publications.items = cvPublicationItems(lang);
  translations[lang].talks.items = cvTalkItems(lang);
  translations[lang].teaching = { ...translations[lang].teaching, ...cvTeachingItems(lang) };
});
