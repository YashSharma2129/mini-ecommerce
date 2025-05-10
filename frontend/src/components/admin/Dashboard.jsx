import { useState, useEffect } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { toast } from 'react-hot-toast';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    totalProducts: 0,
    totalUsers: 0,
    recentOrders: [],
    salesData: []
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/admin/dashboard`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setStats(response.data);
    } catch (error) {
      toast.error('Failed to load dashboard data');
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Orders"
          value={stats.totalOrders}
          icon="📦"
          trend="+12%"
        />
        <StatCard
          title="Total Revenue"
          value={`$${stats.totalRevenue.toFixed(2)}`}
          icon="💰"
          trend="+8%"
        />
        <StatCard
          title="Total Products"
          value={stats.totalProducts}
          icon="🏷️"
          trend="+5%"
        />
        <StatCard
          title="Total Users"
          value={stats.totalUsers}
          icon="👥"
          trend="+15%"
        />
      </div>

      {/* Sales Chart */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
        <h3 className="text-lg font-semibold mb-4">Sales Overview</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={stats.salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="sales" stroke="#4F46E5" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-4">Recent Orders</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-sm font-medium text-gray-500">
                  <th className="p-4">Order ID</th>
                  <th className="p-4">Customer</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Amount</th>
                  <th className="p-4">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {stats.recentOrders.map((order) => (
                  <tr key={order._id} className="text-sm">
                    <td className="p-4">{order._id.slice(-6)}</td>
                    <td className="p-4">{order.name}</td>
                    <td className="p-4">
                      <StatusBadge status={order.status} />
                    </td>
                    <td className="p-4">${order.totalAmount.toFixed(2)}</td>
                    <td className="p-4">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon, trend }) => (
  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
    <div className="flex items-center justify-between">
      <span className="text-2xl">{icon}</span>
      <span className={`text-sm font-medium ${
        trend.startsWith('+') ? 'text-green-500' : 'text-red-500'
      }`}>
        {trend}
      </span>
    </div>
    <h3 className="text-2xl font-bold mt-4">{value}</h3>
    <p className="text-gray-500 dark:text-gray-400 text-sm">{title}</p>
  </div>
);

const StatusBadge = ({ status }) => {
  const colors = {
    pending: 'bg-yellow-100 text-yellow-800',
    processing: 'bg-blue-100 text-blue-800',
    shipped: 'bg-purple-100 text-purple-800',
    delivered: 'bg-green-100 text-green-800'
  };

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[status]}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

export default Dashboard;
