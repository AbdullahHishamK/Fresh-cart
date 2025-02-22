import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Slider from "react-slick";

export default function CategorySlider() {

  async function getAllCategory() {
    return await axios.get("https://ecommerce.routemisr.com/api/v1/categories");     
  }

  const { data } = useQuery({
    queryKey: ['category'],
    queryFn: getAllCategory
  });

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
<div className="container mx-auto py-7 mb-10 ">
<Slider {...settings}>
      {data?.data.data.map((item, idx) => (
        <div key={idx}>
          <img src={item.image} className="w-full h-[200px]" alt="" />
        </div>
      ))}
    </Slider>
</div>
  );
}