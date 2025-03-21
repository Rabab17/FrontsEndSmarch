/* eslint-disable react/prop-types */
import axios from 'axios';
import { useState } from 'react';
import Swal from 'sweetalert2';
import { jwtDecode } from 'jwt-decode';

const TicketModal = ({ isOpen, onClose, ownerID }) => {
    const [subject, setSubject] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem('token');

        try {
            // التحقق من الدور من الـ token
            const userRole = getUserRole(token); // دالة للحصول على الدور

            if (userRole === 'user') { // تحقق من أن الدور هو user

                const response = await axios.post(`${import.meta.env.VITE_URL_BACKEND}ticket/create`, {
                    subject,
                    recipient: ownerID
                }, {
                    headers: {
                        'Authorization': token
                    }
                });

                if (response.status === 201) { // تحقق من حالة الاستجابة
                    // عرض تنبيه SweetAlert
                    Swal.fire({
                        title: 'تم الإرسال بنجاح!',
                        text: 'تم إنشاء التذكرة بنجاح.',
                        icon: 'success',
                        confirmButtonText: 'موافق'
                    });
                    onClose();
                } else {
                    console.error('حالة استجابة غير متوقعة:', response.status);
                    console.error('بيانات الاستجابة:', response.data);
                }
            } else if (userRole === 'owner') { // تحقق من أن الدور هو owner

                const response = await axios.post(`${import.meta.env.VITE_URL_BACKEND}ticket/create`, {
                    subject,
                }, {
                    headers: {
                        'Authorization': token
                    }
                });

                if (response.status === 201) { // تحقق من حالة الاستجابة
                    // عرض تنبيه SweetAlert
                    Swal.fire({
                        title: 'تم الإرسال بنجاح!',
                        text: 'تم إنشاء التذكرة بنجاح.',
                        icon: 'success',
                        confirmButtonText: 'موافق'
                    });
                    onClose();
                } else {
                    console.error('حالة استجابة غير متوقعة:', response.status);
                    console.error('بيانات الاستجابة:', response.data);
                }
            } else {
                // إذا كان الدور ليس user أو owner، عرض رسالة تنبيه
                Swal.fire({
                    title: 'خطأ',
                    text: 'ليس لديك صلاحيات لإنشاء تذكرة.',
                    icon: 'error',
                    confirmButtonText: 'موافق'
                });
            }
        } catch (error) {
            console.error('خطأ في إنشاء التذكرة', error.message);
            if (error.response) {
                console.error('بيانات الاستجابة:', error.response.data);
                console.error('حالة الاستجابة:', error.response.status);
            } else if (error.request) {
                console.error('بيانات الطلب:', error.request);
            } else {
                console.error('رسالة الخطأ:', error.message);
            }
        }
    };

    const getUserRole = (token) => {
        try {
            const decodedToken = jwtDecode(token); // فك تشفير الـ token
            return decodedToken.role; // افترض أن الـ token يحتوي على خاصية role
        } catch (error) {
            console.error('خطأ في فك تشفير الـ token', error.message);
            return null; // أو يمكنك إرجاع قيمة افتراضية
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-lg font-bold mb-4 text-center">إنشاء تذكرة دعم</h2>
                <p className="mb-4 text-center text-gray-600">يرجى ملء الموضوع أدناه لتقديم تذكرة دعم.</p>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block mb-2">الموضوع</label>
                        <input
                            type="text"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            className="border rounded-lg w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition w-full"
                    >
                        إرسال التذكرة
                    </button>
                    <button
                        type="button"
                        onClick={onClose}
                        className="mt-2 bg-gray-300 text-black px-4 py-2 rounded-lg hover:bg-gray-400 transition w-full"
                    >
                        إلغاء
                    </button>
                </form>
            </div>
        </div>
    );
};

export default TicketModal;