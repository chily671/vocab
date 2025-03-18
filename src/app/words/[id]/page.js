export default function WordDetail({ params }) {
  return (
    <div>
      <h1 className="text-2xl font-bold">Chi tiết từ: {params.id}</h1>
      <p>Thông tin chi tiết về từ vựng sẽ hiển thị ở đây.</p>
    </div>
  );
}
