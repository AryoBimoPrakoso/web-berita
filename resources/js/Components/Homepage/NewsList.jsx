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
            <div className="card-body hover:shadow-lg rounded-xl">
                <Link href={route("news.show", { news: data.id })}>
                    <h2 className="card-title hover:text-blue-600">
                        {data.title?.substring(0, 50)}...
                        {data.isNew && (
                            <div className="badge badge-secondary ml-2">
                                NEW
                            </div>
                        )}
                    </h2>
                    {/* <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold btn-sm rounded mt-2">
                        Lihat Berita
                    </button> */}
                </Link>
                <p>{data.description?.substring(0, 50)}...</p>
                <div className="flex w-full justify-between items-center">
                    <div className="text-sm flex flex-col text-gray-500">
                        <p>{data.display_date}</p>
                        <p>Oleh : {data.author}</p>
                    </div>
                    <div className="border-2 rounded-xl ">
                        <h2 className="text-end text-sm px-4 py-0.5 items-center text-gray-500">{data.category}</h2>
                    </div>
                </div>
            </div>
        </div>
    ));
};

// Komponen untuk menampilkan pesan jika tidak ada berita
const noNews = () => {
    return (
        <div className="text-center text-gray-500 mt-8">
            <h3 className="text-xl font-semibold">
                Saat Ini Tidak Ada Berita!
            </h3>
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
