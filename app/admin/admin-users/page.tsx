

// 'use client';

// import { useEffect, useState } from 'react';
// import { 
//   Search, 
//   MoreVertical, 
//   CheckCircle, 
//   XCircle, 
//   Shield,
//   Filter,
//   Download,
//   Trash2,
//   Edit,
//   Eye,
//   ChevronLeft,
//   ChevronRight,
//   CheckSquare,
//   Square,
//   AlertCircle,
//   UserCheck,
//   UserX,
//   Users as UsersIcon
// } from 'lucide-react';

// interface User {
//   _id: string;
//   name: string;
//   email: string;
//   role: 'student' | 'teacher' | 'admin';
//   verified: boolean;
//   blocked: boolean;
//   createdAt: string;
//   lastLogin?: string;
//   quizzesTaken?: number;
//   avgScore?: number;
// }

// export default function AdminUsersPage() {
//   const [users, setUsers] = useState<User[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedRole, setSelectedRole] = useState<string>('all');
//   const [selectedStatus, setSelectedStatus] = useState<string>('all');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
//   const [showFilters, setShowFilters] = useState(false);
//   const [showUserModal, setShowUserModal] = useState(false);
//   const [selectedUser, setSelectedUser] = useState<User | null>(null);
//   const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
//   const [userToDelete, setUserToDelete] = useState<string | null>(null);
//   const [sortBy, setSortBy] = useState<'name' | 'date' | 'role'>('date');
//   const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

//   const usersPerPage = 10;

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   const fetchUsers = async () => {
//     try {
//       const res = await fetch('/api/admin/users');
//       const data = await res.json();
//       if (data.success) {
//         // Add mock data for demo
//         const enhancedUsers = data.data.map((user: User) => ({
//           ...user,
//           quizzesTaken: Math.floor(Math.random() * 20),
//           avgScore: Math.floor(Math.random() * 100),
//           blocked: Math.random() > 0.8 // 20% users blocked for demo
//         }));
//         setUsers(enhancedUsers);
//       }
//     } catch (error) {
//       console.error('Error fetching users:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const toggleUserStatus = async (userId: string, block: boolean) => {
//     try {
//       // API call to block/unblock user
//       setUsers(users.map(u => 
//         u._id === userId ? { ...u, blocked: block } : u
//       ));
//     } catch (error) {
//       console.error('Error toggling user status:', error);
//     }
//   };

//   const deleteUser = async (userId: string) => {
//     try {
//       setUsers(users.filter(u => u._id !== userId));
//       setShowDeleteConfirm(false);
//       setUserToDelete(null);
//     } catch (error) {
//       console.error('Error deleting user:', error);
//     }
//   };

//   const exportUsers = () => {
//     const csv = [
//       ['Name', 'Email', 'Role', 'Status', 'Verified', 'Joined', 'Last Login', 'Quizzes Taken', 'Avg Score'].join(','),
//       ...filteredUsers.map(u => [
//         u.name,
//         u.email,
//         u.role,
//         u.blocked ? 'Blocked' : 'Active',
//         u.verified ? 'Yes' : 'No',
//         new Date(u.createdAt).toLocaleDateString(),
//         u.lastLogin ? new Date(u.lastLogin).toLocaleDateString() : 'Never',
//         u.quizzesTaken || 0,
//         u.avgScore || 0
//       ].join(','))
//     ].join('\n');

//     const blob = new Blob([csv], { type: 'text/csv' });
//     const url = window.URL.createObjectURL(blob);
//     const a = document.createElement('a');
//     a.href = url;
//     a.download = `users-${new Date().toISOString().split('T')[0]}.csv`;
//     a.click();
//   };

//   const toggleSelectAll = () => {
//     if (selectedUsers.length === paginatedUsers.length) {
//       setSelectedUsers([]);
//     } else {
//       setSelectedUsers(paginatedUsers.map(u => u._id));
//     }
//   };

//   const toggleSelectUser = (userId: string) => {
//     if (selectedUsers.includes(userId)) {
//       setSelectedUsers(selectedUsers.filter(id => id !== userId));
//     } else {
//       setSelectedUsers([...selectedUsers, userId]);
//     }
//   };

//   // Filter and sort users
//   const filteredUsers = users
//     .filter(user => {
//       const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                            user.email.toLowerCase().includes(searchTerm.toLowerCase());
//       const matchesRole = selectedRole === 'all' || user.role === selectedRole;
//       const matchesStatus = selectedStatus === 'all' || 
//                            (selectedStatus === 'active' && !user.blocked) ||
//                            (selectedStatus === 'blocked' && user.blocked);
//       return matchesSearch && matchesRole && matchesStatus;
//     })
//     .sort((a, b) => {
//       let comparison = 0;
//       if (sortBy === 'name') {
//         comparison = a.name.localeCompare(b.name);
//       } else if (sortBy === 'role') {
//         comparison = a.role.localeCompare(b.role);
//       } else {
//         comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
//       }
//       return sortOrder === 'asc' ? comparison : -comparison;
//     });

//   // Pagination
//   const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
//   const paginatedUsers = filteredUsers.slice(
//     (currentPage - 1) * usersPerPage,
//     currentPage * usersPerPage
//   );

//   const getRoleBadgeColor = (role: string) => {
//     switch(role) {
//       case 'admin': return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
//       case 'teacher': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
//       default: return 'bg-green-500/10 text-green-400 border-green-500/20';
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-64">
//         <div className="relative">
//           <div className="w-12 h-12 border-4 border-white/10 border-t-white rounded-full animate-spin"></div>
//           <div className="absolute inset-0 flex items-center justify-center">
//             <UsersIcon className="w-5 h-5 text-white/40 animate-pulse" />
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6">
//       {/* Header with Actions */}
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-2xl font-semibold text-white">User Management</h1>
//           <p className="text-sm text-white/40 mt-1">
//             Total {filteredUsers.length} users • {users.filter(u => !u.blocked).length} active
//           </p>
//         </div>
//         <div className="flex gap-3">
//           <button
//             onClick={() => setShowFilters(!showFilters)}
//             className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-sm text-white/80 hover:text-white transition-colors flex items-center gap-2 border border-white/10"
//           >
//             <Filter className="w-4 h-4" />
//             Filters
//           </button>
//           <button
//             onClick={exportUsers}
//             className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-sm text-white/80 hover:text-white transition-colors flex items-center gap-2 border border-white/10"
//           >
//             <Download className="w-4 h-4" />
//             Export
//           </button>
//         </div>
//       </div>

//       {/* Search and Advanced Filters */}
//       <div className="bg-[#111117] border border-white/10 rounded-xl p-4">
//         <div className="flex flex-col sm:flex-row gap-4">
//           <div className="flex-1 relative">
//             <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
//             <input
//               type="text"
//               placeholder="Search by name or email..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:border-purple-500/50"
//             />
//           </div>
          
//           {showFilters && (
//             <div className="flex gap-3 animate-fadeIn">
//               <select
//                 value={selectedRole}
//                 onChange={(e) => setSelectedRole(e.target.value)}
//                 className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500/50"
//               >
//                 <option value="all">All Roles</option>
//                 <option value="student">Students</option>
//                 <option value="teacher">Teachers</option>
//                 <option value="admin">Admins</option>
//               </select>

//               <select
//                 value={selectedStatus}
//                 onChange={(e) => setSelectedStatus(e.target.value)}
//                 className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500/50"
//               >
//                 <option value="all">All Status</option>
//                 <option value="active">Active</option>
//                 <option value="blocked">Blocked</option>
//               </select>

//               <select
//                 value={sortBy}
//                 onChange={(e) => setSortBy(e.target.value as any)}
//                 className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500/50"
//               >
//                 <option value="date">Sort by Date</option>
//                 <option value="name">Sort by Name</option>
//                 <option value="role">Sort by Role</option>
//               </select>

//               <button
//                 onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
//                 className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white/60 hover:text-white transition-colors"
//               >
//                 {sortOrder === 'asc' ? '↑' : '↓'}
//               </button>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Bulk Actions Bar */}
//       {selectedUsers.length > 0 && (
//         <div className="bg-purple-500/10 border border-purple-500/20 rounded-xl p-3 flex items-center justify-between animate-slideDown">
//           <span className="text-sm text-purple-400">
//             {selectedUsers.length} user{selectedUsers.length > 1 ? 's' : ''} selected
//           </span>
//           <div className="flex gap-2">
//             <button
//               onClick={() => selectedUsers.forEach(id => toggleUserStatus(id, true))}
//               className="px-3 py-1.5 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20 transition-colors text-sm flex items-center gap-1"
//             >
//               <UserX className="w-4 h-4" />
//               Block
//             </button>
//             <button
//               onClick={() => selectedUsers.forEach(id => toggleUserStatus(id, false))}
//               className="px-3 py-1.5 bg-green-500/10 text-green-400 rounded-lg hover:bg-green-500/20 transition-colors text-sm flex items-center gap-1"
//             >
//               <UserCheck className="w-4 h-4" />
//               Unblock
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Users Table */}
//       <div className="bg-[#111117] border border-white/10 rounded-xl overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead>
//               <tr className="border-b border-white/10 bg-white/5">
//                 <th className="px-6 py-3 text-left">
//                   <button
//                     onClick={toggleSelectAll}
//                     className="text-white/40 hover:text-white/60 transition-colors"
//                   >
//                     {selectedUsers.length === paginatedUsers.length ? (
//                       <CheckSquare className="w-5 h-5" />
//                     ) : (
//                       <Square className="w-5 h-5" />
//                     )}
//                   </button>
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-white/40 uppercase">User</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-white/40 uppercase">Role</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-white/40 uppercase">Status</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-white/40 uppercase">Activity</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-white/40 uppercase">Joined</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-white/40 uppercase">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-white/10">
//               {paginatedUsers.map((user) => (
//                 <tr 
//                   key={user._id} 
//                   className={`hover:bg-white/5 transition-colors cursor-pointer ${
//                     user.blocked ? 'opacity-60' : ''
//                   }`}
//                   onClick={() => {
//                     setSelectedUser(user);
//                     setShowUserModal(true);
//                   }}
//                 >
//                   <td className="px-6 py-4" onClick={(e) => e.stopPropagation()}>
//                     <button
//                       onClick={() => toggleSelectUser(user._id)}
//                       className="text-white/40 hover:text-white/60 transition-colors"
//                     >
//                       {selectedUsers.includes(user._id) ? (
//                         <CheckSquare className="w-5 h-5 text-purple-400" />
//                       ) : (
//                         <Square className="w-5 h-5" />
//                       )}
//                     </button>
//                   </td>
//                   <td className="px-6 py-4">
//                     <div>
//                       <p className="text-sm font-medium text-white">{user.name}</p>
//                       <p className="text-xs text-white/40">{user.email}</p>
//                     </div>
//                   </td>
//                   <td className="px-6 py-4">
//                     <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium border ${getRoleBadgeColor(user.role)}`}>
//                       {user.role}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4">
//                     <div className="flex items-center gap-2">
//                       {user.blocked ? (
//                         <>
//                           <XCircle className="w-4 h-4 text-red-400" />
//                           <span className="text-xs text-red-400/60">Blocked</span>
//                         </>
//                       ) : user.verified ? (
//                         <>
//                           <CheckCircle className="w-4 h-4 text-green-400" />
//                           <span className="text-xs text-green-400/60">Active</span>
//                         </>
//                       ) : (
//                         <>
//                           <AlertCircle className="w-4 h-4 text-yellow-400" />
//                           <span className="text-xs text-yellow-400/60">Pending</span>
//                         </>
//                       )}
//                     </div>
//                   </td>
//                   <td className="px-6 py-4">
//                     <div className="space-y-1">
//                       <div className="text-xs text-white/60">
//                         Quizzes: {user.quizzesTaken || 0}
//                       </div>
//                       <div className="text-xs text-white/60">
//                         Avg: {user.avgScore || 0}%
//                       </div>
//                     </div>
//                   </td>
//                   <td className="px-6 py-4">
//                     <span className="text-sm text-white/60">
//                       {new Date(user.createdAt).toLocaleDateString()}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4" onClick={(e) => e.stopPropagation()}>
//                     <div className="flex items-center gap-2">
//                       <button
//                         onClick={() => {
//                           setSelectedUser(user);
//                           setShowUserModal(true);
//                         }}
//                         className="p-1.5 hover:bg-blue-500/20 rounded-lg transition-colors group"
//                         title="View Details"
//                       >
//                         <Eye className="w-4 h-4 text-white/40 group-hover:text-blue-400" />
//                       </button>
//                       <button
//                         onClick={() => toggleUserStatus(user._id, !user.blocked)}
//                         className={`p-1.5 rounded-lg transition-colors group ${
//                           user.blocked 
//                             ? 'hover:bg-green-500/20' 
//                             : 'hover:bg-red-500/20'
//                         }`}
//                         title={user.blocked ? 'Unblock User' : 'Block User'}
//                       >
//                         {user.blocked ? (
//                           <UserCheck className="w-4 h-4 text-white/40 group-hover:text-green-400" />
//                         ) : (
//                           <UserX className="w-4 h-4 text-white/40 group-hover:text-red-400" />
//                         )}
//                       </button>
//                       <button
//                         onClick={() => {
//                           setUserToDelete(user._id);
//                           setShowDeleteConfirm(true);
//                         }}
//                         className="p-1.5 hover:bg-red-500/20 rounded-lg transition-colors group"
//                         title="Delete User"
//                       >
//                         <Trash2 className="w-4 h-4 text-white/40 group-hover:text-red-400" />
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         {/* Pagination */}
//         {totalPages > 1 && (
//           <div className="flex items-center justify-between px-6 py-3 border-t border-white/10">
//             <div className="text-sm text-white/40">
//               Showing {(currentPage - 1) * usersPerPage + 1} to {Math.min(currentPage * usersPerPage, filteredUsers.length)} of {filteredUsers.length} users
//             </div>
//             <div className="flex gap-2">
//               <button
//                 onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
//                 disabled={currentPage === 1}
//                 className="p-2 bg-white/5 border border-white/10 rounded-lg text-white/40 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
//               >
//                 <ChevronLeft className="w-4 h-4" />
//               </button>
//               <span className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white/60 text-sm">
//                 {currentPage} / {totalPages}
//               </span>
//               <button
//                 onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
//                 disabled={currentPage === totalPages}
//                 className="p-2 bg-white/5 border border-white/10 rounded-lg text-white/40 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
//               >
//                 <ChevronRight className="w-4 h-4" />
//               </button>
//             </div>
//           </div>
//         )}

//         {/* Empty state */}
//         {filteredUsers.length === 0 && (
//           <div className="text-center py-12">
//             <Shield className="w-12 h-12 text-white/20 mx-auto mb-4" />
//             <p className="text-white/40">No users found matching your criteria</p>
//           </div>
//         )}
//       </div>

//       {/* User Details Modal */}
//       {showUserModal && selectedUser && (
//         <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
//           <div className="bg-[#111117] border border-white/10 rounded-xl max-w-2xl w-full p-6">
//             <div className="flex items-center justify-between mb-6">
//               <h3 className="text-lg font-medium text-white">User Details</h3>
//               <button
//                 onClick={() => setShowUserModal(false)}
//                 className="text-white/40 hover:text-white/60"
//               >
//                 ✕
//               </button>
//             </div>

//             <div className="space-y-4">
//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <p className="text-xs text-white/40 mb-1">Name</p>
//                   <p className="text-sm text-white">{selectedUser.name}</p>
//                 </div>
//                 <div>
//                   <p className="text-xs text-white/40 mb-1">Email</p>
//                   <p className="text-sm text-white">{selectedUser.email}</p>
//                 </div>
//                 <div>
//                   <p className="text-xs text-white/40 mb-1">Role</p>
//                   <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium border ${getRoleBadgeColor(selectedUser.role)}`}>
//                     {selectedUser.role}
//                   </span>
//                 </div>
//                 <div>
//                   <p className="text-xs text-white/40 mb-1">Status</p>
//                   <div className="flex items-center gap-2">
//                     {selectedUser.blocked ? (
//                       <span className="text-xs text-red-400">Blocked</span>
//                     ) : selectedUser.verified ? (
//                       <span className="text-xs text-green-400">Active</span>
//                     ) : (
//                       <span className="text-xs text-yellow-400">Pending</span>
//                     )}
//                   </div>
//                 </div>
//                 <div>
//                   <p className="text-xs text-white/40 mb-1">Joined</p>
//                   <p className="text-sm text-white">{new Date(selectedUser.createdAt).toLocaleDateString()}</p>
//                 </div>
//                 <div>
//                   <p className="text-xs text-white/40 mb-1">Last Login</p>
//                   <p className="text-sm text-white">
//                     {selectedUser.lastLogin ? new Date(selectedUser.lastLogin).toLocaleDateString() : 'Never'}
//                   </p>
//                 </div>
//                 <div>
//                   <p className="text-xs text-white/40 mb-1">Quizzes Taken</p>
//                   <p className="text-sm text-white">{selectedUser.quizzesTaken || 0}</p>
//                 </div>
//                 <div>
//                   <p className="text-xs text-white/40 mb-1">Average Score</p>
//                   <p className="text-sm text-white">{selectedUser.avgScore || 0}%</p>
//                 </div>
//               </div>

//               <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
//                 <button
//                   onClick={() => setShowUserModal(false)}
//                   className="px-4 py-2 bg-white/5 text-white rounded-lg hover:bg-white/10 transition-colors"
//                 >
//                   Close
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Delete Confirmation Modal */}
//       {showDeleteConfirm && (
//         <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
//           <div className="bg-[#111117] border border-white/10 rounded-xl max-w-md w-full p-6">
//             <h3 className="text-lg font-medium text-white mb-4">Delete User</h3>
//             <p className="text-white/40 text-sm mb-6">
//               Are you sure you want to delete this user? This action cannot be undone.
//             </p>
//             <div className="flex gap-3">
//               <button
//                 onClick={() => setShowDeleteConfirm(false)}
//                 className="flex-1 px-4 py-2 bg-white/5 text-white rounded-lg hover:bg-white/10 transition-colors"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={() => userToDelete && deleteUser(userToDelete)}
//                 className="flex-1 px-4 py-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20 transition-colors border border-red-500/20"
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       <style jsx>{`
//         @keyframes fadeIn {
//           from { opacity: 0; transform: translateY(-10px); }
//           to { opacity: 1; transform: translateY(0); }
//         }
//         .animate-fadeIn {
//           animation: fadeIn 0.3s ease-out;
//         }
//         @keyframes slideDown {
//           from { opacity: 0; transform: translateY(-20px); }
//           to { opacity: 1; transform: translateY(0); }
//         }
//         .animate-slideDown {
//           animation: slideDown 0.3s ease-out;
//         }
//       `}</style>
//     </div>
//   );
// }






'use client';

import { useEffect, useState } from 'react';
import {
  Search, MoreVertical, CheckCircle, XCircle, Shield, Filter,
  Download, Trash2, Edit, Eye, ChevronLeft, ChevronRight,
  CheckSquare, Square, AlertCircle, UserCheck, UserX, Users as UsersIcon
} from 'lucide-react';

interface User {
  _id: string; name: string; email: string;
  role: 'student' | 'teacher' | 'admin';
  verified: boolean; blocked: boolean; createdAt: string;
  lastLogin?: string; quizzesTaken?: number; avgScore?: number;
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [userToDelete, setUserToDelete] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'name' | 'date' | 'role'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const usersPerPage = 10;

  useEffect(() => { fetchUsers(); }, []);

  const fetchUsers = async () => {
    try {
      const res = await fetch('/api/admin/users');
      const data = await res.json();
      if (data.success) {
        setUsers(data.data.map((u: User) => ({
          ...u,
          quizzesTaken: Math.floor(Math.random() * 20),
          avgScore: Math.floor(Math.random() * 100),
          blocked: Math.random() > 0.8
        })));
      }
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  const toggleUserStatus = async (userId: string, block: boolean) => {
    setUsers(users.map(u => u._id === userId ? { ...u, blocked: block } : u));
  };

  const deleteUser = async (userId: string) => {
    setUsers(users.filter(u => u._id !== userId));
    setShowDeleteConfirm(false);
    setUserToDelete(null);
  };

  const exportUsers = () => {
    const csv = [
      ['Name', 'Email', 'Role', 'Status', 'Verified', 'Joined'].join(','),
      ...filteredUsers.map(u => [u.name, u.email, u.role,
        u.blocked ? 'Blocked' : 'Active', u.verified ? 'Yes' : 'No',
        new Date(u.createdAt).toLocaleDateString()].join(','))
    ].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `users-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  const toggleSelectAll = () => {
    setSelectedUsers(selectedUsers.length === paginatedUsers.length ? [] : paginatedUsers.map(u => u._id));
  };
  const toggleSelectUser = (id: string) => {
    setSelectedUsers(selectedUsers.includes(id) ? selectedUsers.filter(x => x !== id) : [...selectedUsers, id]);
  };

  const filteredUsers = users
    .filter(u => {
      const s = searchTerm.toLowerCase();
      return (u.name.toLowerCase().includes(s) || u.email.toLowerCase().includes(s))
        && (selectedRole === 'all' || u.role === selectedRole)
        && (selectedStatus === 'all' || (selectedStatus === 'active' && !u.blocked) || (selectedStatus === 'blocked' && u.blocked));
    })
    .sort((a, b) => {
      let c = 0;
      if (sortBy === 'name') c = a.name.localeCompare(b.name);
      else if (sortBy === 'role') c = a.role.localeCompare(b.role);
      else c = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      return sortOrder === 'asc' ? c : -c;
    });

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const paginatedUsers = filteredUsers.slice((currentPage - 1) * usersPerPage, currentPage * usersPerPage);

  const roleBadge = (role: string) => {
    const map: any = {
      admin: 'text-purple-300 bg-purple-500/10 border-purple-500/20',
      teacher: 'text-sky-300 bg-sky-500/10 border-sky-500/20',
      student: 'text-emerald-300 bg-emerald-500/10 border-emerald-500/20',
    };
    return map[role] || 'text-white/40 bg-white/5 border-white/10';
  };

  if (loading) return (
    <div className="flex items-center justify-center h-72">
      <div className="flex flex-col items-center gap-3">
        <div className="relative w-9 h-9">
          <div className="absolute inset-0 rounded-full border-2 border-emerald-500/15 border-t-emerald-400 animate-spin" />
        </div>
        <p className="text-[11px] text-white/20 tracking-widest uppercase">Loading users</p>
      </div>
    </div>
  );

  const card = { background: 'rgba(255,255,255,0.015)', borderColor: 'rgba(52,211,153,0.08)' };
  const inputCls = "w-full px-4 py-2.5 rounded-xl text-sm text-white/80 placeholder:text-white/20 outline-none transition-all";
  const inputStyle = { background: 'rgba(52,211,153,0.04)', border: '1px solid rgba(52,211,153,0.1)' };

  return (
    <div className="space-y-5 max-w-7xl">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <p className="text-[11px] text-emerald-500/50 uppercase tracking-widest font-semibold mb-1">Management</p>
          <h1 className="text-xl font-semibold text-white">Users</h1>
          <p className="text-sm text-white/25 mt-0.5">
            {filteredUsers.length} total · {users.filter(u => !u.blocked).length} active
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium text-white/40 hover:text-white/70 border transition-all"
            style={{ borderColor: 'rgba(52,211,153,0.1)', background: 'rgba(52,211,153,0.03)' }}>
            <Filter className="w-3.5 h-3.5" /> Filters
          </button>
          <button onClick={exportUsers}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium text-white/40 hover:text-white/70 border transition-all"
            style={{ borderColor: 'rgba(52,211,153,0.1)', background: 'rgba(52,211,153,0.03)' }}>
            <Download className="w-3.5 h-3.5" /> Export
          </button>
        </div>
      </div>

      {/* Search + Filters */}
      <div className="p-4 rounded-2xl border" style={card}>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 pointer-events-none" />
            <input type="text" placeholder="Search by name or email..."
              value={searchTerm} onChange={e => setSearchTerm(e.target.value)}
              className={`${inputCls} pl-10`} style={inputStyle} />
          </div>
          {showFilters && (
            <div className="flex flex-wrap gap-2">
              {[
                { value: selectedRole, set: setSelectedRole, opts: [['all','All Roles'],['student','Students'],['teacher','Teachers'],['admin','Admins']] },
                { value: selectedStatus, set: setSelectedStatus, opts: [['all','All Status'],['active','Active'],['blocked','Blocked']] },
                { value: sortBy, set: setSortBy, opts: [['date','By Date'],['name','By Name'],['role','By Role']] },
              ].map((s, i) => (
                <select key={i} value={s.value} onChange={e => s.set(e.target.value as any)}
                  className="px-3 py-2 rounded-xl text-xs text-white/60 outline-none"
                  style={{ background: 'rgba(52,211,153,0.04)', border: '1px solid rgba(52,211,153,0.1)' }}>
                  {s.opts.map(([v, l]) => <option key={v} value={v} style={{ background: '#0a0d0b' }}>{l}</option>)}
                </select>
              ))}
              <button onClick={() => setSortOrder(o => o === 'asc' ? 'desc' : 'asc')}
                className="px-3 py-2 rounded-xl text-xs text-white/40 hover:text-emerald-400 transition-colors"
                style={{ background: 'rgba(52,211,153,0.04)', border: '1px solid rgba(52,211,153,0.1)' }}>
                {sortOrder === 'asc' ? '↑ Asc' : '↓ Desc'}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Bulk actions */}
      {selectedUsers.length > 0 && (
        <div className="flex items-center justify-between px-4 py-3 rounded-2xl border"
          style={{ background: 'rgba(52,211,153,0.05)', borderColor: 'rgba(52,211,153,0.2)' }}>
          <span className="text-sm text-emerald-400 font-medium">
            {selectedUsers.length} selected
          </span>
          <div className="flex gap-2">
            <button onClick={() => selectedUsers.forEach(id => toggleUserStatus(id, true))}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs text-red-400 border transition-colors hover:bg-red-500/10"
              style={{ borderColor: 'rgba(239,68,68,0.2)' }}>
              <UserX className="w-3.5 h-3.5" /> Block
            </button>
            <button onClick={() => selectedUsers.forEach(id => toggleUserStatus(id, false))}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs text-emerald-400 border transition-colors hover:bg-emerald-500/10"
              style={{ borderColor: 'rgba(52,211,153,0.2)' }}>
              <UserCheck className="w-3.5 h-3.5" /> Unblock
            </button>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="rounded-2xl border overflow-hidden" style={card}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(52,211,153,0.06)', background: 'rgba(52,211,153,0.03)' }}>
                <th className="px-5 py-3 text-left">
                  <button onClick={toggleSelectAll} className="text-white/25 hover:text-emerald-400 transition-colors">
                    {selectedUsers.length === paginatedUsers.length && paginatedUsers.length > 0
                      ? <CheckSquare className="w-4 h-4" /> : <Square className="w-4 h-4" />}
                  </button>
                </th>
                {['User', 'Role', 'Status', 'Quizzes', 'Avg Score', 'Joined', 'Actions'].map(h => (
                  <th key={h} className="px-5 py-3 text-left text-[10px] font-semibold text-white/25 uppercase tracking-widest whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginatedUsers.map((user) => (
                <tr key={user._id}
                  className="transition-colors"
                  style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'rgba(52,211,153,0.025)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                  <td className="px-5 py-3.5">
                    <button onClick={() => toggleSelectUser(user._id)} className="text-white/20 hover:text-emerald-400 transition-colors">
                      {selectedUsers.includes(user._id) ? <CheckSquare className="w-4 h-4" /> : <Square className="w-4 h-4" />}
                    </button>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold text-white shrink-0"
                        style={{ background: 'linear-gradient(135deg, #059669, #34d399)' }}>
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-white/80 truncate">{user.name}</p>
                        <p className="text-[11px] text-white/25 truncate">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold border capitalize ${roleBadge(user.role)}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className={`flex items-center gap-1.5 text-xs font-medium w-fit px-2.5 py-1 rounded-lg border ${
                      user.blocked
                        ? 'text-red-400 bg-red-500/8 border-red-500/15'
                        : 'text-emerald-400 bg-emerald-500/8 border-emerald-500/15'
                    }`}>
                      {user.blocked ? <XCircle className="w-3 h-3" /> : <CheckCircle className="w-3 h-3" />}
                      {user.blocked ? 'Blocked' : 'Active'}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-sm text-white/40">{user.quizzesTaken || 0}</td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2">
                      <div className="w-14 h-1 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                        <div className="h-full rounded-full" style={{
                          width: `${user.avgScore || 0}%`,
                          background: 'linear-gradient(90deg, #059669, #34d399)'
                        }} />
                      </div>
                      <span className="text-xs text-white/35">{user.avgScore || 0}%</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-xs text-white/30 whitespace-nowrap">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-1">
                      <button onClick={() => setSelectedUser(user)}
                        className="p-1.5 rounded-lg text-white/20 hover:text-emerald-400 hover:bg-emerald-500/10 transition-all">
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      <button onClick={() => toggleUserStatus(user._id, !user.blocked)}
                        className={`p-1.5 rounded-lg transition-all ${user.blocked ? 'text-white/20 hover:text-emerald-400 hover:bg-emerald-500/10' : 'text-white/20 hover:text-red-400 hover:bg-red-500/10'}`}>
                        {user.blocked ? <UserCheck className="w-3.5 h-3.5" /> : <UserX className="w-3.5 h-3.5" />}
                      </button>
                      <button onClick={() => { setUserToDelete(user._id); setShowDeleteConfirm(true); }}
                        className="p-1.5 rounded-lg text-white/20 hover:text-red-400 hover:bg-red-500/10 transition-all">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-5 py-3.5" style={{ borderTop: '1px solid rgba(52,211,153,0.06)' }}>
            <p className="text-xs text-white/20">
              Page {currentPage} of {totalPages}
            </p>
            <div className="flex items-center gap-1">
              <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1}
                className="p-1.5 rounded-lg text-white/25 hover:text-emerald-400 disabled:opacity-30 transition-all">
                <ChevronLeft className="w-4 h-4" />
              </button>
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => i + 1).map(p => (
                <button key={p} onClick={() => setCurrentPage(p)}
                  className="w-7 h-7 rounded-lg text-xs font-medium transition-all"
                  style={currentPage === p ? {
                    background: 'rgba(52,211,153,0.15)',
                    color: '#34d399',
                    border: '1px solid rgba(52,211,153,0.2)'
                  } : { color: 'rgba(255,255,255,0.3)' }}>
                  {p}
                </button>
              ))}
              <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}
                className="p-1.5 rounded-lg text-white/25 hover:text-emerald-400 disabled:opacity-30 transition-all">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Empty */}
      {paginatedUsers.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 rounded-2xl border" style={card}>
          <UsersIcon className="w-10 h-10 text-white/10 mb-3" />
          <p className="text-sm text-white/25">No users found</p>
        </div>
      )}

      {/* View User Modal */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="w-full max-w-sm rounded-2xl border p-6" style={{ background: '#0a0d0b', borderColor: 'rgba(52,211,153,0.15)' }}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-lg font-bold text-white"
                style={{ background: 'linear-gradient(135deg, #059669, #34d399)' }}>
                {selectedUser.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="text-white font-semibold">{selectedUser.name}</p>
                <p className="text-xs text-white/30">{selectedUser.email}</p>
              </div>
            </div>
            <div className="space-y-3 mb-6">
              {[
                { label: 'Role', value: selectedUser.role },
                { label: 'Status', value: selectedUser.blocked ? 'Blocked' : 'Active' },
                { label: 'Verified', value: selectedUser.verified ? 'Yes' : 'No' },
                { label: 'Quizzes Taken', value: String(selectedUser.quizzesTaken || 0) },
                { label: 'Avg Score', value: `${selectedUser.avgScore || 0}%` },
                { label: 'Joined', value: new Date(selectedUser.createdAt).toLocaleDateString() },
              ].map(item => (
                <div key={item.label} className="flex justify-between items-center py-2"
                  style={{ borderBottom: '1px solid rgba(52,211,153,0.06)' }}>
                  <span className="text-xs text-white/30">{item.label}</span>
                  <span className="text-xs text-white/70 font-medium capitalize">{item.value}</span>
                </div>
              ))}
            </div>
            <button onClick={() => setSelectedUser(null)}
              className="w-full py-2.5 rounded-xl text-sm font-medium text-white/60 hover:text-white border transition-all"
              style={{ borderColor: 'rgba(52,211,153,0.1)', background: 'rgba(52,211,153,0.04)' }}>
              Close
            </button>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="w-full max-w-sm rounded-2xl border p-6" style={{ background: '#0a0d0b', borderColor: 'rgba(239,68,68,0.15)' }}>
            <div className="w-10 h-10 rounded-2xl flex items-center justify-center mb-4"
              style={{ background: 'rgba(239,68,68,0.1)' }}>
              <AlertCircle className="w-5 h-5 text-red-400" />
            </div>
            <h3 className="text-white font-semibold mb-2">Delete User</h3>
            <p className="text-sm text-white/35 mb-6">This action cannot be undone. The user will be permanently removed.</p>
            <div className="flex gap-3">
              <button onClick={() => { setShowDeleteConfirm(false); setUserToDelete(null); }}
                className="flex-1 py-2.5 rounded-xl text-sm text-white/50 hover:text-white border transition-all"
                style={{ borderColor: 'rgba(52,211,153,0.1)' }}>Cancel</button>
              <button onClick={() => userToDelete && deleteUser(userToDelete)}
                className="flex-1 py-2.5 rounded-xl text-sm font-medium text-red-400 border transition-all hover:bg-red-500/10"
                style={{ borderColor: 'rgba(239,68,68,0.2)' }}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
