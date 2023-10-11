import React from "react";
import cl from "./AboutUsStyles.module.css";
import ImageSlider from "../imageSlider/ImageSlider";

const AboutUs = () => {
  const slides = [
    {
      url: "https://www.hussle.com/blog/wp-content/uploads/2020/12/Gym-structure-1080x675.png",
      title: "img1",
    },
    {
      url: "https://tropeaka.com/cdn/shop/articles/main_image_d517c79f-4ec7-4946-bb5e-db7e80623e85_1080x.jpg?v=1571697737",
      title: "img2",
    },
    {
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuX9MxNV8FSHNqcDTufnjW2aOyZmxxPN7NSw&usqp=CAU",
      title: "img3",
    },
    {
      url: "https://prod-ne-cdn-media.puregym.com/media/819394/gym-workout-plan-for-gaining-muscle_header.jpg?quality=80",
      title: "img4",
    },
    {
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8HC-ygkQPyxE8D0cyV_swNARb009U4GG7aw&usqp=CAU",
      title: "img5",
    },
  ];

  return (
    <div className={cl.aboutUs}>
      <h1>About us</h1>
      <div className={cl.aboutUsContainer}>
        <div>
          <p>
            K4Gym is a leading fitness center located near Grushevka metro
            station, offering over 1500 sq. m of space dedicated to
            top-of-the-line workout equipment from leading brands such as Hammer
            Strength, Life Fitness, and TechnoGym. With affordable membership
            options, K4Gym is accessible to everyone who wants to reach their
            fitness goals, whether it's building strength, increasing endurance,
            or losing weight. Certified trainers at K4Gym provide expert
            guidance and support to develop personalized workout plans tailored
            to each individual's needs and goals.
          </p>
        </div>
        <div>
          <div className={cl.sliderContainer}>
            <ImageSlider slides={slides} parentWidth={500} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
