import axios from "axios";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Swal from "sweetalert2";

export default function AddChalet() {
    const location = useLocation();
    const { packageId } = location.state || {};
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [formData, setFormData] = useState({
        subscriptionID: packageId,
        name: "",
        title: "",
        description: "",
        location: {
            city: "",
            street: ""
        },
        rooms: "",
        price: "",
        img: null,
        gallery: [],
    });

    const token = localStorage.getItem('token');

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "city" || name === "street") {
            setFormData((prevData) => ({
                ...prevData,
                location: {
                    ...prevData.location,
                    [name]: value,
                },
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };

    const handleimgChange = (e) => {
        const file = e.target.files[0];
        setFormData((prevData) => ({
            ...prevData,
            img: file,
        }));
    };

    const handlegalleryChange = (e) => {
        const files = Array.from(e.target.files);
        setFormData((prevData) => ({
            ...prevData,
            gallery: files,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError(null);
        setSuccess(null);

        try {
            let uploadedImgUrl = null;
            let uploadedGalleryUrls = [];

            // Upload main image to Cloudinary
            if (formData.img) {
                const imgFormData = new FormData();
                imgFormData.append("file", formData.img);
                imgFormData.append("upload_preset", "test cloudinary");
                imgFormData.append("cloud_name", "dhta28b63");

                const responseImg = await axios.post("https://api.cloudinary.com/v1_1/dhta28b63/image/upload", imgFormData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });

                if (responseImg.status === 200) {
                    uploadedImgUrl = responseImg.data.secure_url;
                    console.log("Uploaded main image:", uploadedImgUrl);
                } else {
                    throw new Error("Error uploading main image");
                }
            }

            // Upload gallery images to Cloudinary
            if (formData.gallery.length > 0) {
                const galleryUploadPromises = formData.gallery.map((image) => {
                    const galleryImageFormData = new FormData();
                    galleryImageFormData.append("file", image);
                    galleryImageFormData.append("upload_preset", "test cloudinary");
                    galleryImageFormData.append("cloud_name", "dhta28b63");
                    console.log(image)
                    return axios.post("https://api.cloudinary.com/v1_1/dhta28b63/image/upload", galleryImageFormData, {
                        headers: { "Content-Type": "multipart/form-data" },
                    });
                });

                const galleryResponses = await Promise.all(galleryUploadPromises);

                uploadedGalleryUrls = galleryResponses.map((res) => {
                    if (res.status === 200) {
                        return res.data.secure_url;
                    }
                    throw new Error("Error uploading gallery images");
                });
            }

            // Update formData with the uploaded URLs
            const updatedFormData = {
                ...formData,
                img: uploadedImgUrl,
                gallery: uploadedGalleryUrls,
            };

            // Send the updated formData to the backend
            console.log(updatedFormData)
            const response = await axios.post(`${import.meta.env.VITE_URL_BACKEND}chalet/addChalet`, updatedFormData, {
                headers: {
                    Authorization: token,
                },
            });

            if (response.data.status == "success") {
                console.log(response)
                Swal.fire({
                    title: `${response.data.message}`,
                    icon: 'success',
                    confirmButtonText: 'موافق',
                });
            } else {
                console.log(response)

                Swal.fire({
                    title: 'حدث خطأ أثناء إضافة الشاليه.',
                    text: 'يرجى المحاولة لاحقًا.',
                    icon: 'error',
                    confirmButtonText: 'موافق',
                });
            }
        } catch (error) {
            Swal.fire({
                title: `حدث خطأ في الاتصال بالخادم. ${error.message}`,
                icon: 'error',
                confirmButtonText: 'موافق',
            });
            console.log(error);
        }
    };


    return (
        <>
            {packageId != null ?
                <div className="w-full md:w-1/3 p-8">


                    <h1 className="text-4xl font-bold text-[#1E293B] mb-4">أضف شاليهك الجديد</h1>
                    <p className="text-2xl text-[#718096] mb-6">
                        قم بإضافة شاليهك وابدأ في استقبال الحجوزات الآن.
                    </p>
                    {error && <p className="text-red-500 mb-4">{error}</p>}
                    {success && <p className="text-green-500 mb-4">{success}</p>}
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div className="text-right">
                            <label htmlFor="name" className="block text-black text-xl mb-2">
                                اسم الشاليه
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full p-2 bg-transparent border border-black rounded-lg focus:outline-[#124FB3]"
                            />
                        </div>
                        <div className="text-right">
                            <label htmlFor="title" className="block text-black text-xl mb-2">
                                وصف مختصر
                            </label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                className="w-full p-2 bg-transparent border border-black rounded-lg focus:outline-[#124FB3]"
                            />
                        </div>
                        <div className="text-right">
                            <label htmlFor="description" className="block text-black text-xl mb-2">
                                الوصف
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                className="w-full p-2 bg-transparent border border-black rounded-lg focus:outline-[#124FB3]"
                            />
                        </div>
                        <div className="text-right">
                            <label htmlFor="city" className="block text-black text-xl mb-2">
                                المدينة
                            </label>
                            <input
                                type="text"
                                id="city"
                                name="city"
                                value={formData.location.city}
                                onChange={handleChange}
                                className="w-full p-2 bg-transparent border border-black rounded-lg focus:outline-[#124FB3]"
                            />
                        </div>
                        <div className="text-right">
                            <label htmlFor="street" className="block text-black text-xl mb-2">
                                الشارع
                            </label>
                            <input
                                type="text"
                                id="street"
                                name="street"
                                value={formData.location.street}
                                onChange={handleChange}
                                className="w-full p-2 bg-transparent border border-black rounded-lg focus:outline-[#124FB3]"
                            />
                        </div>
                        <div className="text-right">
                            <label htmlFor="rooms" className="block text-black text-xl mb-2">
                                عدد الغرف
                            </label>
                            <input
                                type="number"
                                id="rooms"
                                name="rooms"
                                value={formData.rooms}
                                onChange={handleChange}
                                className="w-full p-2 bg-transparent border border-black rounded-lg focus:outline-[#124FB3]"
                            />
                        </div>
                        <div className="text-right">
                            <label htmlFor="price" className="block text-black text-xl mb-2">
                                السعر
                            </label>
                            <input
                                type="number"
                                id="price"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                className="w-full p-2 bg-transparent border border-black rounded-lg focus:outline-[#124FB3]"
                            />
                        </div>
                        <div className="text-right">
                            <label htmlFor="img" className="block text-black text-xl mb-2">
                                صورة الشاليه الرئيسية
                            </label>
                            <input
                                type="file"
                                id="img"
                                name="img"
                                onChange={handleimgChange}
                                className="w-full p-2 bg-transparent border border-black rounded-lg focus:outline-[#124FB3]"
                            />
                        </div>
                        <div className="text-right">
                            <label htmlFor="gallery" className="block text-black text-xl mb-2">
                                صور المعرض
                            </label>
                            <input
                                type="file"
                                id="gallery"
                                name="gallery"
                                multiple
                                onChange={handlegalleryChange}
                                className="w-full p-2 bg-transparent border border-black rounded-lg focus:outline-[#124FB3]"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-gradient-to-l from-[#48BB78] to-[#1A71FF] text-white py-3 rounded-lg"
                        >
                            إضافة الشاليه
                        </button>
                    </form>
                </div >
                :
                <div className="text-center w-full">
                    <h1 className="text-3xl">
                        برجاء اختيار باقة اولا
                    </h1>
                    <Link to="/ownerdashboard/subscription">
                        <button className="m-5 p-5 text-3xl bg-gradient-to-l from-[#48BB78] to-[#1A71FF] text-white py-3 rounded-lg">
                            ارجع الى الباقات
                        </button>
                    </Link>
                </div>
            }
        </>
    );
}
