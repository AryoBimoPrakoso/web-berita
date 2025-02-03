import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Link } from "@inertiajs/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const NewsList = ({ news }) => {
    if (!news || news.length === 0) {
        return (
            <div className="text-center text-gray-500 mt-8">
                <h3 className="text-xl font-semibold">
                    Saat Ini Tidak Ada Berita!
                </h3>
                <p>Coba kata kunci pencarian yang lain atau kembali nanti.</p>
            </div>
        );
    }

    return (
        <Swiper

            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={16}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            breakpoints={{
                640: {
                    slidesPerView: 3,
                    spaceBetween: 16,
                },
                1024: {
                    slidesPerView: 4,
                    spaceBetween: 20,
                }
            }}
            style={{
                padding: '20px'
            }}
            className="w-full"
        >
            {news.map((data, i) => (
                <SwiperSlide key={i} className="pb-12">
                    <Link 
                        className="group block" 
                        href={route("news.show", { news: data.id })}
                    >
                        <div className="bg-white rounded-lg shadow-md overflow-hidden transition-shadow duration-300 hover:shadow-lg">
                            <figure className="overflow-hidden">
                                {data.image ? (
                                    <img
                                        src={data.image}
                                        alt={data.title}
                                        className="w-full h-36 object-cover transition duration-300 ease-in-out group-hover:scale-105"
                                    />
                                ) : (
                                    <div className="w-full h-36 flex items-center justify-center bg-gray-200">
                                        <span className="text-sm text-gray-500">Tidak ada gambar</span>
                                    </div>
                                )}
                            </figure>
                            <div className="p-3 h-max">
                                <div className="flex items-center gap-2 mb-2">
                                    <h2 className="text-sm font-medium text-black group-hover:text-blue-600 line-clamp-2">
                                        {data.title?.substring(0, 50)}...
                                    </h2>
                                    {/* {data.isNew && (
                                        <span className="px-2 py-0.5 text-xs bg-green-500 text-white rounded-full whitespace-nowrap">
                                            NEW
                                        </span>
                                    )} */}
                                </div>
                                <p className="text-xs text-gray-600 line-clamp-2 mb-2">
                                    {data.description?.substring(0, 75)}...
                                </p>
                                <div className="flex items-center justify-between text-xs text-gray-500">
                                    <div className="flex flex-col">
                                        <p>{data.display_date}</p>
                                        <p className="text-gray-400">Oleh: {data.author}</p>
                                    </div>
                                    <span className="px-2 py-1 border rounded-lg text-xs">
                                        {data.category}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </Link>
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

export default NewsList;