import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../hook/useAuth';
import { Link, useLocation, useNavigate } from 'react-router';
import { saveOrUpdateUser } from '../../Utils';

const Login = () => {
  const {register,handleSubmit,formState:{errors}}=useForm()
  const {SignInUser }=useAuth()
  const location=useLocation()
  const navigate=useNavigate()
  // const handleLogin=(data)=>{
  //   console.log(data)
  // const user= await  SignInUser(data.email,data.password)

  //       await saveOrUpdateUser({
  //     name: data.name,
  //     email: data.email,
  //     image: imageUrl,
     
  //   })
    
  //   .then(result=>{
  //     console.log(result.user)
  //     navigate(location?.state || '/') 
  //   })
    
  //   .catch(error=>{
  //     console.log(error)
  //   })
  // }
  const handleLogin = async (data) => {
  try {
    console.log(data)

    const result = await SignInUser(data.email, data.password)
    const user = result.user

    // ✅ DB update (login time)
    await saveOrUpdateUser({
      name: user.displayName || "No Name",
      email: user.email,
      image: user.photoURL || "",
    })

    console.log(user)

    navigate(location?.state || '/')

  } catch (error) {
    console.log(error)
  }
}
    return (
        <div className='pt-30 pb-30 bg-[#F9FAFB] min-h-screen'>

      <h1 className='text-center text-[#1E3A8A] text-4xl font-bold mb-3'>Login Now</h1>

      <div className='flex justify-center mx-auto items-center'>

        <div className="card bg-white w-full max-w-sm shrink-0 shadow-2xl border-t-4 border-[#1E3A8A]">

          <form onSubmit={handleSubmit(handleLogin)} className="card-body">

            <fieldset className="fieldset">

             
              {/* Email */}
              <label className="label text-[#1E3A8A]">Email</label>
              <input type="email" {...register('email', { required: true })} className="input input-bordered" placeholder="Email" />
              {errors.email?.type === 'required' && <p className='text-red-500'>Email is required</p>}

              {/* Password */}
              <label className="label text-[#1E3A8A]">Password</label>
              <input type="password" {...register('password', { required: true, minLength: 6 })} className="input input-bordered" placeholder="Password" />
              {errors.password?.type === 'required' && <p className='text-red-500'>Password is required</p>}
              {errors.password?.type === 'minLength' && <p className='text-red-500'>Password is must 6 character or longer</p>}

              
              {/* Button */}
              <button className="btn btn-neutral mt-4 w-full bg-[#1E3A8A] hover:bg-[#152c6b] text-white border-none">
                Login
              </button>
              <p>New to librtain <Link state={location.state} to='/register' > Register
                
              </Link></p>

            </fieldset>

          </form>
          
        </div>

      </div>
    </div>
    );
};

export default Login;