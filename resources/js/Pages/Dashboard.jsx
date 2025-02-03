import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Link, Head } from "@inertiajs/react";
import { useState, useEffect } from "react";
import { Inertia } from "@inertiajs/inertia";

export default function Dashboard(props) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(null);
    const [category, setCategory] = useState("");
    const [isNotif, setIsNotif] = useState(false);

    const handleSubmit = () => {
        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("category", category);
        if (image) {
            formData.append("image", image);
        }

        Inertia.post("/news", formData, {
            onSuccess: () => {
                setIsNotif(true);
                setTitle("");
                setImage(null);
                setDescription("");
                setCategory("");
            },
        });
    };

    useEffect(() => {
        if (!props.myNews) {
            Inertia.get("/news");
        }
    }, []);

    // Mengelompokkan berita berdasarkan kategori
    const groupedNews = props.myNews?.reduce((acc, news) => {
        if (!acc[news.category]) {
            acc[news.category] = [];
        }
        acc[news.category].push(news);
        return acc;
    }, {});

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Admin Panel
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12 ">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {/* Form Section */}
                    <div className="p-6 bg-white shadow-xl rounded-md">
                        <div>{isNotif && flash.message}</div>
                        <h1 className="text-black m-3 text-xl">Berita Baru</h1>
                        <input
                            type="text"
                            placeholder="Judul"
                            className="m-2 input input-bordered w-full bg-white text-black"
                            onChange={(e) => setTitle(e.target.value)}
                            value={title}
                        />
                        <textarea
                            placeholder="Deskripsi"
                            className="m-2 input input-bordered w-full bg-white h-96 text-black"
                            onChange={(e) => setDescription(e.target.value)}
                            value={description}
                        />
                        <input
                            type="text"
                            placeholder="Kategori"
                            className="m-2 input input-bordered w-full bg-white text-black"
                            onChange={(e) => setCategory(e.target.value)}
                            value={category}
                        />
                        <input
                            type="file"
                            className="m-2 input input-bordered w-full p-2 bg-white text-black"
                            onChange={(e) => setImage(e.target.files[0])}
                        />
                        <button
                            className="btn btn-primary m-2 p-4 text-white"
                            onClick={handleSubmit}
                        >
                            Submit
                        </button>
                    </div>

                    {/* News List Section */}
                    {/* <div className="mt-8 bg-white shadow-xl rounded-md p-6">
                        <h2 className="text-black text-xl font-bold mb-6 text-center">
                            Daftar Berita
                        </h2>
                        <div className="space-y-8">
                            {groupedNews &&
                            Object.keys(groupedNews).length > 0 ? (
                                Object.keys(groupedNews).map((category, i) => (
                                    <div key={i} className="space-y-4">
                                        <h3 className="text-lg font-bold text-black px-4 py-2 bg-gray-100 rounded-lg">
                                            {category}
                                        </h3>
                                        <div className="space-y-4">
                                            {groupedNews[category].map(
                                                (news, j) => (
                                                    <div
                                                        key={j}
                                                        className="bg-white rounded-lg shadow-md overflow-hidden"
                                                    >
                                                        <div className="flex">
                                                            {news.image && (
                                                                <div className="flex-shrink-0">
                                                                    <img
                                                                        src={`storage/${news.image}`}
                                                                        alt={
                                                                            news.title
                                                                        }
                                                                        className="w-48 h-48 object-cover"
                                                                    />
                                                                </div>
                                                            )}
                                                            <div className="flex-1 p-4">
                                                                <div className="flex justify-between items-start">
                                                                    <h4 className="text-xl font-semibold text-black">
                                                                        {
                                                                            news.title
                                                                        }
                                                                        {news.isNew && (
                                                                            <span className="ml-2 badge badge-success text-white">
                                                                                NEW
                                                                            </span>
                                                                        )}
                                                                    </h4>
                                                                </div>
                                                                <p className="text-gray-600 mt-2">
                                                                    {news.description.substring(
                                                                        0,
                                                                        150
                                                                    )}
                                                                    ...
                                                                </p>
                                                                <div className="mt-4 flex items-center justify-between">
                                                                    <p className="text-sm text-gray-500">
                                                                        {new Intl.DateTimeFormat(
                                                                            "id-ID",
                                                                            {
                                                                                year: "numeric",
                                                                                month: "long",
                                                                                day: "numeric",
                                                                                hour: "2-digit",
                                                                                minute: "2-digit",
                                                                            }
                                                                        ).format(
                                                                            new Date(
                                                                                news.updated_at
                                                                            )
                                                                        )}
                                                                    </p>
                                                                    <div className="space-x-2">
                                                                        <Link
                                                                            href={route(
                                                                                "admin.news.show",
                                                                                {
                                                                                    news: news.id,
                                                                                }
                                                                            )}
                                                                        >
                                                                            <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-3 rounded text-sm">
                                                                                Lihat
                                                                            </button>
                                                                        </Link>
                                                                        <Link
                                                                            href={route(
                                                                                "edit.news"
                                                                            )}
                                                                            method="get"
                                                                            data={{
                                                                                id: news.id,
                                                                            }}
                                                                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded text-sm"
                                                                        >
                                                                            Edit
                                                                        </Link>
                                                                        <Link
                                                                            href={route(
                                                                                "delete.news"
                                                                            )}
                                                                            method="post"
                                                                            data={{
                                                                                id: news.id,
                                                                            }}
                                                                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded text-sm"
                                                                        >
                                                                            Delete
                                                                        </Link>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-center text-gray-500">
                                    Belum ada berita!
                                </p>
                            )}
                        </div>
                    </div> */}
                    {/* News List Section */}
                    <div className="mt-8 bg-white shadow-xl rounded-md p-6">
                        <h2 className="text-black text-xl font-bold mb-6 text-center">
                            Daftar Berita
                        </h2>
                        <div className="space-y-4">
                            {groupedNews &&
                            Object.keys(groupedNews).length > 0 ? (
                                Object.keys(groupedNews).map((category, i) => (
                                    <details
                                        key={i}
                                        className="bg-gray-100 rounded-lg"
                                    >
                                        <summary className="text-lg font-bold text-black px-4 py-2 cursor-pointer">
                                            {category}
                                        </summary>
                                        <div className="p-4 space-y-4">
                                            {groupedNews[category].map(
                                                (news, j) => (
                                                    <div
                                                        key={j}
                                                        className="bg-white rounded-lg shadow-md overflow-hidden"
                                                    >
                                                        <div className="flex">
                                                            {news.image && (
                                                                <div className="flex-shrink-0">
                                                                    <img
                                                                        src={`storage/${news.image}`}
                                                                        alt={
                                                                            news.title
                                                                        }
                                                                        className="w-48 h-48 object-cover"
                                                                    />
                                                                </div>
                                                            )}
                                                            <div className="flex-1 p-4">
                                                                <div className="flex justify-between items-start">
                                                                    <h4 className="text-xl font-semibold text-black">
                                                                        {
                                                                            news.title
                                                                        }
                                                                        {news.isNew && (
                                                                            <span className="ml-2 badge badge-success text-white">
                                                                                NEW
                                                                            </span>
                                                                        )}
                                                                    </h4>
                                                                </div>
                                                                <p className="text-gray-600 mt-2">
                                                                    {news.description.substring(
                                                                        0,
                                                                        150
                                                                    )}
                                                                    ...
                                                                </p>
                                                                <div className="mt-4 flex items-center justify-between">
                                                                    <p className="text-sm text-gray-500">
                                                                        {new Intl.DateTimeFormat(
                                                                            "id-ID",
                                                                            {
                                                                                year: "numeric",
                                                                                month: "long",
                                                                                day: "numeric",
                                                                                hour: "2-digit",
                                                                                minute: "2-digit",
                                                                            }
                                                                        ).format(
                                                                            new Date(
                                                                                news.updated_at
                                                                            )
                                                                        )}
                                                                    </p>
                                                                    <div className="space-x-2">
                                                                        <Link
                                                                            href={route(
                                                                                "admin.news.show",
                                                                                {
                                                                                    news: news.id,
                                                                                }
                                                                            )}
                                                                        >
                                                                            <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-3 rounded text-sm">
                                                                                Lihat
                                                                            </button>
                                                                        </Link>
                                                                        <Link
                                                                            href={route(
                                                                                "edit.news"
                                                                            )}
                                                                            method="get"
                                                                            data={{
                                                                                id: news.id,
                                                                            }}
                                                                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded text-sm"
                                                                        >
                                                                            Edit
                                                                        </Link>
                                                                        <Link
                                                                            href={route(
                                                                                "delete.news"
                                                                            )}
                                                                            method="post"
                                                                            data={{
                                                                                id: news.id,
                                                                            }}
                                                                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded text-sm"
                                                                        >
                                                                            Delete
                                                                        </Link>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    </details>
                                ))
                            ) : (
                                <p className="text-center text-gray-500">
                                    Belum ada berita!
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
