import { FaBox, FaMoneyCheckAlt, FaRegUser } from "react-icons/fa";
import { RiBox2Fill } from "react-icons/ri";
import Card from "./components/Card";
import ChartRevenue from "./components/ChartRevenue";
import LineChartOrders from "./components/LineChartOrders";

const CARDS = [
  {
    number: 9999999999,
    title: "Tổng doanh thu",
    Icon: () => (
      <div className="flex h-full rounded-full bg-[#4ecac2]/20">
        <FaMoneyCheckAlt className="m-auto text-[40px] text-[#4ecac2]" />
      </div>
    ),
    type: "money",
  },
  {
    number: 100,
    title: "Đơn hàng đã đặt",
    Icon: () => (
      <div className="flex h-full rounded-full bg-[#1c84ee]/20">
        <FaBox className="m-auto text-[40px] text-[#1c84ee]" />
      </div>
    ),
    type: "number",
  },
  {
    number: 20,
    title: "Tổng số khách hàng",
    Icon: () => (
      <div className="flex h-full rounded-full bg-[#22c55e]/20">
        <FaRegUser className="m-auto text-[40px] text-[#22c55e]" />
      </div>
    ),
    type: "number",
  },
  {
    number: 10,
    title: "Đơn hàng đã hủy",
    Icon: () => (
      <div className="flex h-full rounded-full bg-[#ff5b5b]/20">
        <RiBox2Fill className="m-auto text-[40px] text-[#ff5b5b]" />
      </div>
    ),
    type: "number",
  },
];

function AdminDashboard() {
  return (
    <div className="mt-10">
      <div>
        <h2 className="text-2xl font-bold">Dashboard</h2>
        <span className="text-sm text-gray-400">
          Chào mừng Admin đến với Admin dashboard
        </span>
      </div>

      {/* main */}
      <div className="mt-6 flex justify-between gap-5">
        {CARDS.map((card, index) => (
          <Card
            key={index}
            number={card.number}
            title={card.title}
            type={card.type}
            Icon={<card.Icon />}
          />
        ))}
      </div>

      {/* chart */}
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
}

export default AdminDashboard;
