import React, { useState } from "react";
import { Link, Head, router } from "@inertiajs/react";
import Navbar from "@/Components/Navbar";
import NewsList from "@/Components/Homepage/NewsList";
import Paginator from "@/Components/Homepage/Paginator";

export default function Homepage(props, filters) {
    const [searchQuery, setSearchQuery] = useState(filters.search || "");

    const handleSearch = (e) => {
        const query = e.target.value;
        setSearchQuery(query);

        router.get(
            "/",
            {
                search: query,
            },
            {
                preserveScroll: true,
                preserveState: true,
                replace: true,
            }
        );
    };

    // Group news by category
    const groupedNews = props.news.data?.reduce((acc, news) => {
        if (!acc[news.category]) {
            acc[news.category] = [];
        }
        acc[news.category].push(news);
        return acc;
    }, {});

    return (
        <div className="min-h-screen bg-slate-100">
            <Head title={props.title} />

            <div className="navbar sticky top-0 z-10 bg-white text-black shadow-xl">
                <a className="btn btn-ghost text-xl" href={"/"}>
                    MusicNews
                </a>
                <div className="flex-1 justify-center">
                    <div className="form-control w-full max-w-lg mx-auto">
                        <input
                            type="text"
                            placeholder="Cari berita..."
                            className="input input-sm text-black bg-white input-bordered w-full"
                            value={searchQuery}
                            onChange={handleSearch}
                        />
                    </div>
                </div>
            </div>

            {/* Search Results Notification */}
            {searchQuery && (
                <div className="text-center py-4 text-gray-600">
                    Menampilkan hasil pencarian untuk: "{searchQuery}"
                </div>
            )}

            {/* Main Content */}
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <h2 className="text-black text-2xl font-bold my-6 text-center">
                    Daftar Berita
                </h2>

                {/* News Categories */}
                <div className="space-y-8">
                    {groupedNews && Object.keys(groupedNews).length > 0 ? (
                        Object.entries(groupedNews).map(([category, newsItems]) => (
                            <div key={category} className="p-6">
                                <h3 className="text-lg font-semibold text-black mb-4">
                                    {category || 'Uncategorized'}
                                </h3>
                                <div className="flex justify-center flex-col lg:flex-row lg:flex-wrap lg:items-stretch gap-4">
                                    <NewsList news={newsItems} />
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center text-black">
                            Saat ini tidak ada berita!
                        </div>
                    )}
                </div>

                {/* Pagination */}
                <div className="flex justify-center items-center py-10">
                    <Paginator meta={props.news.meta} />
                </div>
            </div>

            {/* Footer */}
            <footer className="footer footer-center bg-white text-black p-10">
                <aside>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        x="0px"
                        y="0px"
                        width="48"
                        height="48"
                        viewBox="0 0 48 48"
                    >
                        <linearGradient
                            id="eo9Iz~gJX5QQxF9vIcujya_W5To6Q3gjDiK_gr1"
                            x1="41.018"
                            x2="45.176"
                            y1="26"
                            y2="26"
                            gradientUnits="userSpaceOnUse"
                        >
                            <stop offset="0" stopColor="#3537b0"></stop>
                            <stop offset="1" stopColor="#4646cf"></stop>
                        </linearGradient>
                        <path
                            fill="url(#eo9Iz~gJX5QQxF9vIcujya_W5To6Q3gjDiK_gr1)"
                            d="M43,11h-3v30h3c1.105,0,2-0.895,2-2V13C45,11.895,44.105,11,43,11z"
                        ></path>
                        <path
                            fill="#5286ff"
                            d="M41,39V9c0-1.105-0.895-2-2-2H5C3.895,7,3,7.895,3,9v30c0,1.105,0.895,2,2,2h38 C41.895,41,41,40.105,41,39z"
                        ></path>
                        <path
                            fill="#fff"
                            d="M37,17H7c-0.552,0-1-0.448-1-1v-2c0-0.552,0.448-1,1-1h30c0.552,0,1,0.448,1,1v2 C38,16.552,37.552,17,37,17z"
                        ></path>
                        <path
                            fill="#fff"
                            d="M19,36H7c-0.552,0-1-0.448-1-1V22c0-0.552,0.448-1,1-1h12c0.552,0,1,0.448,1,1v13 C20,35.552,19.552,36,19,36z"
                        ></path>
                        <path
                            fill="#fff"
                            d="M38,24H24v-2c0-0.552,0.448-1,1-1h12c0.552,0,1,0.448,1,1V24z"
                        ></path>
                        <rect width="14" height="3" x="24" y="24" fill="#e6eeff"></rect>
                        <rect width="14" height="3" x="24" y="27" fill="#ccdcff"></rect>
                        <rect width="14" height="3" x="24" y="30" fill="#b3cbff"></rect>
                        <path
                            fill="#9abaff"
                            d="M37,36H25c-0.552,0-1-0.448-1-1v-2h14v2C38,35.552,37.552,36,37,36z"
                        ></path>
                    </svg>
                    <p className="font-bold">
                        MusicNews
                        <br />
                        Delivering reliable and current news since 2025.
                    </p>
                    <p>Copyright © 2025 - All right reserved</p>
                </aside>
            </footer>
        </div>
    );
}