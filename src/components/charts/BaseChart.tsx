import React from 'react';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ChartData,
  ChartOptions,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface ChartProps {
  type: 'line' | 'bar';
  data: ChartData<'line' | 'bar'>;
  options?: ChartOptions<'line' | 'bar'>;
}

const BaseChart: React.FC<ChartProps> = ({ type, data, options }) => {
  const defaultOptions: ChartOptions<'line' | 'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#cbd5e1', // text-slate-300
          font: {
            family: 'Inter, sans-serif',
          },
        },
      },
      tooltip: {
        backgroundColor: '#1e293b', // bg-slate-800
        titleColor: '#f1f5f9', // text-slate-100
        bodyColor: '#cbd5e1', // text-slate-300
        borderColor: '#334155', // border-slate-700
        borderWidth: 1,
        padding: 10,
        cornerRadius: 8,
        displayColors: true,
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#94a3b8', // text-slate-400
        },
        grid: {
          color: '#334155', // border-slate-700
        },
      },
      y: {
        ticks: {
          color: '#94a3b8', // text-slate-400
        },
        grid: {
          color: '#334155', // border-slate-700
        },
      },
    },
  };

  const mergedOptions = { ...defaultOptions, ...options };

  return (
    <div className="h-full w-full">
      {type === 'line' && <Line data={data as ChartData<'line'>} options={mergedOptions as ChartOptions<'line'>} />}
      {type === 'bar' && <Bar data={data as ChartData<'bar'>} options={mergedOptions as ChartOptions<'bar'>} />}
    </div>
  );
};

export default BaseChart; 