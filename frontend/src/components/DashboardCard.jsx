function DashboardCard({ title, value }) {
  return (
    <div className="bg-blue-600 text-white p-6 rounded-2xl shadow-lg w-56">
      <p className="text-sm font-medium opacity-80 mb-2">{title}</p>
      <p className="text-4xl font-bold">{value}</p>
    </div>
  );
}

export default DashboardCard;