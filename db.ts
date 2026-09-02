
/**
 * DB SERVICE (Database Abstraction Layer)
 * Optimized for management of Candidates and Contact Inquiries.
 * Includes Obfuscation Layer for Local Storage Security.
 * Integrated with Automated Email Notifications via PHP Bridge.
 */

export type AdminRole = 'SUPER_ADMIN' | 'SUPPORT' | 'RECRUITER';

export interface User {
  id: string;
  username: string;
  passwordHash: string;
  role: AdminRole;
  date: string;
}

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  date: string;
  status: string;
}

export interface Application {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  jobTitle: string;
  date: string;
  status: 'Eingegangen' | 'Prüfung' | 'Interview' | 'Angenommen' | 'Abgelehnt';
  fileName?: string;
  fileData?: string;
}

export interface Notification {
  id: string;
  to: string;
  subject: string;
  body: string;
  date: string;
  type: 'CLIENT_CONFIRMATION' | 'ADMIN_ALERT';
}

const DB_KEYS = {
  INQUIRIES: 'kgh_inquiries',
  APPLICATIONS: 'kgh_applications',
  NOTIFICATIONS: 'kgh_notifications',
  USERS: 'kgh_users'
};

// Internal Mailer Utility - Modified to be non-blocking
const sendEmail = (to: string, subject: string, content: string) => {
  fetch('mail-bridge.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ to, subject, content })
  })
  .then(res => res.json())
  .then(result => console.debug('Email notification status:', result))
  .catch(e => console.warn("Email notification bridge failed (background):", e));
};

// Security Obfuscation Logic
const obfuscate = (data: string): string => btoa(encodeURIComponent(data));
const deobfuscate = (data: string): string => decodeURIComponent(atob(data));

const getFromStore = <T>(key: string): T[] => {
  try {
    const data = localStorage.getItem(key);
    if (!data) return [];
    return JSON.parse(deobfuscate(data));
  } catch (e) {
    console.error("Secure store read error", e);
    return [];
  }
};

const saveToStore = <T>(key: string, data: T[]) => {
  const jsonStr = JSON.stringify(data);
  localStorage.setItem(key, obfuscate(jsonStr));
  window.dispatchEvent(new CustomEvent('kgh_db_updated', { detail: { key } }));
};

export const db = {
  // USER MANAGEMENT
  async getUsers(): Promise<User[]> {
    const users = getFromStore<User>(DB_KEYS.USERS);
    if (users.length === 0) {
      // Initialize default Super Admin if none exists
      const defaultAdmin: User = {
        id: 'USR-ROOT',
        username: 'admin',
        passwordHash: 'kgh2024',
        role: 'SUPER_ADMIN',
        date: new Date().toISOString()
      };
      saveToStore(DB_KEYS.USERS, [defaultAdmin]);
      return [defaultAdmin];
    }
    return users;
  },

  async saveUser(user: Omit<User, 'id' | 'date'>): Promise<User> {
    const users = await this.getUsers();
    const newUser: User = {
      ...user,
      id: 'USR-' + Math.random().toString(36).substring(2, 8).toUpperCase(),
      date: new Date().toISOString()
    };
    saveToStore(DB_KEYS.USERS, [...users, newUser]);
    return newUser;
  },

  async deleteUser(id: string): Promise<void> {
    const users = await this.getUsers();
    if (id === 'USR-ROOT') return;
    saveToStore(DB_KEYS.USERS, users.filter(u => u.id !== id));
  },

  async logNotification(notification: Omit<Notification, 'id' | 'date'>): Promise<void> {
    const notes = getFromStore<Notification>(DB_KEYS.NOTIFICATIONS);
    const newNote: Notification = {
      ...notification,
      id: 'NTF-' + Math.random().toString(36).substring(2, 8).toUpperCase(),
      date: new Date().toISOString()
    };
    saveToStore(DB_KEYS.NOTIFICATIONS, [newNote, ...notes.slice(0, 49)]);
  },

  async getInquiries(): Promise<Inquiry[]> {
    return getFromStore<Inquiry>(DB_KEYS.INQUIRIES).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  },

  async saveInquiry(inquiry: Omit<Inquiry, 'id' | 'date' | 'status'>): Promise<Inquiry> {
    const inquiries = await this.getInquiries();
    const newInquiry: Inquiry = {
      ...inquiry,
      id: 'MSG-' + Math.random().toString(36).substring(2, 8).toUpperCase(),
      date: new Date().toISOString(),
      status: 'Eingegangen'
    };
    saveToStore(DB_KEYS.INQUIRIES, [...inquiries, newInquiry]);

    // Admin Alert - Dispatched in background
    sendEmail("info@kgh-reinigung.de", "Admin Alert: Neue Kundenanfrage", 
      `Eine neue Anfrage von ${newInquiry.name} (${newInquiry.email}) ist eingegangen.\nTelefon: ${newInquiry.phone}\nLeistung: ${newInquiry.service}\nNachricht: ${newInquiry.message}\nZeitpunkt: ${newInquiry.date}`);

    return newInquiry;
  },

  async getApplications(): Promise<Application[]> {
    return getFromStore<Application>(DB_KEYS.APPLICATIONS).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  },

  async saveApplication(app: Omit<Application, 'id' | 'date' | 'status'>): Promise<Application> {
    const apps = await this.getApplications();
    const newApp: Application = {
      ...app,
      id: 'KGH-' + Math.random().toString(36).substring(2, 8).toUpperCase(),
      date: new Date().toISOString(),
      status: 'Eingegangen'
    };
    saveToStore(DB_KEYS.APPLICATIONS, [...apps, newApp]);

    // Admin Alert - Dispatched in background
    sendEmail("info@kgh-reinigung.de", "Admin Alert: Neue Bewerbung", 
      `Eine neue Bewerbung von ${newApp.name} (${newApp.email}) ist eingegangen.\nTelefon: ${newApp.phone}\nStelle: ${newApp.jobTitle}\nTracking-ID: ${newApp.id}\nZeitpunkt: ${newApp.date}`);

    return newApp;
  },

  async updateApplicationStatus(id: string, status: Application['status']): Promise<void> {
    const data = await this.getApplications();
    const item = data.find(i => i.id === id);
    if (!item) return;

    const updated = data.map(i => i.id === id ? { ...i, status } : i);
    saveToStore(DB_KEYS.APPLICATIONS, updated);

    const subject = `Statusänderung Ihrer Bewerbung: ${status}`;
    const body = `Sehr geehrte/r ${item.name},\n\nder Status Ihrer Bewerbung als '${item.jobTitle}' wurde auf '${status}' aktualisiert.\n\nSie können den Fortschritt jederzeit in unserem Portal mit Ihrer ID ${id} verfolgen.\n\nMit freundlichen Grüßen,\nKGH Personalabteilung Hannover`;

    await this.logNotification({
      to: item.email,
      subject,
      body,
      type: 'CLIENT_CONFIRMATION'
    });

    // Real-time Email dispatched in background
    sendEmail(item.email, subject, body);
  },

  async updateInquiryStatus(id: string, status: string): Promise<void> {
    const data = await this.getInquiries();
    const item = data.find(i => i.id === id);
    if (!item) return;

    const updated = data.map(i => i.id === id ? { ...i, status } : i);
    saveToStore(DB_KEYS.INQUIRIES, updated);

    const subject = `Update zu Ihrer Reinigungsanfrage: ${status}`;
    const body = `Sehr geehrte/r ${item.name},\n\nvielen Dank für Ihre Anfrage bezüglich '${item.service}'. Der aktuelle Bearbeitungsstand ist nun: '${status}'.\n\nBeste Grüße,\nKGH Gebäudereinigung Hannover`;

    await this.logNotification({
      to: item.email,
      subject,
      body,
      type: 'CLIENT_CONFIRMATION'
    });

    // Real-time Email dispatched in background
    sendEmail(item.email, subject, body);
  },

  async deleteApplication(id: string): Promise<void> {
    const data = await this.getApplications();
    saveToStore(DB_KEYS.APPLICATIONS, data.filter(a => a.id !== id));
  },

  async deleteInquiry(id: string): Promise<void> {
    const data = await this.getInquiries();
    saveToStore(DB_KEYS.INQUIRIES, data.filter(i => i.id !== id));
  },

  async getNotifications(): Promise<Notification[]> {
    return getFromStore<Notification>(DB_KEYS.NOTIFICATIONS);
  },

  async findById(id: string): Promise<Inquiry | Application | null> {
    const tid = id.trim().toUpperCase();
    const inqs = await this.getInquiries();
    const apps = await this.getApplications();
    return inqs.find(i => i.id === tid) || apps.find(a => a.id === tid) || null;
  }
};
