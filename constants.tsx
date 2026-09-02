
import { Service, NavItem, CareerOffer } from './types';

export interface FAQItem {
  question: string;
  answer: string;
}

export const NAV_ITEMS: NavItem[] = [
  { label: 'START', href: '#home' },
  { label: 'ÜBER UNS', href: '#about' },
  { label: 'DIENSTLEISTUNGEN', href: '#services' },
  { label: 'KARRIERE', href: '#careers' },
  { label: 'FAQ', href: '#faq' },
  { label: 'KONTAKT', href: '#contact' },
];
export const EMAIL_TEMPLATES = {
  CONTACT_CONFIRMATION: {
    subject: 'Bestätigung Ihrer Anfrage - KGH Gebäudereinigung Hannover',
    body: (name: string) => `Hallo ${name},\n\nvielen Dank für Ihre Anfrage bei KGH Gebäudereinigung Hannover. Wir haben Ihre Nachricht erhalten und werden uns innerhalb der nächsten 24 Stunden bei Ihnen melden.\n\nBeste Grüße,\nIhr KGH Team`
  },
  CAREER_CONFIRMATION: {
    subject: 'Bestätigung Ihrer Bewerbung - KGH Karriere Hannover',
    body: (name: string, id: string) => `Hallo ${name},\n\nvielen Dank für Ihre Bewerbung. Wir freuen uns über Ihr Interesse an unserem Team.\n\nIhre Tracking-ID lautet: ${id}\n\nBeste Grüße,\nPersonalabteilung | KGH`
  }
};

export const CAREER_OFFERS: CareerOffer[] = [
  {
    id: 1,
    title: 'Reinigungskräfte (m/w/d)',
    type: 'Mini-Job, Teilzeit & Vollzeit',
    location: 'Hannover',
    description: 'Verstärken Sie unser Team in der Gebäudereinigung. Teilen Sie uns Ihre Wünsche mit – wir finden die passende Arbeitszeit und das passende Einsatzgebiet für Sie!',
    tasks: [
      'Reinigung von Bürogebäuden, Treppenhäusern, Sanitärbereichen und weiteren Räumen',
      'Ordnungsgemäße Handhabung von Reinigungsmitteln und Geräten',
      'Sicherstellung eines sauberen und gepflegten Arbeitsumfelds'
    ],
    benefits: [
      'Flexible Arbeitszeiten nach Ihren Wünschen',
      'Mini-Job, Teilzeit oder Vollzeit möglich',
      'Leistungsorientierte Vergütung',
      'Angenehmes Arbeitsumfeld in Hannover'
    ],
    profile: [
      'Erfahrung in der Gebäudereinigung wünschenswert, aber kein Muss',
      'Zuverlässigkeit und Sorgfalt',
      'Freundliches Auftreten'
    ]
  },
  {
    id: 2,
    title: 'Glasreiniger / Vorarbeiter (m/w/d)',
    type: 'Mini-Job & Vollzeit',
    location: 'Hannover',
    description: 'Wenn Sie Glasreinigung lieben und Erfahrung haben, melden Sie sich bei uns! Experten für den klaren Durchblick gesucht.',
    tasks: [
      'Reinigung von Fenstern, Glasflächen und Fassaden',
      'Besichtigungstermine bei Neu- und Bestandskunden zur Angebotserstellung',
      'Unterstützung bei der Planung und Disposition von Glasreinigungsterminen'
    ],
    benefits: [
      'Flexible Einsatzzeiten (auch für Rentner oder Nebenverdienst)',
      'Fachgerechte Einarbeitung',
      'Attraktive Vergütung entsprechend Erfahrung und Qualifikation',
      'Angenehmes Team in Hannover'
    ],
    profile: [
      'Erfahrung in der Glasreinigung',
      'Selbstständige und zuverlässige Arbeitsweise',
      'Freude an sorgfältiger Arbeit'
    ]
  },
  {
    id: 3,
    title: 'Gärtner / Gartenpfleger (m/w/d)',
    type: 'Mini-Job',
    location: 'Hannover',
    description: 'Werden Sie Teil unseres Teams und helfen Sie mit, Hannover sauber and gepflegt zu halten! Ideal for Nebenverdienst oder Rentner.',
    tasks: [
      'Pflege von Grünanlagen, Rasenflächen und Beeten',
      'Rückschnitt von Sträuchern und Bäumen',
      'Unterstützung bei saisonalen Gartenarbeiten'
    ],
    benefits: [
      'Flexible Arbeitszeiten (ideal für nebenbei oder Rentner)',
      'Arbeiten im Freien in Hannover',
      'Faire und attraktive Vergütung für Ihr Engagement',
      'Kurze Wege und freundliches Team'
    ],
    profile: [
      'Erfahrung im Gartenbau oder handwerkliches Geschick',
      'Zuverlässigkeit und Teamfähigkeit',
      'Spaß an Arbeit im Freien'
    ]
  }
];

export const SERVICES: Service[] = [
  {
    id: 1,
    title: 'Unterhaltsreinigung / Büroreinigung',
    description: ['Wir kümmern uns um die regelmäßige Reinigung und Pflege Ihrer Büros, sanitären Anlagen, Küchenbereiche und Raumausstattung. Dabei werden auch Teppiche gründlich gereinigt und Stein- oder PVC-Böden bei Bedarf beschichtet oder versiegelt – ganz nach Ihren individuellen Anforderungen. Ziel ist eine dauerhaft saubere und hygienische Umgebung.',
      'Auf Wunsch übernehmen wir zusätzlich die wöchentliche Treppenhausreinigung.',
      'Unser erfahrenes Team arbeitet mit modernen Reinigungsmethoden und hochwertigen Mitteln, um Ihre Räume nicht nur sauber, sondern auch nachhaltig gepflegt zu hinterlassen. So sorgen wir für eine angenehme Arbeitsumgebung und den langfristigen Werterhalt Ihres Objekts.',
    ],
    longDescription: [''],
    icon: 'Building2'
    },
  {
    id: 2,
    title: 'Glas- und Rahmenreinigung & Außenjalousien',
    
    description: ['Wir reinigen Fenster, Rahmen, Glasfassaden, Wintergärten, Sheddächer und alle weiteren Glaselemente sowie Außenjalousien – für Büros, Industriehallen und Privathaushalte.',
      'Unser geschultes Team arbeitet mit modernen Reinigungsmethoden und hochwertigen Mitteln, die nicht nur für perfekte Sauberkeit sorgen, sondern auch die Oberflächen schonend pflegen und schützen.',
    ],
    longDescription: [''],
    icon: 'Maximize'
  },
  {
    id: 3,
    title: 'Pflege von Außenanlagen',
    description: [
      '• Rasen mähen',
      '• Hecken schneiden',
      '• Laub- und Unkrautentfernung',
      '• Pflege von Grünanlagen',
      'Wir sorgen dafür, dass Ihre Außenbereiche sauber, ordentlich und gepflegt bleiben',
      'Unser Team arbeitet zuverlässig und sorgfältig, damit Ihre Außenflächen jederzeit einen gepflegten Eindruck hinterlassen.',
    ],
    longDescription: [''],
    icon: 'Trees'
  },
  {
    id: 4,
    title: 'Sonderreinigungen und Services',
    description: ['• Grundreinigungen', '• Teppichreinigungen', '• Versiegelungen von Fußböden', '• Treppenhausreinigung','• Graffitibeseitigung','• Schmutzmattenservice','• Fassadenreinigung','• Entrümplung','• Umzugsservice / Umzugshilfe'],
    longDescription: ['Grundreinigungen', 'Teppichreinigungen', 'Versiegelungen von Fußböden', 'Treppenhausreinigung', 'Graffitibeseitigung', 'Schmutzmattenservice', 'Fassadenreinigung', 'Entrümplung', 'Umzugsservice / Umzugshilfe'],
    icon: 'Sparkles',
    subServices: ['Grundreinigungen', 'Teppichreinigungen', 'Versiegelungen von Fußböden', 'Treppenhausreinigung','Graffitibeseitigung','Schmutzmattenservice','Fassadenreinigung','Entrümplung','Umzugsservice / Umzugshilfe']

  }
];

export const FAQ_ITEMS: FAQItem[] = [
  {
    question: 'Welche Leistungen bietet KGH Gebäudereinigung Hannover an?',
    answer: 'KGH Gebäudereinigung Hannover bietet professionelle Dienstleistungen in den Bereichen Gebäudereinigung, Objektbetreuung und Gartenpflege an. Unser Leistungsangebot umfasst unter anderem Unterhaltsreinigung, Glasreinigung, Hausmeisterservice sowie die Pflege von Grün- und Außenanlagen. Jede Leistung wird individuell auf die Anforderungen des jeweiligen Objekts abgestimmt.'
  },
  {
    question: 'Wie stellen Sie die Qualität Ihrer Reinigungs- und Gartenpflegeleistungen sicher?',
    answer: 'Qualität steht bei KGH Gebäudereinigung Hannover an erster Stelle. Wir arbeiten mit klar definierten Abläufen, sorgfältig ausgewählten Materialien und einer strukturierten Planung. Durch regelmäßige Abstimmung stellen wir sicher, dass alle Leistungen zuverlässig und nach den vereinbarten Standards ausgeführt werden.'
  },
  {
    question: 'Sind Ihre Leistungen flexibel und auf den Bedarf der Kunden abgestimmt?',
    answer: 'Ja. Unsere Reinigungs- und Gartenpflegeleistungen sind flexibel planbar und werden individuell auf die Wünsche und Anforderungen unserer Kunden zugeschnitten. Ob regelmäßige Betreuung oder einzelne Einsätze – wir bieten passgenaue Lösungen für private und gewerbliche Objekte.'
  },
  {
    question: 'Wie kann ich ein Angebot von KGH Gebäudereinigung Hannover erhalten?',
    answer: 'Ein Angebot erhalten Sie schnell und unkompliziert. Kontaktieren Sie uns einfach über das Kontaktformular auf unserer Website, per E-Mail oder telefonisch. Nach einer kurzen Abstimmung erstellen wir ein transparentes und unverbindliches Angebot.'
  },
  {
    question: 'Wie kann ich mich bei KGH Gebäudereinigung bewerben?',
    answer: 'Die Kontaktaufnahme ist unkompliziert möglich. Interessierte können sich über das Kontaktformular auf unserer Website, per E-Mail oder telefonisch bei uns melden. Jede Anfrage wird sorgfältig geprüft, und wir melden uns zeitnah zurück.'
  }
];

export const CONTACT_INFO = {
  address: 'Hannover City, Niedersachsen',
  email: 'service@kgh-reinigung.de',
  phone: '+49 (0) 511 99887766',
  companyName: 'KGH Gebäudereinigung Hannover GmbH i.G.'
};

export const LEGAL_CONTENT = {
  impressum: {
    company: 'KGH Gebäudereinigung Hannover GmbH i.G.',
    owner: 'Geschäftsführung: Faress K.',
    address: 'Hannover, Niedersachsen, Deutschland',
    contact: { phone: '+49 (0) 511 99887766', email: 'service@kgh-reinigung.de' },
    taxId: 'Steuernummer: In Beantragung',
    disclaimer: 'Haftung für Inhalte: Wir sind für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich (§ 7 Abs.1 TMG).'
  },
  privacy: {
    title: 'Datenschutzerklärung (DSGVO)',
    sections: [
      { title: '1. Datenschutz auf einen Blick', content: 'Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie unsere Website besuchen.' },
      { title: '2. Datenerfassung auf unserer Website', content: 'Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten können Sie dem Impressum dieser Website entnehmen.' },
      { title: '3. Ihre Betroffenenrechte', content: 'Sie haben jederzeit das Recht auf unentgeltliche Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten.' }
    ]
  }
};
