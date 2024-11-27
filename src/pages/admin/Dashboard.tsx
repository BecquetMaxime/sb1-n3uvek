import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Users, Calendar, CreditCard, TrendingUp } from 'lucide-react';

export default function Dashboard() {
  const [stats, setStats] = React.useState({
    totalBookings: 0,
    totalRevenue: 0,
    activeUsers: 0,
    bookingsPerMonth: []
  });

  React.useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await fetch('/api/admin/dashboard', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-serif italic mb-8">Tableau de bord</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Réservations totales</p>
              <p className="text-2xl font-semibold">{stats.totalBookings}</p>
            </div>
            <Calendar className="w-8 h-8 text-rose-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Chiffre d'affaires</p>
              <p className="text-2xl font-semibold">{stats.totalRevenue}€</p>
            </div>
            <CreditCard className="w-8 h-8 text-rose-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Utilisateurs actifs</p>
              <p className="text-2xl font-semibold">{stats.activeUsers}</p>
            </div>
            <Users className="w-8 h-8 text-rose-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Taux d'occupation</p>
              <p className="text-2xl font-semibold">78%</p>
            </div>
            <TrendingUp className="w-8 h-8 text-rose-500" />
          </div>
        </div>
      </div>

      {/* Bookings Chart */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Réservations par mois</h2>
        <div className="w-full h-[400px]">
          <BarChart
            width={800}
            height={300}
            data={stats.bookingsPerMonth}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="bookings" fill="#f43f5e" name="Réservations" />
          </BarChart>
        </div>
      </div>
    </div>
  );
}