import React, { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { AuthContext } from '../../../components/context/GlobalContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const CreateProduct = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting, isSubmitted },
    reset
  } = useForm()
  const { token } = useContext(AuthContext)
  const navigate = useNavigate()
  const onSubmit = async data => {
    try {
      const res = await axios.post('http://localhost:8000/api/product', data, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      console.log('form data', data)
      console.log('product created', res.data)
      navigate('/admin/products')
      reset()
    } catch (error) {
      console.error('Error creating user:', error.response?.data.message)
    }
  }

  return (
    <div className='register'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='input-box'>
          <label htmlFor=''>Name</label>
          <input {...register('name')} type='text' />
        </div>
        <div className='input-box'>
          <label htmlFor=''>Price</label>
          <input {...register('price')} type='number' />
        </div>
        <button type='submit'>Submit</button>
      </form>
      <h1>Create</h1>
    </div>
  )
}

export default CreateProduct
