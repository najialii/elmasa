import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Bar, Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const OverviewPage = () => {
  // State variables
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [chartType, setChartType] = useState("Bar");
  // &filter[certienum]=${certificateNumber}
  
  useEffect(() => {
    const fetchOrders = async () => {
      try { 
        const response = await fetch("http://localhost/masa/api/content/items/orders");
       
        if (response.ok) {
          const data = await response.json();
          console.log(data)
          setOrders(data);
        } else {
          throw new Error("Failed to fetch orders");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Helper functions for calculations
  const calculateStatusCount = (status) => orders.filter((order) => order.status === status).length;
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const averageOrderValue = totalRevenue / orders.length || 0;

  // Chart data configurations
  const statusChartData = {
    labels: ["Delivered", "Paid", "Return"],
    datasets: [
      {
        label: "Order Count by Status",
        data: [
          calculateStatusCount("Delivered"),
          calculateStatusCount("Paid"),
          calculateStatusCount("Return"),
        ],
        backgroundColor: ["#4CAF50", "#2196F3", "#FF5722"],
        borderColor: ["#388E3C", "#1976D2", "#D32F2F"],
        borderWidth: 1,
      },
    ],
  };

  const revenueChartData = {
    labels: ["Delivered", "Paid", "Return"],
    datasets: [
      {
        label: "Revenue by Status",
        data: [
          orders.filter((order) => order.status === "Delivered").reduce((sum, order) => sum + order.total, 0),
          orders.filter((order) => order.status === "Paid").reduce((sum, order) => sum + order.total, 0),
          orders.filter((order) => order.status === "Return").reduce((sum, order) => sum - order.total, 0),
        ],
        backgroundColor: ["#4CAF50", "#2196F3", "#FF5722"],
        borderColor: ["#388E3C", "#1976D2", "#D32F2F"],
        borderWidth: 1,
      },
    ],
  };

  const monthlyRevenueData = () => {
    // Initialize an array with 12 months (all values set to 0)
    const months = Array(12).fill(0);
  
    // Filter orders to include only those with "Delivered" or "Paid" statuses
    const filteredOrders = orders.filter(
      (order) => order.status === "Delivered" || order.status === "Paid"
    );
  
    // Aggregate revenue for each month
    filteredOrders.forEach((order) => {
      const month = new Date(order._created * 1000).getMonth(); // Convert Unix timestamp to Date
      months[month] += order.total;
    });
  
    // Return formatted chart data
    return {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      datasets: [
        {
          label: "Monthly Revenue (Delivered & Paid)",
          data: months,
          backgroundColor: "#2196F3",
          borderColor: "#1976D2",
          borderWidth: 1,
        },
      ],
    };
  };
    

  // Chart options
  const chartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Order Statistics",
      },
      tooltip: {
        enabled: true,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  // Render selected chart type
  const renderChart = (chartData) => {
    switch (chartType) {
      case "Line":
        return <Line data={chartData} options={chartOptions} />;
      case "Pie":
        return <Pie data={chartData} options={chartOptions} />;
      case "Bar":
      default:
        return <Bar data={chartData} options={chartOptions} />;
    }
  };


  return (
    <div className="overview-container p-6 max-w-7xl mx-auto space-y-6">
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <div className="flex justify-start">
      <h1 className="text-4xl font-semibold text-center mb-6 text-primary">
         Overview
      </h1>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {[
          { label: "Total Orders", value: orders.length, color: "from-blue-200" },
          { label: "Total Revenue", value: `EGP ${totalRevenue.toFixed(2)}`, color: "from-green-200" },
          { label: "Avg Order Value", value: `EGP ${averageOrderValue.toFixed(2)}`, color: "from-yellow-200" },
          { label: "Returned Orders", value: calculateStatusCount("Return"), color: "from-red-200" },
        ].map((kpi, index) => (
          <div
            key={index}
            className={`bg-gradient-to-bl ${kpi.color} to-white p-6 shadow-lg rounded-lg`}
          >
            <h2 className="text-xl font-semibold text-center mb-4">{kpi.label}</h2>
            <p className="text-3xl text-center">{kpi.value}</p>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="bg-white rounded-lg shadow-md p-10">
        {/* Chart Selector */}
        <div className="flex justify-center space-x-4 mb-6">
          {["Bar", "Line", "Pie"].map((type) => (
            <button
              key={type}
              className={`py-2 px-4 rounded-md ${
                chartType === type ? "bg-primary text-white" : "bg-gray-200"
              }`}
              onClick={() => setChartType(type)}
            >
              {type} Chart
            </button>
          ))}
        </div>

        {/* Chart Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <div>
            <h2 className="text-lg font-semibold text-center mb-4">Order Status Distribution</h2>
            {renderChart(statusChartData)}
          </div>
          <div>
            <h2 className="text-lg font-semibold text-center mb-4">Revenue by Status</h2>
            {renderChart(revenueChartData)}
          </div>
          <div className="col-span-full">
            <h2 className="text-lg font-semibold text-center mb-4">Monthly Revenue</h2>
            {renderChart(monthlyRevenueData())}
          </div>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default OverviewPage;
