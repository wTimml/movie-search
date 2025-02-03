interface ChildProps {
    original_title: string;
    backdrop: string;
}

export default function heroSection({ original_title, backdrop}:ChildProps) {
    return (
        // <div className="mt-12 mb-6 bg-gray-400 relative w-full h-40 md:h-52 bg-center bg-cover flex items-center text-white text-center"
        //     style={{ backgroundImage: `url(${backdrop})` }}
        //     >

        //     <div className="relative z-10 px-20">
        //         <h1 className="text-2xl md:text-4xl font-bold drop-shadow">{original_title}</h1>
        //     </div>
        // </div>

        <div
            className="mt-12 mb-6 bg-gray-400 relative w-full invisible md:visible md:h-52 bg-center bg-cover flex items-center text-white text-center"
            style={{ backgroundImage: `url(${backdrop})` }}
        >
            {/* Overlay to create opacity effect */}
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>

            <div className="relative z-10 px-20">
                <h1 className="text-2xl md:text-4xl font-bold drop-shadow">{original_title}</h1>
            </div>
        </div>
    )
}