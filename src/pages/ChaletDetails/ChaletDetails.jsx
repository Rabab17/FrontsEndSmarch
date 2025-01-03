import { useParams } from "react-router-dom"
import { Chalets } from "../../api/data"

export default function ChaletDetails() {
    const { id } = useParams()
    const chalet = Chalets.find(chalet => chalet.id === parseInt(id))
    return (
        <div className="bg-blue-50 my-10">
            <div className="flex flex-col md:flex-row items-center justify-around">
                <div className="w-full md:w-[40%] px-4">
                    <h1 className="text-3xl font-bold my-6">{chalet.title}</h1>
                    <p>{chalet.description}</p>
                    <h1 className="text-3xl font-bold text-[#0061E0] my-8">{chalet.price} / ليله</h1>
                </div>

                <div className="w-full md:w-[40%] my-10 px-4">
                    <img
                        src={chalet.img}
                        alt={chalet.title}
                        className="w-full h-full object-cover rounded-lg"
                    />
                    <div className="flex flex-wrap justify-between my-6">
                        {chalet.gallery.map((img, index) => (
                            <img key={index} src={img} alt={`Gallery ${index + 1}`}
                                className="w-[32%] md:w-[32%] rounded-xl mb-4"
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
