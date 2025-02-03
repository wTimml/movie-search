
interface ChildProps {
  searchText: string;
  setSearchText: (value: string) => void;
}

export default function SearchBar({ searchText, setSearchText }: ChildProps) {

  // function handleSearch(term: string) {
  //   setSearchText(term)
  // }

  return (
    <div className="flex items-center justify-center mb-6">
      <div className="relative">

        <input
          type="text"
          placeholder="Search"
          className="w-64 px-4 py-2 rounded-lg border border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-900 focus:border-transparent dark:bg-gray-500"
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value)
          }}
        />

        <svg
          className="absolute right-3 top-2.5 h-5 w-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
    </div>
  );
}