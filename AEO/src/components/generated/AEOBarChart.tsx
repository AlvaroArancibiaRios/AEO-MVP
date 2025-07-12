"use client";

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
interface ChartDataItem {
  name: string;
  mentions: number;
  color: string;
}
interface AEOBarChartProps {
  data: ChartDataItem[];
}
const CustomTooltip = ({
  active,
  payload,
  label
}: {
  active?: boolean;
  payload?: Array<{
    value: number;
    payload: ChartDataItem;
  }>;
  label?: string;
}) => {
  if (active && payload && payload.length) {
    return <div className="bg-card/95 backdrop-blur-sm border border-border/50 rounded-xl p-4 shadow-xl">
        <p className="text-sm font-semibold text-foreground mb-1">{label}</p>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full" style={{
          backgroundColor: payload[0].payload.color
        }} />
          <span className="text-sm text-muted-foreground">Menciones:</span>
          <span className="text-sm font-bold text-foreground">{payload[0].value}</span>
        </div>
      </div>;
  }
  return null;
};
const AEOBarChart: React.FC<AEOBarChartProps> = ({
  data
}) => {
  return <div className="w-full h-80">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{
        top: 20,
        right: 30,
        left: 20,
        bottom: 5
      }} barCategoryGap="20%">
          <defs>
            {data.map((item, index) => <linearGradient key={index} id={`gradient-${index}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={item.color} stopOpacity={0.8} />
                <stop offset="100%" stopColor={item.color} stopOpacity={0.3} />
              </linearGradient>)}
          </defs>
          
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.2} vertical={false} />
          
          <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} tick={{
          fill: 'hsl(var(--muted-foreground))'
        }} />
          
          <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} tick={{
          fill: 'hsl(var(--muted-foreground))'
        }} />
          
          <Tooltip content={<CustomTooltip />} />
          
          <Bar dataKey="mentions" radius={[8, 8, 0, 0]} stroke="none">
            {data.map((entry, index) => <Cell key={`cell-${index}`} fill={`url(#gradient-${index})`} />)}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>;
};
export default AEOBarChart;