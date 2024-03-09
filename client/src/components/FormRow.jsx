import React from 'react'

const FormRow = ({type, name, labelText, defaultValue, onChange}) => {
  return (
    <div className="form-row">
    <label htmlFor={name} className='form-label'>{labelText || name}</label>
    <input type='text' 
    id={name}
    name={name}
    className='form-input'
    defaultValue={defaultValue || ''}
    required
    onChange={onChange}>
    </input>
</div>
  )
}

export default FormRow