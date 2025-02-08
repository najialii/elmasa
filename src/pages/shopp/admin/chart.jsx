import React, { useEffect, useState, useMemo } from "react";
import { ToastContainer } from "react-toastify";
import axios from 'axios';
import "react-toastify/dist/ReactToastify.css";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  CartesianGrid,
  Tooltip,
  Legend,
  XAxis,
  YAxis,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { useAuth } from "../../../context/authcontext";

const OverviewPage = () => {
  const { token } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [totalRevenue, setTotalRevenue] = useState(null);
  const [revenuePerCategory, setRevenuePerCategory] = useState([]);
  const [revenuePerCity, setRevenuePerCity] = useState([]);

  const chartColors = {
    bar: "#027384",
    barHover: "#1e88e5",
    line: "#ADEB76",
    grid: "#e0e0e0",
    statusColors: {
      Delivered: "#027384",
      Paid: "#ADEB76",
      Return: "#e57373",
    },
    revenueColors: {
      Delivered: "#027384",
      Paid: "#ff7043",
      Return: "#e57373",
    },
  };

  const placeholderProducts = [
    { name: "Product A", orders: 120 },
    { name: "Product B", orders: 95 },
    { name: "Product C", orders: 75 },
    { name: "Product D", orders: 60 },
  ];

  // useEffect(() => {
  //   const fetchOrders = async () => {
  //     try {
  //       const response = await fetch("http://localhost/masa/api/content/items/orders", {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       });
  //       if (response.ok) {
  //         const data = await response.json();
  //         setOrders(data);
  //       } else {
  //         throw new Error("Failed to fetch orders");
  //       }
  //     } catch (err) {
  //       setError(err.message);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchOrders();
  // }, [token]);

  const getTotalRevenueForPeriod = async (start, end) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/orders/date/${start}/${end}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Total Revenue:', response.data);
      setTotalRevenue(response.data);
    } catch (error) {
      console.error('Error fetching total revenue:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getTotalRevenueForPeriod(startDate, endDate);
  };

  const getRevenuePerCategory = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/orders/revenuePerCategory`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Revenue Per Category:', response.data);
      setRevenuePerCategory(response.data);
    } catch (error) {
      console.error('Error fetching revenue per category:', error);
    }
  };

  const getRevenuePerCity = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/orders/revenuePerCity`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Revenue Per City:', response.data);
      setRevenuePerCity(response.data);
    } catch (error) {
      console.error('Error fetching revenue per city:', error);
    }
  };

  const getTotalRevenue = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/orders/revenue`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Total Revenue:', response.data);
      setTotalRevenue(response.data);
    } catch (error) {
      console.error('Error fetching total revenue:', error);
    }
  };

  // Calls
  useEffect(() => {
    getTotalRevenueForPeriod('2024-01-01', '2024-01-31');
    getRevenuePerCategory();
    getRevenuePerCity();
    getTotalRevenue();
  }, [token]);

  // Helper functions
  const calculateStatusCount = (status) =>
    orders.filter((order) => order.status === status).length;

  const totalRevenueAmount = orders.reduce((sum, order) => sum + order.total, 0);
  const averageOrderValue = totalRevenueAmount / orders.length || 0;

  const statusChartData = useMemo(() => [
    { name: "Delivered", value: calculateStatusCount("Delivered") },
    { name: "Paid", value: calculateStatusCount("Paid") },
    { name: "Return", value: calculateStatusCount("Return") },
  ], [orders]);

  const revenueChartData = useMemo(() => [
    {
      name: "Delivered",
      value: orders
        .filter((order) => order.status === "Delivered")
        .reduce((sum, order) => sum + order.total, 0),
    },
    {
      name: "Paid",
      value: orders
        .filter((order) => order.status === "Paid")
        .reduce((sum, order) => sum + order.total, 0),
    },
    {
      name: "Return",
      value: orders
        .filter((order) => order.status === "Return")
        .reduce((sum, order) => sum - order.total, 0),
    },
  ], [orders]);

  const monthlyRevenueData = useMemo(() => {
    const months = Array(12).fill(0);

    orders
      .filter((order) => order.status === "Delivered" || order.status === "Paid")
      .forEach((order) => {
        const month = new Date(order._created * 1000).getMonth();
        months[month] += order.total;
      });

    return months.map((value, index) => ({
      name: new Date(0, index).toLocaleString("en", { month: "short" }),
      value,
    }));
  }, [orders]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="overview-container p-6 max-w-7xl mx-auto space-y-8">
      <h1 className="text-4xl font-semibold text-center mb-6 text-primary">
        Overview
      </h1>

      {/* KPIs*/}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[{ label: "Total Orders", value: orders.length, color: "#027384" },
          { label: "Total Revenue", value: `EGP ${totalRevenueAmount.toFixed(2)}`, color: "#000" }, 
          { label: "Avg Order Value", value: `EGP ${averageOrderValue.toFixed(2)}`, color: "#000" },
          { label: "Returned Orders", value: calculateStatusCount("Return"), color: "#000" } 
        ].map((kpi, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h2 className="text-sm text-gray-600">{kpi.label}</h2>
            <p className="text-xl font-bold" style={{ color: kpi.color }}>{kpi.value}</p>
          </div>
        ))}
      </div>

      <div className="py-6">
        <div className="flex gap-4">
          <div className="bg-gray-100 p-4 rounded-xl">
            <h2 className="text-lg font-semibold text-center">Order Status Distribution</h2>
            <PieChart width={250} height={300}>
              <Tooltip />
              <Legend />
              <Pie
                data={statusChartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={5}
              >
                {statusChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={chartColors.statusColors[entry.name]} />
                ))}
              </Pie>
            </PieChart>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="col-span-full bg-gray-100 rounded-xl p-4">
              <h2 className="text-lg font-semibold text-center">Monthly Revenue</h2>
              <LineChart width={700} height={400} data={monthlyRevenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke={chartColors.grid} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke={chartColors.line}
                  strokeWidth={3}
                />
              </LineChart>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto py-8 px-4">
        <h1 className="text-2xl font-bold mb-4">Revenue Chart</h1>
        <form onSubmit={handleSubmit} className="mb-4">
          <div className="flex space-x-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Start Date</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">End Date</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Apply
          </button>
        </form>
        {totalRevenue && (
          <div>
            <h2 className="text-xl font-semibold">Total Revenue: {totalRevenue.revenue}</h2>
            <h2 className="text-xl font-semibold">Total Orders: {totalRevenue.orders_number}</h2>
          </div>
        )}
        {revenuePerCategory && revenuePerCategory.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold">Revenue Per Category</h2>
            <ul>
              {revenuePerCategory.map((category) => (
                <li key={category.id}>
                  {category.name}: {category.revenue}
                </li>
              ))}
            </ul>
          </div>
        )}
        {revenuePerCity.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold">Revenue Per City</h2>
            <ul>
              {revenuePerCity.map((city) => (
                <li key={city.id}>
                  {city.name}: {city.revenue}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold text-center mb-4">Top Products</h2>
        <ul className="divide-y divide-gray-300">
          {placeholderProducts.map((product, index) => (
            <li key={index} className="flex justify-between py-2 px-4">
              <span>{product.name}</span>
              <span>{product.orders} Orders</span>
            </li>
          ))}
        </ul>
      </div>

      <ToastContainer />
    </div>
  );
};

export default OverviewPage;
