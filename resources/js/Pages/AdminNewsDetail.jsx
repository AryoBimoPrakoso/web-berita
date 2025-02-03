import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";

export default function AdminNewsDetail({ news }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Detail Berita
                </h2>
            }
        >
            <Head title={`Admin - ${news.title}`} />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-xl rounded-lg">
                        <div className="p-6">
                            <div className="mb-4">
                                <Link
                                    href={route('dashboard')}
                                    className="text-blue-500 hover:text-blue-700"
                                >
                                    &larr; Kembali ke Dashboard
                                </Link>
                            </div>
                            
                            {news.image && (
                                <div className="mb-6">
                                    <img
                                        // Menggunakan path absolute dari root
                                        src={news.image}
                                        alt={news.title}
                                        className="w-full max-h-96 object-cover rounded-lg"
                                    />
                                </div>
                            )}

                            <div className="space-y-4">
                                <div className="flex justify-between items-start">
                                    <h1 className="text-3xl font-bold text-gray-900">
                                        {news.title}
                                    </h1>
                                    <span className="text-sm text-gray-500">
                                        {new Intl.DateTimeFormat("id-ID", {
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        }).format(new Date(news.updated_at))}
                                    </span>
                                </div>

                                <div className="bg-gray-100 px-4 py-2 rounded-md">
                                    <span className="text-gray-700 font-medium">
                                        Kategori: {news.category}
                                    </span>
                                </div>

                                <div className="prose max-w-none">
                                    <p className="text-gray-700 whitespace-pre-wrap">
                                        {news.description}
                                    </p>
                                </div>

                                <div className="flex space-x-4 mt-8">
                                    <Link
                                        href={route('edit.news')}
                                        method="get"
                                        data={{ id: news.id }}
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                    >
                                        Edit Berita
                                    </Link>
                                    <Link
                                        href={route('delete.news')}
                                        method="post"
                                        data={{ id: news.id }}
                                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                    >
                                        Hapus Berita
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}