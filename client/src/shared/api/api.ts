import axios from 'axios';
import { TOKEN_LOCALSTORAGE_KEY } from 'shared/const/localstorage';
import { config } from '@storybook/addon-actions';

export const $api = axios.create({
    baseURL: __API__,
});

$api.interceptors.request.use((config) => {
    if (config.headers) {
        config.headers.Authorization = `Bearer ${localStorage.getItem(TOKEN_LOCALSTORAGE_KEY)}` || '';
    }

    return config;
});
