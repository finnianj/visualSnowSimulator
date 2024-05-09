import { useState } from 'react';
import Loading from '../components/modals/Loading';

export const useLoading = () => {
    const [isLoading, setIsLoading] = useState(false);
    
    const LoadingModal = () => {
        if (!isLoading) return null;
        return <Loading />
    }

    return {
        isLoading,
        setIsLoading,
        LoadingModal
    }
}