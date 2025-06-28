import axios from "axios";
export const useApi = () => {
    const config = useRuntimeConfig()
    const backendUrl = config.public.backendUrl
    const jwt = useCookie('auth_token')

    const baseApi = axios.create({
        baseURL: backendUrl,
    });

    const baseApiFile = axios.create({
        baseURL: backendUrl,
    });

    baseApi.interceptors.request.use(async (config) => {
        if (jwt.value) {
            config.headers.set("Authorization", `Bearer ${jwt.value}`);
        }
        config.headers.set("Content-Type", "application/json");
        config.headers.set("X-Requested-With", "XMLHttpRequest");
        config.headers.set("Access-Control-Allow-Origin", "*");

        return config;
    });

    baseApiFile.interceptors.request.use(async (config) => {
        config.headers.set("Content-Type", "multipart/form-data");
        config.headers.set("X-Requested-With", "XMLHttpRequest");
        config.headers.set("Access-Control-Allow-Origin", "*");
        if (jwt.value) {
            config.headers.set("Authorization", `Bearer ${jwt.value}`);
        }
        return config;
    });

    const guardarData = async (form) => {
        try {
            const response = await baseApi.post(form.end_point, form);
            return {
                operation: true,
                error: null,
                data: response.data,
            };
        } catch (error) {
            if (error?.response?.data.message) {
                let message = error.response.data.message;
                if (Array.isArray(message)) {
                    message = message[0];
                }
                return {
                    operation: false,
                    error: message,
                    data: null
                };
            }
            return {
                operation: false,
                error: 'An unexpected error occurred',
                data: error
            };
        }
    };

    const getResultDataGet = async (form, page) => {
        try {
            const url = page ? `${form.end_point}?page=${page}` : form.end_point;
            const response = await baseApi.get(url, { params: form });
            return {
                operation: true,
                error: null,
                data: response.data,
            };
        } catch (error) {
            if (error?.response?.data.message) {
                let message = error.response.data.message;
                if (Array.isArray(message)) {
                    message = message[0];
                }
                return {
                    operation: false,
                    error: message,
                    data: null
                };
            }
            return {
                operation: false,
                error: 'An unexpected error occurred',
                data: error
            };
        }
    };

    const guardarDataFile = async (form) => {
        try {
            const response = await baseApiFile.post(form.end_point, form);
            return {
                operation: true,
                error: null,
                data: response.data,
            };
        } catch (error) {
            if (error?.response?.data.error === 'Payload Too Large') {
                return {
                    operation: false,
                    error: 'El archivo es demasiado grande',
                    data: null
                };
            }
            let message = error?.response?.data.message;
            if (Array.isArray(message)) {
                message = message[0];
            }
            return {
                operation: false,
                error: message || 'An unexpected error occurred',
                data: null
            };
        }
    };

    return {
        getResultDataGet,
        guardarDataFile,
        guardarData,
        backendUrl,
    };
}; 