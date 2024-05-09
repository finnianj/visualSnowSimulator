import React, { useState } from 'react';
import Loading from '../components/Loading';

export const useLoading = () => {
    const [isLoading, setIsLoading] = useState(false);
    
    const Loading = () => {
        return <Loading />
    }

    return {
        isLoading,
        setIsLoading,
        Loading
    }
}