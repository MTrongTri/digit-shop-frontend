import TableSkeleton from "@/components/Skeleton/TableSkeleton";

function AdminDashboard() {
  return (
    <div className="mt-10">
      <h2 className="text-2xl font-bold">Dashboard</h2>
      <span className="text-sm text-gray-400">
        Chào mừng Admin đến với Admin dashboard
      </span>
      <TableSkeleton />
    </div>
  );
}

export default AdminDashboard;
