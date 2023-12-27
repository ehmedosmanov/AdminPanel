import React, { useContext, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { AuthContext } from '../../../components/context/GlobalContext'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'
const Update = () => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting, isSubmitted },
    reset
  } = useForm()
  const { token } = useContext(AuthContext)
  const { userId } = useParams()
  const navigate = useNavigate()
  const userDetail = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/api/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      const user = res.data
      setValue('username', user.user.username)
      setValue('password', '')
      setValue('email', user.user.email)
      setValue('role', user.user.role)
    } catch (error) {
      console.error('error user detail:', error.response?.data.message)
    }
  }
  useEffect(() => {
    userDetail()
  }, [])

  const onSubmit = async data => {
    try {
      const res = await axios.put(
        `http://localhost:8000/api/user/${userId}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      console.log('form data', data)
      console.log('user UPDATED', res.data)
      navigate('/admin')
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
      <h1>Update</h1>
    </div>
  )
}

export default Update
