import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Splash from "../../components/Splash";
import Pagination from "../../components/Pagination";
import axios from "axios";

export default function Blog() {
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const nav = useNavigate();

  const GoToPost = (id) => {
    nav(`/blog/${id}`);
  };

  useEffect(() => {

    const fetchPosts = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${import.meta.env.VITE_URL_BACKEND}article`, {
          params: {
            page: currentPage,
          }
        });

        if (response.data.status === "success") {
          setBlogPosts(response.data.data);

          setTotalPage(response.data.pagination.totalPages);
        }
      } catch (error) {
        console.error("Error fetching blog posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <Splash />;
  return (





    <div className="bg-blue-50 py-10 mb-3">
      {blogPosts.length == 0 ?
        <h1 className="text-center text-2xl font-semibold my-8">لا توجد مقالات بعد </h1>
        :
        <>
          <div className="text-center space-y-4 mb-8">
            <h1 className="text-blue-700 text-3xl font-bold">استكشف مقالاتنا</h1>
            <h3 className="text-gray-600 text-lg">
              تعرف على أحدث الأخبار والنصائح حوسل استئجار الشاليهات وإدارة العطلات المثالية.
            </h3>
            <input
              type="search"
              name="search1"
              id="12"
              placeholder="بحث"
              className="w-72 md:w-96 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Grid for Blog Posts */}
          <div className="flex flex-wrap gap-6 justify-center">
            {blogPosts.map((post) => (
              <div
                key={post._id}
                className="bg-white p-4 w-full sm:w-[48%] lg:w-[25%] rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out"
                onClick={() => GoToPost(post._id)}
              >
                {post.image && (
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-60 object-cover rounded-lg mb-10"
                  />
                )}
                <h2 className="text-lg font-semibold text-blue-700 mb-2 truncate">{post.title}</h2>
                <p className="text-gray-600 text-sm mb-4 truncate">{post.subTitel}</p>
              </div>
            ))}
            <Pagination setCurrentPage={setCurrentPage} totalPages={totalPage} currentPage={currentPage} />
          </div>

        </>
      }

    </div>
  );
}