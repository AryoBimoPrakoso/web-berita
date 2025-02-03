import React from "react";
import { Head, Link, router } from "@inertiajs/react";
import Navbar from "@/Components/Navbar";
import NewsList from "@/Components/Homepage/NewsList";
import Paginator from "@/Components/Homepage/Paginator";

export default function CategoryNews({ title, news, currentCategory }) {
    return (
        <div className="min-h-screen bg-slate-100">
            <Head title={title} />
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
                </div>
            </div>

            <div className="w-full px-4 sm:px-6 lg:px-8">
                <h2 className="text-black text-2xl font-bold mt-6 mb-4">
                    Berita {currentCategory}
                </h2>

                {news.data.length > 0 ? (
                    <NewsList news={news.data} />
                ) : (
                    <div className="text-center text-gray-500 mt-8">
                        <h3 className="text-xl font-semibold">
                            Tidak ada berita dalam kategori ini
                        </h3>
                    </div>
                )}

                <div className="flex justify-center items-center py-10">
                    <Paginator meta={news.meta} />
                </div>
            </div>
        </div>
    );
}
