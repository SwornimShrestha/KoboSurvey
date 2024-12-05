import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';

export interface ApiConfig {
  apikey: string;
  baseUrl: string;
}

interface ApiConfigContextType {
  apiconfig: ApiConfig;
  setApiconfig: React.Dispatch<React.SetStateAction<ApiConfig>>;
  clearLocalStorage: () => void;
}

const defaultApiConfig: ApiConfig = {
  apikey: '',
  baseUrl: '',
};

export const ApiConfigContext = createContext<ApiConfigContextType | undefined>(
  undefined,
);

interface ApiConfigProviderProps {
  children: ReactNode;
}

export const ApiConfigProvider: React.FC<ApiConfigProviderProps> = ({
  children,
}) => {
  const [apiconfig, setApiconfig] = useState<ApiConfig>(() => {
    const storedConfig = localStorage.getItem('apiconfig');
    return storedConfig ? JSON.parse(storedConfig) : defaultApiConfig;
  });

  useEffect(() => {
    localStorage.setItem('apiconfig', JSON.stringify(apiconfig));
  }, [apiconfig]);

  const clearLocalStorage = () => {
    setApiconfig(defaultApiConfig);
    localStorage.removeItem('apiconfig');
  };

  return (
    <ApiConfigContext.Provider
      value={{ apiconfig, setApiconfig, clearLocalStorage }}
    >
      {children}
    </ApiConfigContext.Provider>
  );
};

export const useApiConfig = (): ApiConfigContextType => {
  const context = useContext(ApiConfigContext);
  if (!context) {
    throw new Error('useApiConfig must be used within an ApiConfigProvider');
  }
  return context;
};
