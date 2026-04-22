import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid
} from 'recharts';

const Static = () => {

    const [stats, setStats] = useState({
        totalEvents: 0,
        totalBookings: 0,
        totalUsers: 0
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/stats`);
                setStats(res.data);
                setLoading(false);
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    if (loading) {
        return (
            <div className="text-center py-10 text-xl text-[#0F3D2E]">
                Loading dashboard...
            </div>
        );
    }

    const data = [
        { name: 'Events', value: stats.totalEvents },
        { name: 'Bookings', value: stats.totalBookings },
        { name: 'Users', value: stats.totalUsers },
    ];

    const COLORS = ['#0F3D2E', '#145A32', '#1B5E20'];

    return (
        <div className="p-6">

            {/* Title */}
            <h1 className="text-3xl font-bold text-center mb-10 text-[#0F3D2E]">
                Dashboard Overview
            </h1>

            {/* Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

                <div className="bg-white shadow-lg rounded-xl p-6 text-center border border-[#E5E7EB]">
                    <h2 className="text-gray-600">Total Events</h2>
                    <p className="text-4xl font-bold text-[#0F3D2E]">
                        {stats.totalEvents}
                    </p>
                </div>

                <div className="bg-white shadow-lg rounded-xl p-6 text-center border border-[#E5E7EB]">
                    <h2 className="text-gray-600">Total Bookings</h2>
                    <p className="text-4xl font-bold text-[#145A32]">
                        {stats.totalBookings}
                    </p>
                </div>

                <div className="bg-white shadow-lg rounded-xl p-6 text-center border border-[#E5E7EB]">
                    <h2 className="text-gray-600">Total Users</h2>
                    <p className="text-4xl font-bold text-[#1B5E20]">
                        {stats.totalUsers}
                    </p>
                </div>

            </div>

            {/* PIE + BAR */}
            <div className="grid md:grid-cols-2 gap-6">

                {/* PIE CHART */}
                <div className="bg-white shadow-lg rounded-xl p-6">
                    <h2 className="text-center text-xl font-bold mb-4 text-[#0F3D2E]">
                        Overview Chart
                    </h2>

                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={data}
                                dataKey="value"
                                nameKey="name"
                                outerRadius={110}
                                label
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                {/* BAR CHART */}
                <div className="bg-white shadow-lg rounded-xl p-6">
                    <h2 className="text-center text-xl font-bold mb-4 text-[#0F3D2E]">
                        Growth Graph
                    </h2>

                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />

                            <Bar dataKey="value" fill="#0F3D2E" radius={[6, 6, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

            </div>

        </div>
    );
};

export default Static;