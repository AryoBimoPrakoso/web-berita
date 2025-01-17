// Resources/js/Components/Homepage/NewsDetail.jsx
import React from "react";
import { Head, Link } from "@inertiajs/react";

const NewsDetail = ({ news, otherNews = [] }) => {
    return (
        <div>
            <div class="navbar sticky top-0 z-10 bg-white text-black shadow-xl">
                <a href={"/"} class="btn btn-ghost text-xl">
                    MusicNews
                </a>
            </div>

            <Head title={news.title} />

            <div className="min-h-screen flex flex-row bg-slate-50">
                <div className="basis-3/4">
                    <h1 className="text-2xl font-bold text-black p-4">
                        {news.title}
                    </h1>
                    <div className="flex justify-center">
                        <img
                            src={news.image}
                            alt={news.title}
                            className="my-4 rounded-md w-full max-w-3xl h-96 object-contain "
                        />
                    </div>
                    <p className="text-black leading-relaxed whitespace-pre-wrap text-md p-4">
                        {news.description}
                    </p>
                </div>

                <aside className="basis-1/4 m-4">
                    <div className="">
                        <h1 className="text-xl font-semibold mb-4 text-black">
                            Berita Lainnya
                        </h1>
                    </div>

                    {/* BARU */}
                    <div className="space-y-4">
                        {otherNews && otherNews.length > 0 ? (
                            otherNews.map((item) => (
                                <Link
                                    key={item.id}
                                    href={route("news.show", item.id)}
                                    className="block group"
                                >
                                    <div className="flex bg-white rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg">
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className="size-28 object-cover"
                                        />
                                        <div className="p-3">
                                            <h3 className="font-medium text-sm group-hover:text-blue-600 line-clamp-2">
                                                {item.title}
                                            </h3>
                                            <p className="text-gray-500 text-xs mt-2 line-clamp-2">
                                                {item.description}
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <p className="text-gray-500">
                                Tidak ada berita lainnya saat ini
                            </p>
                        )}
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default NewsDetail;
