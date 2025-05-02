"use client";
import { CarouselPlugin } from "@/components/carousel/page";
import Header from "@/components/Header/page";
import { useRouter } from "next/navigation";
import React from "react";
import { FaBook, FaHeadphones, FaPen, FaMicrophone } from "react-icons/fa";

// #2E6F40
// #CFFFDC
// #68BA7F
// #253D2C
// #17252A
// #2B7A78
// #3AAFA9 1

const Home = () => {
  const router = useRouter();

  return (
    <div className="font-sans">
      <Header />

      {/* Hero Section */}
      <header className="relative bg-[#68BA7F] text-black text-center py-32">
        <CarouselPlugin />
        <button className="mt-10 px-6 py-2 border rounded-lg border-black text-black font-bold transition-transform duration-300 hover:scale-110 cursor-pointer">
          Read More
        </button>
      </header>
 
      {/* Features Section */}
      <section className="text-center py-30 bg-black">
        <h3 className="text-red-500 font-bold text-6xl mb-6">Start Now</h3>
        <h2 className="text-3xl font-bold text-white">Practice a skill</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8 max-w-7xl mx-auto">
          <div
            onClick={() => router.push("/listening")}
            className="cursor-pointer p-20 bg-yellow-500 rounded-lg text-center transform transition-transform hover:scale-110 hover:shadow-2xl hover:bg-yellow-400 duration-500"
          >
            <FaHeadphones size={80} className="mx-auto" />
            <h4
              onClick={() => router.push("/listening")}
              className="font-bold mt-4 text-black text-xl"
            >
              Listening
            </h4>
          </div>

          <div
            onClick={() => router.push("/reading")}
            className="cursor-pointer p-20 bg-[#68BA7F] rounded-lg text-center transform transition-transform hover:scale-110 hover:shadow-2xl hover:bg-[#56a56f] duration-500"
          >
            <FaBook size={80} className="mx-auto" />
            <h4
              onClick={() => router.push("/reading")}
              className="font-bold mt-4 text-black text-xl"
            >
              Reading
            </h4>
          </div>

          <div onClick={() => router.push("/writing")} 
          className="cursor-pointer p-20 bg-yellow-500 rounded-lg text-center transform transition-transform hover:scale-110 hover:shadow-2xl hover:bg-yellow-400 duration-500">
            <FaPen size={80} className="mx-auto" />
            <h4 className="font-bold mt-4 text-black text-xl">Writing</h4>
          </div>

          <div className="cursor-pointer p-20 bg-[#68BA7F] rounded-lg text-center transform transition-transform hover:scale-110 hover:shadow-2xl hover:bg-[#56a56f] duration-500">
            <FaMicrophone size={80} className="mx-auto" />
            <h4 className="font-bold mt-4 text-black text-xl">Speaking</h4>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
