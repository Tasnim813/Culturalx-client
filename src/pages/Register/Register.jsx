import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../hook/useAuth';
import { Link, useLocation, useNavigate } from 'react-router';
import { UploadImage } from '../../Utils';


const Register = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { registerUser, updateUserProfile } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleRegister = async (data) => {
    try {
      // 1. get image
      const profileImage = data.image[0];

      // 2. create user
      const result = await registerUser(data.email, data.password);
      console.log(result.user);

      // 3. upload image
      const imageUrl = await UploadImage(profileImage);
      console.log('Image URL:', imageUrl);

      // 4. update profile
      const userProfile = {
        displayName: data.name,
        photoURL: imageUrl,
      };

      await updateUserProfile(userProfile);

      console.log('Profile updated');

      // 5. redirect
      navigate(location.state || '/');

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='pt-30 pb-30 bg-[#F9FAFB] min-h-screen'>

      <h1 className='text-center text-[#1E3A8A] text-4xl font-bold mb-3'>
        Register Now
      </h1>

      <div className='flex justify-center mx-auto items-center'>

        <div className="card bg-white w-full max-w-sm shadow-2xl border-t-4 border-[#1E3A8A]">

          <form onSubmit={handleSubmit(handleRegister)} className="card-body">

            <fieldset className="fieldset">

              {/* Name */}
              <label className="label text-[#1E3A8A]">Name</label>
              <input
                type="text"
                {...register('name', { required: true })}
                className="input input-bordered"
                placeholder="Name"
              />
              {errors.name && <p className='text-red-500'>Name is required</p>}

              {/* Image */}
              <label className="label text-[#1E3A8A]">Photo</label>
              <input
                type="file"
                {...register('image', { required: true })}
                className="file-input"
              />
              {errors.image && <p className='text-red-500'>Photo is required</p>}

              {/* Email */}
              <label className="label text-[#1E3A8A]">Email</label>
              <input
                type="email"
                {...register('email', { required: true })}
                className="input input-bordered"
                placeholder="Email"
              />
              {errors.email && <p className='text-red-500'>Email is required</p>}

              {/* Password */}
              <label className="label text-[#1E3A8A]">Password</label>
              <input
                type="password"
                {...register('password', { required: true, minLength: 6 })}
                className="input input-bordered"
                placeholder="Password"
              />
              {errors.password?.type === 'required' && (
                <p className='text-red-500'>Password is required</p>
              )}
              {errors.password?.type === 'minLength' && (
                <p className='text-red-500'>Minimum 6 characters</p>
              )}

              {/* Phone */}
              <label className="label text-[#1E3A8A]">Phone</label>
              <input
                type="number"
                {...register('phone', { required: true, minLength: 11 })}
                className="input input-bordered"
                placeholder="Phone Number"
              />
              {errors.phone?.type === 'required' && (
                <p className='text-red-500'>Phone is required</p>
              )}

              {/* Address */}
              <label className="label text-[#1E3A8A]">Address</label>
              <input
                type="text"
                {...register('address', { required: true })}
                className="input input-bordered"
                placeholder="Address"
              />
              {errors.address && (
                <p className='text-red-500'>Address is required</p>
              )}

              {/* Button */}
              <button className="btn mt-4 w-full bg-[#1E3A8A] text-white border-none">
                Register
              </button>

              <p className='text-center mt-2'>
                Already have an account?{" "}
                <Link state={location.state} to='/login' className='text-blue-600'>
                  Login
                </Link>
              </p>

            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;