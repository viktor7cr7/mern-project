import React from 'react'
import { Link, Form, redirect, useNavigation } from 'react-router-dom'
import Wrapper from '../assets/wrappers/RegisterAndLoginPage'
import { FormRow, Logo } from '../components'
import customFetch from '../utils/customFetch'
import {toast} from 'react-toastify'

export const action = async({request}) => {
  const formData = await request.formData()
  const data = Object.fromEntries(formData)
  try {
    await customFetch.post('/auth/register', data)
    toast.success('Registartion successful')
    return redirect('/login')
  } catch (error) {
    toast.error(error?.response?.data?.msg)
    return error
  }

}

const Register = () => {
  const navigation = useNavigation()
  const isSubmitting = navigation.state === 'submitting'
  return (
    <Wrapper>
        <Form method='post' className='form'>
            <Logo></Logo>
            <h4>Register</h4>
            <FormRow type='text' name='name'></FormRow>
            <FormRow type='text' name='lastName'></FormRow>
            <FormRow type='text' name='location'></FormRow>
            <FormRow type='email' name='email'></FormRow>
            <FormRow type='password' name='password'></FormRow>
            <button type='sumbit' className='btn btn-block' disabled={isSubmitting}>
              {isSubmitting ? 'submitting' : 'submit'}
            </button>
            <p>Already a member ? <Link to='/login' className='member-btn'>Login</Link></p>
        </Form>
    </Wrapper>
  )
}

export default Register