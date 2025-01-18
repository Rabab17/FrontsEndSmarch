import { Plans } from "../../../api/data";

export default function BalanceRechargePage() {
    const plans = Plans
    return (
        <div className="flex flex-col md:flex-row justify-center items-center gap-6 p-6">
            {plans.map((plan) => (
                <div
                    key={plan.id}
                    className="border border-gray-300 rounded-lg shadow-md p-6 text-center w-[25%]"
                >
                    <h3 className="text-xl font-bold text-blue-700 mb-4">{plan.title}</h3>
                    <p className="text-lg font-semibold mb-4">{plan.price}</p>
                    <ul className="text-sm text-gray-700 mb-6 space-y-2 min-h-40">
                        {plan.features.map((feature, idx) => (
                            <li key={idx} className="flex items-center gap-2">
                                <span>✔️</span> {feature}
                            </li>
                        ))}
                    </ul>
                    <button className="bg-blue-600 text-white py-2 px-8 rounded-lg hover:bg-blue-700 transition">
                        اختيار
                    </button>
                </div>
            ))}
        </div>
    );
};