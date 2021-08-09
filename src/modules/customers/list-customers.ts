
import { useAuthenticatedApi } from '../../modules/api';
import { useEnvVars } from '../../modules/env';

export const useListCustomers = () => {
    const listCustomers = (query: Record<string, any>) => {
        const { loadEnv } = useEnvVars();
        const { get } = useAuthenticatedApi(loadEnv().backoffice_url + 'customers/list');

        return get(query);
    }

    return {
        listCustomers
    }
}
