import React, { useState, useEffect } from 'react';
import { serverCalls } from '../api';

export const useGetData = () => {
    const [marvelData, setData] = useState<any>([]);

    async function handleDataFetch(){
        const result = await serverCalls.get();
        console.log(result)
        setData(result)
    }

    // Introducing the useEffect Hook to add our data to react State
    useEffect( () => {
        handleDataFetch();
    }, [])

    return {marvelData, getData:handleDataFetch}
}