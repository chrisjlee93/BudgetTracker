import {BudgetItem} from "../types.ts";
import {deleteBudgetItem} from "./Budget-service.ts";

type BudgetTableProps = {
    item: BudgetItem | null;
    items: BudgetItem[];
    onDeleteSuccess: () => void;
};


const BudgetTable = ({ item, items, onDeleteSuccess }: BudgetTableProps) => {

    const handleDelete = async (id: number) => {
        try {
            await deleteBudgetItem(id);
            onDeleteSuccess();
        } catch (err) {
            console.error("Delete failed", err);
        }
    };

    return (
        <>
            <div className="relative overflow-x-auto mx-10 my-20">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3 flex-col text-center">
                            Category
                        </th>
                        <th scope="col" className="px-6 py-3 flex-col text-center">
                            Amount ($XXX.XX)
                        </th>
                        <th scope="col" className="px-6 py-3 flex-col text-center">
                            Percentage (%)
                        </th>
                        <th scope="col" className="px-6 py-3 flex-col text-center">
                            ❌
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 flex-col text-center">
                        <th scope="row"
                            className="px-6 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            Total Budget
                        </th>
                        <td className="px-6 py-3">
                            {item ? `$${Number(item.amount).toFixed(2)}` : "Loading..."}
                        </td>
                        <td className="px-6 py-3">
                            {item?.amount && 100}
                        </td>
                        <td className="px-6 py-3">
                        </td>
                    </tr>
                    {Array.isArray(items) && items.map((it, index) => {
                        const percent = item?.amount
                            ? ((Number(it.amount) / Number(item?.amount)) * 100).toFixed(1)
                            : null;

                        if (it.id > 1) {

                        return (
                            <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 flex-col text-center">
                                <th
                                    scope="row"
                                    className="px-6 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                >
                                    {it.category}
                                </th>
                                <td className="px-6 py-3">
                                    ${Number(it.amount).toFixed(2)}
                                </td>
                                <td className="px-6 py-3">
                                    {percent}
                                </td>
                                <td className="px-6 py-3">
                                    <button onClick={() => handleDelete(it.id)}
                                        className="py-1 mb-1 text-sm font-sm text-white focus:outline-none"
                                    >Delete</button>
                                </td>
                            </tr>
                        );
                    }})}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default BudgetTable