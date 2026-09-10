import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  CartesianGrid
} from 'recharts';

export const FarmerAnalytics: React.FC = () => {
  const cropSales = [
    { name: 'Wheat', sales: 48500 },
    { name: 'Potato', sales: 22800 },
    { name: 'Tomato', sales: 18400 },
    { name: 'Mustard', sales: 12000 }
  ];

  const buyerDistribution = [
    { name: 'Wholesale Retailers', value: 65, color: '#00F098' },
    { name: 'Direct Consumers', value: 25, color: '#00C97E' },
    { name: 'Food Processors', value: 10, color: '#0F172A' }
  ];

  return (
    <div className="space-y-8 font-sans">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-[#0F172A] tracking-tight">
          Harvest Yield & Trade Analytics
        </h1>
        <p className="text-xs sm:text-sm text-[#64748B]">
          Performance metrics by crop, buyer segments, and seasonal revenue realization
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Sales by crop */}
        <div className="lg:col-span-7 bg-white border border-[#E2E8F0] rounded-3xl p-6 shadow-sm">
          <h3 className="text-base font-black text-[#0F172A] mb-4">Revenue by Crop Variety (₹)</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={cropSales}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                <XAxis dataKey="name" stroke="#64748B" fontSize={12} />
                <YAxis stroke="#64748B" fontSize={12} />
                <Tooltip
                  formatter={(val: number) => [`₹${val.toLocaleString()}`, 'Revenue']}
                  contentStyle={{ backgroundColor: '#0F172A', color: '#fff', borderRadius: '12px' }}
                />
                <Bar dataKey="sales" fill="#00F098" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Buyer breakdown */}
        <div className="lg:col-span-5 bg-white border border-[#E2E8F0] rounded-3xl p-6 shadow-sm flex flex-col justify-between">
          <h3 className="text-base font-black text-[#0F172A] mb-2">Buyer Channel Distribution</h3>
          <div className="h-52 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={buyerDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {buyerDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center text-xs pt-3 border-t border-[#E2E8F0]">
            {buyerDistribution.map(b => (
              <div key={b.name}>
                <span className="font-bold text-[#0F172A] block">{b.value}%</span>
                <span className="text-[10px] text-[#64748B]">{b.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
