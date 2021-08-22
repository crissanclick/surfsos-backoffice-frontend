
import { useAuthenticatedApi } from '../modules/api';
import { useEnvVars } from '../modules/env';

export const useQrApi = () => {
    const totalCount = () => {
        const { loadEnv } = useEnvVars();
        const { get } = useAuthenticatedApi(loadEnv().backoffice_url + 'qr/count');

        return get();
    }

    return {
        totalCount
    }
}
