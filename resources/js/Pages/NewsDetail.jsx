// Resources/js/Components/Homepage/NewsDetail.jsx
import React from "react";
import { Head } from "@inertiajs/react";

const NewsDetail = ({ news }) => {
    return (
        <div className="min-h-screen bg-slate-50">
            <Head title={news.title} />
            <div class="navbar sticky top-0 z-10 bg-white text-black shadow-xl">
                <a class="btn btn-ghost text-xl">
                    MusicNews
                </a>
            </div>
            <h1 className="text-2xl font-bold text-black p-4">{news.title}</h1>
            <div className="flex justify-center">
                <img src={news.image} alt={news.title} className="my-4 rounded-md w-full max-w-3xl h-96 object-contain " />
            </div>
            <p className="text-black leading-relaxed text-xl p-4">{news.description}</p>
        </div>
    );
};

export default NewsDetail;