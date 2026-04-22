import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../hook/useAuth';
import { Link, useLocation, useNavigate } from 'react-router';
import { saveOrUpdateUser, UploadImage } from '../../Utils';
import { motion } from 'framer-motion';
import Swal from 'sweetalert2';

const Register = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { registerUser, updateUserProfile } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleRegister = async (data) => {
    try {
      const profileImage = data.image[0];

      const result = await registerUser(data.email, data.password);
      console.log(result.user);

      const imageUrl = await UploadImage(profileImage);

      await saveOrUpdateUser({
        name: data.name,
        email: data.email,
        image: imageUrl,
      });

      const userProfile = {
        displayName: data.name,
        photoURL: imageUrl,
      };

      await updateUserProfile(userProfile);

      // 🎉 Success SweetAlert
      Swal.fire({
        icon: 'success',
        title: 'Registration Successful 🎉',
        text: 'Welcome to CulturalX!',
        confirmButtonColor: '#0F3D2E'
      });

      navigate(location.state || '/');

    } catch (error) {
      console.log(error);

      // ❌ Error SweetAlert
      Swal.fire({
        icon: 'error',
        title: 'Registration Failed',
        text: error?.message || 'Something went wrong!',
        confirmButtonColor: '#145A32'
      });
    }
  };

  return (
    <div className='pt-30 pb-30 bg-[#F6FDF9] min-h-screen'>

      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className='text-center text-[#0F3D2E] text-4xl font-bold mb-3'
      >
        Register Now
      </motion.h1>

      <div className='flex justify-center mx-auto items-center'>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="card bg-white w-full max-w-sm shadow-2xl border-t-4 border-[#0F3D2E]"
        >

          <form onSubmit={handleSubmit(handleRegister)} className="card-body">

            <fieldset className="fieldset">

              <label className="label text-[#0F3D2E]">Name</label>
              <input
                type="text"
                {...register('name', { required: true })}
                className="input input-bordered focus:ring-2 focus:ring-[#145A32]"
                placeholder="Name"
              />
              {errors.name && <p className='text-red-500'>Name is required</p>}

              <label className="label text-[#0F3D2E]">Photo</label>
              <input
                type="file"
                {...register('image', { required: true })}
                className="file-input border-[#0F3D2E]"
              />
              {errors.image && <p className='text-red-500'>Photo is required</p>}

              <label className="label text-[#0F3D2E]">Email</label>
              <input
                type="email"
                {...register('email', { required: true })}
                className="input input-bordered focus:ring-2 focus:ring-[#145A32]"
                placeholder="Email"
              />
              {errors.email && <p className='text-red-500'>Email is required</p>}

              <label className="label text-[#0F3D2E]">Password</label>
              <input
                type="password"
                {...register('password', { required: true, minLength: 6 })}
                className="input input-bordered focus:ring-2 focus:ring-[#145A32]"
                placeholder="Password"
              />
              {errors.password?.type === 'required' && (
                <p className='text-red-500'>Password is required</p>
              )}
              {errors.password?.type === 'minLength' && (
                <p className='text-red-500'>Minimum 6 characters</p>
              )}

              <label className="label text-[#0F3D2E]">Phone</label>
              <input
                type="number"
                {...register('phone', { required: true, minLength: 11 })}
                className="input input-bordered focus:ring-2 focus:ring-[#145A32]"
                placeholder="Phone Number"
              />
              {errors.phone?.type === 'required' && (
                <p className='text-red-500'>Phone is required</p>
              )}

              <label className="label text-[#0F3D2E]">Address</label>
              <input
                type="text"
                {...register('address', { required: true })}
                className="input input-bordered focus:ring-2 focus:ring-[#145A32]"
                placeholder="Address"
              />
              {errors.address && (
                <p className='text-red-500'>Address is required</p>
              )}

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn mt-4 w-full bg-[#0F3D2E] hover:bg-[#145A32] text-white border-none"
              >
                Register
              </motion.button>

              <p className='text-center mt-2 text-gray-600'>
                Already have an account?{" "}
                <Link
                  state={location.state}
                  to='/login'
                  className='text-[#145A32] font-semibold'
                >
                  Login
                </Link>
              </p>

            </fieldset>
          </form>

        </motion.div>

      </div>
    </div>
  );
};

export default Register;