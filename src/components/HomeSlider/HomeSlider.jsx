import Slider from "react-slick";
import img1 from "../../assets/images/slider-image-1.jpeg";
import img2 from "../../assets/images/slider-image-2.jpeg";
import img3 from "../../assets/images/slider-image-3.jpeg";
import img4 from "../../assets/images/grocery-banner.png";
import img5 from "../../assets/images/grocery-banner-2.jpeg";

export default function HomeSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows:false,
    autoplay:true,

  };
  return (
    <section className="py-7 mb-5">
        <div className="flex justify-center flex-wrap items-center">
            <div className="w-[60%]">
            <Slider {...settings}>
      <div>
        <img src={img1} className="w-full h-[400px]" alt="" />
      </div>
        <div>
            <img src={img2} className="w-full h-[400px]" alt="" />
        </div>
        <div>
            <img src={img3} className="w-full h-[400px]" alt="" />
        </div>
    </Slider>
    </div>
    <div className="w-[40%]">
            <img src={img4} className="w-full h-[200px]" alt="" />
            <img src={img5} className="w-full h-[200px]" alt="" />
        </div>
        </div>
       
    </section>
  );
}