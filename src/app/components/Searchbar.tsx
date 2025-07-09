export default function Searchbar() {
  return (
    <div className="py-2 px-4 flex gap-4 border border-gray-400 rounded-lg">
      <i className="bi bi-search text-gray-400"></i>
      <input
        type="text"
        placeholder="Search menu items"
        className="w-full outline-0"
      />
    </div>
  );
}
