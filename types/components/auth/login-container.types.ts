export interface LoginContainerProps {
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
  value: string;
  onChangeText: React.Dispatch<React.SetStateAction<string>>;
}

export interface ApiError extends Error {
  response?: {
    data?: {
      message?: string;
    };
  };
}
