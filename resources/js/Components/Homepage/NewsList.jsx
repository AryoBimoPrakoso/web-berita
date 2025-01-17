import { Link } from "@inertiajs/react";
import React from "react";

// Komponen untuk menampilkan daftar berita
const isNews = (news) => {
    return news.map((data, i) => (
        <div key={i} className="card bg-white w-full lg:w-96 shadow-xl">
            <figure>
                {data.image ? (
                    <img
                        src={data.image}
                        alt={data.title}
                        className="w-full h-48 object-cover"
                    />
                ) : (
                    <div className="w-full h-48 flex items-center justify-center bg-gray-200">
                        <span>Tidak ada gambar!</span>
                    </div>
                )}
            </figure>
            <div className="card-body">
                <h2 className="card-title">
                    {data.title}
                    {data.isNew && (
                        <div className="badge badge-secondary ml-2">NEW</div>
                    )}
                </h2>
                <p>{data.description?.substring(0, 50)}...</p>
                <Link href={route('news.show', { news: data.id })}>
                    <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold btn-sm rounded mt-2">
                        Lihat Berita
                    </button>
                </Link>
                <div className="mt-4 text-sm text-gray-500 flex">
                    <p>{data.display_date}</p>
                    <p className="text-end">{data.author}</p>
                </div>
            </div>
        </div>
    ));
};

// Komponen untuk menampilkan pesan jika tidak ada berita
const noNews = () => {
    return (
        <div className="text-center text-gray-500 mt-8">
            <h3 className="text-xl font-semibold">Saat Ini Tidak Ada Berita!</h3>
            <p>Coba kata kunci pencarian yang lain atau kembali nanti.</p>
        </div>
    );
};

// Komponen utama untuk daftar berita
const NewsList = ({ news }) => {
    // Periksa apakah news adalah array dan memiliki data
    if (!news || news.length === 0) {
        return noNews();
    }
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {isNews(news)}
        </div>
    );
};

export default NewsList;
