import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Splash from "../../components/Splash";

export default function SinglePost() {
    const { id } = useParams()
    const [post, setPost] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        const fetchPackages = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_URL_BACKEND}article/${id}`);
                setPost(response.data.data)
            } catch (error) {
                console.error("Error fetching blog:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPackages();
    }, [id]);

    if (loading) return <Splash />;
    return (
        <div className="mx-auto bg-white rounded-lg shadow-md ">
            <div className="text-center mx-auto">
                <img
                    src={post.image}
                    alt="post image"
                    className="w-[80%] h-96 object-contain mx-auto"
                />
            </div>
            <div className="p-6">
                <h2 className="text-3xl font-bold  text-center mb-4">{post.title}</h2>
                <p className="text-2xl mb-4 ms-5 me-5 break-words text-wrap"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                />

            </div>
            <div>
                {post.KeyPointes.map((point) => (
                    <div key={point._id} className="p-2 ps-10 border rounded-lg shadow-md mb-2">
                        <p className="font-semibold text-xl mb-2 break-words text-wrap">{point.content}</p>

                        <div className="flex gap-2 flex-wrap">
                            {point.images.map((img, index) => (
                                <img
                                    key={index}
                                    src={img}
                                    alt="KeyPoint Image"
                                    className="w-32 h-32 object-cover rounded-lg"
                                />
                            ))}
                        </div>
                    </div>
                ))}

            </div>
        </div>
    );

}
