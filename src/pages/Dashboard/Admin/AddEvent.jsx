import React from 'react';
import { useForm } from 'react-hook-form';
import { UploadImage } from '../../../Utils';
import useAuth from '../../../hook/useAuth';
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import Swal from 'sweetalert2';

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
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Event Added Successfully 🎉',
        confirmButtonColor: '#0F3D2E',
      });
      reset();
    },

    onError: () => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Failed to add event ❌',
        confirmButtonColor: '#0F3D2E',
      });
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

      Swal.fire({
        icon: 'error',
        title: 'Upload Failed',
        text: 'Image upload failed ❌',
        confirmButtonColor: '#0F3D2E',
      });
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-md mt-10 border border-gray-200">

      <h2 className="text-2xl font-bold mb-6 text-center text-[#0F3D2E]">
        Add New Event
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

        {/* Event Name */}
        <div>
          <label className="block mb-1 font-medium text-[#0F3D2E]">Event Name</label>
          <input
            type="text"
            {...register('name', { required: 'Event name is required' })}
            className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-[#145A32]"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>

        {/* Date */}
        <div>
          <label className="block mb-1 font-medium text-[#0F3D2E]">Event Date</label>
          <input
            type="date"
            {...register('date', { required: 'Date is required' })}
            className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-[#145A32]"
          />
          {errors.date && <p className="text-red-500 text-sm">{errors.date.message}</p>}
        </div>

        {/* Time */}
        <div className="flex gap-4">
          <div className="w-full">
            <label className="block mb-1 font-medium text-[#0F3D2E]">Start Time</label>
            <input
              type="time"
              {...register('startTime', { required: 'Start time required' })}
              className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-[#145A32]"
            />
            {errors.startTime && <p className="text-red-500 text-sm">{errors.startTime.message}</p>}
          </div>

          <div className="w-full">
            <label className="block mb-1 font-medium text-[#0F3D2E]">End Time</label>
            <input
              type="time"
              {...register('endTime', { required: 'End time required' })}
              className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-[#145A32]"
            />
            {errors.endTime && <p className="text-red-500 text-sm">{errors.endTime.message}</p>}
          </div>
        </div>

        {/* Category */}
        <div>
          <label className="block mb-1 font-medium text-[#0F3D2E]">Category</label>
          <select
            {...register('category', { required: 'Category is required' })}
            className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-[#145A32]"
          >
            <option value="">Select Category</option>
            <option value="Cultural">Cultural</option>
            <option value="Music">Music</option>
            <option value="Food">Food</option>
          </select>
          {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}
        </div>

        {/* Price */}
        <div>
          <label className="block mb-1 font-medium text-[#0F3D2E]">Price</label>
          <input
            type="number"
            {...register('price', { required: 'Price required', min: 0 })}
            className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-[#145A32]"
          />
          {errors.price && <p className="text-red-500 text-sm">Enter valid price</p>}
        </div>

        {/* Capacity */}
        <div>
          <label className="block mb-1 font-medium text-[#0F3D2E]">Capacity</label>
          <input
            type="number"
            {...register('capacity', { required: 'Capacity required', min: 1 })}
            className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-[#145A32]"
          />
          {errors.capacity && <p className="text-red-500 text-sm">Enter valid capacity</p>}
        </div>

        {/* Location */}
        <div>
          <label className="block mb-1 font-medium text-[#0F3D2E]">Location</label>
          <input
            type="text"
            {...register('location', { required: 'Location required' })}
            className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-[#145A32]"
          />
          {errors.location && <p className="text-red-500 text-sm">{errors.location.message}</p>}
        </div>

        {/* Description */}
        <div>
          <label className="block mb-1 font-medium text-[#0F3D2E]">Description</label>
          <textarea
            {...register('description', { required: 'Description required' })}
            className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-[#145A32]"
          />
          {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
        </div>

        {/* Image */}
        <div>
          <label className="block mb-1 font-medium text-[#0F3D2E]">Upload Image</label>
          <input
            type="file"
            {...register('image', { required: 'Image required' })}
            className="w-full border p-3 rounded-lg"
          />
          {errors.image && <p className="text-red-500 text-sm">{errors.image.message}</p>}
        </div>

        {/* Button */}
        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-[#0F3D2E] text-white py-3 rounded-lg hover:bg-[#145A32] transition"
        >
          {isPending ? 'Uploading...' : 'Add Event'}
        </button>

      </form>
    </div>
  );
};

export default AddEvent;