import React from 'react';
import { useForm } from 'react-hook-form';
import { UploadImage } from '../../../Utils';
import useAuth from '../../../hook/useAuth';
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

const AddEvent = () => {
  const { user } = useAuth();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // ✅ mutation setup
  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (payload) =>
      await axios.post(`${import.meta.env.VITE_API_URL}/events`, payload),

    onSuccess: () => {
      toast.success('Event Added Successfully 🎉');
      reset();
    },

    onError: () => {
      toast.error('Failed to add event ❌');
    },
  });

  // ✅ submit handler
  const onSubmit = async (data) => {
    try {
      const imageFile = data.image[0];
      const imageUrl = await UploadImage(imageFile);

      const eventData = {
        name: data.name,
        date: data.date,
        startTime: data.startTime,
        endTime: data.endTime,
        category: data.category,
        price: parseFloat(data.price),
        capacity: parseInt(data.capacity),
        location: data.location,
        description: data.description,
        image: imageUrl,
        status: 'upcoming',
        createdAt: new Date(),
        seller: {
          image: user?.photoURL,
          name: user?.displayName,
          email: user?.email,
        },
      };

      await mutateAsync(eventData);
    } catch (err) {
      console.error(err);
      toast.error('Image upload failed ❌');
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-md mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center">Add New Event</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

        {/* Event Name */}
        <div>
          <label className="block mb-1 font-medium">Event Name</label>
          <input
            type="text"
            {...register('name', { required: 'Event name is required' })}
            className="w-full border p-3 rounded-lg"
          />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        </div>

        {/* Date */}
        <div>
          <label className="block mb-1 font-medium">Event Date</label>
          <input
            type="date"
            {...register('date', { required: 'Date is required' })}
            className="w-full border p-3 rounded-lg"
          />
        </div>

        {/* Time */}
        <div className="flex gap-4">
          <input
            type="time"
            {...register('startTime', { required: true })}
            className="w-full border p-3 rounded-lg"
          />
          <input
            type="time"
            {...register('endTime', { required: true })}
            className="w-full border p-3 rounded-lg"
          />
        </div>

        {/* Category */}
        <select
          {...register('category', { required: true })}
          className="w-full border p-3 rounded-lg"
        >
          <option value="">Select Category</option>
          <option value="Cultural">Cultural</option>
          <option value="Music">Music</option>
          <option value="Food">Food</option>
        </select>

        {/* Price */}
        <input
          type="number"
          {...register('price', { required: true, min: 0 })}
          placeholder="Price"
          className="w-full border p-3 rounded-lg"
        />

        {/* Capacity */}
        <input
          type="number"
          {...register('capacity', { required: true, min: 1 })}
          placeholder="Total seats"
          className="w-full border p-3 rounded-lg"
        />

        {/* Location */}
        <input
          type="text"
          {...register('location', { required: true })}
          placeholder="Location"
          className="w-full border p-3 rounded-lg"
        />

        {/* Description */}
        <textarea
          {...register('description', { required: true })}
          placeholder="Event details"
          className="w-full border p-3 rounded-lg"
        />

        {/* Image */}
        <input
          type="file"
          {...register('image', { required: true })}
          className="w-full border p-3 rounded-lg"
        />

        {/* Button */}
        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-green-500 text-white py-3 rounded-lg"
        >
          {isPending ? 'Uploading...' : 'Add Event'}
        </button>

      </form>
    </div>
  );
};

export default AddEvent;