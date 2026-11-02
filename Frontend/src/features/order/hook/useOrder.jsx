import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../auth/state/auth.slice";
import { CreateOrder, GetallServices, GetOrderDetail } from "../service/order.api";
import {
    setItem,
    setServices,
    setSelectedService,
    setLoading as setOrderLoading,
    setError as setOrderError,
} from "../state/order.slice.jsx";

export function useOrder() {
    const dispatch = useDispatch();

    // Redux Selectors from state.order
    const reduxServices = useSelector((state) => state.order?.services || []);
    const reduxItem = useSelector((state) => state.order?.item || []);
    const reduxSelectedService = useSelector((state) => state.order?.selectedService || null);
    const reduxLoading = useSelector((state) => state.order?.loading || false);
    const reduxError = useSelector((state) => state.order?.error || null);

    const handleGetOrder = async () => {
        try {
            dispatch(setLoading(true));
            dispatch(setOrderLoading(true));
            const data = await GetOrderDetail();
            console.log("handleGetOrder data:", data);
            if (data?.order) {
                dispatch(setItem(data.order));
            }
            return data;
        } catch (error) {
            console.error(`Error in handleGetOrder in useOrder:`, error);
            dispatch(setOrderError(error?.message || "Failed to fetch orders"));
            throw error;
        } finally {
            dispatch(setLoading(false));
            dispatch(setOrderLoading(false));
        }
    };

    const handleCreateOrder = async (formdata) => {
        try {
            dispatch(setLoading(true));
            dispatch(setOrderLoading(true));
            const data = await CreateOrder(formdata);
            if (data?.order) {
                dispatch(setItem(data.order));
            }
            return data;
        } catch (error) {
            console.error(`Error in create order:`, error);
            dispatch(setOrderError(error?.message || "Failed to create order"));
            throw error;
        } finally {
            dispatch(setLoading(false));
            dispatch(setOrderLoading(false));
        }
    };

    const handleGetallService = async () => {
        try {
            dispatch(setLoading(true));
            dispatch(setOrderLoading(true));

            const data = await GetallServices();
            const rawList =
                data?.services || (Array.isArray(data) ? data : data?.data?.services || []);

            // Store all fetched services into Redux state (order.slice.jsx)
            if (Array.isArray(rawList)) {
                dispatch(setServices(rawList));
            }

            return data;
        } catch (error) {
            console.error("Error in handleGetallService in useOrder:", error);
            dispatch(setOrderError(error?.message || "Failed to fetch services"));
            throw error;
        } finally {
            dispatch(setLoading(false));
            dispatch(setOrderLoading(false));
        }
    };

    const handleSetSelectedService = (service) => {
        dispatch(setSelectedService(service));
    };

    return {
        handleGetOrder,
        handleCreateOrder,
        handleGetallService,
        handleSetSelectedService,
        services: reduxServices,
        item: reduxItem,
        order: reduxItem,
        selectedService: reduxSelectedService,
        loading: reduxLoading,
        error: reduxError,
    };
}
