import { introspect } from "@/services/authService";
import { useEffect, useState } from "react";

const useAuthorization = (requiredPermission) => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuthorization = async () => {
      try {
        const { statusCode, data } = await introspect();

        if (statusCode === 200 && data.roles.includes(requiredPermission)) {
          setIsAuthorized(true);
        }
      } catch (error) {
        if (!error.response) {
          navigate("/server-error");
        }
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthorization();
  }, [requiredPermission]);

  return { isAuthorized, isLoading };
};

export default useAuthorization;
