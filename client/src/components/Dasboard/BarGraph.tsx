import { BarChart, Bar, Rectangle, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { FaMoneyBillTransfer } from "react-icons/fa6";

const data = [
  {
    name: 'Jan',
    Expenses: 4000,
    Income: 2400,
    amt: 2400,
  },
  {
    name: 'Feb',
    Expenses: 3000,
    Income: 1398,
    amt: 2210,
  },
  {
    name: 'Mar',
    Expenses: 2000,
    Income: 9800,
    amt: 2290,
  },
  {
    name: 'April',
    Expenses: 2780,
    Income: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    Expenses: 1890,
    Income: 4800,
    amt: 2181,
  },
  {
    name: 'May',
    Expenses: 2390,
    Income: 3800,
    amt: 2500,
  },
  {
    name: 'June',
    Expenses: 3490,
    Income: 4300,
    amt: 2100,
  },
];

export default function BarGraph() {
    return (
        <div className="col-span-4 overflow-hidden rounded border border-stone-300 shadow">
          <div className="p-4">
            <h3 className="flex items-center gap-1.5 font-medium">
              <FaMoneyBillTransfer /> Income & Expenses
            </h3>               
           </div>
           <div className='h-64 px-4'>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                width={500}
                height={300}
                data={data}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Income" fill="#60a5fa" activeBar={<Rectangle fill="#1e40af" stroke="blue" />} />
                <Bar dataKey="Expenses" fill="#f87171" activeBar={<Rectangle fill="#166534" stroke="red" />} />
              </BarChart>
            </ResponsiveContainer>
           </div>
        </div>
    )
}