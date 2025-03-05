import axios from "axios";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import imageCompression from 'browser-image-compression';
import { TiDelete } from "react-icons/ti";
import InputField from "./InputField";
import ListInput from "./ListInput";

export default function AddChalet() {
    const location = useLocation();
    const { packageId } = location.state || {};
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState(null);
    const [loadingImg, setLoadingImg] = useState(false);
    const [galleryUrls, setGalleryUrls] = useState([]);
    const [loadingGallery, setLoadingGallery] = useState(false);
    const [facilities, setFacilities] = useState([""]);
    const [policy, setPolicy] = useState([""]);
    const [formErrors, setFormErrors] = useState({
        name: '',
        title: '',
        description: '',
        city: '',
        street: '',
        rooms: '',
        price: '',
        facilities: '',
        reservationPolicy: '',
        img: '',
    });

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

    const [city, setCity] = useState("");

    const cities = [
        "الرياض", "جدة", "مكة المكرمة", "المدينة المنورة", "الدمام",
        "الطائف", "تبوك", "الخبر", "بريدة", "خميس مشيط", "حائل",
        "الجبيل", "القطيف", "نجران", "ينبع", "أبها", "عرعر",
        "سكاكا", "جازان", "القريات", "الباحة"
    ];


    const token = localStorage.getItem('token');

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        setFormErrors((prevErrors) => ({
            ...prevErrors,
            [name]: value.trim() ? "" : prevErrors[name],
        }));
    };

    // city
    const handleCityChange = (selectedCity) => {
        const { name, value } = selectedCity.target;

        setCity(value);
        setFormData((prevData) => ({
            ...prevData,
            location: {
                ...prevData.location,
                [name]: value,
            }
        }));
        setFormErrors((prevErrors) => ({
            ...prevErrors,
            city: value ? "" : prevErrors[city],
        }));
    };


    // street
    const handleStreetChange = (selectedStreet) => {
        const { value } = selectedStreet.target;

        setFormData((prevData) => ({
            ...prevData,
            location: {
                city: city,
                street: value,
            }
        }));

    };


    //Img 
    const handleImageUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        setLoadingImg(true);

        try {
            const options = {
                maxSizeMB: 1,
                maxWidthOrHeight: 800,
                useWebWorker: true,
                // fileType: "image/webp",
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

            // تحسين الصورة باستخدام Cloudinary CDN
            const optimizedUrl = `${data.secure_url}`;

            setImageUrl(optimizedUrl);
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
                return `${data.secure_url}`;
            });

            const uploadedImages = await Promise.all(uploadPromises);
            setGalleryUrls((prevImages) => [...prevImages, ...uploadedImages]);
        } catch (error) {
            console.error("Error uploading images:", error);
        } finally {
            setLoadingGallery(false);
        }
    };



    // التحقق من الايرور
    const validateForm = () => {
        let errors = {};
        let isValid = true;

        // تحقق من حقل الاسم
        if (!formData.name.trim()) {
            errors.name = 'الاسم مطلوب';
            isValid = false;
        }

        // تحقق من حقل العنوان
        if (!formData.title.trim()) {
            errors.title = 'الوصف المختصر مطلوب';
            isValid = false;
        }
        // تحقق من حقل العنوان
        if (!formData.description.trim()) {
            errors.description = 'الوصف مطلوب';
            isValid = false;
        }


        // تحقق من المدينة
        if (!city) {
            errors.city = 'يرجى اختيار المدينة من القائمة';
            isValid = false;
        }



        // تحقق من عدد الغرف
        if (!formData.rooms || isNaN(formData.rooms) || formData.rooms <= 0) {
            errors.rooms = 'عدد الغرف يجب أن يكون رقمًا أكبر من 0';
            isValid = false;
        }

        // تحقق من السعر
        if (!formData.price || isNaN(formData.price) || formData.price <= 0) {
            errors.price = 'السعر يجب أن يكون رقمًا أكبر من 0';
            isValid = false;
        }

        // تحقق من صورة الشاليه
        if (!imageUrl) {
            errors.img = 'يجب تحميل صورة للشاليه';
            isValid = false;
        }

        // تحقق من سياسة الحجز
        if (policy.length === 0 || policy.some(item => !item.trim())) {
            errors.reservationPolicy = 'يجب إضافة سياسة الحجز';
            isValid = false;
        }

        // تحقق من المرافق
        if (facilities.length === 0 || facilities.some(item => !item.trim())) {
            errors.facilities = 'يجب إضافة المرافق';
            isValid = false;
        }



        setFormErrors(errors);
        return isValid;
    };


    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!validateForm()) {
            return;
        }
        setLoading(true)
        try {
            const updatedFormData = {
                ...formData,
                img: imageUrl,
                gallery: galleryUrls,
                facilities: facilities,
                reservationPolicy: policy,
            };

            const response = await axios.post(`${import.meta.env.VITE_URL_BACKEND}chalet/addChalet`, updatedFormData, {
                headers: {
                    Authorization: token,
                },
            });

            if (response.data.status === "success") {
                Swal.fire({
                    title: `${response.data.message}`,
                    icon: 'success',
                    confirmButtonText: 'موافق',
                });
            } else {
                Swal.fire({
                    title: 'حدث خطأ أثناء إضافة الشاليه.',
                    text: 'يرجى المحاولة لاحقًا.',
                    icon: 'error',
                    confirmButtonText: 'موافق',
                });
            }
        } catch (error) {
            console.log(error)
            Swal.fire({
                title: `${error.response.data.message}`,
                icon: 'error',
                confirmButtonText: 'موافق',
            });
        } finally {
            setLoading(false)
        }
    };

    const handleRemoveImage = (url) => {
        setGalleryUrls((prevImages) => prevImages.filter((imageUrl) => imageUrl !== url));
    };


    return (
        <>
            {packageId != null ?
                <div className="flex flex-col md:flex-row justify-between mb-10 py-10  items-center rounded-lg shadow-lg overflow-hidden w-full">

                    <div className="w-full md:w-1/3 ps-10">

                        <h1 className="text-4xl font-bold text-[#1E293B] mb-4">أضف شاليهك الجديد</h1>
                        <p className="text-2xl text-[#718096] mb-6">
                            قم بإضافة شاليهك وابدأ في استقبال الحجوزات الآن.
                        </p>
                        <form className="space-y-4" onSubmit={handleSubmit}>
                            {/* الاسم */}
                            <InputField label="الاسم" name="name" value={formData.name} onChange={handleChange} error={formErrors.name} />
                            {/* الوصف المختصر  */}
                            <InputField label="وصف مختصر" name="title" value={formData.title} onChange={handleChange} error={formErrors.title} />
                            {/* الوصف */}
                            <div>
                                <label htmlFor="description" className="block text-black text-xl mb-2">
                                    الوصف
                                </label>
                                <textarea id="description" name="description" value={formData.description} onChange={handleChange}
                                    className={`w-full p-2 bg-transparent border rounded-lg focus:outline-[#124FB3] ${formErrors.description ? "border-red-500" : "border-black"}`}
                                />
                                {formErrors.description && <div className="error text-red-600">{formErrors.description}</div>}

                            </div>
                            {/* المدينه */}
                            <div>
                                <label htmlFor="city" className="block text-black text-xl mb-2">اختر مدينة:</label>
                                <input list="cities" id="city" name="city" value={city} onChange={handleCityChange} placeholder="ابحث عن مدينة..."
                                    className={`w-full p-2 bg-transparent border rounded-lg focus:outline-[#124FB3] ${formErrors.city ? "border-red-500" : "border-black"}`}
                                />
                                <datalist id="cities">
                                    {cities.map((city, index) => (
                                        <option key={index} value={city} />
                                    ))}
                                </datalist>
                                {formErrors.city && <div className="error text-red-600">{formErrors.city}</div>}
                            </div>

                            {/* الشارع */}
                            <InputField label="الشارع" name="street" value={formData.street} onChange={handleStreetChange} />

                            {/* عدد الغرف */}
                            <InputField label="عدد الغرف" name="rooms" value={formData.rooms} onChange={handleChange} error={formErrors.rooms} type="number" />

                            {/* السعر */}
                            <InputField label="السعر " name="price" value={formData.price} onChange={handleChange} error={formErrors.price} type="number" />

                            {/* المرافق */}
                            <ListInput title="المرافق" list={facilities} setList={setFacilities} error={formErrors.facilities} />

                            {/* سياسة الحجز */}
                            <ListInput title="سياسة الحجز والإلغاء" list={policy} setList={setPolicy} error={formErrors.reservationPolicy} />

                            <InputField label="رقم الهاتف الخاص بالشاليه" name="phoneOfChalet" value={formData.phoneOfChalet} onChange={handleChange} type="number" />

                            <InputField label="رقم الواتساب الخاص بالشاليه" name="whatsapp" value={formData.whatsapp} onChange={handleChange} type="number" />

                            <InputField label="رابط صفحة الفيس بوك" name="facebook" value={formData.facebook} onChange={handleChange} />

                            <InputField label="رابط صفحة الانستجرام" name="instagram" value={formData.instagram} onChange={handleChange} />

                            <InputField label=" رابط صفحة التيك توك " name="tiktok" value={formData.tiktok} onChange={handleChange} />
                            <div>
                                <label htmlFor="img" className="block text-black text-xl mb-2">
                                    صورة الشاليه الرئيسية
                                </label>
                                <input
                                    type="file"
                                    id="img"
                                    name="img"
                                    onChange={handleImageUpload}
                                    className="w-full p-2 bg-transparent border border-black rounded-lg focus:outline-[#124FB3]"
                                />
                                {loadingImg && <p className="mt-2 text-lg font-bold">  جاري رفع الصورة الرئيسية...</p>}
                                {imageUrl &&
                                    <>
                                        <div className="relative">
                                            <img src={imageUrl} alt="Uploaded" className="mt-2 w-40" />
                                            <TiDelete onClick={() => { setImageUrl(null) }}
                                                className="absolute top-0 right-0  text-white rounded-full p-1 cursor-pointer"
                                                size={40}
                                            />
                                        </div>
                                    </>
                                }
                            </div>
                            <div>
                                <label htmlFor="gallery" className="block text-black text-xl mb-2">
                                    صور المعرض
                                </label>
                                <input
                                    type="file"
                                    id="gallery"
                                    name="gallery"
                                    aria-label="اختر الصور"
                                    multiple
                                    onChange={handleGalleryUpload}
                                    className="w-full p-2 bg-transparent border border-black rounded-lg focus:outline-[#124FB3]"
                                />

                                {loadingGallery && <p className=" mt-2 text-lg font-bold"> جاري رفع صور المعرض... </p>}
                                <div className="grid grid-cols-3 gap-2 mt-2">
                                    {galleryUrls.map((url, index) => (
                                        <div key={index} className="relative">
                                            <img src={url} alt={`Uploaded ${index}`} className="w-32 h-32 object-cover" />
                                            <TiDelete onClick={() => handleRemoveImage(url)}
                                                className="absolute top-0 right-0  text-white rounded-full p-1 cursor-pointer"
                                                size={40}
                                            />

                                        </div>
                                    ))}
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-gradient-to-l from-[#48BB78] to-[#1A71FF] text-white py-3 rounded-lg flex items-center justify-center gap-2"
                            >
                                {loading ? (
                                    <>
                                        <p className="mx-5">
                                            جاري المعالجة
                                        </p>
                                        <div className="w-5 h-5 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
                                    </>
                                ) :
                                    "إضافة الشاليه"

                                }
                            </button>
                        </form>
                    </div >
                    <div className="hidden md:block w-full md:w-[40%]">
                        <img
                            src="/assets/images/login.png"
                            alt="Building"
                            className="w-full h-full object-contain"
                        />
                    </div>
                </div>
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
