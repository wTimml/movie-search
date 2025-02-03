import DarkModeToggle from "@/app/components/darkModeToggle";
import Link from "next/link";

export default function navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full shadow-lg shadow-indigo-700/50 z-50 bg-white dark:bg-black dark:shadow-pink-500">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="text-xl font-bold text-pink-600">
          <Link href="/">Movies Browser</Link>
        </div>
          <ul className="flex space-x-10">
            <li><Link href="/" className="text-black hover:text-pink-600 dark:text-white">Home</Link></li>
            <li><Link href="/about" className="text-black hover:text-pink-600 dark:text-white">About</Link></li>
            <li><a className="hover:cursor-pointer">
              <DarkModeToggle/>
            </a></li>
          </ul>

      </div>
    </nav>
  );
}


// shadow-2xs
// box-shadow: var(--shadow-2xs); /* 0 1px rgb(0 0 0 / 0.05) */
// shadow-xs
// box-shadow: var(--shadow-xs); /* 0 1px 2px 0 rgb(0 0 0 / 0.05) */
// shadow-sm
// box-shadow: var(--shadow-sm); /* 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1) */
// shadow-md
// box-shadow: var(--shadow-md); /* 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1) */
// shadow-lg
// box-shadow: var(--shadow-lg); /* 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1) */
// shadow-xl
// box-shadow: var(--shadow-xl); /* 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1) */
// shadow-2xl