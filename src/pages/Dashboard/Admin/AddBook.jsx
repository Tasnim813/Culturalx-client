import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { UploadImage } from '../../../Utils';
// 👉 path adjust korbi

const AddBook = () => {
  const { register, handleSubmit, reset } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      // 👉 image file ta dhor
      const imageFile = data.image[0];

      // 👉 imgbb te upload
      const imageUrl = await UploadImage (imageFile);

      // 👉 final book data
      const bookData = {
        title: data.title,
        author: data.author,
        category: data.category,
        price: parseFloat(data.price),
        stock: parseInt(data.stock),
        image: imageUrl,
      };

      console.log(bookData);

      // 👉 backend e send korbi
      // await fetch('/api/books', {
      //   method: 'POST',
      //   headers: { 'content-type': 'application/json' },
      //   body: JSON.stringify(bookData)
      // });

      alert('Book Added Successfully ✅');
      reset();

    } catch (err) {
      console.error(err);
      alert('Image upload failed ❌');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-md mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center">Add New Book</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

        {/* Title */}
        <input
          type="text"
          {...register("title", { required: true })}
          placeholder="Book Title"
          className="w-full border p-3 rounded-lg"
        />

        {/* Author */}
        <input
          type="text"
          {...register("author", { required: true })}
          placeholder="Author"
          className="w-full border p-3 rounded-lg"
        />

        {/* Category */}
        <select
          {...register("category", { required: true })}
          className="w-full border p-3 rounded-lg"
        >
          <option value="">Select Category</option>
          <option value="Novel">Novel</option>
          <option value="Science">Science</option>
          <option value="History">History</option>
          <option value="Technology">Technology</option>
        </select>

        {/* Price */}
        <input
          type="number"
          {...register("price", { required: true })}
          placeholder="Price Per Day"
          className="w-full border p-3 rounded-lg"
        />

        {/* Stock */}
        <input
          type="number"
          {...register("stock", { required: true })}
          placeholder="Stock"
          className="w-full border p-3 rounded-lg"
        />

        {/* Image Upload */}
        <input
          type="file"
          {...register("image", { required: true })}
          className="w-full border p-3 rounded-lg"
        />

        {/* Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white py-3 rounded-lg"
        >
          {loading ? 'Uploading...' : 'Add Book'}
        </button>

      </form>
    </div>
  );
};

export default AddBook;