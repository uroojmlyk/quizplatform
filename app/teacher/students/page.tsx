'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Search, 
  Check, 
  X, 
  Users,
  ArrowLeft
} from 'lucide-react';
import { showToast } from '@/lib/toast';
import { Toaster } from 'react-hot-toast';

interface Student {
  _id: string;
  name: string;
  email: string;
  createdAt: string;
}

export default function TeacherStudentsPage() {
  const router = useRouter();
  const [allStudents, setAllStudents] = useState<Student[]>([]);
  const [assignedStudents, setAssignedStudents] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [teacherId, setTeacherId] = useState<string>('');

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (!user.id) {
      router.push('/login');
      return;
    }
    setTeacherId(user.id);
    fetchData(user.id);
  }, []);

  const fetchData = async (tid: string) => {
    try {
      // Fetch all students
      const studentsRes = await fetch('/api/users?role=student');
      const studentsData = await studentsRes.json();
      
      if (studentsData.success) {
        setAllStudents(studentsData.data || []);
      }

      // Fetch teacher's assigned students
      const assignedRes = await fetch(`/api/teacher/assigned-students?teacherId=${tid}`);
      const assignedData = await assignedRes.json();
      
      if (assignedData.success) {
        setAssignedStudents(assignedData.data.map((s: Student) => s._id));
      }
    } catch (error) {
      showToast.error('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const toggleStudent = async (studentId: string, assign: boolean) => {
    try {
      const res = await fetch('/api/teacher/assign-student', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          teacherId,
          studentId,
          action: assign ? 'assign' : 'unassign'
        })
      });

      const data = await res.json();

      if (data.success) {
        if (assign) {
          setAssignedStudents([...assignedStudents, studentId]);
          showToast.success('Student assigned');
        } else {
          setAssignedStudents(assignedStudents.filter(id => id !== studentId));
          showToast.success('Student removed');
        }
      } else {
        showToast.error(data.error || 'Operation failed');
      }
    } catch (error) {
      showToast.error('Network error');
    }
  };

  const filteredStudents = allStudents.filter(s => 
    s.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-[#09090B] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-indigo-400 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#09090B]">
      <Toaster position="top-right" />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => router.back()}
            className="p-2 bg-white/[0.02] border border-white/[0.05] rounded-lg text-white/40 hover:text-white/60"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl font-light text-white">manage students</h1>
            <p className="text-sm text-white/30 mt-1">
              assign students to see your private quizzes
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-white/[0.02] border border-white/[0.05] rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-4 h-4 text-indigo-400" />
              <span className="text-xs text-white/40">total students</span>
            </div>
            <p className="text-xl font-light text-white">{allStudents.length}</p>
          </div>
          <div className="bg-white/[0.02] border border-white/[0.05] rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Check className="w-4 h-4 text-green-400" />
              <span className="text-xs text-white/40">assigned</span>
            </div>
            <p className="text-xl font-light text-white">{assignedStudents.length}</p>
          </div>
          <div className="bg-white/[0.02] border border-white/[0.05] rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <X className="w-4 h-4 text-red-400" />
              <span className="text-xs text-white/40">available</span>
            </div>
            <p className="text-xl font-light text-white">{allStudents.length - assignedStudents.length}</p>
          </div>
        </div>

        {/* Search */}
        <div className="mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
            <input
              type="text"
              placeholder="search students..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white/[0.02] border border-white/[0.05] rounded-lg text-white placeholder:text-white/20 text-sm"
            />
          </div>
        </div>

        {/* Students Table */}
        <div className="bg-white/[0.02] border border-white/[0.05] rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/[0.05] bg-white/[0.02]">
                  <th className="px-6 py-3 text-left text-xs font-medium text-white/40">name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white/40">email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white/40">joined</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-white/40">action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.05]">
                {filteredStudents.map((student) => {
                  const isAssigned = assignedStudents.includes(student._id);
                  
                  return (
                    <tr key={student._id} className="hover:bg-white/[0.02]">
                      <td className="px-6 py-4">
                        <p className="text-sm text-white">{student.name}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-white/60">{student.email}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-white/40">
                          {new Date(student.createdAt).toLocaleDateString()}
                        </p>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => toggleStudent(student._id, !isAssigned)}
                          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                            isAssigned
                              ? 'bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/30'
                              : 'bg-green-500/10 text-green-400 hover:bg-green-500/20 border border-green-500/30'
                          }`}
                        >
                          {isAssigned ? 'remove' : 'assign'}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {filteredStudents.length === 0 && (
            <div className="text-center py-12">
              <Users className="w-12 h-12 text-white/20 mx-auto mb-3" />
              <p className="text-white/40 text-sm">no students found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}