import Link from "next/link";

export default function About() {

    return (

        <div className="bg-gray-100 text-gray-900 my-40 dark:bg-blue-950">
            <div className="container mx-auto px-4 py-12">
                <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg">
                    <h1 className="text-3xl font-bold mb-4 text-center">About Me</h1>
                    <p className="text-lg leading-relaxed">
                        Welcome! I&apos;m Lucas, and I created this as part of my commitment to enhancing my technical skills.
                    </p>
                    <p className="mt-4 text-lg">
                        My goal here is to improve.
                    </p>
                    <div className="mt-6 text-center">
                        <Link href="/" className="text-blue-500 hover:underline">Go Back Home</Link>
                    </div>
                </div>
            </div>
        </div>
    )
} 