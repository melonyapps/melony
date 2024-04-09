import axios from "axios";

export const fetchClient = (() => {
  const getAuthToken = async () => {
    try {
      return `Bearer ${localStorage.getItem("token")}`;
    } catch (err) {
      console.log("getAuthToken", err);
    }
  };

  const instance = axios.create();

  instance.interceptors.request.use(async (config) => {
    config.headers.Authorization = await getAuthToken();
    return config;
  });

  instance.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      if ([401, 403].includes(error.response.status)) {
        // sign out user if any 401 error appears
        // signOut(getAuth());
      } else {
        return Promise.reject(error);
      }
    }
  );

  return instance;
})();
