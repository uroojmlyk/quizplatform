'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Toaster, toast as hotToast } from 'react-hot-toast';
import { 
  Save,
  ArrowLeft,
  Shield,
  Globe,
  Bell,
  Mail,
  Users,
  Eye,
  EyeOff,
  Moon,
  Sun,
  Lock,
  Key,
  Database,
  RefreshCw,
  Download,
  Upload,
  Trash2,
  AlertCircle,
  CheckCircle,
  XCircle,
  Settings as SettingsIcon,
  Palette,
  Type,
  Layout,
  Sparkles
} from 'lucide-react';
import { showToast } from '@/lib/toast';

interface SettingsData {
  // General Settings
  siteName: string;
  siteDescription: string;
  siteUrl: string;
  supportEmail: string;
  
  // Appearance
  theme: 'light' | 'dark' | 'system';
  primaryColor: string;
  accentColor: string;
  fontFamily: string;
  
  // Security
  requireEmailVerification: boolean;
  twoFactorAuth: boolean;
  sessionTimeout: number;
  maxLoginAttempts: number;
  
  // Registration
  allowRegistration: boolean;
  defaultUserRole: 'student' | 'teacher';
  requireAdminApproval: boolean;
  
  // Email Settings
  smtpServer: string;
  smtpPort: number;
  smtpUsername: string;
  smtpPassword: string;
  fromEmail: string;
  
  // Quiz Settings
  defaultQuizDuration: number;
  maxQuestionsPerQuiz: number;
  allowQuizRetakes: boolean;
  showAnswersAfterQuiz: boolean;
  
  // Maintenance
  maintenanceMode: boolean;
  debugMode: boolean;
  logLevel: 'error' | 'warn' | 'info' | 'debug';
}

export default function AdminSettingsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('general');
  const [showSmtpPassword, setShowSmtpPassword] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  
  // Settings state
  const [settings, setSettings] = useState<SettingsData>({
    // General
    siteName: 'QuizMaster',
    siteDescription: 'Modern quiz platform for education',
    siteUrl: 'https://quizmaster.com',
    supportEmail: 'support@quizmaster.com',
    
    // Appearance
    theme: 'dark',
    primaryColor: '#6366f1',
    accentColor: '#8b5cf6',
    fontFamily: 'Inter',
    
    // Security
    requireEmailVerification: true,
    twoFactorAuth: false,
    sessionTimeout: 60,
    maxLoginAttempts: 5,
    
    // Registration
    allowRegistration: true,
    defaultUserRole: 'student',
    requireAdminApproval: false,
    
    // Email
    smtpServer: 'smtp.gmail.com',
    smtpPort: 587,
    smtpUsername: 'admin@quizmaster.com',
    smtpPassword: '••••••••',
    fromEmail: 'noreply@quizmaster.com',
    
    // Quiz
    defaultQuizDuration: 30,
    maxQuestionsPerQuiz: 50,
    allowQuizRetakes: true,
    showAnswersAfterQuiz: true,
    
    // Maintenance
    maintenanceMode: false,
    debugMode: false,
    logLevel: 'error'
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setLoading(false);
    } catch (error) {
      showToast.error('Failed to load settings');
      setLoading(false);
    }
  };

  const handleSaveSettings = async () => {
    setSaving(true);
    const toastId = showToast.loading('Saving settings...');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      hotToast.dismiss(toastId);
      showToast.success('Settings saved successfully');
    } catch (error) {
      hotToast.dismiss(toastId);
      showToast.error('Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  const handleExportData = async () => {
    const toastId = showToast.loading('Exporting data...');
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      hotToast.dismiss(toastId);
      showToast.success('Data exported successfully');
    } catch (error) {
      hotToast.dismiss(toastId);
      showToast.error('Export failed');
    }
  };

  const handleImportData = async () => {
    const toastId = showToast.loading('Importing data...');
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      hotToast.dismiss(toastId);
      showToast.success('Data imported successfully');
    } catch (error) {
      hotToast.dismiss(toastId);
      showToast.error('Import failed');
    }
  };

  const handleClearCache = async () => {
    const toastId = showToast.loading('Clearing cache...');
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      hotToast.dismiss(toastId);
      showToast.success('Cache cleared successfully');
    } catch (error) {
      hotToast.dismiss(toastId);
      showToast.error('Failed to clear cache');
    }
  };

  const tabs = [
    { id: 'general', label: 'general', icon: SettingsIcon },
    { id: 'appearance', label: 'appearance', icon: Palette },
    { id: 'security', label: 'security', icon: Shield },
    { id: 'email', label: 'email', icon: Mail },
    { id: 'quiz', label: 'quiz', icon: Layout },
    { id: 'maintenance', label: 'maintenance', icon: Database }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-[#09090B] flex items-center justify-center">
        <div className="relative">
          <div className="w-12 h-12 border-2 border-indigo-400/20 border-t-indigo-400 rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <SettingsIcon className="w-5 h-5 text-indigo-400/60 animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#09090B]">
      <Toaster position="top-right" />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.back()}
              className="p-2 bg-white/[0.02] border border-white/[0.05] rounded-xl text-white/40 hover:text-white/60 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-xl font-light text-white">admin settings</h1>
              <p className="text-xs text-white/30 mt-1">configure your application</p>
            </div>
          </div>
          
          <button
            onClick={handleSaveSettings}
            disabled={saving}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-500/20 text-indigo-400 text-sm rounded-lg hover:bg-indigo-500/30 transition-colors disabled:opacity-50 border border-indigo-500/30"
          >
            <Save className="w-4 h-4" />
            {saving ? 'saving...' : 'save changes'}
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-6 border-b border-white/[0.05] pb-4 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30'
                  : 'text-white/30 hover:text-white/50'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Settings Content */}
        <div className="bg-white/[0.02] border border-white/[0.05] rounded-2xl overflow-hidden">
          {/* General Settings */}
          {activeTab === 'general' && (
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs text-white/40 mb-2">site name</label>
                  <input
                    type="text"
                    value={settings.siteName}
                    onChange={(e) => setSettings({...settings, siteName: e.target.value})}
                    className="w-full px-3 py-2 bg-white/[0.02] border border-white/[0.05] rounded-lg text-white placeholder:text-white/20 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs text-white/40 mb-2">site url</label>
                  <input
                    type="url"
                    value={settings.siteUrl}
                    onChange={(e) => setSettings({...settings, siteUrl: e.target.value})}
                    className="w-full px-3 py-2 bg-white/[0.02] border border-white/[0.05] rounded-lg text-white placeholder:text-white/20 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-white/40 mb-2">site description</label>
                <textarea
                  value={settings.siteDescription}
                  onChange={(e) => setSettings({...settings, siteDescription: e.target.value})}
                  rows={3}
                  className="w-full px-3 py-2 bg-white/[0.02] border border-white/[0.05] rounded-lg text-white placeholder:text-white/20 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20 text-sm resize-none"
                />
              </div>

              <div>
                <label className="block text-xs text-white/40 mb-2">support email</label>
                <input
                  type="email"
                  value={settings.supportEmail}
                  onChange={(e) => setSettings({...settings, supportEmail: e.target.value})}
                  className="w-full px-3 py-2 bg-white/[0.02] border border-white/[0.05] rounded-lg text-white placeholder:text-white/20 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20 text-sm"
                />
              </div>
            </div>
          )}

          {/* Appearance Settings */}
          {activeTab === 'appearance' && (
            <div className="p-6 space-y-6">
              <div>
                <label className="block text-xs text-white/40 mb-3">theme</label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: 'light', label: 'light', icon: Sun },
                    { id: 'dark', label: 'dark', icon: Moon },
                    { id: 'system', label: 'system', icon: Eye }
                  ].map((option) => (
                    <button
                      key={option.id}
                      onClick={() => setSettings({...settings, theme: option.id as any})}
                      className={`flex items-center justify-center gap-2 p-3 rounded-lg border transition-all ${
                        settings.theme === option.id
                          ? 'bg-indigo-500/20 border-indigo-500/30 text-indigo-400'
                          : 'bg-white/[0.02] border-white/[0.05] text-white/40 hover:text-white/60'
                      }`}
                    >
                      <option.icon className="w-4 h-4" />
                      <span className="text-sm">{option.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs text-white/40 mb-2">primary color</label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={settings.primaryColor}
                      onChange={(e) => setSettings({...settings, primaryColor: e.target.value})}
                      className="w-10 h-10 bg-transparent border border-white/[0.05] rounded-lg cursor-pointer"
                    />
                    <input
                      type="text"
                      value={settings.primaryColor}
                      onChange={(e) => setSettings({...settings, primaryColor: e.target.value})}
                      className="flex-1 px-3 py-2 bg-white/[0.02] border border-white/[0.05] rounded-lg text-white placeholder:text-white/20 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20 text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-white/40 mb-2">accent color</label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={settings.accentColor}
                      onChange={(e) => setSettings({...settings, accentColor: e.target.value})}
                      className="w-10 h-10 bg-transparent border border-white/[0.05] rounded-lg cursor-pointer"
                    />
                    <input
                      type="text"
                      value={settings.accentColor}
                      onChange={(e) => setSettings({...settings, accentColor: e.target.value})}
                      className="flex-1 px-3 py-2 bg-white/[0.02] border border-white/[0.05] rounded-lg text-white placeholder:text-white/20 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20 text-sm"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs text-white/40 mb-2">font family</label>
                <select
                  value={settings.fontFamily}
                  onChange={(e) => setSettings({...settings, fontFamily: e.target.value})}
                  className="w-full px-3 py-2 bg-white/[0.02] border border-white/[0.05] rounded-lg text-white focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20 text-sm"
                >
                  <option value="Inter">Inter</option>
                  <option value="System">System Default</option>
                  <option value="Roboto">Roboto</option>
                  <option value="Poppins">Poppins</option>
                </select>
              </div>
            </div>
          )}

          {/* Security Settings */}
          {activeTab === 'security' && (
            <div className="p-6 space-y-6">
              <div className="space-y-4">
                <label className="flex items-center justify-between p-3 bg-white/[0.02] border border-white/[0.05] rounded-lg">
                  <div>
                    <p className="text-sm text-white">require email verification</p>
                    <p className="text-xs text-white/30 mt-1">users must verify email before accessing</p>
                  </div>
                  <button
                    onClick={() => setSettings({...settings, requireEmailVerification: !settings.requireEmailVerification})}
                    className={`relative w-12 h-6 rounded-full transition-colors ${
                      settings.requireEmailVerification ? 'bg-indigo-500' : 'bg-white/20'
                    }`}
                  >
                    <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${
                      settings.requireEmailVerification ? 'left-7' : 'left-1'
                    }`}></div>
                  </button>
                </label>

                <label className="flex items-center justify-between p-3 bg-white/[0.02] border border-white/[0.05] rounded-lg">
                  <div>
                    <p className="text-sm text-white">two factor authentication</p>
                    <p className="text-xs text-white/30 mt-1">enable 2FA for admin accounts</p>
                  </div>
                  <button
                    onClick={() => setSettings({...settings, twoFactorAuth: !settings.twoFactorAuth})}
                    className={`relative w-12 h-6 rounded-full transition-colors ${
                      settings.twoFactorAuth ? 'bg-indigo-500' : 'bg-white/20'
                    }`}
                  >
                    <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${
                      settings.twoFactorAuth ? 'left-7' : 'left-1'
                    }`}></div>
                  </button>
                </label>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs text-white/40 mb-2">session timeout (minutes)</label>
                  <input
                    type="number"
                    value={settings.sessionTimeout}
                    onChange={(e) => setSettings({...settings, sessionTimeout: Number(e.target.value)})}
                    min="5"
                    max="480"
                    className="w-full px-3 py-2 bg-white/[0.02] border border-white/[0.05] rounded-lg text-white focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs text-white/40 mb-2">max login attempts</label>
                  <input
                    type="number"
                    value={settings.maxLoginAttempts}
                    onChange={(e) => setSettings({...settings, maxLoginAttempts: Number(e.target.value)})}
                    min="3"
                    max="10"
                    className="w-full px-3 py-2 bg-white/[0.02] border border-white/[0.05] rounded-lg text-white focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20 text-sm"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Email Settings */}
          {activeTab === 'email' && (
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs text-white/40 mb-2">smtp server</label>
                  <input
                    type="text"
                    value={settings.smtpServer}
                    onChange={(e) => setSettings({...settings, smtpServer: e.target.value})}
                    className="w-full px-3 py-2 bg-white/[0.02] border border-white/[0.05] rounded-lg text-white placeholder:text-white/20 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs text-white/40 mb-2">smtp port</label>
                  <input
                    type="number"
                    value={settings.smtpPort}
                    onChange={(e) => setSettings({...settings, smtpPort: Number(e.target.value)})}
                    className="w-full px-3 py-2 bg-white/[0.02] border border-white/[0.05] rounded-lg text-white focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20 text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs text-white/40 mb-2">smtp username</label>
                  <input
                    type="text"
                    value={settings.smtpUsername}
                    onChange={(e) => setSettings({...settings, smtpUsername: e.target.value})}
                    className="w-full px-3 py-2 bg-white/[0.02] border border-white/[0.05] rounded-lg text-white placeholder:text-white/20 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs text-white/40 mb-2">smtp password</label>
                  <div className="relative">
                    <input
                      type={showSmtpPassword ? 'text' : 'password'}
                      value={settings.smtpPassword}
                      onChange={(e) => setSettings({...settings, smtpPassword: e.target.value})}
                      className="w-full px-3 py-2 bg-white/[0.02] border border-white/[0.05] rounded-lg text-white placeholder:text-white/20 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20 text-sm pr-10"
                    />
                    <button
                      onClick={() => setShowSmtpPassword(!showSmtpPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60"
                    >
                      {showSmtpPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs text-white/40 mb-2">from email</label>
                <input
                  type="email"
                  value={settings.fromEmail}
                  onChange={(e) => setSettings({...settings, fromEmail: e.target.value})}
                  className="w-full px-3 py-2 bg-white/[0.02] border border-white/[0.05] rounded-lg text-white placeholder:text-white/20 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20 text-sm"
                />
              </div>
            </div>
          )}

          {/* Quiz Settings */}
          {activeTab === 'quiz' && (
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs text-white/40 mb-2">default quiz duration (min)</label>
                  <input
                    type="number"
                    value={settings.defaultQuizDuration}
                    onChange={(e) => setSettings({...settings, defaultQuizDuration: Number(e.target.value)})}
                    min="5"
                    max="180"
                    className="w-full px-3 py-2 bg-white/[0.02] border border-white/[0.05] rounded-lg text-white focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs text-white/40 mb-2">max questions per quiz</label>
                  <input
                    type="number"
                    value={settings.maxQuestionsPerQuiz}
                    onChange={(e) => setSettings({...settings, maxQuestionsPerQuiz: Number(e.target.value)})}
                    min="1"
                    max="100"
                    className="w-full px-3 py-2 bg-white/[0.02] border border-white/[0.05] rounded-lg text-white focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20 text-sm"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <label className="flex items-center justify-between p-3 bg-white/[0.02] border border-white/[0.05] rounded-lg">
                  <div>
                    <p className="text-sm text-white">allow quiz retakes</p>
                    <p className="text-xs text-white/30 mt-1">students can retake quizzes multiple times</p>
                  </div>
                  <button
                    onClick={() => setSettings({...settings, allowQuizRetakes: !settings.allowQuizRetakes})}
                    className={`relative w-12 h-6 rounded-full transition-colors ${
                      settings.allowQuizRetakes ? 'bg-indigo-500' : 'bg-white/20'
                    }`}
                  >
                    <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${
                      settings.allowQuizRetakes ? 'left-7' : 'left-1'
                    }`}></div>
                  </button>
                </label>

                <label className="flex items-center justify-between p-3 bg-white/[0.02] border border-white/[0.05] rounded-lg">
                  <div>
                    <p className="text-sm text-white">show answers after quiz</p>
                    <p className="text-xs text-white/30 mt-1">display correct answers after submission</p>
                  </div>
                  <button
                    onClick={() => setSettings({...settings, showAnswersAfterQuiz: !settings.showAnswersAfterQuiz})}
                    className={`relative w-12 h-6 rounded-full transition-colors ${
                      settings.showAnswersAfterQuiz ? 'bg-indigo-500' : 'bg-white/20'
                    }`}
                  >
                    <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${
                      settings.showAnswersAfterQuiz ? 'left-7' : 'left-1'
                    }`}></div>
                  </button>
                </label>
              </div>
            </div>
          )}

          {/* Maintenance */}
          {activeTab === 'maintenance' && (
            <div className="p-6 space-y-6">
              <div className="space-y-4">
                <label className="flex items-center justify-between p-3 bg-white/[0.02] border border-white/[0.05] rounded-lg">
                  <div>
                    <p className="text-sm text-white">maintenance mode</p>
                    <p className="text-xs text-white/30 mt-1">disable access for regular users</p>
                  </div>
                  <button
                    onClick={() => setSettings({...settings, maintenanceMode: !settings.maintenanceMode})}
                    className={`relative w-12 h-6 rounded-full transition-colors ${
                      settings.maintenanceMode ? 'bg-indigo-500' : 'bg-white/20'
                    }`}
                  >
                    <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${
                      settings.maintenanceMode ? 'left-7' : 'left-1'
                    }`}></div>
                  </button>
                </label>

                <label className="flex items-center justify-between p-3 bg-white/[0.02] border border-white/[0.05] rounded-lg">
                  <div>
                    <p className="text-sm text-white">debug mode</p>
                    <p className="text-xs text-white/30 mt-1">enable detailed error logging</p>
                  </div>
                  <button
                    onClick={() => setSettings({...settings, debugMode: !settings.debugMode})}
                    className={`relative w-12 h-6 rounded-full transition-colors ${
                      settings.debugMode ? 'bg-indigo-500' : 'bg-white/20'
                    }`}
                  >
                    <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${
                      settings.debugMode ? 'left-7' : 'left-1'
                    }`}></div>
                  </button>
                </label>

                <div>
                  <label className="block text-xs text-white/40 mb-2">log level</label>
                  <select
                    value={settings.logLevel}
                    onChange={(e) => setSettings({...settings, logLevel: e.target.value as any})}
                    className="w-full px-3 py-2 bg-white/[0.02] border border-white/[0.05] rounded-lg text-white focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20 text-sm"
                  >
                    <option value="error">Error</option>
                    <option value="warn">Warning</option>
                    <option value="info">Info</option>
                    <option value="debug">Debug</option>
                  </select>
                </div>
              </div>

              <div className="border-t border-white/[0.05] pt-6">
                <h3 className="text-sm font-medium text-white mb-4">data management</h3>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={handleExportData}
                    className="flex items-center justify-center gap-2 p-3 bg-white/[0.02] border border-white/[0.05] rounded-lg text-white/40 hover:text-indigo-400 hover:border-indigo-500/30 transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    <span className="text-sm">export data</span>
                  </button>
                  <button
                    onClick={handleImportData}
                    className="flex items-center justify-center gap-2 p-3 bg-white/[0.02] border border-white/[0.05] rounded-lg text-white/40 hover:text-indigo-400 hover:border-indigo-500/30 transition-colors"
                  >
                    <Upload className="w-4 h-4" />
                    <span className="text-sm">import data</span>
                  </button>
                </div>

                <div className="mt-4">
                  <button
                    onClick={handleClearCache}
                    className="flex items-center justify-center gap-2 p-3 bg-white/[0.02] border border-white/[0.05] rounded-lg text-white/40 hover:text-yellow-400 hover:border-yellow-500/30 transition-colors w-full"
                  >
                    <RefreshCw className="w-4 h-4" />
                    <span className="text-sm">clear cache</span>
                  </button>
                </div>

                <div className="mt-4">
                  {!confirmDelete ? (
                    <button
                      onClick={() => setConfirmDelete(true)}
                      className="flex items-center justify-center gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 hover:bg-red-500/20 transition-colors w-full"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span className="text-sm">delete all data</span>
                    </button>
                  ) : (
                    <div className="space-y-3">
                      <p className="text-xs text-red-400/80 text-center">are you sure? this action cannot be undone.</p>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setConfirmDelete(false)}
                          className="flex-1 p-2 bg-white/[0.02] border border-white/[0.05] rounded-lg text-white/40 hover:text-white/60 transition-colors text-sm"
                        >
                          cancel
                        </button>
                        <button
                          onClick={() => {
                            setConfirmDelete(false);
                            showToast.error('Data deletion is disabled in demo');
                          }}
                          className="flex-1 p-2 bg-red-500/20 border border-red-500/30 rounded-lg text-red-400 hover:bg-red-500/30 transition-colors text-sm"
                        >
                          confirm
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-4 text-center">
          <p className="text-xs text-white/20">
            changes are applied immediately after saving
          </p>
        </div>
      </div>
    </div>
  );
}