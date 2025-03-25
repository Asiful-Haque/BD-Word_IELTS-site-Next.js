"use client"; // Ensures it runs on the client side

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export function CarouselPlugin() {
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  );

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full max-w-7xl mx-auto px-4"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index} className="w-full flex justify-center">
            <div className="text-center w-full max-w-4xl">
              <h2 className="text-xl md:text-3xl uppercase text-gray-700">
                Language School
              </h2>
              <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold mx-auto">
                Any language you want
              </h1>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="hidden " /> 
      <CarouselNext className="hidden " />
    </Carousel>
  );
}
