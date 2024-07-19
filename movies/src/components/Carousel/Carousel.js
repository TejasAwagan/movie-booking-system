import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Carousel.css";

function AutoPlay() {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 2,
    slidesToScroll:1,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 2000,
    cssEase: "linear"
  };
  return (
    <div className="slider-container ">
      <Slider {...settings}>
        <div className="images">
        <img alt="img3" src="https://www.radiocity.in/images/uploads/swatantrya-veer-savarkar-trailer-out-starring-randeep-hooda-march5_d.jpg" width={"100%"} height={"100%"} />
        </div>
        <div>
        <img alt="img2" src="https://e24bollywood.com/wp-content/uploads/2024/01/Shaitaan-Teaser-ajay-devgn-r-madhwan-jyotika.jpg" width={"100%"} height={"100%"} />
        </div>
        <div>
        <img alt="img3" src="https://wallpapercave.com/wp/wp10254448.jpg" width={"100%"} height={"100%"} />
        </div>
        <div>
        <img alt="img4" src="https://statcdn.fandango.com/MPX/image/NBCU_Fandango/818/451/GxK.jpg" width={"100%"} height={"100%"} />
        </div>
        <div>
        <img alt="img5" src="https://static.toiimg.com/photo/108237610.cms" width={"100%"} height={"100%"} />
        </div>
        <div>
        <img alt="img6" src="https://assets-in.bmscdn.com/discovery-catalog/events/et00109952-vhwhzpetud-landscape.jpg" width={"112.5%"} height={"100%"} />
        </div>
      </Slider>
    </div>
  );
}

export default AutoPlay;
