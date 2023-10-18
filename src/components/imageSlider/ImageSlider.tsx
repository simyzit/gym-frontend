import React, { FC, useCallback, useEffect, useRef, useState } from "react";
import leftArrow from "../../assets/arrow_left.svg";
import rightArrow from "../../assets/arrow_right.svg";
import cl from "./ImageSliderStyles.module.css";


interface ISlide {
  url: string;
  title: string;
}

interface IImageSlideProps {
  slides: ISlide[];
  parentWidth: number;
}

const ImageSlider: FC<IImageSlideProps> = ({ slides, parentWidth }) => {
  const timeRef = useRef<any>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };
  const goToNext = useCallback(() => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  }, [currentIndex, slides]);

  const goToSlide = (slideIndex: number) => {
    setCurrentIndex(slideIndex);
  };

  useEffect(() => {
    if (timeRef.current) {
      clearTimeout(timeRef.current);
    }
    timeRef.current = setTimeout(() => {
      goToNext();
    }, 2000);

    return () => clearTimeout(timeRef.current);
  }, [goToNext]);

  return (
    <div className={cl.sliderStyles}>
      <div
        className={cl.slideStyles}
        style={{ backgroundImage: `url(${slides[currentIndex].url})` }}
      ></div>
      <div className={cl.sliderContainer}>
        <div className={cl.dotsContainerStyle}>
          {slides.map((slide, slideIndex) => (
            <div
              key={slideIndex}
              className={cl.dotsStyle}
              onClick={() => goToSlide(slideIndex)}
            >
              •
            </div>
          ))}
        </div>
        <div>
          <img
            src={leftArrow}
            alt="Left Arrow"
            className={cl.leftArrowStyles}
            onClick={goToPrevious}
          />
          <img
            src={rightArrow}
            alt="Right Arrow"
            className={cl.rightArrowStyles}
            onClick={goToNext}
          />
        </div>
      </div>
    </div>
  );
};

export default ImageSlider;
