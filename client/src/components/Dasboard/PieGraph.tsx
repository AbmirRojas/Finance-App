import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { FaMoneyCheckAlt } from "react-icons/fa";

const data = [
  { name: 'Income', value: 400 },
  { name: 'Food', value: 300 },
  { name: 'Car', value: 300 },
  { name: 'Expenses', value: 200 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: {cx: number, cy: number, midAngle: number, innerRadius: number, outerRadius: number, percent:number}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default function PieGraph() {
    return(
        <div className="col-span-4 overflow-hidden rounded border border-stone-300 shadow">
            <div className="p-4">
                <h3 className="flex items-center gap-1.5 font-medium">
                    <FaMoneyCheckAlt /> Spending Categories
                </h3>               
            </div>
            <div className='flex justify-center items-center gap-1.5'>
                {data.map((entry, index) => (
                    <h3 key={index} style={{ color: COLORS[index] }}>{entry.name}</h3>
                ))}
            </div>
            <div className='h-64 px-4'>
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart width={400} height={400}>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={renderCustomizedLabel}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                    >
                        {data.map((_entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}