import React, { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { AuthContext } from '../../../components/context/GlobalContext'
import axios from 'axios'
const Create = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting, isSubmitted },
    reset
  } = useForm()
  const { token } = useContext(AuthContext)

  const onSubmit = async data => {
    try {
      const res = await axios.post('http://localhost:8000/api/user', data, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      console.log('form data', data)
      console.log('user created', res.data)
      reset()
    } catch (error) {
      console.error('Error creating user:', error.response?.data.message)
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
        <div className='input-box'>
          <label htmlFor=''>Role:</label>
          <select name='' id='' {...register('role')}>
            <option value='user'>User</option>
            <option value='admin'>Admin</option>
          </select>
        </div>
        <button type='submit'>Submit</button>
      </form>
      <h1>Create</h1>
    </div>
  )
}

export default Create
