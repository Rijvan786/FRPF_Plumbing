import { useState } from "react";
import { useDispatch } from "react-redux";
import { setLoading } from "../../auth/state/auth.slice";
import {
  CreateService,
  GetTodayRegisterTechnicians,
  VerifyTechnician,
} from "../service/plumber_service.api.jsx";

export function usepulmberService() {
  const dispatch = useDispatch();
  const [loadingAction, setLoadingAction] = useState(false);

  const handleCreateService = async (payload) => {
    try {
      dispatch(setLoading(true));
      setLoadingAction(true);
      const data = await CreateService(payload);
      return data;
    } catch (error) {
      console.error("Error in handleCreateService:", error);
      throw error;
    } finally {
      dispatch(setLoading(false));
      setLoadingAction(false);
    }
  };

  const handleGetTodayTechnicians = async () => {
    try {
      const data = await GetTodayRegisterTechnicians();
      return data;
    } catch (error) {
      console.error("Error in handleGetTodayTechnicians:", error);
      return null;
    }
  };

  const handleVerifyTechnician = async ({ email }) => {
    try {
      const data = await VerifyTechnician({ email });
      return data;
    } catch (error) {
      console.error("Error in handleVerifyTechnician:", error);
      throw error;
    }
  };

  return {
    handleCreateService,
    handleGetTodayTechnicians,
    handleVerifyTechnician,
    loadingAction,
  };
}

export default usepulmberService;
