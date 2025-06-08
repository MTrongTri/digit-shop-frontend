import { FaBox, FaMoneyCheckAlt, FaRegUser } from "react-icons/fa";
import { RiBox2Fill } from "react-icons/ri";
import Card from "./components/Card";
import ChartRevenue from "./components/ChartRevenue";
import LineChartOrders from "./components/LineChartOrders";
import { useEffect, useState } from "react";
import { getStatistics } from "@/services/statisticService";
import toast from "react-hot-toast";

const AdminDashboard = () => {
  const [statistics, setStatistics] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    totalCustomers: 0,
    cancelledOrders: 0,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const fetchDataStatistics = async () => {
      try {
        setIsLoading(true);
        const { data } = await getStatistics();
        setStatistics({
          totalRevenue: data.totalRevenue,
          totalOrders: data.totalOrders,
          totalCustomers: data.totalCustomers,
          cancelledOrders: data.cancelledOrders,
        });
      } catch (error) {
        setHasError(true);
        toast.error("Đã có lỗi xảy ra");
      } finally {
        setIsLoading(false);
      }
    };

    fetchDataStatistics();
  }, []);

  const CARDS = [
    {
      number: statistics.totalRevenue,
      title: "Tổng doanh thu",
      Icon: (
        <div className="flex h-full rounded-full bg-[#4ecac2]/20">
          <FaMoneyCheckAlt className="m-auto text-[40px] text-[#4ecac2]" />
        </div>
      ),
      type: "money",
    },
    {
      number: statistics.totalOrders,
      title: "Đơn hàng đã đặt",
      Icon: (
        <div className="flex h-full rounded-full bg-[#1c84ee]/20">
          <FaBox className="m-auto text-[40px] text-[#1c84ee]" />
        </div>
      ),
      type: "number",
    },
    {
      number: statistics.totalCustomers,
      title: "Tổng số khách hàng",
      Icon: (
        <div className="flex h-full rounded-full bg-[#22c55e]/20">
          <FaRegUser className="m-auto text-[40px] text-[#22c55e]" />
        </div>
      ),
      type: "number",
    },
    {
      number: statistics.cancelledOrders,
      title: "Đơn hàng đã hủy",
      Icon: (
        <div className="flex h-full rounded-full bg-[#ff5b5b]/20">
          <RiBox2Fill className="m-auto text-[40px] text-[#ff5b5b]" />
        </div>
      ),
      type: "number",
    },
  ];

  return (
    <div className="mt-10">
      <div>
        <h2 className="text-2xl font-bold">Dashboard</h2>
        <span className="text-sm text-gray-400">
          Chào mừng Admin đến với Admin dashboard
        </span>
      </div>

      {isLoading && <p className="text-center text-gray-500">Đang tải...</p>}

      {hasError && (
        <p className="text-center text-red-500">Không thể tải dữ liệu</p>
      )}

      <div className="mt-6 flex justify-between gap-5">
        {CARDS.map((card, index) => (
          <Card
            key={index}
            number={card.number}
            title={card.title}
            type={card.type}
            Icon={card.Icon}
          />
        ))}
      </div>

      {/* Chart */}
      <div className="mt-10 flex gap-3">
        <div className="w-1/2 rounded-md bg-white py-4">
          <ChartRevenue />
        </div>
        <div className="w-1/2 rounded-md bg-white py-4">
          <LineChartOrders />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
