import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../hook/useAuth';
import axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router';

const Register = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const {registerUser,updateUserProfile}=useAuth()
  const location=useLocation()
  const navigate=useNavigate()
  const handleRegister = (data) => {
    console.log(data.photo[0]);
    const profileImag=data.photo[0];
    registerUser(data.email,data.password)
    .then(result=>{
      console.log(result.user)
      // store the image some and get the photo url
      const formData=new FormData()
      formData.append('image',profileImag)
      const Image_API_URL=`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_Image_host}`
    axios.post(Image_API_URL,formData)
    .then(res=>{
      console.log('After image upload',res.data.data.url)

      // update user profile
      const userProfile={
        displayName:data.name,
        photoURL:res.data.data.url,
         
      }
      updateUserProfile(userProfile)
      .then(()=>{
        console.log('user profile updated done')
        navigate(location.state || '/')
      })
      .catch(error=>{
        console.log(error)
      })
    })
      
    })
    .catch(error=>{
      console.log(error)
    })
  };
  

  return (
    <div className='pt-30 pb-30 bg-[#F9FAFB] min-h-screen'>

      <h1 className='text-center text-[#1E3A8A] text-4xl font-bold mb-3'>Register Now</h1>

      <div className='flex justify-center mx-auto items-center'>

        <div className="card bg-white w-full max-w-sm shrink-0 shadow-2xl border-t-4 border-[#1E3A8A]">

          <form onSubmit={handleSubmit(handleRegister)} className="card-body">

            <fieldset className="fieldset">

              {/* Name */}
              <label className="label text-[#1E3A8A]">Name</label>
              <input type="text" {...register('name', { required: true })} className="input input-bordered" placeholder="Name" />
              {errors.name?.type === 'required' && <p className='text-red-500'>Name is required</p>}

              {/* photo and image*/}
              <label className="label text-[#1E3A8A]">Photo</label>
        
              <input type="file" {...register('photo', { required: true })} className="file-input" placeholder="Your photo" />
              {errors.photo?.type === 'required' && <p className='text-red-500'>Photo is required</p>}
              {/* Email */}
              <label className="label text-[#1E3A8A]">Email</label>
              <input type="email" {...register('email', { required: true })} className="input input-bordered" placeholder="Email" />
              {errors.email?.type === 'required' && <p className='text-red-500'>Email is required</p>}

              {/* Password */}
              <label className="label text-[#1E3A8A]">Password</label>
              <input type="password" {...register('password', { required: true, minLength: 6 })} className="input input-bordered" placeholder="Password" />
              {errors.password?.type === 'required' && <p className='text-red-500'>Password is required</p>}
              {errors.password?.type === 'minLength' && <p className='text-red-500'>Password is must 6 character or longer</p>}

              {/* Phone */}
              <label className="label text-[#1E3A8A]">Phone</label>
              <input type="number" {...register('phone', { required: true, minLength: 11 })} className="input input-bordered" placeholder="Phone Number" />
              {errors.phone?.type === 'required' && <p className='text-red-500'>Phone Number is required</p>}
              {errors.phone?.type === 'minLength' && <p className='text-red-500'>Phone Number must be 11 Character</p>}

              {/* Address */}
              <label className="label text-[#1E3A8A]">Address</label>
              <input type="text" {...register('address', { required: true })} className="input input-bordered" placeholder="Address" />
              {errors.address?.type === 'required' && <p className='text-red-500'>Address is required</p>}

              {/* Button */}
              <button className="btn btn-neutral mt-4 w-full bg-[#1E3A8A] hover:bg-[#152c6b] text-white border-none">
                Register
              </button>

 <p>Already have an account <Link state={location.state} to='/login' > Login
                
              </Link></p>
            </fieldset>

          </form>
          
        </div>

      </div>
    </div>
  );
};

export default Register;