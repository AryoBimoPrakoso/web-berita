import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Link } from "@inertiajs/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./NewsSlider.css";


export default function NewsSlider({ news }) {
    return (
        <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={24}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            breakpoints={{
                640: {
                    slidesPerView: 2,
                },
                1024: {
                    slidesPerView: 4,
                },
            }}
            style={{
                "--swiper-pagination-bullet-inactive-color": "#999999",
                "--swiper-pagination-bullet-inactive-opacity": "1",
                "--swiper-pagination-bullet-size": "8px",
                "--swiper-pagination-bullet-horizontal-gap": "8px"

            }}
            className="w-full "
        >
            {news.map((newsItem, index) => (
                <SwiperSlide key={index} className="relative group mb-16">
                    <Link href={`/news/${newsItem.id}`}>
                        <div className="bg-white justify-center rounded-lg shadow-md overflow-hidden w-max">
                            {newsItem.image && (
                                <img
                                    src={newsItem.image}
                                    alt={newsItem.title}
                                    className="w-full h-48 object-cover"
                                />
                            )}
                            <div className="p-4 hover:text-blue-500">
                                <h3 className="font-semibold text-lg text-black mb-2 line-clamp-2">
                                    {newsItem.title.substring(0, 25)}....
                                </h3>
                                <p className="text-gray-600 text-sm line-clamp-3">
                                    {newsItem.description.substring(0, 50)}...
                                </p>
                                <div className="text-sm flex flex-col text-gray-500 mt-2">
                                    <p>{newsItem.display_date}</p>
                                </div>
                            </div>
                        </div>
                    </Link>
                </SwiperSlide>
            ))}
        </Swiper>
    );
}
