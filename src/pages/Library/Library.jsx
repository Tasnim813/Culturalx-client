import axios from 'axios';
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Loading from '../Loading/loading';
import Card from '../Home/Card';

const Library = () => {

    const [currentPage, setCurrentPage] = useState(1);
    const [searchText, setSearchText] = useState('');

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['events', currentPage, searchText],
        queryFn: async () => {
            const res = await axios.get(
                `${import.meta.env.VITE_API_URL}/events?page=${currentPage}&search=${searchText}`
            );
            return res.data;
        },
        keepPreviousData: true,
    });

    if (isLoading) return <Loading />;

    if (isError) {
        return (
            <div className="text-center py-10 text-red-500">
                Error: {error.message}
            </div>
        );
    }

    const events = Array.isArray(data) ? data : data?.events || [];

    return (
        <div className="p-4">

            {/* Title */}
            <h1 className="text-4xl font-extrabold mb-2 text-center text-[#0F3D2E]">
                All Events
            </h1>

            {/* Subtitle */}
            <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">
                Explore all cultural, musical, and community events in one place. 
                Discover, book, and enjoy unforgettable experiences with <span className="text-[#0F3D2E] font-semibold">CulturalX</span>.
            </p>

            {/* Events */}
            {events.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {events.map(event => (
                        <Card key={event._id} event={event} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-10">
                    <p className="text-gray-500 text-xl">
                        No events found.
                    </p>
                </div>
            )}

        </div>
    );
};

export default Library;