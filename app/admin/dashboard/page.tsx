'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { 
  Users, 
  Calendar, 
  ClipboardList, 
  Clock, 
  Eye, 
  CheckCircle2, 
  XCircle,
  Search,
  LogOut,
  Bell,
  Settings,
  Mail,
  Phone,
  Bed,
  MessageSquare,
  AlertCircle,
  X
} from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { useQuery, useMutation } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import { Id } from '../../../convex/_generated/dataModel';
export default function AdminDashboard() {
  const router = useRouter();
  const [isAuthChecking, setIsAuthChecking] = useState(true);
  
  // Live Convex Data & Mutations
  const rawBookings = useQuery(api.bookings.list);
  const allBookings = rawBookings || [];
  const updateStatus = useMutation(api.bookings.updateStatus);

  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedBooking, setSelectedBooking] = useState<typeof allBookings[0] | null>(null);
  const [cancellingId, setCancellingId] = useState<Id<"bookings"> | null>(null);

  const ITEMS_PER_PAGE = 5;

  // Reset to page 1 when search query changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  // --- Auth Guard ---
  useEffect(() => {
    const isAuth = sessionStorage.getItem('sara_admin_auth');
    if (!isAuth) {
      router.push('/admin/login');
    } else {
      setIsAuthChecking(false);
    }
  }, [router]);

  // --- Actions ---
  const handleLogout = () => {
    sessionStorage.removeItem('sara_admin_auth');
    router.push('/admin/login');
  };

  const handleExport = () => {
    // Standardize data for Excel
    const dataToExport = displayedBookings.map(b => ({
      'Ref ID': `#SARA-${b._id.slice(0, 8)}`,
      'Guest Name': b.name,
      'Email': b.email,
      'Phone': b.phone,
      'Room Type': b.roomType,
      'Guests': b.guests,
      'Status': b.status,
      'Message': b.message,
      'Booking Date': new Date(b._creationTime).toLocaleDateString()
    }));

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Bookings');
    
    // Auto-size columns (basic implementation)
    const wscols = [
        {wch: 15}, {wch: 25}, {wch: 30}, {wch: 20}, {wch: 20}, {wch: 10}, {wch: 15}, {wch: 40}, {wch: 15}
    ];
    worksheet['!cols'] = wscols;

    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
    
    saveAs(blob, `Sara_Hotel_Bookings_${new Date().toISOString().split('T')[0]}.xlsx`);
  };

  // --- Filtering & Sorting ---
  const displayedBookings = useMemo(() => {
    let filtered = allBookings;
    
    if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        filtered = allBookings.filter(b => 
            b.name.toLowerCase().includes(query) ||
            b.roomType.toLowerCase().includes(query) ||
            b.phone.includes(query)
        );
    }

    // Latest first (sorting by creation time from Convex)
    return [...filtered].sort((a, b) => b._creationTime - a._creationTime);
  }, [allBookings, searchQuery]);

  // --- Actions ---
  const handleConfirm = async (id: Id<"bookings">) => {
    await updateStatus({ id, status: "Confirmed" });
  };

  const handleCancel = async () => {
    if (!cancellingId) return;
    await updateStatus({ id: cancellingId, status: "Cancelled" });
    setCancellingId(null);
  };

  // --- Pagination Logic ---
  const { paginatedBookings, totalPages } = useMemo(() => {
    const total = Math.ceil(displayedBookings.length / ITEMS_PER_PAGE);
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    return {
      paginatedBookings: displayedBookings.slice(start, end),
      totalPages: Math.max(1, total)
    };
  }, [displayedBookings, currentPage]);

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'Confirmed': return 'bg-emerald-50 text-emerald-700 border-emerald-100';
      case 'Pending': return 'bg-amber-50 text-amber-700 border-amber-100';
      case 'Cancelled': return 'bg-red-50 text-red-700 border-red-100';
      default: return 'bg-slate-50 text-slate-700 border-slate-100';
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Modals Layer */}
      <AnimatePresence>
        {/* Details Modal */}
        {selectedBooking && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    exit={{ opacity: 0 }}
                    onClick={() => setSelectedBooking(null)}
                    className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
                />
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    className="relative w-full max-w-2xl bg-white rounded-[2.5rem] shadow-2xl shadow-slate-900/20 overflow-hidden"
                >
                    <div className="p-8 md:p-10">
                        <div className="flex justify-between items-start mb-8">
                            <div>
                                <h3 className="text-3xl font-bold tracking-tight text-slate-900">{selectedBooking.name}</h3>
                                <div className="flex items-center gap-2 mt-2">
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusStyle(selectedBooking.status)}`}>
                                        {selectedBooking.status}
                                    </span>
                                    <span className="text-slate-400 text-xs font-medium">Ref ID: #SARA-{selectedBooking._id.slice(0, 8)}</span>
                                </div>
                            </div>
                            <Button variant="ghost" size="icon" onClick={() => setSelectedBooking(null)} className="rounded-full hover:bg-slate-100">
                                <X size={20} />
                            </Button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                            <div className="space-y-4">
                                <div className="flex items-center gap-3 text-slate-600">
                                    <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400"><Mail size={18} /></div>
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Email Address</span>
                                        <span className="font-semibold">{selectedBooking.email}</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 text-slate-600">
                                    <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400"><Phone size={18} /></div>
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Phone Number</span>
                                        <span className="font-semibold">{selectedBooking.phone}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="flex items-center gap-3 text-slate-600">
                                    <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400"><Bed size={18} /></div>
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Room Type</span>
                                        <span className="font-semibold">{selectedBooking.roomType}</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 text-slate-600">
                                    <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400"><Users size={18} /></div>
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Guest Count</span>
                                        <span className="font-semibold">{selectedBooking.guests} People</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
                            <div className="flex items-center gap-2 mb-3 text-slate-900 font-bold text-sm">
                                <MessageSquare size={16} /> Guest Message
                            </div>
                            <p className="text-slate-600 leading-relaxed text-sm italic">"{selectedBooking.message}"</p>
                        </div>
                    </div>
                    <div className="bg-slate-50/50 p-6 flex justify-end gap-3 border-t border-slate-100">
                        <Button variant="ghost" onClick={() => setSelectedBooking(null)} className="rounded-full px-6 font-bold">Close Details</Button>
                        <Button 
                            className="bg-slate-900 text-white rounded-full px-8 font-bold"
                            onClick={() => {
                                handleConfirm(selectedBooking._id);
                                setSelectedBooking(null);
                            }}
                        >
                            Confirm This Booking
                        </Button>
                    </div>
                </motion.div>
            </div>
        )}

        {/* Cancel Confirmation Modal */}
        {cancellingId && (
            <div className="fixed inset-0 z-[110] flex items-center justify-center p-6">
                <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    exit={{ opacity: 0 }}
                    onClick={() => setCancellingId(null)}
                    className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
                />
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 10 }}
                    className="relative w-full max-w-sm bg-white rounded-[2rem] shadow-2xl p-8 text-center"
                >
                    <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center text-red-500 mx-auto mb-6 border border-red-100">
                        <AlertCircle size={32} />
                    </div>
                    <h4 className="text-xl font-bold text-slate-900 mb-3">Cancel Booking?</h4>
                    <p className="text-slate-500 mb-8 text-sm leading-relaxed">
                        Are you sure you want to cancel this booking? This action will update the guest status to cancelled.
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                        <Button 
                            variant="ghost" 
                            onClick={() => setCancellingId(null)}
                            className="rounded-full px-6 border border-slate-200 font-bold"
                        >
                            No
                        </Button>
                        <Button 
                            variant="destructive"
                            onClick={handleCancel}
                            className="bg-red-600 hover:bg-red-700 text-white rounded-full px-6 font-bold"
                        >
                            Yes, Cancel
                        </Button>
                    </div>
                </motion.div>
            </div>
        )}
      </AnimatePresence>

      <nav className="bg-white border-b border-slate-200 px-8 py-4 sticky top-0 z-50">
        <div className="max-w-[1600px] mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-bold tracking-tight text-slate-900 px-4 py-2 bg-slate-100 rounded-xl">Sara Hotel Admin</h2>
          </div>
          <div className="flex items-center gap-4">
            <Button 
                variant="ghost" 
                onClick={handleLogout}
                className="gap-2 text-red-500 hover:text-red-600 hover:bg-red-50 rounded-full px-6 py-2.5 h-auto font-bold border border-transparent hover:border-red-100 transition-all"
            >
                <LogOut size={18} />
                Logout
            </Button>
          </div>
        </div>
      </nav>

      <main className="max-w-[1600px] mx-auto p-8 md:p-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 mb-2">Booking Management Dashboard</h1>
          <p className="text-slate-500 font-medium">Monitor and manage all guest reservations in one place.</p>
        </div>

        {/* Stats Grid - Simplified for clarity */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
                { title: 'Total Bookings', value: allBookings.length, icon: ClipboardList, color: 'text-blue-600', bg: 'bg-blue-50' },
                { title: 'Confirmed', value: allBookings.filter(b => b.status === 'Confirmed').length, icon: Users, color: 'text-emerald-600', bg: 'bg-emerald-50' },
                { title: 'Pending', value: allBookings.filter(b => b.status === 'Pending').length, icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
                { title: 'Cancelled', value: allBookings.filter(b => b.status === 'Cancelled').length, icon: XCircle, color: 'text-red-600', bg: 'bg-red-50' },
            ].map((stat, i) => (
                <Card key={i} className="border-none shadow-sm rounded-[1.5rem] overflow-hidden">
                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                        <CardTitle className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">{stat.title}</CardTitle>
                        <div className={`${stat.bg} ${stat.color} p-2 rounded-xl`}>
                            <stat.icon size={18} />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold tracking-tight text-slate-900">{stat.value}</div>
                    </CardContent>
                </Card>
            ))}
        </div>

        {/* Bookings Table Section */}
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.4 }}
           className="bg-white border border-slate-100 rounded-[2rem] shadow-sm overflow-hidden"
        >
          <div className="p-8 border-b border-slate-50 lg:flex items-center justify-between">
            <div>
                <h2 className="text-xl font-bold tracking-tight text-slate-900">Recent Bookings</h2>
                <p className="text-xs text-slate-400 font-medium mt-1">Showing real-time results for query: "{searchQuery || 'All'}"</p>
            </div>
            <div className="flex items-center gap-4 mt-4 lg:mt-0">
               <div className="relative">
                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                 <input 
                    type="text" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search name, room or phone..." 
                    className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/5 transition-all w-32 sm:w-64 md:w-72"
                 />
               </div>
               <Button 
                onClick={handleExport}
                className="bg-slate-900 text-white rounded-full px-6 font-bold shadow-lg shadow-slate-900/10"
               >
                 Export Data
               </Button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50">
                  <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-50">Guest Detail</th>
                  <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-50 hidden xl:table-cell">Message</th>
                  <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-50 hidden md:table-cell">Room Type</th>
                  <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-50 text-center hidden md:table-cell">Qty</th>
                  <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-50 hidden sm:table-cell">Status</th>
                  <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-50 text-right">Action Gate</th>
                </tr>
              </thead>
              <tbody>
                {paginatedBookings.length > 0 ? (
                    paginatedBookings.map((booking) => (
                        <tr 
                          key={booking._id} 
                          className="group hover:bg-slate-50/50 transition-colors cursor-pointer"
                          onClick={() => setSelectedBooking(booking)}
                        >
                            <td className="px-8 py-6 border-b border-slate-50">
                                <div className="flex flex-col">
                                <span className="font-bold text-slate-900">{booking.name}</span>
                                <span className="text-[11px] text-slate-400 font-bold mb-1">{booking.email}</span>
                                <span className="text-sm text-slate-600 font-bold flex items-center gap-1">
                                    <Phone size={12} className="text-slate-400" /> {booking.phone}
                                </span>
                                </div>
                            </td>
                            <td className="px-8 py-6 border-b border-slate-50 max-w-[200px] hidden xl:table-cell">
                                <p className="text-sm text-slate-600 truncate font-medium">{booking.message || "—"}</p>
                            </td>
                            <td className="px-8 py-6 border-b border-slate-50 font-bold text-slate-900 hidden md:table-cell">{booking.roomType}</td>
                            <td className="px-8 py-6 border-b border-slate-50 text-center font-bold text-slate-900 hidden md:table-cell">{booking.guests}</td>
                            <td className="px-8 py-6 border-b border-slate-50 hidden sm:table-cell">
                                <span className={`px-3 py-1 rounded-full text-[10px] font-bold border tracking-wider uppercase ${getStatusStyle(booking.status)}`}>
                                {booking.status}
                                </span>
                            </td>
                            <td className="px-8 py-6 border-b border-slate-50">
                                <div className="flex items-center justify-end gap-2">
                                <Button 
                                    variant="ghost" 
                                    size="icon" 
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setSelectedBooking(booking);
                                    }}
                                    className="h-9 w-9 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-900 hidden sm:inline-flex"
                                >
                                    <Eye size={18} />
                                </Button>
                                <Button 
                                    variant="ghost" 
                                    size="icon" 
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleConfirm(booking._id);
                                    }}
                                    className="h-9 w-9 rounded-xl hover:bg-emerald-50 text-slate-400 hover:text-emerald-600"
                                >
                                    <CheckCircle2 size={18} />
                                </Button>
                                <Button 
                                    variant="ghost" 
                                    size="icon" 
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setCancellingId(booking._id);
                                    }}
                                    className="h-9 w-9 rounded-xl hover:bg-red-50 text-slate-400 hover:text-red-600"
                                >
                                    <XCircle size={18} />
                                </Button>
                                </div>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan={5} className="p-20 text-center">
                            <div className="flex flex-col items-center gap-3">
                                <Search size={48} className="text-slate-200" />
                                <h3 className="text-lg font-bold text-slate-900">No matches found</h3>
                                <p className="text-slate-400 text-sm max-w-xs">We couldn't find any bookings matching "{searchQuery}". Try a different filter.</p>
                            </div>
                        </td>
                    </tr>
                )}
              </tbody>
            </table>
          </div>
          
          <div className="p-8 bg-slate-50/30 flex items-center justify-between">
            <p className="text-sm text-slate-400 font-bold">
              Showing {Math.min(displayedBookings.length, (currentPage - 1) * ITEMS_PER_PAGE + 1)} - {Math.min(displayedBookings.length, currentPage * ITEMS_PER_PAGE)} of {displayedBookings.length} Bookings
            </p>
            <div className="flex items-center gap-2">
                <Button 
                    variant="ghost" 
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(prev => prev - 1)}
                    className="rounded-xl font-bold transition-all disabled:opacity-30"
                >
                    Previous
                </Button>
                <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl border border-slate-100 shadow-sm">
                    <span className="text-xs font-bold text-slate-900">{currentPage}</span>
                    <span className="text-xs font-bold text-slate-400">/</span>
                    <span className="text-xs font-bold text-slate-400">{totalPages}</span>
                </div>
                <Button 
                    variant="ghost" 
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(prev => prev + 1)}
                    className="rounded-xl font-bold transition-all disabled:opacity-30"
                >
                    Next
                </Button>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
