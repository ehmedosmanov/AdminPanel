import React, { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { AuthContext } from '../context/GlobalContext'

const Login = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting, isSubmitted },
    reset
  } = useForm()

  const { login } = useContext(AuthContext)

  const onSubmit = async data => {
    try {
      await login(data)
      console.log(data)
      reset()
    } catch (error) {
      console.error('Registration failed:', error)
    }
  }
  return (
    <div className='register'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='input-box'>
          <label htmlFor=''>Usename</label>
          <input {...register('username')} type='text' />
        </div>
        <div className='input-box'>
          <label htmlFor=''>Password</label>
          <input {...register('password')} type='password' />
        </div>
        <div className='input-box'>
          <label htmlFor=''>Email</label>
          <input {...register('email')} type='email' />
        </div>
        <button type='submit'>Submit</button>
      </form>
      <h1>LOGIN</h1>
    </div>
  )
}

export default Login
