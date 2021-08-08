
import { useAuthenticatedApi } from '../modules/api';

export const useQrApi = () => {
    const totalCount = () => {
        const { get } = useAuthenticatedApi('qr/count');

        return get();
    }

    return {
        totalCount
    }
}
