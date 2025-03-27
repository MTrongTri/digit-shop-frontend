import { getMonthlyOrderStatsByYear } from "@/services/orderService";
import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Jan",
    Placed: 2400,
    Cancel: 40,
  },
  {
    name: "Feb",
    Placed: 223,
    Cancel: 0,
  },
  {
    name: "Mar",
    Placed: 352,
    Cancel: 20,
  },
  {
    name: "Apr",
    Placed: 8262,
    Cancel: 2,
  },
  {
    name: "May",
    Placed: 2847,
    Cancel: 1,
  },
  {
    name: "Jun",
    Placed: 3583,
    Cancel: 10,
  },
  {
    name: "Jul",
    Placed: 3400,
    Cancel: 621,
  },
  {
    name: "Aug",
    Placed: 8400,
    Cancel: 251,
  },
  {
    name: "Sep",
    Placed: 1400,
    Cancel: 278,
  },
  {
    name: "Oct",
    Placed: 2400,
    Cancel: 271,
  },
  {
    name: "Nov",
    Placed: 5400,
    Cancel: 10,
  },
  {
    name: "Dec",
    Placed: 2300,
    Cancel: 128,
  },
];

const mapMonthNumberToName = {
  1: "Jan",
  2: "Feb",
  3: "Mar",
  4: "Apr",
  5: "May",
  6: "Jun",
  7: "Jul",
  8: "Aug",
  9: "Sep",
  10: "Otc",
  11: "Nov",
  12: "Dec",
};

function LineChartOrders() {
  const [ordersStatsByYear, setOrdersStatsByYear] = useState(
    new Date().getFullYear(),
  );
  const [ordersStats, setOrdersStats] = useState({
    data: [],
    isLoading: false,
    hasError: false,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setOrdersStats((prevState) => ({ ...prevState, isLoading: true }));
        const res = await getMonthlyOrderStatsByYear(ordersStatsByYear);
        setOrdersStats((prevState) => ({
          ...prevState,
          data: res.data.map((item) => ({
            name: mapMonthNumberToName[item.month],
            Placed: item.totalOrders,
            Cancel: item.cancelledOrders,
          })),
        }));
      } catch (error) {
        toast.error("Có lỗi xảy ra");
      } finally {
        setOrdersStats((prevState) => ({ ...prevState, isLoading: false }));
      }
    };

    fetchData();
  }, []);

  if (ordersStats.isLoading || ordersStats.hasError) return null;

  return (
    <div className="h-full">
      <div className="flex items-center justify-between border-b-2 border-gray-200 p-4 pt-0">
        <div>
          <span className="font-semibold">Orders</span>
        </div>
        <div>
          <span className="font-semibold">Year: {ordersStatsByYear}</span>
        </div>
      </div>

      <div className="mt-4 h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={500}
            height={300}
            data={ordersStats.data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="Placed"
              stroke="#1c84ee"
              activeDot={{ r: 8 }}
            />
            <Line type="monotone" dataKey="Cancel" stroke="#ff5b5b" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default LineChartOrders;
