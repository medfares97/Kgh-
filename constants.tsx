
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
  email: 'info@kgh-reinigung.de',
  phone: '+49 (0) 151 25207791',
  companyName: 'KGH Gebäudereinigung Hannover GmbH i.G.'
};

export const LEGAL_CONTENT = {
  impressum: {
    company: 'KGH Gebäudereinigung Hannover UG (haftungsbeschränkt)',
    address: 'Herrenhäuser Markt 3\n 30419 Hannover',
    register: 'HRB 231066',
    court: 'Amtsgericht Hannover',
    representative: 'Mohamed Amine Khediri',
    role: 'Geschäftsführer',
    contact: { phone: '+49 (0) 151 25207791', email: "info@kgh-reinigung.de" },
    vatId: 'DE 463845280',
    dispute: 'Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.',
    liabilityContent: 'Als Diensteanbieter sind wir für die Inhalte unserer Website nach den gesetzlichen Vorschriften verantwortlich. Wir erstellen und prüfen unsere Inhalte sorgfältig. Sollten uns dennoch Fehler oder Rechtsverletzungen bekannt werden, werden wir die betreffenden Inhalte unverzüglich entfernen oder berichtigen.',
    liabilityLinks: 'Unsere Website kann Links zu externen Websites Dritter enthalten. Auf deren Inhalte haben wir keinen Einfluss und übernehmen daher keine Verantwortung. Für die Inhalte der verlinkten Seiten ist ausschließlich der jeweilige Betreiber verantwortlich. Sollten wir von rechtswidrigen Inhalten auf verlinkten Seiten Kenntnis erlangen, werden wir die entsprechenden Links unverzüglich entfernen.',
    copyright: 'Die auf dieser Website veröffentlichten Texte, Bilder und sonstigen Inhalte unterliegen dem deutschen Urheberrecht. Jede Vervielfältigung, Bearbeitung oder Verbreitung außerhalb der gesetzlichen Bestimmungen bedarf der vorherigen schriftlichen Zustimmung der KGH Gebäudereinigung UG (haftungsbeschränkt) oder des jeweiligen Rechteinhabers.\n\nDownloads und Kopien dieser Website sind ausschließlich für den privaten und nicht kommerziellen Gebrauch gestattet.'
  },
  privacy: {
    title: 'Datenschutzerklärung',
    effectiveDate: 'Stand: August 2026',
    sections: [
      { title: '1. Verantwortlicher', content: 'Verantwortlich für die Verarbeitung personenbezogener Daten auf dieser Website ist:\n\nKGH Gebäudereinigung Hannover UG (haftungsbeschränkt)\nHerrenhäuser Markt 3\n30419 Hannover\nDeutschland\n\nTelefon: 0178 4029733\nE-Mail: info@kgh-reinigung.de' },
      { title: '2. Allgemeine Hinweise', content: 'Der Schutz Ihrer personenbezogenen Daten ist uns wichtig. Wir verarbeiten personenbezogene Daten nach den geltenden Datenschutzvorschriften, insbesondere der Datenschutz-Grundverordnung (DSGVO).\n\nDiese Datenschutzerklärung informiert Sie darüber, welche personenbezogenen Daten bei der Nutzung unserer Website verarbeitet werden, zu welchen Zwecken dies geschieht und welche Rechte Ihnen zustehen.' },
      { title: '3. Hosting', content: 'Unsere Website wird bei Hostinger gehostet.\n\nBeim Besuch unserer Website können durch den Hostinganbieter technische Daten verarbeitet werden. Hierzu können insbesondere gehören:\n\nIP-Adresse\nDatum und Uhrzeit des Zugriffs\nBrowsertyp und Browserversion\nBetriebssystem\naufgerufene Seiten und Dateien\nReferrer-URL\ntechnische Verbindungsdaten\n\nDie Verarbeitung erfolgt zur sicheren, stabilen und technisch zuverlässigen Bereitstellung unserer Website sowie zur Erkennung und Abwehr technischer Störungen und Angriffe.\n\nRechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO.\n\nWeitere Informationen finden Sie in der Datenschutzerklärung von Hostinger.' },
      { title: '4. SSL-/TLS-Verschlüsselung', content: 'Unsere Website verwendet eine SSL-/TLS-Verschlüsselung.\n\nEine verschlüsselte Verbindung erkennen Sie an „https://“ und dem Schloss-Symbol in der Adresszeile Ihres Browsers.\n\nDie Verschlüsselung dient dem Schutz der übertragenen Daten vor dem Zugriff unbefugter Dritter.' },
      { title: '5. Kontaktformular', content: 'Auf unserer Website besteht die Möglichkeit, uns über ein Kontaktformular zu kontaktieren.\n\nWenn Sie das Kontaktformular nutzen, verarbeiten wir die von Ihnen eingegebenen Daten. Hierzu können insbesondere gehören:\n\nName\nE-Mail-Adresse\nTelefonnummer\nNachricht\nweitere freiwillig mitgeteilte Angaben\n\nDie Daten werden zur Bearbeitung Ihrer Anfrage, zur Kontaktaufnahme mit Ihnen und gegebenenfalls zur Vorbereitung eines Angebots oder Vertrags verwendet.\n\nDas Kontaktformular verwendet eine direkt auf unserer Website eingerichtete technische Lösung. Die eingegebenen Daten werden an eine lokale PHP-Datei auf unserem Server übermittelt und anschließend per E-Mail an unsere Unternehmensadresse weitergeleitet.\n\nRechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO, sofern die Anfrage der Vorbereitung oder Durchführung eines Vertrags dient. In anderen Fällen erfolgt die Verarbeitung auf Grundlage unseres berechtigten Interesses an der Bearbeitung von Anfragen gemäß Art. 6 Abs. 1 lit. f DSGVO.' },
      { title: '6. Kontaktaufnahme per E-Mail oder Telefon', content: 'Wenn Sie uns per E-Mail oder Telefon kontaktieren, verarbeiten wir die von Ihnen mitgeteilten personenbezogenen Daten, soweit dies zur Bearbeitung Ihres Anliegens und zur Kommunikation mit Ihnen erforderlich ist.\n\nEine Verwendung zu anderen Zwecken erfolgt nur, wenn hierfür eine entsprechende Rechtsgrundlage besteht.\n\nRechtsgrundlage: Art. 6 Abs. 1 lit. b oder lit. f DSGVO, abhängig von der Art Ihrer Anfrage.' },
      { title: '7. Local Storage', content: 'Unsere Website kann den sogenannten Local Storage (localStorage) des Browsers verwenden, um Informationen im Zusammenhang mit der Nutzung der Kontakt- bzw. Anfragefunktion vorübergehend lokal im Browser zu speichern.\n\nDiese Informationen werden dabei im Browser des Besuchers gespeichert und nicht allein durch die Speicherung im Local Storage automatisch an uns übermittelt.\n\nSie können gespeicherte Local-Storage-Daten grundsätzlich über die Einstellungen Ihres Browsers löschen.' },
      { title: '8. Google Fonts', content: 'Unsere Website verwendet die Schriftarten Plus Jakarta Sans und Inter.\n\nDie Schriftarten werden nicht lokal auf unserem Server gespeichert, sondern direkt von Servern von Google geladen.\n\nBeim Laden der Schriftarten kann eine Verbindung zu Google-Servern hergestellt werden. Dabei können insbesondere technische Informationen wie die IP-Adresse und Informationen über den verwendeten Browser an Google übertragen werden.\n\nAnbieter:\nGoogle Ireland Limited\nGordon House\nBarrow Street\nDublin 4\nIrland\n\nWeitere Informationen finden Sie in der Datenschutzerklärung von Google.' },
      { title: '9. Google Maps', content: 'Unsere Website verwendet Google Maps, um unseren Standort darzustellen und Besuchern die Orientierung und Anfahrt zu erleichtern.\n\nGoogle Maps ist über einen iframe in unsere Website eingebunden und wird bereits beim Aufruf der Website geladen.\n\nBeim Laden von Google Maps kann eine Verbindung zu Servern von Google hergestellt werden. Dabei können insbesondere technische Informationen, einschließlich der IP-Adresse des Besuchers, verarbeitet werden.\n\nAuf die konkrete weitere Verarbeitung der übermittelten Daten durch Google haben wir keinen Einfluss.\n\nAnbieter:\nGoogle Ireland Limited\nGordon House\nBarrow Street\nDublin 4\nIrland\n\nWeitere Informationen finden Sie in der Datenschutzerklärung von Google.' },
      { title: '10. Links zu sozialen Netzwerken', content: 'Unsere Website kann Links zu unseren Unternehmensprofilen bei sozialen Netzwerken wie Instagram, Facebook und TikTok enthalten.\n\nDabei handelt es sich um normale externe Links. Es werden keine Social-Media-Feeds, Plugins oder Beiträge direkt in unsere Website eingebettet.\n\nWenn Sie einen solchen Link anklicken, verlassen Sie unsere Website und werden zum jeweiligen sozialen Netzwerk weitergeleitet. Ab diesem Zeitpunkt gelten die Datenschutzbestimmungen des jeweiligen Anbieters.\n\nAllein durch den Besuch unserer Website und die Anzeige der Links werden keine Daten an diese sozialen Netzwerke übermittelt.' },
      { title: '11. Cookies', content: 'Nach der derzeitigen technischen Konfiguration unserer Website verwenden wir keine Cookies zu Analyse-, Werbe- oder Trackingzwecken.\n\nGoogle Analytics wird auf unserer Website nicht eingesetzt.\n\nUnabhängig davon können durch das Hosting oder durch eingebundene externe Dienste wie Google Maps oder Google Fonts technische Daten verarbeitet werden. Die entsprechenden Informationen finden Sie in den jeweiligen Abschnitten dieser Datenschutzerklärung.' },
      { title: '12. Speicherdauer', content: 'Wir speichern personenbezogene Daten grundsätzlich nur so lange, wie dies für den jeweiligen Zweck erforderlich ist.\n\nDarüber hinaus können gesetzliche Aufbewahrungspflichten bestehen, insbesondere nach Handels- und Steuerrecht.\n\nNach Ablauf der jeweiligen Aufbewahrungsfristen werden die betreffenden Daten gelöscht, sofern keine andere gesetzliche Grundlage für eine weitere Speicherung besteht.' },
      { title: '13. Ihre Rechte nach der DSGVO', content: 'Sie haben nach Maßgabe der gesetzlichen Voraussetzungen insbesondere folgende Rechte:\n\nRecht auf Auskunft über Ihre bei uns verarbeiteten personenbezogenen Daten\nRecht auf Berichtigung unrichtiger oder unvollständiger Daten\nRecht auf Löschung Ihrer personenbezogenen Daten\nRecht auf Einschränkung der Verarbeitung\nRecht auf Datenübertragbarkeit\nRecht auf Widerspruch gegen bestimmte Verarbeitungen\nRecht auf Widerruf einer Einwilligung, sofern die Verarbeitung auf Ihrer Einwilligung beruht\n\nZur Ausübung Ihrer Rechte können Sie sich jederzeit über die oben genannten Kontaktdaten an uns wenden.' },
      { title: '14. Beschwerderecht', content: 'Sie haben das Recht, sich bei einer zuständigen Datenschutzaufsichtsbehörde über die Verarbeitung Ihrer personenbezogenen Daten zu beschweren, wenn Sie der Ansicht sind, dass die Verarbeitung gegen geltendes Datenschutzrecht verstößt.' },
      { title: '15. Änderungen dieser Datenschutzerklärung', content: 'Wir behalten uns vor, diese Datenschutzerklärung anzupassen, wenn sich unsere Website, die von uns eingesetzten Dienste oder die gesetzlichen Anforderungen ändern.\n\nEs gilt jeweils die auf unserer Website veröffentlichte aktuelle Fassung.' }
    ]
  }
};
