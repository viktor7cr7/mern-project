import React from 'react'
import { useState } from 'react';
import BarChart from './BarChart';
import AreaChart from './AreaChart';
import Wrapper from '../assets/wrappers/ChartsContainer';

const ChartsContainer = ({data}) => {
  const [barChart, setBarChart] = useState(true)
  return (
    <Wrapper>
        <h4>Monthly Applications</h4>
        <button type='button' onClick={() => setBarChart(!barChart)}>
        {barChart ? 'Area Chart' : 'Bar chart'}
        </button>
        {barChart ? <BarChart data={data}></BarChart> : <AreaChart data={data}></AreaChart>}
    </Wrapper>
  )
}

export default ChartsContainer