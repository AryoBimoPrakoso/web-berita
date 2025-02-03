import React, { useState } from "react";
import { Link, Head, router } from "@inertiajs/react";
import NewsList from "@/Components/Homepage/NewsList";

export default function Homepage(props) {
    const [searchQuery, setSearchQuery] = useState(props.filters?.search || "");

    const handleSearch = (e) => {
        const query = e.target.value;
        setSearchQuery(query);

        router.get(
            "/",
            { search: query },
            {
                preserveScroll: true,
                preserveState: true,
                replace: true,
            }
        );
    };

    return (
        <div className="min-h-screen bg-slate-100">
            <Head title={props.title} />

            <div className="navbar sticky top-0 z-10 bg-white text-black shadow-xl">
                <a className="btn btn-ghost text-xl" href={"/"}>
                    AryoNews
                </a>
                <div className="flex-1 justify-center">
                    <div>
                        <ul className="flex flex-row gap-4 ml-2">
                            <Link
                                href={route("category.news", {
                                    category: "Hiburan",
                                })}
                            >
                                <li className="p-2 hover:text-blue-500 rounded-md">
                                    Hiburan
                                </li>
                            </Link>
                            <Link
                                href={route("category.news", {
                                    category: "Olahraga",
                                })}
                            >
                                <li className="p-2 hover:text-blue-500 rounded-md">
                                    Olahraga
                                </li>
                            </Link>
                            <Link
                                href={route("category.news", {
                                    category: "Musik",
                                })}
                            >
                                <li className="p-2 hover:text-blue-500 rounded-md">
                                    Musik
                                </li>
                            </Link>
                            <Link
                                href={route("category.news", {
                                    category: "Politik",
                                })}
                            >
                                <li className="p-2 hover:text-blue-500 rounded-md">
                                    Politik
                                </li>
                            </Link>
                        </ul>
                    </div>
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

            {props.hasSearch && (
                <div className="w-full px-4 sm:px-6 lg:px-8">
                    <div className="text-center py-4 text-gray-600">
                        Menampilkan hasil pencarian untuk: "{searchQuery}"
                    </div>
                    {props.latestNews.length > 0 ? (
                        <NewsList news={props.latestNews} />
                    ) : (
                        <div className="text-center text-gray-500 py-8">
                            Tidak ditemukan berita untuk pencarian "
                            {searchQuery}"
                        </div>
                    )}
                </div>
            )}

            {/* Show regular sections only when not searching */}
            {!props.hasSearch && (
                <div className="w-full px-4 sm:px-6 lg:px-8">
                    {/* Trending News Section */}
                    <section className="mb-8 pt-4">
                        <h2 className="text-black text-2xl font-bold mb-4">
                            Berita Trending
                        </h2>
                        {props.trendingNews && props.trendingNews.length > 0 ? (
                            <NewsList news={props.trendingNews} />
                        ) : (
                            <div className="text-center text-gray-500">
                                Tidak ada berita trending
                            </div>
                        )}
                    </section>

                    {/* Latest News Section */}
                    <section className="mb-8">
                        <h2 className="text-black text-2xl font-bold mt-6 mb-4">
                            Berita Terbaru
                        </h2>
                        {props.latestNews && props.latestNews.length > 0 ? (
                            <NewsList news={props.latestNews} />
                        ) : (
                            <div className="text-center text-gray-500">
                                Tidak ada berita terbaru
                            </div>
                        )}
                    </section>
                </div>
            )}

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
                        {/* SVG path content */}
                    </svg>
                    <p className="font-bold">
                        AryoNews
                        <br />
                        Delivering reliable and current news since 2025.
                    </p>
                    <p>Copyright © 2025 - All right reserved</p>
                </aside>
            </footer>
        </div>
    );
}
