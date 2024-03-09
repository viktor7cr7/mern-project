import React from 'react'
import {
    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
  } from 'recharts';

const AreaChartCo = ({data}) => {
  return (
    <ResponsiveContainer width='100%' height={300}>
        <AreaChart data={data} margin={{top:50}}>
            <CartesianGrid strokeDasharray='3 3'></CartesianGrid>
            <XAxis dataKey='date'></XAxis>
            <YAxis allowDecimals={false}></YAxis>
            <Tooltip></Tooltip>
            <Area type='monotone' dataKey='count' stroke='#2cb1bc' fill='#bef8fd'></Area>
        </AreaChart>
    </ResponsiveContainer>
  )
}

export default AreaChartCo