import React, { useState } from 'react';
import { useParams } from 'react-router'; 
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { FaLocationDot, FaRegClock, FaCalendarDays } from "react-icons/fa6";
import Loading from '../../Loading/loading';
import PurchaseOrder from '../../../Component/Dashboard/Menu/PurchaseOrder';

const EventDetail = () => {
    const { id } = useParams();
    const [isOpen, setIsOpen] = useState(false);

    const { data: event = {}, isLoading, isError } = useQuery({
        queryKey: ['event', id],
        queryFn: async () => {
            if (!id) return {};
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/events/${id}`);
            return res.data;
        },
        enabled: !!id,
    });

    if (isLoading) return <Loading />;
    if (isError) return <div className="text-center py-20 text-red-500">Failed to load event!</div>;

    const { 
        name, image, date, startTime, endTime, category, 
        price, location, description, seller 
    } = event;

    return (
        <div className="max-w-5xl mx-auto my-10 p-4">
            <div className="bg-white rounded-3xl shadow-sm overflow-hidden">

                {/* Image */}
                <div className="relative h-[400px]">
                    <img src={image} className="w-full h-full object-cover" />
                    <div className="absolute top-5 left-5 bg-green-500 text-white px-4 py-1 rounded-full">
                        {category}
                    </div>
                </div>

                <div className="p-8 grid lg:grid-cols-3 gap-10">

                    {/* Details */}
                    <div className="lg:col-span-2 space-y-6">
                        <h1 className="text-4xl font-bold">{name}</h1>
                        <p>{description}</p>

                        <div className="grid md:grid-cols-2 gap-4">
                            <p><FaCalendarDays /> {date}</p>
                            <p><FaRegClock /> {startTime} - {endTime}</p>
                            <p className="md:col-span-2"><FaLocationDot /> {location}</p>
                        </div>
                    </div>

                    {/* Booking Card */}
                    <div className="bg-gray-50 p-6 rounded-xl space-y-5">
                        <h2 className="text-2xl font-bold text-green-600">${price}</h2>

                        <button
                            onClick={() => setIsOpen(true)}
                            className="w-full bg-black text-white py-3 rounded-xl hover:bg-green-600"
                        >
                            Book Now
                        </button>

                        <div className="flex items-center gap-3">
                            <img src={seller?.image} className="w-10 h-10 rounded-full" />
                            <div>
                                <p>{seller?.name}</p>
                                <p className="text-sm text-gray-500">{seller?.email}</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* ✅ Modal */}
            <PurchaseOrder
                event={event}
                isOpen={isOpen}
                closeModal={() => setIsOpen(false)}
            />
        </div>
    );
};

export default EventDetail;