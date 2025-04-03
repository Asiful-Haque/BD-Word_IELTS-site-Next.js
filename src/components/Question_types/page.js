'use client';
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

function Question_Types({ sec_name, parts = [] }) {
    const router = useRouter();
    return (
        <div className="relative w-full h-auto">
    
          {/* Top Banner */}
          <section className="relative w-full h-[50vh]">
            <Image
              src="/reading.jpg"
              alt="Reading"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/60 z-10" />
            <h1 className="w-[50%] m-auto absolute inset-0 text-white z-20 flex items-center justify-center whitespace-pre text-6xl md:text-8xl font-bold text-center">
              {sec_name} Section
            </h1>
          </section>
    
          {/* Button Section */}
          <section className="w-full h-auto bg-black text-white pt-12 pb-12 px-8">
            <h1 className="text-center text-3xl md:text-4xl font-bold text-yellow-500">
              Choose on which area you want to
            </h1>
            <h1 className="text-center text-5xl md:text-6xl font-bold pb-12 text-yellow-500">
              Practise
            </h1>
    
            <div className="flex flex-wrap justify-center gap-4 w-[80%] m-auto h-auto">
              {parts.map((part, index) => (
                <button
                  key={index}
                  onClick={() =>  router.push(
                    `/${sec_name.toLowerCase()}/${part
                      .toLowerCase()
                      .replace(/\s+/g, "-")
                      .replace(/\//g, "-")}`
                  )}
                  className="px-8 py-3 bg-red-800 text-white font-bold text-2xl rounded-lg hover:bg-red-700 hover:text-black transition transform hover:scale-110 cursor-pointer"
                >
                  {part}
                </button>
              ))}
            </div>
          </section>
        </div>
      );
};

export default Question_Types
