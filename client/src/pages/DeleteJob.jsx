import React from 'react'
import customFetch from '../utils/customFetch'
import { redirect } from 'react-router-dom'
import {toast} from 'react-toastify'

export const action = async({params}) => {
  try {
    await customFetch.delete(`/jobs/${params.id}`)
    toast.success('Job delete success')
  } catch (error) {
    toast.error(error?.response?.data?.msg) 
    return error
  }
  return redirect('/dashboard/all-jobs')
}