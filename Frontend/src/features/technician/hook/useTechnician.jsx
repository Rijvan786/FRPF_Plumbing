import { useDispatch } from "react-redux";
import { setLoading, setUser } from "../../auth/state/auth.slice.jsx";
import { TechRegister } from "../services/technician.api.jsx";
import {
  setTechnician,
  setTechnicianProfile,
  setLoading as setTechLoading,
  setError as setTechError,
} from "../state/technician.slice.jsx";

export function useTechnician() {
  const dispatch = useDispatch();

  const handleTechRegister = async ({
    FullName,
    email,
    contact,
    password,
    role = "technician",
    experienceYears,
    street,
    city,
    pin_code,
    longitude,
    latitude,
  }) => {
    try {
      dispatch(setLoading(true));
      dispatch(setTechLoading(true));

      const data = await TechRegister({
        FullName,
        email,
        contact,
        password,
        role,
        experienceYears,
        street,
        city,
        pin_code,
        longitude,
        latitude,
      });

      console.log("Technician registered successfully:", data);

      if (data?.user) {
        dispatch(setUser(data.user));
        dispatch(setTechnician(data.user));
      }
      if (data?.TechnicianProfile) {
        dispatch(setTechnicianProfile(data.TechnicianProfile));
      }

      return data;
    } catch (error) {
      console.error(`Error in handleTechRegister in useTechnician:`, error);
      dispatch(setTechError(error?.response?.data?.message || error?.message));
      throw error;
    } finally {
      dispatch(setLoading(false));
      dispatch(setTechLoading(false));
    }
  };

  return {
    handleTechRegister,
  };
}

export default useTechnician;
