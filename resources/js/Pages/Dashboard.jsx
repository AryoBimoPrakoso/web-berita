import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Link, Head } from "@inertiajs/react";
import { useState, useEffect } from "react";
import { Inertia } from "@inertiajs/inertia";
import Paginator from "@/Components/Homepage/Paginator";


export default function Dashboard(props) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(null); // Ubah menjadi null untuk menyimpan file
    const [category, setCategory] = useState("");
    const [isNotif, setIsNotif] = useState(false);

    const handleSubmit = () => {
        const formData = new FormData(); // Gunakan FormData untuk mengupload file
        formData.append("title", title);
        formData.append("description", description);
        formData.append("category", category);
        if (image) {
            formData.append("image", image); // Tambahkan gambar ke formData
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
    console.log('data',props)
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
                    <div className="p-6 bg-white shadow-xl rounded-md ">
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
                            className="m-2 input input-bordered w-full bg-white h-48 text-black"
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
                            onChange={(e) => setImage(e.target.files[0])} // Ambil file dari input
                        />
                        <button
                            className="btn btn-primary m-2 p-4"
                            onClick={handleSubmit}
                        >
                            Submit
                        </button>
                    </div>
                </div>

                <h2 className="text-black mt-8 text-xl text-center">
                    Daftar Berita
                </h2>
                <div className="p-4 flex flex-wrap justify-center ">
                    {props.myNews && props.myNews.length > 0 ? (
                        props.myNews.map((news, i) => {
                            return (
                                <div
                                    key={i}
                                    className="card bg-white w-full lg:w-96 shadow-xl m-3"
                                >
                                    <div className="card-body">
                                        {news.image && (
                                            <img
                                                src={`storage/${news.image}`} // Tampilkan gambar
                                                alt={news.title}
                                                className="w-full h-48 object-cover mb-4 rounded-md "
                                            />
                                        )}
                                        <h2 className="card-title text-black">
                                            {news.title}
                                            {news.isNew && (
                                                <div className="badge badge-success text-white">
                                                    NEW
                                                </div>
                                            )}
                                        </h2>
                                        <p className="text-black">
                                            {news.description.substring(0, 50)}
                                            ....
                                        </p>
                                        <p className="text-gray-500 text-sm mt-2">
                                            {new Intl.DateTimeFormat("id-ID", {
                                                year: "numeric",
                                                month: "long",
                                                day: "numeric",
                                                hour: "2-digit",
                                                minute: "2-digit",
                                            }).format(
                                                new Date(news.updated_at)
                                            )}
                                        </p>
                                        <div className="card-actions justify-end">
                                            <Link
                                                href={route("news.show", {
                                                    news: news.id,
                                                })}
                                            >
                                                <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold btn-sm rounded">
                                                    Lihat Berita
                                                </button>
                                            </Link>
                                            {/* <div className="badge badge-inline">{news.category}</div> */}
                                            <div className="btn btn-sm btn-primary text-white">
                                                <Link
                                                    href={route("edit.news")}
                                                    method="get"
                                                    data={{ id: news.id }}
                                                    as="button"
                                                >
                                                    Edit
                                                </Link>
                                            </div>
                                            <div className="btn btn-sm btn-error text-white">
                                                <Link
                                                    href={route("delete.news")}
                                                    method="post"
                                                    data={{ id: news.id }}
                                                    as="button"
                                                >
                                                    Delete
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <p className="text-center text-gray-500">
                            Belum ada berita!
                        </p>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
``;
