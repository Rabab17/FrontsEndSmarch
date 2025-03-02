import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Splash from "../../../components/Splash";
import Swal from "sweetalert2";
import InputField from "./AddChalet/InputField";
import ListInput from "./AddChalet/ListInput";
import imageCompression from 'browser-image-compression';


export default function EditChalet() {
    const location = useLocation();
    const { id } = location.state || {};
    const [facilities, setFacilities] = useState([""]);
    const [policy, setPolicy] = useState([""]);
    const [loadingImg, setLoadingImg] = useState(false);
    const [imageUrl, setImageUrl] = useState(null);
    const [galleryUrls, setGalleryUrls] = useState([]);
    const [loadingGallery, setLoadingGallery] = useState(false);
    const [chalet, setChalet] = useState({
        name: "",
        title: "",
        description: "",
        location: {
            city: "",
            street: ""
        },
        rooms: "",
        price: "",
        facilities: [],
        reservationPolicy: [],
        img: null,
        gallery: [],
        phoneOfChalet: "",
        instagram: "",
        facebook: "",
        whatsapp: "",
        tiktok: ''
    });
    const token = localStorage.getItem('token');
    const [loading, setLoading] = useState(true);

    const cities = [
        "الرياض", "جدة", "مكة المكرمة", "المدينة المنورة", "الدمام",
        "الطائف", "تبوك", "الخبر", "بريدة", "خميس مشيط", "حائل",
        "الجبيل", "القطيف", "نجران", "ينبع", "أبها", "عرعر",
        "سكاكا", "جازان", "القريات", "الباحة"
    ];



    // جلب البيانات من API عند تحميل الصفحة
    useEffect(() => {
        const fetchChalet = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_URL_BACKEND}chalet/${id}`, {
                    headers: {
                        Authorization: token,
                    },
                });
                console.log("بيانات الشاليه:", response.data.data);
                setChalet(response.data.data);
                setFacilities(response.data.data.facilities || []);
                setPolicy(response.data.data.reservationPolicy || []);
                setImageUrl(response.data.data.img)
                setGalleryUrls(response.data.data.gallery)
                setLoading(false);
            } catch (err) {
                console.log(err)
                setLoading(false);
            }
        };

        fetchChalet();
    }, [id]);

    // إرسال البيانات المعدلة
    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedData = {
            ...chalet,
            facilities, 
            reservationPolicy: policy,
        };
        console.log(updatedData);
        try {
            const response = await axios.patch(`${import.meta.env.VITE_URL_BACKEND}chalet/update/${id}`, updatedData, {
                headers: {
                    Authorization: token,
                },
            });
            console.log('تم التعديل بنجاح', response.data);
            Swal.fire({
                title: `${response.data.message}`,
                icon: 'success',
                confirmButtonText: 'موافق',
            });
        } catch (err) {
            Swal.fire({
                title: `${err.response.data.message}`,
                icon: 'error',
                confirmButtonText: 'موافق',
            });
            console.log(err)
        }
    };



    const handleImageUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        setLoadingImg(true);

        try {
            const options = {
                maxSizeMB: 1,
                maxWidthOrHeight: 800,
                useWebWorker: true,
            };

            const compressedFile = await imageCompression(file, options);

            const formData = new FormData();
            formData.append("file", compressedFile);
            formData.append("upload_preset", "test cloudinary");
            formData.append("cloud_name", "dhta28b63");

            const response = await fetch(
                "https://api.cloudinary.com/v1_1/dhta28b63/image/upload",
                { method: "POST", body: formData }
            );

            const data = await response.json();

            if (data.secure_url) {
                setImageUrl(data.secure_url);
                setChalet((prevData) => ({
                    ...prevData,
                    img: data.secure_url,
                }));

                console.log("Image uploaded:", data.secure_url);
            } else {
                console.error("Failed to upload image");
            }
        } catch (error) {
            console.error("Error uploading image:", error);
        } finally {
            setLoadingImg(false);
        }
    };


      //Gallery
        const handleGalleryUpload = async (event) => {
            const files = Array.from(event.target.files);
            if (files.length === 0) return;
    
            setLoadingGallery(true);
    
            try {
                const uploadPromises = files.map(async (file) => {
                    const compressedFile = await imageCompression(file, {
                        maxSizeMB: 1,
                        maxWidthOrHeight: 800,
                        useWebWorker: true,
                        // fileType: "image/webp",
                    });
    
                    const formData = new FormData();
                    formData.append("file", compressedFile);
                    formData.append("upload_preset", "test cloudinary");
    
                    const response = await fetch(
                        "https://api.cloudinary.com/v1_1/dhta28b63/image/upload",
                        { method: "POST", body: formData }
                    );
    
                    const data = await response.json();
                    console.log("image upload"+data.secure_url)
                    return `${data.secure_url}`;
                });
    
                const uploadedImages = await Promise.all(uploadPromises);
                setGalleryUrls(uploadedImages);
                setChalet((prevData) => ({
                    ...prevData,
                    gallery: uploadedImages,
                }));
            } catch (error) {
                console.error("Error uploading images:", error);
            } finally {
                setLoadingGallery(false);
            }
        };



    if (loading) return <Splash />;

    return (
        <div className="flex flex-col md:flex-row justify-between mb-10 py-10  items-center rounded-lg shadow-lg overflow-hidden w-full">

            <div className="w-full md:w-1/3 ps-10">
                <h1 className="text-4xl font-bold text-[#1E293B] mb-4"
                >
                    تعديل بيانات الشاليه
                </h1>
                <p className="text-2xl text-[#718096] mb-6">
                    قم بتعديل بيانات الشاليه وابدأ في استقبال الحجوزات الآن.
                </p>
                <form onSubmit={handleSubmit} className="space-y-4" >
                    <InputField label="اسم الشاليه :" name="name" value={chalet.name} onChange={(e) => setChalet({ ...chalet, name: e.target.value })} required />
                    <InputField label="وصف مختصر:" name="title" value={chalet.title} onChange={(e) => setChalet({ ...chalet, title: e.target.value })} required />



                    <div>
                        <label htmlFor="city" className="block text-black text-xl mb-2">اختر مدينة:</label>
                        <input list="cities" id="city" name="city" value={chalet.location.city}
                            className={`w-full p-2 bg-transparent border rounded-lg focus:outline-[#124FB3] border-black`}

                            onChange={(e) => setChalet({
                                ...chalet,
                                location: {
                                    ...chalet.location,
                                    city: e.target.value
                                }
                            })} placeholder="ابحث عن مدينة..."
                        />
                        <datalist id="cities">
                            {cities.map((city, index) => (
                                <option key={index} value={city} />
                            ))}
                        </datalist>
                    </div>




                    <InputField label="الشارع" name="street" value={chalet.location.street} onChange={(e) => setChalet({
                        ...chalet,
                        location: {
                            ...chalet.location,
                            street: e.target.value
                        }
                    })} />


                    <div>
                        <label className="block text-black text-xl mb-2" htmlFor="description">الوصف:</label>
                        <textarea
                            id="description"
                            value={chalet.description}
                            className="w-full p-2 bg-transparent border border-black rounded-lg focus:outline-[#124FB3]"
                            onChange={(e) => setChalet({ ...chalet, description: e.target.value })}
                            required
                        />
                    </div>


                    <InputField label="السعر" name="rooms" value={chalet.price} onChange={(e) => setChalet({ ...chalet, price: e.target.value })} type="number" />

                    {/* السعر */}
                    <InputField label="عدد الغرف" name="price" value={chalet.rooms} onChange={(e) => setChalet({ ...chalet, rooms: e.target.value })} type="number" />

                    {/* المرافق */}
                    <ListInput title="المرافق" list={facilities} setList={setFacilities} />

                    {/* سياسة الحجز */}
                    <ListInput title="سياسة الحجز والإلغاء" list={policy} setList={setPolicy} />

                    <InputField label="رقم الهاتف الخاص بالشاليه" name="phoneOfChalet" value={chalet.phoneOfChalet} onChange={(e) => setChalet({ ...chalet, phoneOfChalet: e.target.value })} type="number" />

                    <InputField label="رقم الواتساب الخاص بالشاليه" name="whatsapp" value={chalet.whatsapp} onChange={(e) => setChalet({ ...chalet, whatsapp: e.target.value })} type="number" />

                    <InputField label="رابط صفحة الفيس بوك" name="facebook" value={chalet.facebook} onChange={(e) => setChalet({ ...chalet, facebook: e.target.value })} />

                    <InputField label="رابط صفحة الانستجرام" name="instagram" value={chalet.instagram} onChange={(e) => setChalet({ ...chalet, instagram: e.target.value })} />

                    <InputField label=" رابط صفحة التيك توك " name="tiktok" value={chalet.tiktok} onChange={(e) => setChalet({ ...chalet, tiktok: e.target.value })} />

                    <div>
                        <label className="block text-black text-xl mb-2" > صورة الشاليه الرئيسية </label>
                        <input
                            type="file"
                            id="img"
                            name="img"
                            onChange={handleImageUpload}
                            className="w-full p-2 bg-transparent border border-black rounded-lg focus:outline-[#124FB3]"
                        />
                        <img src={imageUrl} alt="" className="h-60 mt-2" />
                        {loadingImg && <p className="mt-2 text-lg font-bold">  جاري تعديل الصورة الرئيسية...</p>}

                    </div>
                    <div>
                        <label className="block text-black text-xl mb-2" > صورة  المعرض </label>
                        <input
                            type="file"
                            id="gallery"
                            name="gallery"
                            aria-label="اختر الصور"
                            multiple
                            onChange={handleGalleryUpload}
                            className="w-full p-2 bg-transparent border border-black rounded-lg focus:outline-[#124FB3]"
                        />
                        <div className="grid grid-cols-3 gap-2 mt-2">

                            {galleryUrls.map((img, idx) => (
                                <div key={idx} className="relative">
                                    <img src={img} alt={`gallery-img-${idx}`} className="w-40 h-40 object-cover" />
                                </div>
                            ))}
                        </div>
                        {loadingGallery && <p className=" mt-2 text-lg font-bold"> جاري تعديل صور المعرض... </p>}

                    </div>
                    <button
                        type="submit"
                        className="w-full bg-gradient-to-l from-[#48BB78] to-[#1A71FF] text-white py-3 rounded-lg"
                    >
                        حفظ التعديلات
                    </button>
                </form>
            </div>
        </div>
    );
};

