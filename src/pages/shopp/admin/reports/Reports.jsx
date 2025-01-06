import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../../../context/authcontext";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,Area,Line,  ResponsiveContainer, PieChart, Pie, Cell, Legend,ComposedChart  } from "recharts";
  
function Reports() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [totalRevenue, setTotalRevenue] = useState(null);
  const { token } = useAuth();
  const [revenuePerCategory, setRevenuePerCategory] = useState([]);
  const [revenuePerCity, setRevenuePerCity] = useState([]);



  const colors = ["#027384", "#5ab4c4", "#cedf2f", "#99ad22", "#8af9e3", "#e4ec83"];

  function getColor(index) {
    return colors[index % colors.length]; // Cycle through colors if more cities than colors
  }

  // Fetch revenue per category
  const getRevenuePerCategory = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/orders/revenuePerCategory', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Revenue Per Category:', response.data);
      setRevenuePerCategory(response.data.data || []);
    } catch (error) {
      console.error('Error fetching revenue per category:', error);
    }
  };

  // Fetch total revenue for a period
  const getTotalRevenueForPeriod = async (start, end) => {
    try {
      const response = await axios.get(`http://localhost:8000/api/orders/date/${start}/${end}`, {
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

  const getTotalRevenue = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/orders/revenue', {
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

  // Fetch revenue per city
  const getRevenuePerCity = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/orders/revenuePerCity', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Revenue Per City:', response.data);
      setRevenuePerCity(response.data.data || []);
    } catch (error) {
      console.error('Error fetching revenue per city:', error);
    }
  };

  useEffect(() => {
    getTotalRevenueForPeriod();
    getTotalRevenue();
    getRevenuePerCategory();
    getRevenuePerCity();
  }, [token]);

  return (
    <div className="mx-12">
      {/* Period */}
      <div className="w-full flex flex-col justify-center">
        <h1 className="text-2xl font-bold mb-4">Revenue</h1>
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
            className="mt-4 bg-primary text-white px-4 py-2 rounded-md transition"
          >
            Apply
          </button>
          <div>
            {totalRevenue && (
              <div>
                <h2 className="text-xl font-semibold">Total Revenue: {totalRevenue.revenue}</h2>
                <h2 className="text-xl font-semibold">Total Orders: {totalRevenue.orders_number}</h2>
              </div>
            )}
          </div>
        </form>
        <div className="bg-white p-4 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold">Revenue Analysis (Same Data Visualization)</h2>
        <ResponsiveContainer width="100%" height={400}>
          <ComposedChart data={revenuePerCity} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            {/* Area */}
            <Area type="monotone" dataKey="revenue" fill="#cedf2f" stroke="#99ad22" />
            {/* Bar */}
            <Bar dataKey="revenue" barSize={20} fill="#027384" />
            {/* Line */}
            <Line type="monotone" dataKey="revenue" stroke="#5ab4c4" />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
      </div>

      

      {/* Revenue Per Category */}
      <div className="grid grid-cols-3 gap-8">
        
        <div className="bg-white col-span-2 p-4 rounded-xl shadow-md">

        <h2 className="text-xl font-semibold mt-4">Revenue Per Category</h2>
        {/* <button
          onClick={getRevenuePerCategory}
          className="bg-green-500 text-white px-2 py-1 rounded-md hover:bg-green-700 transition"
        >
          Refresh Revenue Per Category
        </button> */}
        <table className="min-w-full bg-white mt-4">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-4 border-b">Category</th>
              <th className="py-2 px-4 border-b">Revenue</th>
            </tr>
          </thead>
          <tbody>
            {revenuePerCategory.map((category) => (
              <tr key={category.id} >
                <td className="py-2 px-4 border-b">{category.name}</td>
                <td className="py-2 px-4 border-b">${category.revenue}</td>
              </tr>
            ))}
          </tbody>
        </table>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-md">
      <h2 className="text-xl font-semibold">Revenue Per Category</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={revenuePerCategory}
            dataKey="revenue" // Value to calculate the pie slice
            nameKey="name" // Key for the category names
            cx="50%" // Center x-coordinate
            cy="50%" // Center y-coordinate
            outerRadius={100} // Outer radius of the pie
            fill="#8884d8"
            label // Display labels on the pie slices
          >
            {revenuePerCategory.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Pie>
          <Tooltip  />
        </PieChart>
      </ResponsiveContainer>
    </div>

      </div>



<div className="grid grid-cols-3 mt-4 gap-8">
        <div div className="bg-white p-4 rounded-xl shadow-md">
        <h2 className="text-base font-bold mt-4">Revenue Per City</h2>
        {/* <button
          onClick={getRevenuePerCity}
          className="bg-green-500 text-white px-2 py-1 rounded-md hover:bg-green-700 transition"
        >
          Refresh Revenue Per City
        </button> */}
        <table className="min-w-full bg-white mt-4 rounded-xl ">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-4 border-b">City</th>
              <th className="py-2 px-4 border-b">Revenue</th>
            </tr>
          </thead>
          <tbody>
            {revenuePerCity.map((city, index) => (
              <tr key={city.id} >
                <td className="py-2 px-4 border-b">{city.name}</td>
                <td className="py-2 px-4 border-b" style={{ color: getColor(index) }}>${city.revenue}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Revenue Per City a chart */}
      <div className="bg-white p-2 rounded-xl sahdow-xl w-full col-span-2">

          <ResponsiveContainer width="100%" height={300}>
            <BarChart barSize={20} data={revenuePerCity} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="revenue" width={10}>
              {revenuePerCity.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={getColor(index)} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
</div>
      
    </div>
  );
}

export default Reports;