
import { useAuthenticatedApi } from '../../modules/api';
import { useEnvVars } from '../../modules/env';

export const useCountCustomers = () => {
    const countCustomers = () => {
        const { loadEnv } = useEnvVars();
        const { get } = useAuthenticatedApi(loadEnv().backoffice_url + 'customers/count');

        return get();
    }

    return {
        countCustomers
    }
}
