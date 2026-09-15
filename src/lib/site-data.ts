export const CONTACT = {
  name: "Iulian Gabriel Panainte",
  role: "Auditor Energetic Gradul I",
  phoneDisplay: "0773.932.496",
  phoneHref: "tel:+40773932496",
  whatsapp: "https://wa.me/40773932496",
  email: "Panainte.iuliangabriel@yahoo.com",
  city: "Galați",
  program: "Luni – Vineri: 08:00 – 19:00 · Sâmbătă: 09:00 – 14:00",
};

export type Service = {
  slug: string;
  title: string;
  short: string;
  description: string;
  includes: string[];
  duration: string;
  documents: string[];
  audience: string;
};

export const SERVICES: Service[] = [
  {
    slug: "certificat-energetic",
    title: "Certificat de performanță energetică",
    short:
      "Pentru locuințe, blocuri, spații comerciale și clădiri publice. Obligatoriu la vânzare sau închiriere.",
    description:
      "Certificatul de performanță energetică (CPE) este documentul care încadrează clădirea într-o clasă energetică de la A la G și este obligatoriu la vânzare, închiriere sau recepția unei construcții noi, conform Legii 372/2005 privind performanța energetică a clădirilor.",
    includes: [
      "Vizită la fața locului și măsurători reale ale spațiului",
      "Analiza anvelopei clădirii și a instalațiilor (încălzire, apă caldă, ventilare)",
      "Calculul consumului specific de energie și al indicelui de emisii CO₂",
      "Emiterea certificatului cu ștampilă și semnătură, valabil 10 ani",
    ],
    duration: "1 – 3 zile lucrătoare de la vizita la fața locului",
    documents: [
      "Act de proprietate (contract vânzare-cumpărare / extras CF)",
      "Releveu sau schiță cu suprafețele (dacă există)",
      "Copie act de identitate proprietar",
      "Detalii despre eventuale lucrări de reabilitare (termosistem, tâmplărie, centrală)",
    ],
    audience: "Proprietari persoane fizice, agenții imobiliare, firme",
  },
  {
    slug: "audit-energetic-cladiri",
    title: "Audit energetic pentru clădiri",
    short:
      "Analiza detaliată a consumurilor și soluții de reabilitare, necesar pentru programe de finanțare.",
    description:
      "Auditul energetic merge mult mai departe decât certificatul: identifică pierderile de energie, cuantifică economiile și propune pachete de măsuri de reabilitare cu perioadă de amortizare calculată. Este documentul cerut în programele de renovare energetică și la accesarea finanțărilor.",
    includes: [
      "Expertiză termică a anvelopei și a instalațiilor",
      "Analiza facturilor și a consumurilor istorice",
      "Pachete de soluții de reabilitare cu economii estimate și amortizare",
      "Raport de audit + certificat energetic aferent",
    ],
    duration: "5 – 10 zile lucrătoare, în funcție de complexitate",
    documents: [
      "Documentație tehnică / planuri arhitectură (dacă există)",
      "Facturi de energie pe ultimele 12–36 de luni",
      "Act de proprietate",
      "Informații despre instalațiile termice existente",
    ],
    audience: "Proprietari, asociații, firme, instituții publice",
  },
  {
    slug: "audit-energetic-industrial",
    title: "Audit energetic industrial",
    short:
      "Evaluarea consumurilor pentru hale, fabrici și spații de producție, cu plan de eficientizare.",
    description:
      "Auditul energetic industrial analizează întregul bilanț energetic al unui obiectiv de producție: procese tehnologice, utilități, aer comprimat, iluminat, motoare electrice, agent termic. Rezultatul este un plan concret de reducere a costurilor cu energia și de conformare la cerințele legale pentru marii consumatori.",
    includes: [
      "Bilanț energetic pe procese și utilități",
      "Măsurători la fața locului și analiza profilului de consum",
      "Identificarea pierderilor și a punctelor critice",
      "Plan de măsuri prioritizate, cu investiție și economie estimată",
    ],
    duration: "2 – 6 săptămâni, în funcție de dimensiunea obiectivului",
    documents: [
      "Facturi de energie electrică, gaz, agent termic (24–36 luni)",
      "Schema fluxului tehnologic și lista echipamentelor majore",
      "Program de lucru și date de producție",
      "Planuri ale halelor / spațiilor tehnice",
    ],
    audience: "Fabrici, hale de producție, depozite, investitori industriali",
  },
  {
    slug: "consultanta-nzeb",
    title: "Consultanță clădiri NZEB",
    short:
      "Studii și verificări pentru clădiri noi sau renovări majore care trebuie să atingă standardul nZEB.",
    description:
      "Toate clădirile noi trebuie să respecte standardul NZEB (Nearly Zero Energy Building) — consum de energie aproape egal cu zero, acoperit în proporție semnificativă din surse regenerabile. Ofer consultanță de la faza de proiect până la documentația finală, astfel încât clădirea să îndeplinească efectiv cerințele.",
    includes: [
      "Analiza soluțiilor de anvelopă și instalații încă din faza de proiect",
      "Studiu de îndeplinire a cerințelor NZEB",
      "Calculul aportului de energie din surse regenerabile",
      "Documentație pentru autorizare și recepție",
    ],
    duration: "7 – 15 zile lucrătoare",
    documents: [
      "Proiect de arhitectură și instalații (faza DTAC/PT)",
      "Detalii de anvelopă și tâmplărie",
      "Soluțiile propuse pentru încălzire, răcire, ventilare, apă caldă",
    ],
    audience: "Dezvoltatori, proiectanți, beneficiari construcții noi",
  },
  {
    slug: "consultanta-ser",
    title: "Consultanță SER — surse regenerabile",
    short:
      "Fotovoltaice, pompe de căldură și integrarea lor corectă în bilanțul energetic al clădirii.",
    description:
      "Un sistem regenerabil dimensionat greșit costă mai mult decât economisește. Analizez consumul real al clădirii și dimensionez soluția potrivită — panouri fotovoltaice, pompe de căldură, solar termic — apoi o integrez în bilanțul energetic și în documentația de certificare.",
    includes: [
      "Analiza consumului real și a profilului de utilizare",
      "Dimensionarea sistemului fotovoltaic / pompă de căldură",
      "Estimarea producției anuale și a economiei realizate",
      "Studiu SER pentru documentația tehnică",
    ],
    duration: "5 – 10 zile lucrătoare",
    documents: [
      "Facturi de energie pe ultimele 12 luni",
      "Suprafața disponibilă pe acoperiș / teren",
      "Detalii despre sistemul de încălzire actual",
    ],
    audience: "Proprietari, firme, asociații de proprietari",
  },
  {
    slug: "audit-asociatii-proprietari",
    title: "Audit energetic pentru asociații de proprietari",
    short:
      "Pachet complet pentru blocuri de locuințe: audit, certificat și documentație pentru reabilitare.",
    description:
      "Pentru asociațiile de proprietari care vor să acceseze programe de reabilitare termică sau doar să reducă facturile comune, realizez auditul energetic al întregului bloc, cu documentația necesară depunerii dosarului la primărie sau la finanțator.",
    includes: [
      "Evaluarea anvelopei blocului și a instalațiilor comune",
      "Analiza consumurilor pe scări / apartamente",
      "Soluții de reabilitare cu economie estimată pentru fiecare proprietar",
      "Documentație completă pentru dosarul de finanțare",
    ],
    duration: "10 – 20 zile lucrătoare, în funcție de numărul de apartamente",
    documents: [
      "Hotărârea adunării generale a asociației",
      "Planuri ale blocului (dacă există la administrație)",
      "Facturi de utilități pe părțile comune",
      "Date de contact ale administratorului",
    ],
    audience: "Asociații de proprietari, administratori de imobile",
  },
];

export const AREAS = [
  {
    name: "Municipiul Galați",
    note: "Toate cartierele: Mazepa, Țiglina I–III, Micro 13–21, Centru, Dunărea, Aurel Vlaicu, Siderurgiștilor, Bădălan.",
    highlight: true,
  },
  {
    name: "Tecuci",
    note: "Deplasare săptămânală programată. Locuințe, spații comerciale și obiective industriale.",
    highlight: true,
  },
  { name: "Târgu Bujor", note: "Locuințe individuale, clădiri publice și spații comerciale." },
  { name: "Berești", note: "Certificate energetice și audituri pentru clădiri rezidențiale." },
  {
    name: "Comunele județului Galați",
    note: "Pechea, Independența, Șendreni, Vânători, Smârdan, Tulucești, Liești, Ivești, Matca, Corod, Cudalbi, Umbrărești și restul localităților.",
  },
];

export const FAQ = [
  {
    q: "Ce este certificatul energetic și cine este obligat să îl aibă?",
    a: "Certificatul de performanță energetică încadrează clădirea într-o clasă de la A la G, în funcție de consumul de energie. Conform Legii 372/2005, este obligatoriu la vânzarea sau închirierea oricărei clădiri sau unități de clădire, precum și la recepția construcțiilor noi. Notarul nu poate autentifica actul de vânzare fără acest document.",
  },
  {
    q: "Care este diferența dintre audit energetic și certificat energetic?",
    a: "Certificatul este o „fișă de identitate” energetică a clădirii — arată cât consumă. Auditul este o analiză tehnică amănunțită care arată de ce consumă atât, unde se pierde energia și ce măsuri concrete de reabilitare merită făcute, cu economii și perioadă de amortizare calculate. Auditul include și emiterea certificatului.",
  },
  {
    q: "Ce înseamnă Gradul I de atestare și de ce contează?",
    a: "Auditorii energetici sunt atestați pe grade și specialități. Gradul I permite întocmirea certificatelor și auditurilor pentru orice tip și mărime de clădire — rezidențială, comercială, publică sau industrială. Un auditor de grad inferior este limitat la anumite categorii de clădiri, ceea ce înseamnă că pentru un bloc, o hală sau o clădire publică veți avea nevoie oricum de un auditor de Gradul I.",
  },
  {
    q: "Ce este un audit energetic industrial?",
    a: "Este evaluarea completă a modului în care o hală, o fabrică sau un spațiu de producție consumă energie: procese tehnologice, aer comprimat, motoare, iluminat, agent termic, ventilare. Rezultatul este un bilanț energetic și un plan de măsuri prioritizate care reduc costurile de producție.",
  },
  {
    q: "Ce este standardul NZEB?",
    a: "NZEB (Nearly Zero Energy Building) înseamnă clădire cu consum de energie aproape egal cu zero. Cerințele privesc atât un nivel foarte redus al necesarului de energie, cât și acoperirea unei părți importante din acesta din surse regenerabile produse local. Toate clădirile noi trebuie să respecte acest standard.",
  },
  {
    q: "Cât costă și cât durează un audit sau un certificat?",
    a: "Un certificat pentru un apartament pornește de la 250 lei și se emite în 1–3 zile lucrătoare de la vizită. Auditurile pentru blocuri sau obiective industriale se ofertează personalizat, în funcție de suprafață și complexitate. Prețul final se comunică înainte de începerea lucrării, fără costuri suplimentare ulterioare.",
  },
  {
    q: "Certificatul este valabil 10 ani — ce se întâmplă la renovări majore?",
    a: "Valabilitatea este de 10 ani de la data emiterii, însă dacă între timp faceți lucrări care schimbă performanța energetică — termoizolație, înlocuirea tâmplăriei, schimbarea sistemului de încălzire, montarea de panouri fotovoltaice — certificatul trebuie refăcut pentru a reflecta situația reală. Practic, orice renovare majoră anulează valabilitatea documentului vechi.",
  },
];

export const TESTIMONIALS = [
  {
    name: "Andreea M.",
    city: "Galați, Mazepa",
    rating: 5,
    text: "Aveam nevoie urgent de certificat energetic pentru vânzarea apartamentului. A venit a doua zi la măsurători și în 48 de ore aveam documentul la notar. Serios și punctual.",
  },
  {
    name: "Cristian D.",
    city: "Tecuci",
    rating: 5,
    text: "Am cerut audit pentru hala de producție. Mi-a explicat pe înțelesul meu unde pierdem bani și ce să schimbăm întâi. Am redus factura de energie cu aproape un sfert.",
  },
  {
    name: "Asociația de proprietari Bl. C4",
    city: "Galați, Țiglina II",
    rating: 5,
    text: "Ne-a făcut auditul pentru dosarul de reabilitare termică. A fost singurul care a venit efectiv la bloc și a măsurat, nu ne-a trimis hârtii pe mail.",
  },
  {
    name: "Mihaela R.",
    city: "Târgu Bujor",
    rating: 5,
    text: "Casă nouă, aveam nevoie de documentația NZEB. Ne-a ajutat încă din faza de proiect și am evitat modificări costisitoare la instalații.",
  },
  {
    name: "SC Vertex Prod SRL",
    city: "Galați",
    rating: 5,
    text: "Colaborare corectă, preț comunicat din start, raport livrat la termen. Recomandăm pentru firme.",
  },
];

export const CASE_STUDIES = [
  {
    title: "Audit energetic — hală de producție, zona industrială Galați",
    context:
      "Hală de 4.200 mp cu producție în trei schimburi, factură anuală de energie în creștere accelerată.",
    actions: [
      "Bilanț energetic pe utilități: aer comprimat, iluminat, ventilare, agent termic",
      "Măsurători pe circuite și analiza profilului orar de consum",
      "Depistarea a 14% pierderi pe rețeaua de aer comprimat",
      "Plan de măsuri în trei etape, prioritizate după amortizare",
    ],
    result:
      "Reducere estimată de 23% a consumului anual, cu amortizarea primei etape de investiție în sub 18 luni.",
  },
  {
    title: "Consultanță NZEB — locuință unifamilială, comuna Vânători",
    context:
      "Casă nouă de 160 mp, beneficiarul dorea conformare NZEB și costuri de întreținere minime.",
    actions: [
      "Optimizarea anvelopei și a punților termice încă din faza de proiect",
      "Dimensionarea pompei de căldură în funcție de necesarul real",
      "Sistem fotovoltaic de 5 kWp integrat în bilanțul energetic",
      "Documentația de îndeplinire a cerințelor NZEB",
    ],
    result: "Clădire încadrată în clasa A, cu un cost anual de utilități sub 1.400 lei.",
  },
];

export const PRICING = [
  { service: "Certificat Energetic Garsonieră", price: "150 lei", delivery: "1–3 zile" },
  { service: "Certificat Energetic Apartament 1 cameră", price: "150 lei", delivery: "1–3 zile" },
  { service: "Certificat Energetic Apartament 2 camere", price: "250 lei", delivery: "1–3 zile" },
  { service: "Certificat Energetic Apartament 3–4 camere", price: "350 lei", delivery: "1–3 zile" },
  { service: "Certificat Energetic Casă < 150 mp", price: "350 lei", delivery: "1–3 zile" },
  { service: "Certificat Energetic Casă > 150 mp", price: "400 lei", delivery: "1–3 zile" },
  {
    service: "Clădiri de birouri, școli, spitale, spații peste 500 mp",
    price: "de la 1,5 euro/mp",
    delivery: "2–7 zile",
  },
  { service: "Audit Energetic Clădiri", price: "De la 4000 lei", delivery: "7–9 zile" },
  { service: "Audit Industrial", price: "De la 4000 lei", delivery: "7–30 zile", note: "Începând de la 7 zile pentru realizarea auditului; pentru urgențe se poate percepe o taxă suplimentară." },
];

export const PROCESS = [
  {
    title: "Contact telefonic sau prin formular",
    desc: "Discutăm despre tipul clădirii, suprafață și termenul de care aveți nevoie. Primiți pe loc o estimare de preț și de durată.",
  },
  {
    title: "Trimiterea actelor necesare",
    desc: "Ne trimiteți pe WhatsApp sau email actul de proprietate și, dacă există, releveul sau planurile clădirii.",
  },
  {
    title: "Vizita la fața locului",
    desc: "Vin personal și fac măsurătorile reale ale spațiului, ale anvelopei și ale instalațiilor. Este un pas obligatoriu în orice lucrare pe care o semnez.",
  },
  {
    title: "Procesare și calcul",
    desc: "Introduc datele în programul de calcul autorizat și analizez consumurile, pierderile și soluțiile posibile.",
  },
  {
    title: "Emiterea documentului",
    desc: "Certificatul sau raportul de audit este emis, semnat și ștampilat, cu înregistrarea aferentă.",
  },
  {
    title: "Predare și recomandări",
    desc: "Primiți documentul în format fizic și electronic, împreună cu recomandări practice de eficientizare, explicate pe înțelesul dumneavoastră.",
  },
];

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  body: { heading: string; paragraphs: string[] }[];
};

export const POSTS: Post[] = [
  {
    slug: "cand-ai-nevoie-de-certificat-energetic-in-galati",
    title: "Când ai nevoie de certificat energetic în Galați",
    excerpt:
      "Vânzare, închiriere, recepția unei case noi sau dosar de finanțare — situațiile concrete în care legea îți cere certificatul energetic.",
    date: "2026-08-18",
    readTime: "5 min",
    body: [
      {
        heading: "Situațiile în care certificatul este obligatoriu",
        paragraphs: [
          "Legea 372/2005 privind performanța energetică a clădirilor prevede clar că certificatul energetic este obligatoriu la vânzarea sau închirierea oricărei clădiri ori unități de clădire. În practică, în Galați cel mai des este cerut de notar, în ziua semnării contractului de vânzare-cumpărare.",
          "A doua situație frecventă este recepția la terminarea lucrărilor pentru o construcție nouă: fără certificat, cartea tehnică a construcției este incompletă și recepția nu se poate finaliza.",
          "A treia situație o reprezintă dosarele de finanțare — programele de reabilitare termică pentru blocuri sau finanțările pentru eficiență energetică cer atât certificatul, cât și auditul energetic.",
        ],
      },
      {
        heading: "Ce se întâmplă dacă nu îl ai",
        paragraphs: [
          "Fără certificat, tranzacția pur și simplu nu se poate perfecta la notar. În plus, legea prevede amenzi pentru proprietarii care închiriază fără a pune la dispoziția chiriașului acest document, iar anunțurile imobiliare ar trebui să menționeze clasa energetică.",
          "Merită spus și că un certificat obținut „din birou”, fără vizită la fața locului, este neconform. Valorile trecute în el nu reflectă clădirea reală, iar documentul poate fi contestat.",
        ],
      },
      {
        heading: "Cât durează și cât costă în Galați",
        paragraphs: [
          "Pentru un apartament obișnuit, procesul durează 1–3 zile lucrătoare de la vizita la fața locului, iar prețul pornește de la 250 lei. Pentru clădiri mari, spații comerciale sau imobile cu instalații complexe, termenul și tariful se stabilesc după o discuție preliminară.",
        ],
      },
    ],
  },
  {
    slug: "ce-este-o-cladire-nzeb",
    title: "Ce este o clădire NZEB și de ce contează",
    excerpt:
      "Standardul de consum aproape zero nu mai este opțional pentru clădirile noi. Iată ce presupune concret și unde se greșește cel mai des.",
    date: "2026-07-29",
    readTime: "6 min",
    body: [
      {
        heading: "Definiția, pe scurt",
        paragraphs: [
          "NZEB vine de la Nearly Zero Energy Building — clădire cu consum de energie aproape egal cu zero. Ideea este simplă: necesarul de energie al clădirii trebuie să fie foarte mic, iar partea rămasă să fie acoperită în bună măsură din surse regenerabile produse la fața locului sau în apropiere.",
          "Practic, vorbim de două condiții care merg împreună: o anvelopă foarte performantă (izolație, tâmplărie, eliminarea punților termice) și un aport semnificativ de energie regenerabilă — de regulă panouri fotovoltaice și pompă de căldură.",
        ],
      },
      {
        heading: "Unde se greșește cel mai des",
        paragraphs: [
          "Cea mai frecventă greșeală este tratarea NZEB ca pe o hârtie obținută la final. Când soluțiile de instalații și de anvelopă sunt alese fără o analiză energetică, ajungi în faza de recepție cu o clădire care nu îndeplinește cerințele și cu modificări scumpe de făcut.",
          "A doua greșeală este supradimensionarea sistemelor regenerabile. Un sistem fotovoltaic mult mai mare decât consumul real nu se amortizează niciodată, iar o pompă de căldură prea puternică funcționează în cicluri scurte și se uzează prematur.",
        ],
      },
      {
        heading: "De ce contează pentru proprietar",
        paragraphs: [
          "Dincolo de obligația legală, o clădire NZEB corect proiectată are costuri de întreținere de câteva ori mai mici și o valoare de piață mai mare. Diferența de cost la construcție se recuperează, în majoritatea cazurilor, în primii ani de utilizare.",
        ],
      },
    ],
  },
  {
    slug: "audit-energetic-industrial-ce-presupune",
    title: "Audit energetic industrial — ce presupune și cui i se adresează",
    excerpt:
      "Pentru hale și fabrici, energia este o linie majoră de cost. Auditul arată exact unde se pierde și ce merită schimbat întâi.",
    date: "2026-07-11",
    readTime: "7 min",
    body: [
      {
        heading: "Cui i se adresează",
        paragraphs: [
          "Auditul energetic industrial este util oricărui obiectiv de producție cu facturi semnificative la energie: hale de fabricație, depozite frigorifice, ateliere, unități de procesare. Pentru marii consumatori de energie, auditul este și o cerință legală, realizată periodic.",
          "În județul Galați, cele mai frecvente solicitări vin din partea halelor de producție și a depozitelor din zonele industriale, unde consumul pe aer comprimat, iluminat și ventilare este adesea subestimat.",
        ],
      },
      {
        heading: "Ce se analizează efectiv",
        paragraphs: [
          "Se pornește de la bilanțul energetic: cât intră, unde se duce și cât se pierde. Se analizează procesele tehnologice, motoarele electrice, rețeaua de aer comprimat, sistemele de iluminat, agentul termic, ventilarea și izolarea halei.",
          "Urmează măsurătorile la fața locului și analiza profilului orar de consum, comparat cu programul de producție. Aici apar, de regulă, surprizele: consum ridicat în afara programului, scurgeri pe aer comprimat, echipamente care merg în gol.",
        ],
      },
      {
        heading: "Rezultatul concret",
        paragraphs: [
          "Raportul de audit conține un plan de măsuri prioritizate, fiecare cu investiție estimată, economie anuală și perioadă de amortizare. Astfel puteți începe cu măsurile care se plătesc singure în câteva luni și abia apoi trece la investițiile mari.",
        ],
      },
    ],
  },
  {
    slug: "integrarea-surselor-regenerabile-in-audit",
    title: "Cum integrezi sursele regenerabile de energie în auditul clădirii tale",
    excerpt:
      "Fotovoltaice, pompe de căldură, solar termic: cum intră ele în bilanțul energetic și cum influențează clasa energetică.",
    date: "2026-06-20",
    readTime: "5 min",
    body: [
      {
        heading: "Regenerabilele nu sunt un accesoriu",
        paragraphs: [
          "În calculul performanței energetice, energia produsă din surse regenerabile se scade din necesarul acoperit din rețea. De aceea o instalație fotovoltaică sau o pompă de căldură poate muta o clădire cu una sau două clase energetice mai sus.",
          "Pentru ca acest efect să fie recunoscut, sistemul trebuie documentat corect: putere instalată, orientare, randament, mod de utilizare a energiei produse.",
        ],
      },
      {
        heading: "Ordinea corectă a investițiilor",
        paragraphs: [
          "Regula practică este simplă: întâi reduci necesarul, apoi îl acoperi din regenerabile. Izolația, tâmplăria și etanșeitatea costă mai puțin și dau efect imediat. Abia după aceea dimensionezi sistemul fotovoltaic sau pompa de căldură pe consumul redus, nu pe cel vechi.",
          "Inversând ordinea, ajungi să plătești pentru un sistem supradimensionat care produce energie într-o clădire care încă pierde căldură prin pereți.",
        ],
      },
      {
        heading: "Ce primiți în studiul SER",
        paragraphs: [
          "Studiul cuprinde analiza consumului real, dimensionarea sistemului, producția anuală estimată, economia în lei și integrarea în bilanțul energetic al clădirii — inclusiv efectul asupra clasei energetice din certificat.",
        ],
      },
    ],
  },
];
