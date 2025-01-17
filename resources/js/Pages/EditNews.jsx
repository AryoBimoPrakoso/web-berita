import React, { useState, useEffect } from "react";
import { Link, Head } from "@inertiajs/react";
import Navbar from "@/Components/Navbar";
import { Inertia } from "@inertiajs/inertia";

export default function EditNews(props) {
    const [title, setTitle] = useState(props.mynews.title || "");
    const [description, setDescription] = useState(props.mynews.description || "");
    const [category, setCategory] = useState(props.mynews.category || "");
    const [image, setImage] = useState(null);
    const [previewImage, setPreviewImage] = useState(
        props.mynews.image ? `/storage/${props.mynews.image}` : null
    );

    useEffect(() => {
        setTitle(props.mynews.title || "");
        setDescription(props.mynews.description || "");
        setCategory(props.mynews.category || "");
    }, [props.mynews]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = () => {
        const formData = new FormData();
        formData.append("id", props.mynews.id);
        formData.append("title", title);
        formData.append("description", description);
        formData.append("category", category);
        if (image) {
            formData.append("image", image);
        }

        Inertia.post("/news/update", formData, {
            forceFormData: true,
            onSuccess: () => {
                console.log("Update berhasil");
            },
            onError: (errors) => {
                console.error(errors);
            },
        });
    };

    return (
        <div className="min-h-screen bg-gray-200 ">
            <Head title={props.title} />
            <Navbar user={props.auth.user} />
            <div className="py-8">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 rounded-md">
                    <div className="p-6 bg-white shadow-xl rounded-md">
                        <div className="flex justify-start text-2xl m-3 text-black">Edit Berita</div>
                        {previewImage && (
                            <img
                                src={previewImage}
                                alt="Preview"
                                className="m-2 h-96 object-cover rounded-md"
                            />
                        )}
                        <input
                            type="file"
                            className="m-2 w-full p-2 outline outline-gray-300 rounded-md "
                            onChange={handleImageChange}
                        />
                        <input
                            type="text"
                            placeholder="Judul"
                            className="m-2 w-full p-2 outline outline-gray-300 rounded-md border-hidden text-black"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <textarea
                            placeholder="Deskripsi"
                            className="m-2 w-full p-2 outline outline-gray-300 rounded-md h-96 border-hidden text-black"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        <input
                             type="text"
                            placeholder="Kategori"
                            className="m-2 w-full p-2 outline outline-gray-300 rounded-md border-hidden text-black"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        />
                        <button
                            className="btn btn-primary m-2 p-4 text-white"
                            onClick={handleSubmit}
                        >
                            Update
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
