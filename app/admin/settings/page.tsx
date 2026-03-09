// 'use client';

// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { motion } from 'framer-motion';
// import { Toaster, toast as hotToast } from 'react-hot-toast';
// import { 
//   Save,
//   ArrowLeft,
//   Shield,
//   Globe,
//   Bell,
//   Mail,
//   Users,
//   Eye,
//   EyeOff,
//   Moon,
//   Sun,
//   Lock,
//   Key,
//   Database,
//   RefreshCw,
//   Download,
//   Upload,
//   Trash2,
//   AlertCircle,
//   CheckCircle,
//   XCircle,
//   Settings as SettingsIcon,
//   Palette,
//   Type,
//   Layout,
//   Sparkles
// } from 'lucide-react';
// import { showToast } from '@/lib/toast';

// interface SettingsData {
//   // General Settings
//   siteName: string;
//   siteDescription: string;
//   siteUrl: string;
//   supportEmail: string;
  
//   // Appearance
//   theme: 'light' | 'dark' | 'system';
//   primaryColor: string;
//   accentColor: string;
//   fontFamily: string;
  
//   // Security
//   requireEmailVerification: boolean;
//   twoFactorAuth: boolean;
//   sessionTimeout: number;
//   maxLoginAttempts: number;
  
//   // Registration
//   allowRegistration: boolean;
//   defaultUserRole: 'student' | 'teacher';
//   requireAdminApproval: boolean;
  
//   // Email Settings
//   smtpServer: string;
//   smtpPort: number;
//   smtpUsername: string;
//   smtpPassword: string;
//   fromEmail: string;
  
//   // Quiz Settings
//   defaultQuizDuration: number;
//   maxQuestionsPerQuiz: number;
//   allowQuizRetakes: boolean;
//   showAnswersAfterQuiz: boolean;
  
//   // Maintenance
//   maintenanceMode: boolean;
//   debugMode: boolean;
//   logLevel: 'error' | 'warn' | 'info' | 'debug';
// }

// export default function AdminSettingsPage() {
//   const router = useRouter();
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);
//   const [activeTab, setActiveTab] = useState('general');
//   const [showSmtpPassword, setShowSmtpPassword] = useState(false);
//   const [confirmDelete, setConfirmDelete] = useState(false);
  
//   // Settings state
//   const [settings, setSettings] = useState<SettingsData>({
//     // General
//     siteName: 'QuizMaster',
//     siteDescription: 'Modern quiz platform for education',
//     siteUrl: 'https://quizmaster.com',
//     supportEmail: 'support@quizmaster.com',
    
//     // Appearance
//     theme: 'dark',
//     primaryColor: '#6366f1',
//     accentColor: '#8b5cf6',
//     fontFamily: 'Inter',
    
//     // Security
//     requireEmailVerification: true,
//     twoFactorAuth: false,
//     sessionTimeout: 60,
//     maxLoginAttempts: 5,
    
//     // Registration
//     allowRegistration: true,
//     defaultUserRole: 'student',
//     requireAdminApproval: false,
    
//     // Email
//     smtpServer: 'smtp.gmail.com',
//     smtpPort: 587,
//     smtpUsername: 'admin@quizmaster.com',
//     smtpPassword: '••••••••',
//     fromEmail: 'noreply@quizmaster.com',
    
//     // Quiz
//     defaultQuizDuration: 30,
//     maxQuestionsPerQuiz: 50,
//     allowQuizRetakes: true,
//     showAnswersAfterQuiz: true,
    
//     // Maintenance
//     maintenanceMode: false,
//     debugMode: false,
//     logLevel: 'error'
//   });

//   useEffect(() => {
//     fetchSettings();
//   }, []);

//   const fetchSettings = async () => {
//     try {
//       // Simulate API call
//       await new Promise(resolve => setTimeout(resolve, 1000));
//       setLoading(false);
//     } catch (error) {
//       showToast.error('Failed to load settings');
//       setLoading(false);
//     }
//   };

//   const handleSaveSettings = async () => {
//     setSaving(true);
//     const toastId = showToast.loading('Saving settings...');

//     try {
//       // Simulate API call
//       await new Promise(resolve => setTimeout(resolve, 1500));
      
//       hotToast.dismiss(toastId);
//       showToast.success('Settings saved successfully');
//     } catch (error) {
//       hotToast.dismiss(toastId);
//       showToast.error('Failed to save settings');
//     } finally {
//       setSaving(false);
//     }
//   };

//   const handleExportData = async () => {
//     const toastId = showToast.loading('Exporting data...');
    
//     try {
//       await new Promise(resolve => setTimeout(resolve, 2000));
//       hotToast.dismiss(toastId);
//       showToast.success('Data exported successfully');
//     } catch (error) {
//       hotToast.dismiss(toastId);
//       showToast.error('Export failed');
//     }
//   };

//   const handleImportData = async () => {
//     const toastId = showToast.loading('Importing data...');
    
//     try {
//       await new Promise(resolve => setTimeout(resolve, 2000));
//       hotToast.dismiss(toastId);
//       showToast.success('Data imported successfully');
//     } catch (error) {
//       hotToast.dismiss(toastId);
//       showToast.error('Import failed');
//     }
//   };

//   const handleClearCache = async () => {
//     const toastId = showToast.loading('Clearing cache...');
    
//     try {
//       await new Promise(resolve => setTimeout(resolve, 1000));
//       hotToast.dismiss(toastId);
//       showToast.success('Cache cleared successfully');
//     } catch (error) {
//       hotToast.dismiss(toastId);
//       showToast.error('Failed to clear cache');
//     }
//   };

//   const tabs = [
//     { id: 'general', label: 'general', icon: SettingsIcon },
//     { id: 'appearance', label: 'appearance', icon: Palette },
//     { id: 'security', label: 'security', icon: Shield },
//     { id: 'email', label: 'email', icon: Mail },
//     { id: 'quiz', label: 'quiz', icon: Layout },
//     { id: 'maintenance', label: 'maintenance', icon: Database }
//   ];

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-[#09090B] flex items-center justify-center">
//         <div className="relative">
//           <div className="w-12 h-12 border-2 border-indigo-400/20 border-t-indigo-400 rounded-full animate-spin"></div>
//           <div className="absolute inset-0 flex items-center justify-center">
//             <SettingsIcon className="w-5 h-5 text-indigo-400/60 animate-pulse" />
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-[#09090B]">
//       <Toaster position="top-right" />
      
//       <div className="max-w-7xl mx-auto px-4 py-8">
//         {/* Header */}
//         <div className="flex items-center justify-between mb-6">
//           <div className="flex items-center gap-3">
//             <button
//               onClick={() => router.back()}
//               className="p-2 bg-white/[0.02] border border-white/[0.05] rounded-xl text-white/40 hover:text-white/60 transition-colors"
//             >
//               <ArrowLeft className="w-5 h-5" />
//             </button>
//             <div>
//               <h1 className="text-xl font-light text-white">admin settings</h1>
//               <p className="text-xs text-white/30 mt-1">configure your application</p>
//             </div>
//           </div>
          
//           <button
//             onClick={handleSaveSettings}
//             disabled={saving}
//             className="flex items-center gap-2 px-4 py-2 bg-indigo-500/20 text-indigo-400 text-sm rounded-lg hover:bg-indigo-500/30 transition-colors disabled:opacity-50 border border-indigo-500/30"
//           >
//             <Save className="w-4 h-4" />
//             {saving ? 'saving...' : 'save changes'}
//           </button>
//         </div>

//         {/* Tabs */}
//         <div className="flex gap-1 mb-6 border-b border-white/[0.05] pb-4 overflow-x-auto">
//           {tabs.map((tab) => (
//             <button
//               key={tab.id}
//               onClick={() => setActiveTab(tab.id)}
//               className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-all whitespace-nowrap ${
//                 activeTab === tab.id
//                   ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30'
//                   : 'text-white/30 hover:text-white/50'
//               }`}
//             >
//               <tab.icon className="w-4 h-4" />
//               {tab.label}
//             </button>
//           ))}
//         </div>

//         {/* Settings Content */}
//         <div className="bg-white/[0.02] border border-white/[0.05] rounded-2xl overflow-hidden">
//           {/* General Settings */}
//           {activeTab === 'general' && (
//             <div className="p-6 space-y-6">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div>
//                   <label className="block text-xs text-white/40 mb-2">site name</label>
//                   <input
//                     type="text"
//                     value={settings.siteName}
//                     onChange={(e) => setSettings({...settings, siteName: e.target.value})}
//                     className="w-full px-3 py-2 bg-white/[0.02] border border-white/[0.05] rounded-lg text-white placeholder:text-white/20 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20 text-sm"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-xs text-white/40 mb-2">site url</label>
//                   <input
//                     type="url"
//                     value={settings.siteUrl}
//                     onChange={(e) => setSettings({...settings, siteUrl: e.target.value})}
//                     className="w-full px-3 py-2 bg-white/[0.02] border border-white/[0.05] rounded-lg text-white placeholder:text-white/20 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20 text-sm"
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-xs text-white/40 mb-2">site description</label>
//                 <textarea
//                   value={settings.siteDescription}
//                   onChange={(e) => setSettings({...settings, siteDescription: e.target.value})}
//                   rows={3}
//                   className="w-full px-3 py-2 bg-white/[0.02] border border-white/[0.05] rounded-lg text-white placeholder:text-white/20 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20 text-sm resize-none"
//                 />
//               </div>

//               <div>
//                 <label className="block text-xs text-white/40 mb-2">support email</label>
//                 <input
//                   type="email"
//                   value={settings.supportEmail}
//                   onChange={(e) => setSettings({...settings, supportEmail: e.target.value})}
//                   className="w-full px-3 py-2 bg-white/[0.02] border border-white/[0.05] rounded-lg text-white placeholder:text-white/20 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20 text-sm"
//                 />
//               </div>
//             </div>
//           )}

//           {/* Appearance Settings */}
//           {activeTab === 'appearance' && (
//             <div className="p-6 space-y-6">
//               <div>
//                 <label className="block text-xs text-white/40 mb-3">theme</label>
//                 <div className="grid grid-cols-3 gap-3">
//                   {[
//                     { id: 'light', label: 'light', icon: Sun },
//                     { id: 'dark', label: 'dark', icon: Moon },
//                     { id: 'system', label: 'system', icon: Eye }
//                   ].map((option) => (
//                     <button
//                       key={option.id}
//                       onClick={() => setSettings({...settings, theme: option.id as any})}
//                       className={`flex items-center justify-center gap-2 p-3 rounded-lg border transition-all ${
//                         settings.theme === option.id
//                           ? 'bg-indigo-500/20 border-indigo-500/30 text-indigo-400'
//                           : 'bg-white/[0.02] border-white/[0.05] text-white/40 hover:text-white/60'
//                       }`}
//                     >
//                       <option.icon className="w-4 h-4" />
//                       <span className="text-sm">{option.label}</span>
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               <div className="grid grid-cols-2 gap-6">
//                 <div>
//                   <label className="block text-xs text-white/40 mb-2">primary color</label>
//                   <div className="flex gap-2">
//                     <input
//                       type="color"
//                       value={settings.primaryColor}
//                       onChange={(e) => setSettings({...settings, primaryColor: e.target.value})}
//                       className="w-10 h-10 bg-transparent border border-white/[0.05] rounded-lg cursor-pointer"
//                     />
//                     <input
//                       type="text"
//                       value={settings.primaryColor}
//                       onChange={(e) => setSettings({...settings, primaryColor: e.target.value})}
//                       className="flex-1 px-3 py-2 bg-white/[0.02] border border-white/[0.05] rounded-lg text-white placeholder:text-white/20 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20 text-sm"
//                     />
//                   </div>
//                 </div>
//                 <div>
//                   <label className="block text-xs text-white/40 mb-2">accent color</label>
//                   <div className="flex gap-2">
//                     <input
//                       type="color"
//                       value={settings.accentColor}
//                       onChange={(e) => setSettings({...settings, accentColor: e.target.value})}
//                       className="w-10 h-10 bg-transparent border border-white/[0.05] rounded-lg cursor-pointer"
//                     />
//                     <input
//                       type="text"
//                       value={settings.accentColor}
//                       onChange={(e) => setSettings({...settings, accentColor: e.target.value})}
//                       className="flex-1 px-3 py-2 bg-white/[0.02] border border-white/[0.05] rounded-lg text-white placeholder:text-white/20 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20 text-sm"
//                     />
//                   </div>
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-xs text-white/40 mb-2">font family</label>
//                 <select
//                   value={settings.fontFamily}
//                   onChange={(e) => setSettings({...settings, fontFamily: e.target.value})}
//                   className="w-full px-3 py-2 bg-white/[0.02] border border-white/[0.05] rounded-lg text-white focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20 text-sm"
//                 >
//                   <option value="Inter">Inter</option>
//                   <option value="System">System Default</option>
//                   <option value="Roboto">Roboto</option>
//                   <option value="Poppins">Poppins</option>
//                 </select>
//               </div>
//             </div>
//           )}

//           {/* Security Settings */}
//           {activeTab === 'security' && (
//             <div className="p-6 space-y-6">
//               <div className="space-y-4">
//                 <label className="flex items-center justify-between p-3 bg-white/[0.02] border border-white/[0.05] rounded-lg">
//                   <div>
//                     <p className="text-sm text-white">require email verification</p>
//                     <p className="text-xs text-white/30 mt-1">users must verify email before accessing</p>
//                   </div>
//                   <button
//                     onClick={() => setSettings({...settings, requireEmailVerification: !settings.requireEmailVerification})}
//                     className={`relative w-12 h-6 rounded-full transition-colors ${
//                       settings.requireEmailVerification ? 'bg-indigo-500' : 'bg-white/20'
//                     }`}
//                   >
//                     <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${
//                       settings.requireEmailVerification ? 'left-7' : 'left-1'
//                     }`}></div>
//                   </button>
//                 </label>

//                 <label className="flex items-center justify-between p-3 bg-white/[0.02] border border-white/[0.05] rounded-lg">
//                   <div>
//                     <p className="text-sm text-white">two factor authentication</p>
//                     <p className="text-xs text-white/30 mt-1">enable 2FA for admin accounts</p>
//                   </div>
//                   <button
//                     onClick={() => setSettings({...settings, twoFactorAuth: !settings.twoFactorAuth})}
//                     className={`relative w-12 h-6 rounded-full transition-colors ${
//                       settings.twoFactorAuth ? 'bg-indigo-500' : 'bg-white/20'
//                     }`}
//                   >
//                     <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${
//                       settings.twoFactorAuth ? 'left-7' : 'left-1'
//                     }`}></div>
//                   </button>
//                 </label>
//               </div>

//               <div className="grid grid-cols-2 gap-6">
//                 <div>
//                   <label className="block text-xs text-white/40 mb-2">session timeout (minutes)</label>
//                   <input
//                     type="number"
//                     value={settings.sessionTimeout}
//                     onChange={(e) => setSettings({...settings, sessionTimeout: Number(e.target.value)})}
//                     min="5"
//                     max="480"
//                     className="w-full px-3 py-2 bg-white/[0.02] border border-white/[0.05] rounded-lg text-white focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20 text-sm"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-xs text-white/40 mb-2">max login attempts</label>
//                   <input
//                     type="number"
//                     value={settings.maxLoginAttempts}
//                     onChange={(e) => setSettings({...settings, maxLoginAttempts: Number(e.target.value)})}
//                     min="3"
//                     max="10"
//                     className="w-full px-3 py-2 bg-white/[0.02] border border-white/[0.05] rounded-lg text-white focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20 text-sm"
//                   />
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Email Settings */}
//           {activeTab === 'email' && (
//             <div className="p-6 space-y-6">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div>
//                   <label className="block text-xs text-white/40 mb-2">smtp server</label>
//                   <input
//                     type="text"
//                     value={settings.smtpServer}
//                     onChange={(e) => setSettings({...settings, smtpServer: e.target.value})}
//                     className="w-full px-3 py-2 bg-white/[0.02] border border-white/[0.05] rounded-lg text-white placeholder:text-white/20 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20 text-sm"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-xs text-white/40 mb-2">smtp port</label>
//                   <input
//                     type="number"
//                     value={settings.smtpPort}
//                     onChange={(e) => setSettings({...settings, smtpPort: Number(e.target.value)})}
//                     className="w-full px-3 py-2 bg-white/[0.02] border border-white/[0.05] rounded-lg text-white focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20 text-sm"
//                   />
//                 </div>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div>
//                   <label className="block text-xs text-white/40 mb-2">smtp username</label>
//                   <input
//                     type="text"
//                     value={settings.smtpUsername}
//                     onChange={(e) => setSettings({...settings, smtpUsername: e.target.value})}
//                     className="w-full px-3 py-2 bg-white/[0.02] border border-white/[0.05] rounded-lg text-white placeholder:text-white/20 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20 text-sm"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-xs text-white/40 mb-2">smtp password</label>
//                   <div className="relative">
//                     <input
//                       type={showSmtpPassword ? 'text' : 'password'}
//                       value={settings.smtpPassword}
//                       onChange={(e) => setSettings({...settings, smtpPassword: e.target.value})}
//                       className="w-full px-3 py-2 bg-white/[0.02] border border-white/[0.05] rounded-lg text-white placeholder:text-white/20 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20 text-sm pr-10"
//                     />
//                     <button
//                       onClick={() => setShowSmtpPassword(!showSmtpPassword)}
//                       className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60"
//                     >
//                       {showSmtpPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
//                     </button>
//                   </div>
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-xs text-white/40 mb-2">from email</label>
//                 <input
//                   type="email"
//                   value={settings.fromEmail}
//                   onChange={(e) => setSettings({...settings, fromEmail: e.target.value})}
//                   className="w-full px-3 py-2 bg-white/[0.02] border border-white/[0.05] rounded-lg text-white placeholder:text-white/20 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20 text-sm"
//                 />
//               </div>
//             </div>
//           )}

//           {/* Quiz Settings */}
//           {activeTab === 'quiz' && (
//             <div className="p-6 space-y-6">
//               <div className="grid grid-cols-2 gap-6">
//                 <div>
//                   <label className="block text-xs text-white/40 mb-2">default quiz duration (min)</label>
//                   <input
//                     type="number"
//                     value={settings.defaultQuizDuration}
//                     onChange={(e) => setSettings({...settings, defaultQuizDuration: Number(e.target.value)})}
//                     min="5"
//                     max="180"
//                     className="w-full px-3 py-2 bg-white/[0.02] border border-white/[0.05] rounded-lg text-white focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20 text-sm"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-xs text-white/40 mb-2">max questions per quiz</label>
//                   <input
//                     type="number"
//                     value={settings.maxQuestionsPerQuiz}
//                     onChange={(e) => setSettings({...settings, maxQuestionsPerQuiz: Number(e.target.value)})}
//                     min="1"
//                     max="100"
//                     className="w-full px-3 py-2 bg-white/[0.02] border border-white/[0.05] rounded-lg text-white focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20 text-sm"
//                   />
//                 </div>
//               </div>

//               <div className="space-y-4">
//                 <label className="flex items-center justify-between p-3 bg-white/[0.02] border border-white/[0.05] rounded-lg">
//                   <div>
//                     <p className="text-sm text-white">allow quiz retakes</p>
//                     <p className="text-xs text-white/30 mt-1">students can retake quizzes multiple times</p>
//                   </div>
//                   <button
//                     onClick={() => setSettings({...settings, allowQuizRetakes: !settings.allowQuizRetakes})}
//                     className={`relative w-12 h-6 rounded-full transition-colors ${
//                       settings.allowQuizRetakes ? 'bg-indigo-500' : 'bg-white/20'
//                     }`}
//                   >
//                     <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${
//                       settings.allowQuizRetakes ? 'left-7' : 'left-1'
//                     }`}></div>
//                   </button>
//                 </label>

//                 <label className="flex items-center justify-between p-3 bg-white/[0.02] border border-white/[0.05] rounded-lg">
//                   <div>
//                     <p className="text-sm text-white">show answers after quiz</p>
//                     <p className="text-xs text-white/30 mt-1">display correct answers after submission</p>
//                   </div>
//                   <button
//                     onClick={() => setSettings({...settings, showAnswersAfterQuiz: !settings.showAnswersAfterQuiz})}
//                     className={`relative w-12 h-6 rounded-full transition-colors ${
//                       settings.showAnswersAfterQuiz ? 'bg-indigo-500' : 'bg-white/20'
//                     }`}
//                   >
//                     <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${
//                       settings.showAnswersAfterQuiz ? 'left-7' : 'left-1'
//                     }`}></div>
//                   </button>
//                 </label>
//               </div>
//             </div>
//           )}

//           {/* Maintenance */}
//           {activeTab === 'maintenance' && (
//             <div className="p-6 space-y-6">
//               <div className="space-y-4">
//                 <label className="flex items-center justify-between p-3 bg-white/[0.02] border border-white/[0.05] rounded-lg">
//                   <div>
//                     <p className="text-sm text-white">maintenance mode</p>
//                     <p className="text-xs text-white/30 mt-1">disable access for regular users</p>
//                   </div>
//                   <button
//                     onClick={() => setSettings({...settings, maintenanceMode: !settings.maintenanceMode})}
//                     className={`relative w-12 h-6 rounded-full transition-colors ${
//                       settings.maintenanceMode ? 'bg-indigo-500' : 'bg-white/20'
//                     }`}
//                   >
//                     <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${
//                       settings.maintenanceMode ? 'left-7' : 'left-1'
//                     }`}></div>
//                   </button>
//                 </label>

//                 <label className="flex items-center justify-between p-3 bg-white/[0.02] border border-white/[0.05] rounded-lg">
//                   <div>
//                     <p className="text-sm text-white">debug mode</p>
//                     <p className="text-xs text-white/30 mt-1">enable detailed error logging</p>
//                   </div>
//                   <button
//                     onClick={() => setSettings({...settings, debugMode: !settings.debugMode})}
//                     className={`relative w-12 h-6 rounded-full transition-colors ${
//                       settings.debugMode ? 'bg-indigo-500' : 'bg-white/20'
//                     }`}
//                   >
//                     <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${
//                       settings.debugMode ? 'left-7' : 'left-1'
//                     }`}></div>
//                   </button>
//                 </label>

//                 <div>
//                   <label className="block text-xs text-white/40 mb-2">log level</label>
//                   <select
//                     value={settings.logLevel}
//                     onChange={(e) => setSettings({...settings, logLevel: e.target.value as any})}
//                     className="w-full px-3 py-2 bg-white/[0.02] border border-white/[0.05] rounded-lg text-white focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20 text-sm"
//                   >
//                     <option value="error">Error</option>
//                     <option value="warn">Warning</option>
//                     <option value="info">Info</option>
//                     <option value="debug">Debug</option>
//                   </select>
//                 </div>
//               </div>

//               <div className="border-t border-white/[0.05] pt-6">
//                 <h3 className="text-sm font-medium text-white mb-4">data management</h3>
//                 <div className="grid grid-cols-2 gap-4">
//                   <button
//                     onClick={handleExportData}
//                     className="flex items-center justify-center gap-2 p-3 bg-white/[0.02] border border-white/[0.05] rounded-lg text-white/40 hover:text-indigo-400 hover:border-indigo-500/30 transition-colors"
//                   >
//                     <Download className="w-4 h-4" />
//                     <span className="text-sm">export data</span>
//                   </button>
//                   <button
//                     onClick={handleImportData}
//                     className="flex items-center justify-center gap-2 p-3 bg-white/[0.02] border border-white/[0.05] rounded-lg text-white/40 hover:text-indigo-400 hover:border-indigo-500/30 transition-colors"
//                   >
//                     <Upload className="w-4 h-4" />
//                     <span className="text-sm">import data</span>
//                   </button>
//                 </div>

//                 <div className="mt-4">
//                   <button
//                     onClick={handleClearCache}
//                     className="flex items-center justify-center gap-2 p-3 bg-white/[0.02] border border-white/[0.05] rounded-lg text-white/40 hover:text-yellow-400 hover:border-yellow-500/30 transition-colors w-full"
//                   >
//                     <RefreshCw className="w-4 h-4" />
//                     <span className="text-sm">clear cache</span>
//                   </button>
//                 </div>

//                 <div className="mt-4">
//                   {!confirmDelete ? (
//                     <button
//                       onClick={() => setConfirmDelete(true)}
//                       className="flex items-center justify-center gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 hover:bg-red-500/20 transition-colors w-full"
//                     >
//                       <Trash2 className="w-4 h-4" />
//                       <span className="text-sm">delete all data</span>
//                     </button>
//                   ) : (
//                     <div className="space-y-3">
//                       <p className="text-xs text-red-400/80 text-center">are you sure? this action cannot be undone.</p>
//                       <div className="flex gap-2">
//                         <button
//                           onClick={() => setConfirmDelete(false)}
//                           className="flex-1 p-2 bg-white/[0.02] border border-white/[0.05] rounded-lg text-white/40 hover:text-white/60 transition-colors text-sm"
//                         >
//                           cancel
//                         </button>
//                         <button
//                           onClick={() => {
//                             setConfirmDelete(false);
//                             showToast.error('Data deletion is disabled in demo');
//                           }}
//                           className="flex-1 p-2 bg-red-500/20 border border-red-500/30 rounded-lg text-red-400 hover:bg-red-500/30 transition-colors text-sm"
//                         >
//                           confirm
//                         </button>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Footer */}
//         <div className="mt-4 text-center">
//           <p className="text-xs text-white/20">
//             changes are applied immediately after saving
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }







'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Toaster, toast } from 'react-hot-toast';
import {
  Save, Shield, Globe, Bell, Mail, Users, Eye, EyeOff,
  Lock, Database, RefreshCw, Download, Trash2,
  AlertCircle, CheckCircle, Settings as SettingsIcon,
  Palette, BookOpen
} from 'lucide-react';
import { showToast } from '@/lib/toast';

interface SettingsData {
  siteName: string; siteDescription: string; siteUrl: string; supportEmail: string;
  theme: 'light' | 'dark' | 'system'; primaryColor: string; accentColor: string; fontFamily: string;
  requireEmailVerification: boolean; twoFactorAuth: boolean; sessionTimeout: number; maxLoginAttempts: number;
  allowRegistration: boolean; defaultUserRole: 'student' | 'teacher'; requireAdminApproval: boolean;
  smtpServer: string; smtpPort: number; smtpUsername: string; smtpPassword: string; fromEmail: string;
  defaultQuizDuration: number; maxQuestionsPerQuiz: number; allowQuizRetakes: boolean; showAnswersAfterQuiz: boolean;
  maintenanceMode: boolean; debugMode: boolean; logLevel: 'error' | 'warn' | 'info' | 'debug';
}

const TABS = [
  { id: 'general', label: 'General', icon: Globe },
  { id: 'appearance', label: 'Appearance', icon: Palette },
  { id: 'security', label: 'Security', icon: Shield },
  { id: 'email', label: 'Email', icon: Mail },
  { id: 'quiz', label: 'Quiz', icon: BookOpen },
  { id: 'system', label: 'System', icon: Database },
];

export default function AdminSettingsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('general');
  const [showSmtpPassword, setShowSmtpPassword] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [settings, setSettings] = useState<SettingsData>({
    siteName: 'QuizMaster', siteDescription: 'Modern quiz platform for education',
    siteUrl: 'https://quizmaster.com', supportEmail: 'support@quizmaster.com',
    theme: 'dark', primaryColor: '#059669', accentColor: '#34d399', fontFamily: 'DM Sans',
    requireEmailVerification: true, twoFactorAuth: false, sessionTimeout: 60, maxLoginAttempts: 5,
    allowRegistration: true, defaultUserRole: 'student', requireAdminApproval: false,
    smtpServer: 'smtp.gmail.com', smtpPort: 587, smtpUsername: '', smtpPassword: '', fromEmail: '',
    defaultQuizDuration: 30, maxQuestionsPerQuiz: 50, allowQuizRetakes: true, showAnswersAfterQuiz: true,
    maintenanceMode: false, debugMode: false, logLevel: 'error',
  });

  useEffect(() => {
    setTimeout(() => setLoading(false), 500);
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });
      const data = await res.json();
      if (data.success) showToast.success('Settings saved successfully');
      else showToast.error('Failed to save settings');
    } catch {
      showToast.error('Error saving settings');
    } finally {
      setSaving(false);
    }
  };

  const set = (key: keyof SettingsData, val: any) => setSettings(p => ({ ...p, [key]: val }));

  const inputCls = "w-full px-4 py-2.5 rounded-xl text-sm text-white/70 placeholder:text-white/20 outline-none transition-all";
  const inputStyle = { background: 'rgba(52,211,153,0.04)', border: '1px solid rgba(52,211,153,0.1)' };
  const inputFocus = (e: any) => (e.target.style.borderColor = 'rgba(52,211,153,0.3)');
  const inputBlur = (e: any) => (e.target.style.borderColor = 'rgba(52,211,153,0.1)');
  const card = { background: 'rgba(255,255,255,0.015)', borderColor: 'rgba(52,211,153,0.08)' };

  const Toggle = ({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) => (
    <button onClick={() => onChange(!checked)}
      className="relative w-10 h-5.5 rounded-full transition-all shrink-0"
      style={{
        background: checked ? 'linear-gradient(135deg, #059669, #34d399)' : 'rgba(255,255,255,0.08)',
        width: 40, height: 22,
        boxShadow: checked ? '0 0 12px rgba(52,211,153,0.3)' : 'none'
      }}>
      <span className="absolute top-0.5 rounded-full bg-white transition-all"
        style={{ width: 18, height: 18, left: checked ? 20 : 2 }} />
    </button>
  );

  const Field = ({ label, desc, children }: { label: string; desc?: string; children: React.ReactNode }) => (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 py-4"
      style={{ borderBottom: '1px solid rgba(52,211,153,0.05)' }}>
      <div className="min-w-0">
        <p className="text-sm font-medium text-white/70">{label}</p>
        {desc && <p className="text-xs text-white/25 mt-0.5">{desc}</p>}
      </div>
      <div className="shrink-0 sm:w-56">{children}</div>
    </div>
  );

  if (loading) return (
    <div className="flex items-center justify-center h-72">
      <div className="flex flex-col items-center gap-3">
        <div className="relative w-9 h-9">
          <div className="absolute inset-0 rounded-full border-2 border-emerald-500/15 border-t-emerald-400 animate-spin" />
        </div>
        <p className="text-[11px] text-white/20 tracking-widest uppercase">Loading settings</p>
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl space-y-5">
      <Toaster position="top-right" toastOptions={{
        style: { background: '#0f1512', border: '1px solid rgba(52,211,153,0.15)', color: '#fff' }
      }} />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <p className="text-[11px] text-emerald-500/50 uppercase tracking-widest font-semibold mb-1">Configuration</p>
          <h1 className="text-xl font-semibold text-white">Settings</h1>
          <p className="text-sm text-white/25 mt-0.5">Manage your platform configuration</p>
        </div>
        <button onClick={handleSave} disabled={saving}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90 disabled:opacity-50 shrink-0"
          style={{ background: 'linear-gradient(135deg, #059669, #34d399)', boxShadow: '0 0 20px rgba(52,211,153,0.2)' }}>
          {saving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-5">
        {/* Tabs sidebar */}
        <div className="flex lg:flex-col gap-1 overflow-x-auto lg:overflow-visible lg:w-44 shrink-0">
          {TABS.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all whitespace-nowrap"
              style={activeTab === tab.id ? {
                background: 'rgba(52,211,153,0.08)',
                border: '1px solid rgba(52,211,153,0.15)',
                color: '#34d399'
              } : { border: '1px solid transparent', color: 'rgba(255,255,255,0.3)' }}>
              <tab.icon className="w-4 h-4 shrink-0" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 rounded-2xl border p-5" style={card}>

          {/* General */}
          {activeTab === 'general' && (
            <div>
              <h2 className="text-sm font-semibold text-white/60 mb-1 uppercase tracking-widest text-[11px]">General</h2>
              <Field label="Site Name" desc="Displayed in browser tab and emails">
                <input value={settings.siteName} onChange={e => set('siteName', e.target.value)}
                  className={inputCls} style={inputStyle} onFocus={inputFocus} onBlur={inputBlur} />
              </Field>
              <Field label="Site Description" desc="Short description of your platform">
                <input value={settings.siteDescription} onChange={e => set('siteDescription', e.target.value)}
                  className={inputCls} style={inputStyle} onFocus={inputFocus} onBlur={inputBlur} />
              </Field>
              <Field label="Site URL" desc="Your platform's public URL">
                <input value={settings.siteUrl} onChange={e => set('siteUrl', e.target.value)}
                  className={inputCls} style={inputStyle} onFocus={inputFocus} onBlur={inputBlur} />
              </Field>
              <Field label="Support Email" desc="Users will contact you at this address">
                <input value={settings.supportEmail} onChange={e => set('supportEmail', e.target.value)}
                  className={inputCls} style={inputStyle} onFocus={inputFocus} onBlur={inputBlur} />
              </Field>
              <Field label="Allow Registration" desc="Let new users sign up">
                <Toggle checked={settings.allowRegistration} onChange={v => set('allowRegistration', v)} />
              </Field>
              <Field label="Default User Role" desc="Role assigned to new registrations">
                <select value={settings.defaultUserRole} onChange={e => set('defaultUserRole', e.target.value)}
                  className={inputCls} style={inputStyle} onFocus={inputFocus} onBlur={inputBlur}>
                  <option value="student" style={{ background: '#0a0d0b' }}>Student</option>
                  <option value="teacher" style={{ background: '#0a0d0b' }}>Teacher</option>
                </select>
              </Field>
              <Field label="Require Admin Approval" desc="Manually approve new registrations">
                <Toggle checked={settings.requireAdminApproval} onChange={v => set('requireAdminApproval', v)} />
              </Field>
            </div>
          )}

          {/* Appearance */}
          {activeTab === 'appearance' && (
            <div>
              <h2 className="text-[11px] font-semibold text-white/40 mb-1 uppercase tracking-widest">Appearance</h2>
              <Field label="Theme" desc="Platform color scheme">
                <select value={settings.theme} onChange={e => set('theme', e.target.value)}
                  className={inputCls} style={inputStyle} onFocus={inputFocus} onBlur={inputBlur}>
                  {['dark','light','system'].map(v => <option key={v} value={v} style={{ background: '#0a0d0b' }} className="capitalize">{v.charAt(0).toUpperCase()+v.slice(1)}</option>)}
                </select>
              </Field>
              <Field label="Primary Color">
                <div className="flex items-center gap-3">
                  <input type="color" value={settings.primaryColor} onChange={e => set('primaryColor', e.target.value)}
                    className="w-9 h-9 rounded-xl cursor-pointer border-0 bg-transparent" />
                  <input value={settings.primaryColor} onChange={e => set('primaryColor', e.target.value)}
                    className={`${inputCls} flex-1`} style={inputStyle} onFocus={inputFocus} onBlur={inputBlur} />
                </div>
              </Field>
              <Field label="Accent Color">
                <div className="flex items-center gap-3">
                  <input type="color" value={settings.accentColor} onChange={e => set('accentColor', e.target.value)}
                    className="w-9 h-9 rounded-xl cursor-pointer border-0 bg-transparent" />
                  <input value={settings.accentColor} onChange={e => set('accentColor', e.target.value)}
                    className={`${inputCls} flex-1`} style={inputStyle} onFocus={inputFocus} onBlur={inputBlur} />
                </div>
              </Field>
              <Field label="Font Family">
                <input value={settings.fontFamily} onChange={e => set('fontFamily', e.target.value)}
                  className={inputCls} style={inputStyle} onFocus={inputFocus} onBlur={inputBlur} />
              </Field>
            </div>
          )}

          {/* Security */}
          {activeTab === 'security' && (
            <div>
              <h2 className="text-[11px] font-semibold text-white/40 mb-1 uppercase tracking-widest">Security</h2>
              <Field label="Email Verification" desc="Require users to verify their email">
                <Toggle checked={settings.requireEmailVerification} onChange={v => set('requireEmailVerification', v)} />
              </Field>
              <Field label="Two-Factor Auth" desc="Enable 2FA for all users">
                <Toggle checked={settings.twoFactorAuth} onChange={v => set('twoFactorAuth', v)} />
              </Field>
              <Field label="Session Timeout" desc="Auto-logout after inactivity (minutes)">
                <input type="number" value={settings.sessionTimeout} onChange={e => set('sessionTimeout', +e.target.value)}
                  className={inputCls} style={inputStyle} onFocus={inputFocus} onBlur={inputBlur} min={5} max={1440} />
              </Field>
              <Field label="Max Login Attempts" desc="Lock account after failed attempts">
                <input type="number" value={settings.maxLoginAttempts} onChange={e => set('maxLoginAttempts', +e.target.value)}
                  className={inputCls} style={inputStyle} onFocus={inputFocus} onBlur={inputBlur} min={3} max={20} />
              </Field>
            </div>
          )}

          {/* Email */}
          {activeTab === 'email' && (
            <div>
              <h2 className="text-[11px] font-semibold text-white/40 mb-1 uppercase tracking-widest">Email / SMTP</h2>
              <Field label="SMTP Server"><input value={settings.smtpServer} onChange={e => set('smtpServer', e.target.value)} className={inputCls} style={inputStyle} onFocus={inputFocus} onBlur={inputBlur} /></Field>
              <Field label="SMTP Port"><input type="number" value={settings.smtpPort} onChange={e => set('smtpPort', +e.target.value)} className={inputCls} style={inputStyle} onFocus={inputFocus} onBlur={inputBlur} /></Field>
              <Field label="SMTP Username"><input value={settings.smtpUsername} onChange={e => set('smtpUsername', e.target.value)} className={inputCls} style={inputStyle} onFocus={inputFocus} onBlur={inputBlur} /></Field>
              <Field label="SMTP Password">
                <div className="relative">
                  <input type={showSmtpPassword ? 'text' : 'password'} value={settings.smtpPassword}
                    onChange={e => set('smtpPassword', e.target.value)}
                    className={`${inputCls} pr-10`} style={inputStyle} onFocus={inputFocus} onBlur={inputBlur} />
                  <button onClick={() => setShowSmtpPassword(p => !p)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/25 hover:text-emerald-400 transition-colors">
                    {showSmtpPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </Field>
              <Field label="From Email"><input value={settings.fromEmail} onChange={e => set('fromEmail', e.target.value)} className={inputCls} style={inputStyle} onFocus={inputFocus} onBlur={inputBlur} /></Field>
            </div>
          )}

          {/* Quiz */}
          {activeTab === 'quiz' && (
            <div>
              <h2 className="text-[11px] font-semibold text-white/40 mb-1 uppercase tracking-widest">Quiz Settings</h2>
              <Field label="Default Duration" desc="Default quiz time in minutes">
                <input type="number" value={settings.defaultQuizDuration} onChange={e => set('defaultQuizDuration', +e.target.value)} className={inputCls} style={inputStyle} onFocus={inputFocus} onBlur={inputBlur} min={5} />
              </Field>
              <Field label="Max Questions" desc="Max questions allowed per quiz">
                <input type="number" value={settings.maxQuestionsPerQuiz} onChange={e => set('maxQuestionsPerQuiz', +e.target.value)} className={inputCls} style={inputStyle} onFocus={inputFocus} onBlur={inputBlur} min={1} />
              </Field>
              <Field label="Allow Retakes" desc="Students can retake quizzes">
                <Toggle checked={settings.allowQuizRetakes} onChange={v => set('allowQuizRetakes', v)} />
              </Field>
              <Field label="Show Answers After" desc="Reveal correct answers after submission">
                <Toggle checked={settings.showAnswersAfterQuiz} onChange={v => set('showAnswersAfterQuiz', v)} />
              </Field>
            </div>
          )}

          {/* System */}
          {activeTab === 'system' && (
            <div>
              <h2 className="text-[11px] font-semibold text-white/40 mb-1 uppercase tracking-widest">System</h2>
              <Field label="Maintenance Mode" desc="Take platform offline for maintenance">
                <Toggle checked={settings.maintenanceMode} onChange={v => set('maintenanceMode', v)} />
              </Field>
              <Field label="Debug Mode" desc="Enable verbose error logging">
                <Toggle checked={settings.debugMode} onChange={v => set('debugMode', v)} />
              </Field>
              <Field label="Log Level">
                <select value={settings.logLevel} onChange={e => set('logLevel', e.target.value)}
                  className={inputCls} style={inputStyle} onFocus={inputFocus} onBlur={inputBlur}>
                  {['error','warn','info','debug'].map(v => <option key={v} value={v} style={{ background: '#0a0d0b' }}>{v.toUpperCase()}</option>)}
                </select>
              </Field>

              {/* Danger Zone */}
              <div className="mt-6 p-4 rounded-2xl" style={{ background: 'rgba(239,68,68,0.04)', border: '1px solid rgba(239,68,68,0.12)' }}>
                <div className="flex items-center gap-2 mb-3">
                  <AlertCircle className="w-4 h-4 text-red-400" />
                  <p className="text-sm font-semibold text-red-400">Danger Zone</p>
                </div>
                <p className="text-xs text-white/30 mb-4">These actions are irreversible. Please proceed with caution.</p>
                <div className="flex flex-wrap gap-2">
                  <button className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs text-white/40 hover:text-white/60 border transition-all"
                    style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
                    <Download className="w-3.5 h-3.5" /> Export Data
                  </button>
                  {!confirmDelete ? (
                    <button onClick={() => setConfirmDelete(true)}
                      className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs text-red-400 border transition-all hover:bg-red-500/10"
                      style={{ borderColor: 'rgba(239,68,68,0.2)' }}>
                      <Trash2 className="w-3.5 h-3.5" /> Delete All Data
                    </button>
                  ) : (
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-red-400">Are you sure?</span>
                      <button className="px-3 py-1.5 rounded-lg text-xs text-red-400 border border-red-500/30 hover:bg-red-500/15 transition-all">
                        Yes, Delete
                      </button>
                      <button onClick={() => setConfirmDelete(false)}
                        className="px-3 py-1.5 rounded-lg text-xs text-white/40 border border-white/10 hover:bg-white/5 transition-all">
                        Cancel
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
