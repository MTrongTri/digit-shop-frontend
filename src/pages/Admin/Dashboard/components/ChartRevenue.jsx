import { getMonthlyRevenueByYear } from "@/services/orderService";
import clsx from "clsx";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Rectangle,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

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

function ChartRevenue() {
  const [revenueByYear, setRevenueByYear] = useState(new Date().getFullYear());
  const [revenue, setRevenue] = useState({
    data: [],
    isLoading: false,
    hasError: false,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setRevenue((prevState) => ({ ...prevState, isLoading: true }));
        const res = await getMonthlyRevenueByYear(revenueByYear);
        setRevenue((prevState) => ({
          ...prevState,
          data: res.data.map((item) => ({
            name: mapMonthNumberToName[item.month],
            Revenue: item.totalRevenue,
          })),
        }));
      } catch (error) {
        toast.error("Có lỗi xảy ra");
      } finally {
        setRevenue((prevState) => ({ ...prevState, isLoading: false }));
      }
    };

    fetchData();
  }, []);

  if (revenue.isLoading || revenue.hasError) return null;

  return (
    <div className="h-full">
      <div className="flex items-center justify-between border-b-2 border-gray-200 p-4 pt-0">
        <div>
          <span className="font-semibold">Revenue</span>
        </div>
        <div>
          <span className="font-semibold">Year: {revenueByYear}</span>
        </div>
      </div>

      <div className="mt-4 h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={300}
            data={revenue.data}
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
            <Bar
              dataKey="Revenue"
              fill="#1c84ee"
              activeBar={<Rectangle fill="pink" stroke="blue" />}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default ChartRevenue;
