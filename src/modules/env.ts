
interface EnvVars {
    backoffice_url: String,
    qrengine_url: String
}

export const useEnvVars = () => {
    const loadEnv = (): EnvVars => {
        return <EnvVars>({
            backoffice_url: 'http://localhost:8040/',
            qrengine_url: 'http://localhost:8030/'
        });
    }

    return {
        loadEnv
    }
}