
import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Lock, LayoutDashboard, X, LogOut, Search, Trash2, 
  Mail, ShieldCheck, MessageSquare, Briefcase, Bell, 
  Activity, Settings, Eye, EyeOff, ChevronRight, CheckCircle, Clock,
  Download, AlertTriangle, ShieldAlert, ArrowUpDown, ChevronUp, ChevronDown,
  Info, ExternalLink, Loader2, User, Calendar, Tag, Layers, UserPlus, Shield, Phone
} from 'lucide-react';
import { Logo } from './Logo';
import { db, Inquiry, Application, Notification, User as AdminUser, AdminRole } from '../db';

type SortDirection = 'asc' | 'desc';
interface SortConfig {
  key: string;
  direction: SortDirection;
}

type TabType = 'applications' | 'inquiries' | 'notifications' | 'overview' | 'settings';

const STATUS_COLORS: Record<string, string> = {
  'Eingegangen': 'bg-blue-50 text-blue-600 border-blue-100',
  'Prüfung': 'bg-amber-50 text-amber-600 border-amber-100',
  'Interview': 'bg-violet-50 text-violet-600 border-violet-100',
  'Besichtigung': 'bg-violet-50 text-violet-600 border-violet-100',
  'Angenommen': 'bg-emerald-50 text-emerald-600 border-emerald-100',
  'Erledigt': 'bg-emerald-50 text-emerald-600 border-emerald-100',
  'Abgelehnt': 'bg-red-50 text-red-600 border-red-100'
};

const ROLE_PERMISSIONS: Record<AdminRole, { tabs: TabType[]; actions: ('delete' | 'update_status' | 'view_files')[] }> = {
  'SUPER_ADMIN': {
    tabs: ['overview', 'applications', 'inquiries', 'notifications', 'settings'],
    actions: ['delete', 'update_status', 'view_files']
  },
  'SUPPORT': {
    tabs: ['overview', 'inquiries', 'notifications'],
    actions: ['update_status']
  },
  'RECRUITER': {
    tabs: ['overview', 'applications'],
    actions: ['update_status', 'view_files']
  }
};

export const AdminSpace: React.FC<{ isOpen: boolean; onClose: () => void; onOpenLegal: (type: 'impressum' | 'privacy') => void }> = ({ isOpen, onClose, onOpenLegal }) => {
  const [currentUser, setCurrentUser] = useState<AdminUser | null>(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  
  // Security States
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [lockoutUntil, setLockoutUntil] = useState<number | null>(null);
  const [captcha, setCaptcha] = useState({ a: 0, b: 0, answer: '' });
  const [captchaInput, setCaptchaInput] = useState('');
  
  // Data States
  const [applications, setApplications] = useState<Application[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>([]);
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [selectedItem, setSelectedItem] = useState<Application | Inquiry | Notification | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: 'date', direction: 'desc' });

  // New User Form State
  const [newUser, setNewUser] = useState({ username: '', password: '', role: 'SUPPORT' as AdminRole });
  const [userActionProcessing, setUserActionProcessing] = useState(false);
  
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const generateCaptcha = useCallback(() => {
    const a = Math.floor(Math.random() * 10) + 1;
    const b = Math.floor(Math.random() * 10) + 1;
    setCaptcha({ a, b, answer: (a + b).toString() });
    setCaptchaInput('');
  }, []);

  const handleLogout = useCallback(() => {
    setCurrentUser(null);
    setUsername('');
    setPassword('');
    setCaptchaInput('');
    setSelectedItem(null);
    setError('');
    setActiveTab('overview');
    generateCaptcha();
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
  }, [generateCaptcha]);

  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    if (currentUser) {
      inactivityTimerRef.current = setTimeout(() => {
        handleLogout();
        onClose();
      }, 15 * 60 * 1000);
    }
  }, [currentUser, onClose, handleLogout]);

  useEffect(() => {
    if (!isOpen && !currentUser) {
      setUsername('');
      setPassword('');
      setCaptchaInput('');
    }
    if (isOpen && !currentUser) {
      generateCaptcha();
    }
  }, [isOpen, currentUser, generateCaptcha]);

  useEffect(() => {
    if (currentUser) {
      window.addEventListener('mousemove', resetInactivityTimer);
      window.addEventListener('keypress', resetInactivityTimer);
      resetInactivityTimer();
    }
    return () => {
      window.removeEventListener('mousemove', resetInactivityTimer);
      window.removeEventListener('keypress', resetInactivityTimer);
    };
  }, [currentUser, resetInactivityTimer]);

  const loadData = useCallback(async () => {
    const [apps, inqs, notes, users] = await Promise.all([
      db.getApplications(),
      db.getInquiries(),
      db.getNotifications(),
      db.getUsers()
    ]);
    setApplications(apps);
    setInquiries(inqs);
    setNotifications(notes);
    setAdminUsers(users);
  }, []);

  useEffect(() => {
    if (currentUser && isOpen) loadData();
  }, [currentUser, isOpen, loadData]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (lockoutUntil && Date.now() < lockoutUntil) {
      const remaining = Math.ceil((lockoutUntil - Date.now()) / 1000);
      setError(`System gesperrt. Bitte ${remaining}s warten.`);
      return;
    }
    if (captchaInput !== captcha.answer) {
      setError('Sicherheitsprüfung fehlgeschlagen.');
      generateCaptcha();
      return;
    }

    const users = await db.getUsers();
    const user = users.find(u => u.username === username && u.passwordHash === password);

    if (user) {
      setCurrentUser(user);
      setError('');
      setFailedAttempts(0);
      setLockoutUntil(null);
      // Automatically switch to first available tab for this role
      const allowedTabs = ROLE_PERMISSIONS[user.role].tabs;
      if (!allowedTabs.includes(activeTab)) setActiveTab(allowedTabs[0]);
    } else {
      const newAttempts = failedAttempts + 1;
      setFailedAttempts(newAttempts);
      if (newAttempts >= 3) {
        setLockoutUntil(Date.now() + 60000);
        setError('Zu viele Versuche. System gesperrt.');
      } else {
        setError(`Anmeldedaten ungültig. (${3 - newAttempts} Versuche übrig)`);
      }
      generateCaptcha();
    }
  };

  const handleStatusUpdate = async (newStatus: string) => {
    if (!selectedItem || !('status' in selectedItem)) return;
    setIsProcessing(true);
    try {
      if ('jobTitle' in selectedItem) {
        await db.updateApplicationStatus(selectedItem.id, newStatus as any);
      } else {
        await db.updateInquiryStatus(selectedItem.id, newStatus);
      }
      await loadData();
      const updated = await db.findById(selectedItem.id);
      if (updated) setSelectedItem(updated);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUser.username || !newUser.password) return;
    setUserActionProcessing(true);
    try {
      await db.saveUser({
        username: newUser.username,
        passwordHash: newUser.password,
        role: newUser.role
      });
      setNewUser({ username: '', password: '', role: 'SUPPORT' });
      await loadData();
    } finally {
      setUserActionProcessing(false);
    }
  };

  const handleDeleteUser = async (id: string) => {
    if (id === 'USR-ROOT') return;
    if (!window.confirm('Nutzer wirklich löschen?')) return;
    await db.deleteUser(id);
    await loadData();
  };

  const handleSort = (key: string) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'desc' ? 'asc' : 'desc'
    }));
  };

  const canDoAction = (action: 'delete' | 'update_status' | 'view_files') => {
    if (!currentUser) return false;
    return ROLE_PERMISSIONS[currentUser.role].actions.includes(action);
  };

  const getFilteredAndSortedData = useMemo(() => {
    let rawData: any[] = [];
    if (activeTab === 'applications') rawData = applications;
    else if (activeTab === 'inquiries') rawData = inquiries;
    else if (activeTab === 'notifications') rawData = notifications;

    const filtered = rawData.filter(item => {
      const searchStr = searchTerm.toLowerCase();
      return (
        item.id.toLowerCase().includes(searchStr) ||
        (item.name && item.name.toLowerCase().includes(searchStr)) ||
        (item.email && item.email.toLowerCase().includes(searchStr)) ||
        (item.subject && item.subject.toLowerCase().includes(searchStr)) ||
        (item.to && item.to.toLowerCase().includes(searchStr))
      );
    });

    return filtered.sort((a, b) => {
      const aVal = a[sortConfig.key];
      const bVal = b[sortConfig.key];
      if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [activeTab, applications, inquiries, notifications, searchTerm, sortConfig]);

  const handleDownloadCV = async () => {
    if (!selectedItem || !('fileData' in selectedItem) || !selectedItem.fileData) {
      alert('Dokument nicht verfügbar.');
      return;
    }
    if (!canDoAction('view_files')) return;

    setIsDownloading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      const link = document.createElement('a');
      link.href = selectedItem.fileData;
      link.download = selectedItem.fileName || `${selectedItem.name.replace(/\s+/g, '_')}_Lebenslauf.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } finally {
      setIsDownloading(false);
    }
  };

  const renderSortIcon = (key: string) => {
    if (sortConfig.key !== key) return <ArrowUpDown size={12} className="opacity-30 ml-1" />;
    return sortConfig.direction === 'asc' ? <ChevronUp size={12} className="ml-1" /> : <ChevronDown size={12} className="ml-1" />;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[300] bg-white flex font-sans overflow-hidden">
      {!currentUser ? (
        <div className="w-full flex items-center justify-center p-6 bg-slate-50">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-sm bg-white p-10 rounded-[3rem] shadow-2xl border border-slate-200 text-center relative">
            <div className="absolute top-8 right-8 text-slate-100 pointer-events-none"><ShieldAlert size={100} strokeWidth={0.5} /></div>
            <div className="w-20 h-20 bg-violet-600 text-white rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-xl relative z-10"><Lock size={36} /></div>
            <h2 className="text-3xl font-black text-slate-900 mb-2 tracking-tighter uppercase leading-none">KGH Access</h2>
            <p className="text-[9px] font-black uppercase text-slate-400 tracking-[0.4em] mb-10">Zentraler Systemzugang</p>
            <form onSubmit={handleLogin} className="space-y-4">
              <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full px-6 py-4 bg-slate-50 border-2 border-transparent focus:border-violet-500 rounded-2xl outline-none transition-all font-bold text-center text-slate-900 shadow-inner uppercase tracking-widest placeholder:text-slate-300" placeholder="Nutzername" />
              <div className="relative">
                <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-6 py-4 bg-slate-50 border-2 border-transparent focus:border-violet-500 rounded-2xl outline-none transition-all font-bold text-center text-slate-900 shadow-inner" placeholder="Passwort" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-300 hover:text-violet-600 transition-colors">
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-3 shadow-inner">
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none">Captcha: {captcha.a} + {captcha.b}</p>
                <input type="number" value={captchaInput} onChange={(e) => setCaptchaInput(e.target.value)} className="w-full bg-white py-3 px-6 rounded-xl text-center font-black text-lg text-slate-900 outline-none focus:ring-2 focus:ring-violet-500 border border-slate-100" placeholder="?" />
              </div>
              {error && <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-center gap-2 text-red-500 text-[9px] font-black uppercase tracking-widest bg-red-50 py-3 rounded-2xl border border-red-100"><AlertTriangle size={14} /> <span>{error}</span></motion.div>}
              <button type="submit" disabled={lockoutUntil !== null && Date.now() < lockoutUntil} className="w-full py-5 bg-violet-600 text-white rounded-2xl font-black uppercase text-[11px] tracking-[0.4em] shadow-xl hover:bg-slate-950 transition-all disabled:opacity-50 active:scale-95">Anmelden</button>
              <div className="flex flex-col items-center gap-6 mt-6">
                <button type="button" onClick={() => { handleLogout(); onClose(); }} className="text-slate-400 text-[9px] font-black uppercase tracking-[0.3em] hover:text-slate-900 transition-colors">Abbrechen</button>
                <div className="flex items-center gap-4 text-[7px] font-black uppercase tracking-[0.2em] text-slate-400">
                  <button type="button" onClick={() => onOpenLegal('impressum')} className="hover:text-violet-600 transition-colors">Impressum</button>
                  <div className="w-1 h-1 bg-slate-200 rounded-full" />
                  <button type="button" onClick={() => onOpenLegal('privacy')} className="hover:text-violet-600 transition-colors">Datenschutz</button>
                </div>
              </div>
            </form>
          </motion.div>
        </div>
      ) : (
        <div className="flex w-full h-full bg-slate-50">
          {/* SIDEBAR */}
          <aside className="w-72 bg-white border-r border-slate-100 flex flex-col shrink-0 shadow-sm relative z-20">
            <div className="p-10 flex flex-col items-center gap-4 border-b border-slate-50">
              <div className="p-3 bg-violet-600 rounded-3xl text-white shadow-xl"><Logo className="h-12 w-12" /></div>
              <div className="text-center">
                <h1 className="text-[11px] font-black text-slate-900 uppercase tracking-[0.3em] leading-none">Admin<span className="text-violet-600">Space</span></h1>
                <p className="text-[8px] font-black text-slate-300 uppercase tracking-widest mt-2">Node v2.5 / {currentUser.role}</p>
              </div>
            </div>
            <nav className="flex-grow p-6 space-y-2">
              {[
                { id: 'overview', label: 'Dashboard', icon: LayoutDashboard }, 
                { id: 'applications', label: 'Bewerber', icon: Briefcase }, 
                { id: 'inquiries', label: 'Anfragen', icon: MessageSquare },
                { id: 'notifications', label: 'Protokoll', icon: Bell },
                { id: 'settings', label: 'System', icon: Settings }
              ].filter(tab => ROLE_PERMISSIONS[currentUser.role].tabs.includes(tab.id as TabType)).map(tab => (
                <button 
                  key={tab.id} 
                  onClick={() => { setActiveTab(tab.id as any); setSelectedItem(null); }} 
                  className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all group ${activeTab === tab.id ? 'bg-violet-600 text-white shadow-xl shadow-violet-600/20' : 'text-slate-400 hover:bg-slate-50 hover:text-slate-900'}`}
                >
                  <tab.icon size={18} className={activeTab === tab.id ? 'text-white' : 'text-slate-300 group-hover:text-violet-500'} /> 
                  {tab.label}
                </button>
              ))}
            </nav>
            <div className="p-8 border-t border-slate-50 space-y-6">
              <div className="flex items-center gap-3 px-5 py-3 bg-slate-50 rounded-xl text-[8px] font-black text-slate-400 uppercase tracking-widest truncate">
                <User size={12} className="text-violet-500" /> {currentUser.username}
              </div>
              <button onClick={handleLogout} className="w-full py-4 bg-red-50 text-red-600 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-red-600 hover:text-white transition-all shadow-sm">
                <LogOut size={16} /> Abmelden
              </button>
            </div>
          </aside>

          {/* MAIN CONTENT AREA */}
          <main className="flex-grow flex flex-col overflow-hidden">
            <header className="h-24 bg-white border-b border-slate-100 px-12 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-4 max-w-xl w-full">
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100"><Search size={18} className="text-slate-400" /></div>
                <input type="text" placeholder="Suche..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full bg-transparent border-none text-[12px] font-bold outline-none text-slate-900 placeholder:text-slate-300 uppercase tracking-widest" />
              </div>
              <div className="flex items-center gap-6">
                <div className="flex flex-col items-end">
                  <p className="text-[10px] font-black text-slate-900 uppercase tracking-widest">Sicherheit: <span className="text-green-500">Hoch</span></p>
                  <p className="text-[8px] text-slate-400 font-bold uppercase mt-1">Admin Node / {currentUser.role}</p>
                </div>
                <div className="w-px h-10 bg-slate-100" />
                <div className="flex items-center gap-3 px-6 py-3 bg-violet-50 text-violet-600 border border-violet-100 rounded-2xl">
                  <Shield size={18} />
                  <span className="text-[10px] font-black uppercase tracking-widest">Active Guard</span>
                </div>
              </div>
            </header>

            <div className="flex-grow overflow-y-auto p-12 no-scrollbar">
              {activeTab === 'overview' && (
                <div className="space-y-12">
                   <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                      { id: 'applications', label: 'Bewerbungen', value: applications.length, icon: Briefcase, color: 'text-blue-500', bg: 'bg-blue-50' },
                      { id: 'inquiries', label: 'Kundenanfragen', value: inquiries.length, icon: MessageSquare, color: 'text-violet-500', bg: 'bg-violet-50' },
                      { id: 'notifications', label: 'Ereignisse', value: notifications.length, icon: Bell, color: 'text-slate-400', bg: 'bg-slate-50' }
                    ].filter(stat => ROLE_PERMISSIONS[currentUser.role].tabs.includes(stat.id as TabType)).map((stat, i) => (
                      <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} onClick={() => setActiveTab(stat.id as any)} className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all cursor-pointer group flex flex-col justify-between h-64">
                        <div className="flex justify-between items-start">
                          <div className={`p-4 rounded-2xl ${stat.bg} ${stat.color} transition-all group-hover:bg-violet-600 group-hover:text-white`}><stat.icon size={24} /></div>
                          <Activity size={16} className="text-slate-200" />
                        </div>
                        <div>
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-2">{stat.label}</p>
                          <h3 className="text-5xl font-black text-slate-900 tracking-tighter leading-none">{stat.value}</h3>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'settings' && currentUser.role === 'SUPER_ADMIN' && (
                <div className="space-y-12">
                  <div className="bg-white p-12 rounded-[3.5rem] border border-slate-100 shadow-sm space-y-10">
                    <div className="flex items-center gap-4 mb-2">
                      <div className="p-3 bg-violet-600 text-white rounded-2xl shadow-lg"><UserPlus size={24} /></div>
                      <h3 className="text-2xl font-black text-slate-900 tracking-tighter uppercase leading-none">Nutzerverwaltung</h3>
                    </div>
                    
                    <form onSubmit={handleAddUser} className="grid grid-cols-1 md:grid-cols-4 gap-4 p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 shadow-inner">
                      <input type="text" placeholder="NUTZERNAME" value={newUser.username} onChange={e => setNewUser(p => ({...p, username: e.target.value}))} className="bg-white px-6 py-4 rounded-xl text-[11px] font-black tracking-widest uppercase outline-none focus:ring-2 focus:ring-violet-500 border border-slate-100 shadow-sm" />
                      <input type="password" placeholder="PASSWORT" value={newUser.password} onChange={e => setNewUser(p => ({...p, password: e.target.value}))} className="bg-white px-6 py-4 rounded-xl text-[11px] font-black tracking-widest outline-none focus:ring-2 focus:ring-violet-500 border border-slate-100 shadow-sm" />
                      <select value={newUser.role} onChange={e => setNewUser(p => ({...p, role: e.target.value as AdminRole}))} className="bg-white px-6 py-4 rounded-xl text-[10px] font-black tracking-widest uppercase outline-none focus:ring-2 focus:ring-violet-500 border border-slate-100 shadow-sm">
                        <option value="SUPPORT">SUPPORT STAFF</option>
                        <option value="RECRUITER">RECRUITER</option>
                        <option value="SUPER_ADMIN">SUPER ADMIN</option>
                      </select>
                      <button type="submit" disabled={userActionProcessing} className="bg-slate-900 text-white py-4 rounded-xl text-[10px] font-black tracking-[0.3em] uppercase hover:bg-violet-600 transition-all flex items-center justify-center gap-2 shadow-xl">
                        {userActionProcessing ? <Loader2 className="animate-spin" size={16} /> : <UserPlus size={16} />}
                        Nutzer anlegen
                      </button>
                    </form>

                    <div className="space-y-4">
                      {adminUsers.map(u => (
                        <div key={u.id} className="flex items-center justify-between p-6 bg-white border border-slate-100 rounded-3xl group hover:shadow-lg transition-all">
                          <div className="flex items-center gap-6">
                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-xl font-black shadow-inner ${u.role === 'SUPER_ADMIN' ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-400'}`}>
                              {u.username.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <p className="text-lg font-black text-slate-900 tracking-tight leading-none mb-1">{u.username}</p>
                              <div className="flex items-center gap-3">
                                <span className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest border ${u.role === 'SUPER_ADMIN' ? 'bg-violet-50 border-violet-100 text-violet-600' : 'bg-slate-50 border-slate-200 text-slate-400'}`}>
                                  {u.role}
                                </span>
                                <span className="text-[9px] text-slate-300 font-bold uppercase">{new Date(u.date).toLocaleDateString()}</span>
                              </div>
                            </div>
                          </div>
                          {u.id !== 'USR-ROOT' && (
                            <button onClick={() => handleDeleteUser(u.id)} className="p-4 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all">
                              <Trash2 size={20} />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {['applications', 'inquiries', 'notifications'].includes(activeTab) && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white rounded-[3rem] border border-slate-100 overflow-hidden shadow-2xl">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-[11px] font-bold">
                      <thead className="bg-slate-50 text-slate-400 uppercase tracking-widest border-b border-slate-100">
                        <tr>
                          {activeTab === 'applications' && (
                            <>
                              <th className="px-10 py-6 cursor-pointer hover:text-violet-600 transition-colors" onClick={() => handleSort('name')}>Name {renderSortIcon('name')}</th>
                              <th className="px-10 py-6 cursor-pointer hover:text-violet-600 transition-colors" onClick={() => handleSort('jobTitle')}>Position {renderSortIcon('jobTitle')}</th>
                            </>
                          )}
                          {activeTab === 'inquiries' && (
                            <>
                              <th className="px-10 py-6 cursor-pointer hover:text-violet-600 transition-colors" onClick={() => handleSort('name')}>Kunde {renderSortIcon('name')}</th>
                              <th className="px-10 py-6 cursor-pointer hover:text-violet-600 transition-colors" onClick={() => handleSort('service')}>Leistung {renderSortIcon('service')}</th>
                            </>
                          )}
                          {activeTab === 'notifications' && (
                            <>
                              <th className="px-10 py-6 cursor-pointer hover:text-violet-600 transition-colors" onClick={() => handleSort('to')}>Empfänger {renderSortIcon('to')}</th>
                              <th className="px-10 py-6 cursor-pointer hover:text-violet-600 transition-colors" onClick={() => handleSort('subject')}>Betreff {renderSortIcon('subject')}</th>
                            </>
                          )}
                          <th className="px-10 py-6 cursor-pointer hover:text-violet-600 transition-colors" onClick={() => handleSort('status')}>Status {renderSortIcon('status')}</th>
                          <th className="px-10 py-6 text-right cursor-pointer hover:text-violet-600 transition-colors" onClick={() => handleSort('date')}>Datum {renderSortIcon('date')}</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-50">
                        {getFilteredAndSortedData.map(item => (
                          <tr key={item.id} onClick={() => setSelectedItem(item)} className={`group cursor-pointer transition-all ${selectedItem?.id === item.id ? 'bg-violet-50/50' : 'hover:bg-slate-50/80'}`}>
                            <td className="px-10 py-7">
                              <p className="text-slate-900 font-black text-sm tracking-tight">{'name' in item ? item.name : item.to}</p>
                              <p className="text-[8px] text-slate-400 uppercase tracking-[0.2em] mt-1">{item.id}</p>
                            </td>
                            <td className="px-10 py-7 text-slate-500 uppercase tracking-widest text-[10px]">
                              {'jobTitle' in item ? item.jobTitle : ('service' in item ? item.service : item.subject)}
                            </td>
                            <td className="px-10 py-7">
                              <span className={`px-4 py-1.5 border rounded-full text-[9px] font-black uppercase tracking-widest ${STATUS_COLORS[item.status || item.type] || 'bg-slate-50 text-slate-500 border-slate-100'}`}>
                                {('status' in item) ? item.status : item.type}
                              </span>
                            </td>
                            <td className="px-10 py-7 text-right text-slate-400 uppercase tracking-widest font-black text-[9px]">
                              {new Date(item.date).toLocaleDateString('de-DE')}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              )}
            </div>
          </main>

          {/* DETAIL PANEL */}
          <AnimatePresence>
            {selectedItem && (
              <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 25, stiffness: 200 }} className="w-[500px] bg-white border-l border-slate-100 flex flex-col shadow-2xl z-50 overflow-hidden">
                <div className="p-10 border-b border-slate-50 flex items-center justify-between shrink-0">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-slate-50 text-slate-400 rounded-xl">
                      {'jobTitle' in selectedItem ? <Briefcase size={20} /> : <MessageSquare size={20} />}
                    </div>
                    <div>
                      <h3 className="text-[12px] font-black text-slate-900 uppercase tracking-[0.3em]">Details</h3>
                      <p className="text-[9px] font-black text-violet-600 uppercase tracking-widest mt-1">{selectedItem.id}</p>
                    </div>
                  </div>
                  <button onClick={() => setSelectedItem(null)} className="p-3 rounded-xl bg-slate-50 text-slate-400 hover:text-red-500 transition-all"><X size={20} /></button>
                </div>

                <div className="p-12 space-y-12 flex-grow overflow-y-auto no-scrollbar">
                   <div className="text-center pb-8 border-b border-slate-50">
                    <div className="w-24 h-24 bg-violet-600 text-white rounded-[2rem] flex items-center justify-center text-4xl font-black mx-auto mb-8 shadow-2xl shadow-violet-600/30">
                      {('name' in selectedItem ? selectedItem.name : (selectedItem as Notification).to).charAt(0)}
                    </div>
                    <h4 className="text-2xl font-black text-slate-900 tracking-tighter uppercase leading-none">
                      {'name' in selectedItem ? selectedItem.name : 'System Notification'}
                    </h4>
                    <p className="text-slate-400 text-[11px] font-bold uppercase tracking-[0.2em] mt-3">
                      {'email' in selectedItem ? selectedItem.email : (selectedItem as Notification).to}
                    </p>
                  </div>

                  <div className="space-y-10">
                    {/* Common contact info block */}
                    {('phone' in selectedItem) && (
                        <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 flex items-center gap-4">
                            <div className="p-3 bg-white rounded-xl text-violet-600 shadow-sm border border-slate-100">
                                <Phone size={18} />
                            </div>
                            <div>
                                <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Telefon</p>
                                <p className="text-[12px] font-black text-slate-900 uppercase tracking-tighter">{selectedItem.phone}</p>
                            </div>
                        </div>
                    )}

                    {/* Status Update Block - Only for Applications */}
                    {('status' in selectedItem) && ('jobTitle' in selectedItem) && canDoAction('update_status') && (
                      <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100">
                        <p className="text-[10px] font-black text-slate-900 uppercase tracking-widest mb-6">Status ändern</p>
                        <div className="grid grid-cols-2 gap-3">
                          {['Eingegangen', 'Prüfung', 'Interview', 'Angenommen', 'Abgelehnt'].map(s => (
                            <button key={s} disabled={isProcessing} onClick={() => handleStatusUpdate(s)} className={`py-4 rounded-2xl text-[9px] font-black uppercase tracking-widest transition-all border ${selectedItem.status === s ? 'bg-violet-600 text-white border-violet-600 shadow-xl shadow-violet-600/20' : 'bg-white text-slate-400 border-slate-100 hover:bg-violet-50 hover:text-violet-600 hover:border-violet-200'}`}>
                              {isProcessing && selectedItem.status !== s ? '...' : s}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Files Block */}
                    {('fileData' in selectedItem && selectedItem.fileData) && canDoAction('view_files') && (
                      <button onClick={handleDownloadCV} disabled={isDownloading} className="w-full py-5 bg-slate-900 text-white rounded-2xl font-black uppercase text-[10px] tracking-[0.4em] shadow-xl flex items-center justify-center gap-4 hover:bg-violet-600 transition-all active:scale-95">
                        {isDownloading ? <Loader2 className="animate-spin" size={18} /> : <Download size={18} />}
                        <span>Lebenslauf laden</span>
                      </button>
                    )}

                    {/* Message Block */}
                    <div className="space-y-4">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Inhalt</p>
                      <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 min-h-[120px] shadow-inner italic text-slate-600 text-[12px] font-medium leading-relaxed">
                        "{'message' in selectedItem ? selectedItem.message : (selectedItem as Notification).body}"
                      </div>
                    </div>
                  </div>

                  {/* Danger Zone */}
                  {activeTab !== 'notifications' && canDoAction('delete') && (
                    <div className="pt-10 border-t border-slate-50">
                      <button 
                        onClick={async () => {
                          if (window.confirm('Datensatz unwiderruflich löschen?')) {
                            if ('jobTitle' in selectedItem) await db.deleteApplication(selectedItem.id);
                            else await db.deleteInquiry(selectedItem.id);
                            await loadData();
                            setSelectedItem(null);
                          }
                        }}
                        className="w-full py-4 text-red-500 text-[9px] font-black uppercase tracking-[0.4em] flex items-center justify-center gap-3 hover:bg-red-50 rounded-2xl transition-all border border-transparent hover:border-red-100"
                      >
                        <Trash2 size={16} /> Datensatz löschen
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};
