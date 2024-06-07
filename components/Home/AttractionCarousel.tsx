"use client"

import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { useMemo, useRef, useState } from "react";
import { useWindowSize } from "@reactuses/core"
import { Button } from "@components/ui/button";
import { FaStar } from "react-icons/fa";
import PopoverInfo from "@components/PopoverInfo";
import { IAttraction } from "@models/attraction";

function preventNeighboringDuplicates(array: any[]) {
    for (let i = 0; i < array.length - 1; i++) {
        if (array[i].image == array[i + 1].image) {
            let randomIndex;
            do {
                randomIndex = Math.floor(Math.random() * array.length);
            } while (randomIndex === i || randomIndex === i + 1 || array[randomIndex].image == array[i].image);
            [array[i + 1], array[randomIndex]] = [array[randomIndex], array[i + 1]];
        }
    }
    return array;
}
export interface IAttractionWithRating extends IAttraction {
    averageRating: number;
    ratingCount: number;
}
export const Carousel = ({ bestAttractions }: { bestAttractions: IAttractionWithRating[] }) => {
    const [selectedAttraction, setSelectedAttraction] = useState<any>(null);
    const { width, height } = useWindowSize();
    const carouselWrapperRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: carouselWrapperRef,
        offset: ["start start", "end start"],
    });
    const maximumScale = useMemo(() => {
        const windowYRatio = height / width;
        const xScale = 1.66667;
        const yScale = xScale * (16 / 9) * windowYRatio;
        return Math.max(xScale, yScale);
    }, [width, height]);
    const scale = useTransform(scrollYProgress, [0.3, 0.5, 0.66], [3, maximumScale * 1.1, 1]);
    const postersOpacity = useTransform(
        scrollYProgress,
        [0.64, 0.66],
        [0, 1],
    );
    const posterTranslateXLeft = useTransform(
        scrollYProgress,
        [0.64, 0.66],
        [-20, 0],
    );
    const posterTranslateXRight = useTransform(
        scrollYProgress,
        [0.64, 0.66],
        [20, 0],
    );
    const [carouselVariant, setCarouselVariant] = useState<"inactive" | "active">("inactive");
    useMotionValueEvent(scrollYProgress, "change", (progress) => {
        if (progress >= 0.67) {
            setCarouselVariant("active");
        }
        else {
            setCarouselVariant("inactive");
        }
    });

    // const randomAttractionSet1 = preventNeighboringDuplicates(bestAttractions.slice(1, 6)
    //     .sort(() => Math.random() - 0.5)
    //     .concat(bestAttractions.slice(1, 6).sort(() => Math.random() - 0.5))
    //     .concat(bestAttractions.slice(1, 6).sort(() => Math.random() - 0.5))
    // );
    const randomAttractionSet1 = bestAttractions.slice(1, 6)
    .concat(bestAttractions.slice(1, 6))
    .concat(bestAttractions.slice(1, 6));

    const randomAttractionSet2 = bestAttractions.slice(6, bestAttractions.length)
    .concat(bestAttractions.slice(6, bestAttractions.length))
    .concat(bestAttractions.slice(6, bestAttractions.length));

    const handleClick = (attraction: any) => {
        setSelectedAttraction(attraction);
    };

    const handleClose = () => {
        setSelectedAttraction(null);
    };
    return (
        <motion.div animate={carouselVariant} className="bg-black pb-16">
            <div ref={carouselWrapperRef} className="mt-[-100vh] overflow-clip h-[300vh]">
                <div className="h-screen sticky top-0 flex items-center">
                    <div className="relative flex gap-5 mb-5 left-1/2 -translate-x-1/2">
                        <motion.div style={{ opacity: postersOpacity, x: posterTranslateXLeft }} className="w-[300px] md:w-[60vw]  aspect-[9/16] md:aspect-video shrink-0 overflow-clip rounded-2xl">
                            <img className="w-full h-full object-cover" src={bestAttractions[1].image} alt={bestAttractions[1].title} />
                        </motion.div>
                        <motion.div
                            onClick={() => handleClick(bestAttractions[0])}
                            style={{ scale }} className="relative w-[300px] md:w-[60vw] aspect-[9/16] md:aspect-video shrink-0 overflow-clip rounded-2xl">
                            <img className="w-full h-full object-cover" src={bestAttractions[0].image} alt={bestAttractions[0].title} />
                            <motion.div
                                variants={{
                                    active: { opacity: 1 },
                                    inactive: { opacity: 0 },

                                }} className="p-5 items-center text-white text-lg absolute flex flex-col md:flex-row gap-4 md:gap-0 md:justify-between left-0 bottom-0 w-full">
                                <div className="flex flex-col">
                                    <p>
                                        {bestAttractions[0].title}
                                    </p>
                                    <div className="flex flex-row items-center space-x-3">
                                        <FaStar className="text-yellow-400" />
                                        <p>{bestAttractions[0].averageRating}</p>
                                    </div>
                                </div>
                                <Button onClick={() => handleClick(bestAttractions[0])} size="lg" className="p-7 bg-white rounded-full text-black hover:bg-gray-400">Check now</Button>
                            </motion.div>
                        </motion.div>
                        <motion.div style={{ opacity: postersOpacity, x: posterTranslateXRight }} className="w-[300px] md:w-[60vw] aspect-[9/16] md:aspect-video shrink-0 overflow-clip rounded-2xl">
                            <img className="w-full h-full object-cover" src={bestAttractions[2].image} alt={bestAttractions[2].title} />
                        </motion.div>
                    </div>
                </div>
            </div>
            <motion.div variants={{
                active: { opacity: 1, y: 0 },
                inactive: { opacity: 0, y: 20 },
            }}
                transition={{ duration: 0.4 }}
                className="pt-4 space-y-3 -mt-[calc((100vh-(300px*(16/9)))/2)] md:-mt-[calc((100vh-(60vw*(9/16)))/2)]">
                <SmallCarousel attractions={randomAttractionSet1} handleClick={handleClick} />
                <div className="[--duration:74s] [--carousel-offset:-32px]">
                    <SmallCarousel attractions={randomAttractionSet2} handleClick={handleClick} />
                </div>
            </motion.div>
            {selectedAttraction && (
                <PopoverInfo
                    item={selectedAttraction}
                    isOpen={true}
                    onClose={handleClose}
                />
            )}
        </motion.div>
    );
}

const SmallCarousel = ({ attractions, handleClick }: { attractions: IAttractionWithRating[], handleClick: any }) => {
    return (
        <div className="overflow-clip">
            <div className="flex gap-3 animate-carousel-move relative left-[var(--carousel-offset,0px)]">
                {attractions.map((attraction, index) => (
                    <div className="relative w-[40vw] md:w-[23vw] aspect-video shrink-0" key={`${index}-${attraction.title}`} onClick={() => handleClick(attraction)}>
                        <img className="w-full h-full object-cover rounded-xl" src={attraction.image} alt={attraction.title} />
                        <div>
                            <p className={`p-5 items-center text-white ${attraction.title.length > 20 ? "text-xs" : "text-sm"} md:text-lg absolute flex flex-col gap-4 md:gap-0 left-0 bottom-0 w-full overflow-hidden`}>
                            {attraction.title}
                            <div className="flex items-center space-x-3">
                                    <FaStar className="text-yellow-400" />
                                    <p>{attraction.averageRating}</p>
                                </div>
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}