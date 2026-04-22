import React from 'react';
import Card from './Card';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
const Event = () => {
    // ✅ useQuery use kore data fetch
  const { data: events = [], isLoading, isError, error } = useQuery({
    queryKey: ['events'],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/events`);
      return res.data;
    },

  });
  console.log(events)

  // Loading state handling
  if (isLoading) {
    return <div className="text-center py-10 text-2xl">Loading Events...</div>;
  }

  // Error state handling
  if (isError) {
    return <div className="text-center py-10 text-red-500">Error: {error.message}</div>;
  }
    return (
        <div>
    {
        events && events.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {
                    events.map(event => (
                        <Card key={event._id} event={event} />
                    ))
                }
            </div>
        ) : (
            <div className="text-center py-10">
                <p className="text-gray-500 text-xl">No events available at the moment.</p>
            </div>
        )
    }
</div>
    );
};

export default Event;