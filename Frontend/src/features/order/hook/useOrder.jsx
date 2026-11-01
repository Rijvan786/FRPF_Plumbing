import { useDispatch } from "react-redux";
import { setLoading } from "../../auth/state/auth.slice";
import { CreateOrder, GetOrderDetail } from "../service/order.api";
import { setItem } from "../state/order.slice.jsx";

export function useOrder() {
    const dispatch = useDispatch();

    const handleGetOrder = async () => {
        try {
            dispatch(setLoading(true));
            const data = await GetOrderDetail();
            console.log(data);
            if (data?.order) {
                dispatch(setItem(data.order));
            }
            return data;
        } catch (error) {
            console.log(`Error in handleGetOrder in useOrder ${error}`);
            throw error;
        } finally {
            dispatch(setLoading(false));
        }
    };
    
    const handleCreateOrder = async (formdata) => {
        try {
            dispatch(setLoading(true));
            const data = await CreateOrder(formdata);
            if (data?.order) {
                dispatch(setItem(data.order));
            }
            return data;
        } catch (error) {
            console.log(`Error in create order ${error}`);
            throw error;
        } finally {
            dispatch(setLoading(false));
        }
    };

    return {
        handleGetOrder,
        handleCreateOrder
    };
}
