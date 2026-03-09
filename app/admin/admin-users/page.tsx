

'use client';

import { useEffect, useState } from 'react';
import { 
  Search, 
  MoreVertical, 
  CheckCircle, 
  XCircle, 
  Shield,
  Filter,
  Download,
  Trash2,
  Edit,
  Eye,
  ChevronLeft,
  ChevronRight,
  CheckSquare,
  Square,
  AlertCircle,
  UserCheck,
  UserX,
  Users as UsersIcon
} from 'lucide-react';

interface User {
  _id: string;
  name: string;
  email: string;
  role: 'student' | 'teacher' | 'admin';
  verified: boolean;
  blocked: boolean;
  createdAt: string;
  lastLogin?: string;
  quizzesTaken?: number;
  avgScore?: number;
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [userToDelete, setUserToDelete] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'name' | 'date' | 'role'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const usersPerPage = 10;

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await fetch('/api/admin/users');
      const data = await res.json();
      if (data.success) {
        // Add mock data for demo
        const enhancedUsers = data.data.map((user: User) => ({
          ...user,
          quizzesTaken: Math.floor(Math.random() * 20),
          avgScore: Math.floor(Math.random() * 100),
          blocked: Math.random() > 0.8 // 20% users blocked for demo
        }));
        setUsers(enhancedUsers);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleUserStatus = async (userId: string, block: boolean) => {
    try {
      // API call to block/unblock user
      setUsers(users.map(u => 
        u._id === userId ? { ...u, blocked: block } : u
      ));
    } catch (error) {
      console.error('Error toggling user status:', error);
    }
  };

  const deleteUser = async (userId: string) => {
    try {
      setUsers(users.filter(u => u._id !== userId));
      setShowDeleteConfirm(false);
      setUserToDelete(null);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const exportUsers = () => {
    const csv = [
      ['Name', 'Email', 'Role', 'Status', 'Verified', 'Joined', 'Last Login', 'Quizzes Taken', 'Avg Score'].join(','),
      ...filteredUsers.map(u => [
        u.name,
        u.email,
        u.role,
        u.blocked ? 'Blocked' : 'Active',
        u.verified ? 'Yes' : 'No',
        new Date(u.createdAt).toLocaleDateString(),
        u.lastLogin ? new Date(u.lastLogin).toLocaleDateString() : 'Never',
        u.quizzesTaken || 0,
        u.avgScore || 0
      ].join(','))
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `users-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  const toggleSelectAll = () => {
    if (selectedUsers.length === paginatedUsers.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(paginatedUsers.map(u => u._id));
    }
  };

  const toggleSelectUser = (userId: string) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter(id => id !== userId));
    } else {
      setSelectedUsers([...selectedUsers, userId]);
    }
  };

  // Filter and sort users
  const filteredUsers = users
    .filter(user => {
      const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           user.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRole = selectedRole === 'all' || user.role === selectedRole;
      const matchesStatus = selectedStatus === 'all' || 
                           (selectedStatus === 'active' && !user.blocked) ||
                           (selectedStatus === 'blocked' && user.blocked);
      return matchesSearch && matchesRole && matchesStatus;
    })
    .sort((a, b) => {
      let comparison = 0;
      if (sortBy === 'name') {
        comparison = a.name.localeCompare(b.name);
      } else if (sortBy === 'role') {
        comparison = a.role.localeCompare(b.role);
      } else {
        comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      }
      return sortOrder === 'asc' ? comparison : -comparison;
    });

  // Pagination
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage
  );

  const getRoleBadgeColor = (role: string) => {
    switch(role) {
      case 'admin': return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
      case 'teacher': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      default: return 'bg-green-500/10 text-green-400 border-green-500/20';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="relative">
          <div className="w-12 h-12 border-4 border-white/10 border-t-white rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <UsersIcon className="w-5 h-5 text-white/40 animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with Actions */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-white">User Management</h1>
          <p className="text-sm text-white/40 mt-1">
            Total {filteredUsers.length} users • {users.filter(u => !u.blocked).length} active
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-sm text-white/80 hover:text-white transition-colors flex items-center gap-2 border border-white/10"
          >
            <Filter className="w-4 h-4" />
            Filters
          </button>
          <button
            onClick={exportUsers}
            className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-sm text-white/80 hover:text-white transition-colors flex items-center gap-2 border border-white/10"
          >
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      {/* Search and Advanced Filters */}
      <div className="bg-[#111117] border border-white/10 rounded-xl p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:border-purple-500/50"
            />
          </div>
          
          {showFilters && (
            <div className="flex gap-3 animate-fadeIn">
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500/50"
              >
                <option value="all">All Roles</option>
                <option value="student">Students</option>
                <option value="teacher">Teachers</option>
                <option value="admin">Admins</option>
              </select>

              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500/50"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="blocked">Blocked</option>
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500/50"
              >
                <option value="date">Sort by Date</option>
                <option value="name">Sort by Name</option>
                <option value="role">Sort by Role</option>
              </select>

              <button
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white/60 hover:text-white transition-colors"
              >
                {sortOrder === 'asc' ? '↑' : '↓'}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Bulk Actions Bar */}
      {selectedUsers.length > 0 && (
        <div className="bg-purple-500/10 border border-purple-500/20 rounded-xl p-3 flex items-center justify-between animate-slideDown">
          <span className="text-sm text-purple-400">
            {selectedUsers.length} user{selectedUsers.length > 1 ? 's' : ''} selected
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => selectedUsers.forEach(id => toggleUserStatus(id, true))}
              className="px-3 py-1.5 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20 transition-colors text-sm flex items-center gap-1"
            >
              <UserX className="w-4 h-4" />
              Block
            </button>
            <button
              onClick={() => selectedUsers.forEach(id => toggleUserStatus(id, false))}
              className="px-3 py-1.5 bg-green-500/10 text-green-400 rounded-lg hover:bg-green-500/20 transition-colors text-sm flex items-center gap-1"
            >
              <UserCheck className="w-4 h-4" />
              Unblock
            </button>
          </div>
        </div>
      )}

      {/* Users Table */}
      <div className="bg-[#111117] border border-white/10 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10 bg-white/5">
                <th className="px-6 py-3 text-left">
                  <button
                    onClick={toggleSelectAll}
                    className="text-white/40 hover:text-white/60 transition-colors"
                  >
                    {selectedUsers.length === paginatedUsers.length ? (
                      <CheckSquare className="w-5 h-5" />
                    ) : (
                      <Square className="w-5 h-5" />
                    )}
                  </button>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white/40 uppercase">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white/40 uppercase">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white/40 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white/40 uppercase">Activity</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white/40 uppercase">Joined</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white/40 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {paginatedUsers.map((user) => (
                <tr 
                  key={user._id} 
                  className={`hover:bg-white/5 transition-colors cursor-pointer ${
                    user.blocked ? 'opacity-60' : ''
                  }`}
                  onClick={() => {
                    setSelectedUser(user);
                    setShowUserModal(true);
                  }}
                >
                  <td className="px-6 py-4" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={() => toggleSelectUser(user._id)}
                      className="text-white/40 hover:text-white/60 transition-colors"
                    >
                      {selectedUsers.includes(user._id) ? (
                        <CheckSquare className="w-5 h-5 text-purple-400" />
                      ) : (
                        <Square className="w-5 h-5" />
                      )}
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-sm font-medium text-white">{user.name}</p>
                      <p className="text-xs text-white/40">{user.email}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium border ${getRoleBadgeColor(user.role)}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {user.blocked ? (
                        <>
                          <XCircle className="w-4 h-4 text-red-400" />
                          <span className="text-xs text-red-400/60">Blocked</span>
                        </>
                      ) : user.verified ? (
                        <>
                          <CheckCircle className="w-4 h-4 text-green-400" />
                          <span className="text-xs text-green-400/60">Active</span>
                        </>
                      ) : (
                        <>
                          <AlertCircle className="w-4 h-4 text-yellow-400" />
                          <span className="text-xs text-yellow-400/60">Pending</span>
                        </>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="text-xs text-white/60">
                        Quizzes: {user.quizzesTaken || 0}
                      </div>
                      <div className="text-xs text-white/60">
                        Avg: {user.avgScore || 0}%
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-white/60">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </span>
                  </td>
                  <td className="px-6 py-4" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setSelectedUser(user);
                          setShowUserModal(true);
                        }}
                        className="p-1.5 hover:bg-blue-500/20 rounded-lg transition-colors group"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4 text-white/40 group-hover:text-blue-400" />
                      </button>
                      <button
                        onClick={() => toggleUserStatus(user._id, !user.blocked)}
                        className={`p-1.5 rounded-lg transition-colors group ${
                          user.blocked 
                            ? 'hover:bg-green-500/20' 
                            : 'hover:bg-red-500/20'
                        }`}
                        title={user.blocked ? 'Unblock User' : 'Block User'}
                      >
                        {user.blocked ? (
                          <UserCheck className="w-4 h-4 text-white/40 group-hover:text-green-400" />
                        ) : (
                          <UserX className="w-4 h-4 text-white/40 group-hover:text-red-400" />
                        )}
                      </button>
                      <button
                        onClick={() => {
                          setUserToDelete(user._id);
                          setShowDeleteConfirm(true);
                        }}
                        className="p-1.5 hover:bg-red-500/20 rounded-lg transition-colors group"
                        title="Delete User"
                      >
                        <Trash2 className="w-4 h-4 text-white/40 group-hover:text-red-400" />
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
          <div className="flex items-center justify-between px-6 py-3 border-t border-white/10">
            <div className="text-sm text-white/40">
              Showing {(currentPage - 1) * usersPerPage + 1} to {Math.min(currentPage * usersPerPage, filteredUsers.length)} of {filteredUsers.length} users
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-2 bg-white/5 border border-white/10 rounded-lg text-white/40 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white/60 text-sm">
                {currentPage} / {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="p-2 bg-white/5 border border-white/10 rounded-lg text-white/40 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Empty state */}
        {filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <Shield className="w-12 h-12 text-white/20 mx-auto mb-4" />
            <p className="text-white/40">No users found matching your criteria</p>
          </div>
        )}
      </div>

      {/* User Details Modal */}
      {showUserModal && selectedUser && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
          <div className="bg-[#111117] border border-white/10 rounded-xl max-w-2xl w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-medium text-white">User Details</h3>
              <button
                onClick={() => setShowUserModal(false)}
                className="text-white/40 hover:text-white/60"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-white/40 mb-1">Name</p>
                  <p className="text-sm text-white">{selectedUser.name}</p>
                </div>
                <div>
                  <p className="text-xs text-white/40 mb-1">Email</p>
                  <p className="text-sm text-white">{selectedUser.email}</p>
                </div>
                <div>
                  <p className="text-xs text-white/40 mb-1">Role</p>
                  <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium border ${getRoleBadgeColor(selectedUser.role)}`}>
                    {selectedUser.role}
                  </span>
                </div>
                <div>
                  <p className="text-xs text-white/40 mb-1">Status</p>
                  <div className="flex items-center gap-2">
                    {selectedUser.blocked ? (
                      <span className="text-xs text-red-400">Blocked</span>
                    ) : selectedUser.verified ? (
                      <span className="text-xs text-green-400">Active</span>
                    ) : (
                      <span className="text-xs text-yellow-400">Pending</span>
                    )}
                  </div>
                </div>
                <div>
                  <p className="text-xs text-white/40 mb-1">Joined</p>
                  <p className="text-sm text-white">{new Date(selectedUser.createdAt).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-xs text-white/40 mb-1">Last Login</p>
                  <p className="text-sm text-white">
                    {selectedUser.lastLogin ? new Date(selectedUser.lastLogin).toLocaleDateString() : 'Never'}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-white/40 mb-1">Quizzes Taken</p>
                  <p className="text-sm text-white">{selectedUser.quizzesTaken || 0}</p>
                </div>
                <div>
                  <p className="text-xs text-white/40 mb-1">Average Score</p>
                  <p className="text-sm text-white">{selectedUser.avgScore || 0}%</p>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  onClick={() => setShowUserModal(false)}
                  className="px-4 py-2 bg-white/5 text-white rounded-lg hover:bg-white/10 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
          <div className="bg-[#111117] border border-white/10 rounded-xl max-w-md w-full p-6">
            <h3 className="text-lg font-medium text-white mb-4">Delete User</h3>
            <p className="text-white/40 text-sm mb-6">
              Are you sure you want to delete this user? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 px-4 py-2 bg-white/5 text-white rounded-lg hover:bg-white/10 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => userToDelete && deleteUser(userToDelete)}
                className="flex-1 px-4 py-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20 transition-colors border border-red-500/20"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}