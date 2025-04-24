import {BudgetItem} from "../types.ts";
import axios from "axios";

const baseURL = "http://localhost:8080/api/budget"

export const fetchBudgetItems = async (): Promise<BudgetItem[]> => {

    const response = await axios.get(baseURL)
    return Promise.resolve(response.data)
}

export const fetchBudgetItemById = async ({id}): Promise<BudgetItem> => {
    const response = await axios.get(`${baseURL}/${id}`)
    return Promise.resolve(response.data)
}

export const createBudgetItem = async (item: Omit<BudgetItem, 'id'>): Promise<BudgetItem> => {
    const response = await axios.post(baseURL, item);
    return response.data;
}

export const deleteBudgetItem = async (id: number): Promise<void> => {
    await axios.delete(`http://localhost:8080/api/budget/${id}`);
};

export const updateBudgetItem = async (item:BudgetItem): Promise<BudgetItem> => {
    const response = await axios.put(`${baseURL}/${item.id}`, item)
    return response.data;
}

