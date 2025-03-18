export default function TestDetail({ params }) {
  return (
    <div>
      <h1 className="text-2xl font-bold">Bài test: {params.id}</h1>
      <p>Câu hỏi sẽ hiển thị ở đây.</p>
    </div>
  );
}
