import { useDispatch } from "react-redux";
import { setLoading } from "../../auth/state/auth.slice";
import { CreateOrder, GetallServices, GetOrderDetail } from "../service/order.api";
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
      const handleGetallService = async () => {
        try {
          dispatch(setLoading(true));
  
    
          const data = await GetallServices();
          const rawList =
            data?.services || (Array.isArray(data) ? data : data?.data?.services || []);
    
          // Store all fetched services into Redux state
          
    
          return data;
        } catch (error) {
          console.error("Error in handleGetallService:", error);
        
          throw error;
        } finally {
          dispatch(setLoading(false));
        
        }
      };
    

    return {
        handleGetOrder,
        handleCreateOrder,
        handleGetallService
    };
}
