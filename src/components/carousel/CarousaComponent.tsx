import React from "react";

import { EmblaOptionsType } from "embla-carousel";
import { Iadvertisment } from "@/features/advertisment/advertismentSlice";
import { Box, Center, Image } from "@chakra-ui/react";

import useEmblaCarousel from "embla-carousel-react";
import { PhotoView } from "react-photo-view";

import AutoScroll from "embla-carousel-auto-scroll";
import Autoplay from "embla-carousel-autoplay";

import "./embla.css";

type PropType = {
  slides: Iadvertisment[];
  options?: EmblaOptionsType;
};

function CarousaComponent(props: PropType) {
  const { slides, options } = props;

  const [emblaRef, emblaApi] = useEmblaCarousel(options, [
    AutoScroll({ playOnInit: true }),
    Autoplay({ playOnInit: true, delay: 1500 }),
  ]);

  return (
    <section className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {slides.map((item, index) => (
            <div className="embla__slide" key={index}>
              <Center p={1} bg={"yellow.400"} rounded="5px" m={[2, 4]}>
                <PhotoView key={index} src={item.advertisment_img_path}>
                  <Image
                    borderRadius={"12px"}
                    src={item.advertisment_img_path}
                    alt={item.file_name}
                    objectFit="fill"
                    boxSize={["150px", "180px", "220px"]}
                  />
                </PhotoView>
              </Center>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CarousaComponent;
