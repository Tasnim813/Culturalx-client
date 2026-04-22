import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../hook/useAuth';
import { Link, useLocation, useNavigate } from 'react-router';
import { saveOrUpdateUser } from '../../Utils';
import { motion } from 'framer-motion';
import Swal from 'sweetalert2';

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { SignInUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogin = async (data) => {
    try {
      const result = await SignInUser(data.email, data.password)
      const user = result.user

      await saveOrUpdateUser({
        name: user.displayName || "No Name",
        email: user.email,
        image: user.photoURL || "",
      })

      // ✅ SweetAlert success
      Swal.fire({
        icon: 'success',
        title: 'Login Successful 🎉',
        text: 'Welcome back to CulturalX!',
        confirmButtonColor: '#0F3D2E'
      })

      navigate(location?.state || '/')

    } catch (error) {
      console.log(error)

      // ❌ optional error alert
      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: 'Please check email or password',
        confirmButtonColor: '#145A32'
      })
    }
  }

  return (
    <div className='pt-30 pb-30 bg-[#F6FDF9] min-h-screen'>

      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className='text-center text-[#0F3D2E] text-4xl font-bold mb-3'
      >
        Login Now
      </motion.h1>

      <div className='flex justify-center mx-auto items-center'>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="card bg-white w-full max-w-sm shrink-0 shadow-2xl border-t-4 border-[#0F3D2E]"
        >

          <form onSubmit={handleSubmit(handleLogin)} className="card-body">

            <fieldset className="fieldset">

              <label className="label text-[#0F3D2E]">Email</label>
              <input
                type="email"
                {...register('email', { required: true })}
                className="input input-bordered focus:ring-2 focus:ring-[#145A32]"
                placeholder="Email"
              />
              {errors.email?.type === 'required' && (
                <p className='text-red-500'>Email is required</p>
              )}

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
                <p className='text-red-500'>Password must be 6 characters or longer</p>
              )}

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn mt-4 w-full bg-[#0F3D2E] hover:bg-[#145A32] text-white border-none"
              >
                Login
              </motion.button>

              <p className='text-center mt-2 text-gray-600'>
                New to CulturalX?{" "}
                <Link
                  state={location.state}
                  to='/register'
                  className='text-[#145A32] font-semibold'
                >
                  Register
                </Link>
              </p>

            </fieldset>

          </form>

        </motion.div>

      </div>
    </div>
  );
};

export default Login;