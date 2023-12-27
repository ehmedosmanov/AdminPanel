import React, { useContext } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { AuthContext } from '../context/GlobalContext'

const Register = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting, isSubmitted },
    reset
  } = useForm()
  const authContext = useContext(AuthContext)

  const onSubmit = async data => {
    try {
      await authContext.register(data)
      console.log(data)
      reset()
    } catch (error) {
      console.error('Registration failed:', error)
    }
  }
  return (
    <div className='register'>
      <form action='' onSubmit={handleSubmit(onSubmit)}>
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
        <button type='submit'>
          {isSubmitting ? 'Sending...' : 'Create Account'}
        </button>
      </form>
      <h1>REGISTER</h1>
    </div>
  )
}

export default Register
