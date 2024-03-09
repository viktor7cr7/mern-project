import React from 'react'
import { Link, useNavigate, Form , redirect} from 'react-router-dom'
import { FormRow, Logo } from '../components'
import Wrapper from '../assets/wrappers/RegisterAndLoginPage'
import {toast} from 'react-toastify'
import customFetch from '../utils/customFetch'

export const action = async({request}) => {
    console.log(request)
    const formData = await request.formData()
    const data = Object.fromEntries(formData)
    try {
      await customFetch.post('/auth/login', data)
      toast.success('login successful')
      return redirect('/dashboard')
    } catch (error) {
      toast.error(error?.response?.data?.msg)
      return error
    }
  
  }

const Login = () => {
    const navigation = useNavigate()
    const isSubmitting = navigation.state === 'submitting'

    const loginDemoUser = async () => {
      const data = {
        email: 'test@test.com',
        password: 'secret123'
      }

      try {
        await customFetch.post('/auth/login', data)
        toast.success('Take a test drive')
        navigation('/dashboard')
      } catch (error) {
        toast.error(error?.response?.data?.msg)
      }
    }
    return (
        <Wrapper>
            <Form method='post' className='form'>
                <Logo></Logo>
                <h4>login</h4>
                <FormRow type='email' name='email'></FormRow>
                <FormRow type='password' name='password'></FormRow>
                <button type='submit' disabled={isSubmitting} className='btn btn-block'>
                    {isSubmitting ? 'sumbitting..' : 'submit'}
                </button>
                <button type='button' className='btn btn-block' onClick={loginDemoUser}>explore the app</button>
                <p>Not a member yet?<Link to='/register' className='member-btn'>Register</Link></p>
            </Form>
        </Wrapper>
      )
}

export default Login