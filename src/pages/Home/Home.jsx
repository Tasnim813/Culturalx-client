import React from 'react';
import Banner from './Banner';
 // Tomar banano EventCard component
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Card from './Card';
import Loading from '../Loading/loading';
import { Link } from 'react-router';

const Home = () => {
    // ✅ Event fetch korar jonno useQuery
    const { data: events = [], isLoading, isError } = useQuery({
        queryKey: ['home-events'],
        queryFn: async () => {
            // Backend theke data niye asha
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/events`);
            // Jodi shudhu top 6 ta event dekhate chao, tahole backend theke limit kora bhalo
            return res.data;
        },
    });

    if (isLoading) return <Loading/>;
    if (isError) return <div className="text-center py-10 text-red-500">Failed to load events!</div>;

    return (
        <div>
            {/* 1. Banner Section */}
            <Banner />

            {/* 2. Events Section */}
           
                <div className="my-16">
                   <h2 className="text-4xl font-extrabold mb-4 text-center text-[#0F3D2E]">
  Upcoming Popular Events here
</h2>

<p className="mb-10 text-gray-600 text-center max-w-2xl mx-auto">
  Discover the best cultural, musical, and food events happening around you. 
  Book your tickets now and create unforgettable memories!
</p>

                    {/* ✅ Grid Layout for Event Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-auto max-w-7xl gap-8">
                        {
                            events.slice(0, 6).map((event) => (
                                <Card
                                    key={event._id}
                                    event={event}
                                />
                            ))
                        }
                    </div>

                    {/* "See All" Button (Optional) */}
                    <div className="text-center mt-12">
                        <Link to='/library' className="px-8 py-3 bg-gray-900 text-white rounded-full font-bold hover:bg-green-600 transition-all shadow-md">
                            Explore All Events
                        </Link>
                    </div>
                </div>
            

            {/* Tumi chhaile eikhane Review ba HowItWorks component add korte paro */}
        </div>
    );
};

export default Home;