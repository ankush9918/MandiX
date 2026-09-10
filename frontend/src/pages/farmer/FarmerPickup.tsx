import React, { useState } from 'react';
import { useMarket } from '../../context/MarketContext';
import { useNotifications } from '../../context/NotificationContext';
import { PickupRequest } from '../../types';
import { Truck, Calendar, Clock, MapPin, CheckCircle, ArrowRight, ShieldCheck } from 'lucide-react';

export const FarmerPickup: React.FC = () => {
  const { pickups, schedulePickup, updatePickupStatus } = useMarket();
  const { showToast } = useNotifications();

  const [cropName, setCropName] = useState('Fresh Hybrid Tomato (Lot A)');
  const [quantity, setQuantity] = useState('100');
  const [unit, setUnit] = useState('kg');
  const [pickupDate, setPickupDate] = useState('Tomorrow, 11 Sep');
  const [timeSlot, setTimeSlot] = useState('07:00 AM - 09:00 AM');
  const [pickupAddress, setPickupAddress] = useState('Farm Gate #2, Kanpur Rural Belt');

  const handleSchedule = (e: React.FormEvent) => {
    e.preventDefault();
    schedulePickup({
      farmerId: 'user-farmer-1',
      farmerName: 'Ramesh Patil',
      cropName,
      quantity: Number(quantity),
      unit,
      pickupDate,
      timeSlot,
      pickupAddress
    });

    showToast('Pickup Scheduled!', 'Transporter truck assigned for collection at your farm gate.', 'success');
  };

  const handleAdvancePickup = (pickup: PickupRequest) => {
    const nextMap: Record<PickupRequest['status'], PickupRequest['status'] | null> = {
      'Scheduled': 'Driver Assigned',
      'Driver Assigned': 'En Route',
      'En Route': 'Completed',
      'Completed': null,
      'Cancelled': null
    };
    const next = nextMap[pickup.status];
    if (next) {
      updatePickupStatus(pickup.id, next);
      showToast('Pickup Status Updated', `Status changed to ${next}.`, 'info');
    }
  };

  return (
    <div className="space-y-8 font-sans">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-[#0F172A] tracking-tight">
          Farm-Gate Pickup & Logistics
        </h1>
        <p className="text-xs sm:text-sm text-[#64748B]">
          Schedule transporter trucks to pick up harvest produce directly from your farm gate
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Schedule Form */}
        <div className="lg:col-span-5 bg-white border border-[#E2E8F0] rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center gap-2">
            <Truck className="w-5 h-5 text-[#006D42]" />
            <h3 className="text-lg font-black text-[#0F172A]">Request Transporter Pickup</h3>
          </div>

          <form onSubmit={handleSchedule} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#0F172A] mb-1">Crop Produce Lot</label>
              <input
                type="text"
                required
                value={cropName}
                onChange={e => setCropName(e.target.value)}
                className="w-full h-10 px-3.5 rounded-xl bg-[#F7F8FA] border border-[#E2E8F0] text-sm focus:outline-none focus:bg-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-[#0F172A] mb-1">Quantity</label>
                <input
                  type="number"
                  required
                  value={quantity}
                  onChange={e => setQuantity(e.target.value)}
                  className="w-full h-10 px-3.5 rounded-xl bg-[#F7F8FA] border border-[#E2E8F0] text-sm focus:outline-none focus:bg-white"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#0F172A] mb-1">Unit</label>
                <select
                  value={unit}
                  onChange={e => setUnit(e.target.value)}
                  className="w-full h-10 px-3 rounded-xl bg-[#F7F8FA] border border-[#E2E8F0] text-xs font-bold outline-none"
                >
                  <option value="kg">kg</option>
                  <option value="quintal">Quintals</option>
                  <option value="crates">Crates</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#0F172A] mb-1">Preferred Date</label>
              <input
                type="text"
                required
                value={pickupDate}
                onChange={e => setPickupDate(e.target.value)}
                placeholder="Tomorrow, 11 Sep"
                className="w-full h-10 px-3.5 rounded-xl bg-[#F7F8FA] border border-[#E2E8F0] text-sm focus:outline-none focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#0F172A] mb-1">Time Slot</label>
              <select
                value={timeSlot}
                onChange={e => setTimeSlot(e.target.value)}
                className="w-full h-10 px-3 rounded-xl bg-[#F7F8FA] border border-[#E2E8F0] text-xs font-bold outline-none"
              >
                <option>06:00 AM - 08:00 AM (Early Sunrise)</option>
                <option>08:00 AM - 11:00 AM (Morning Batch)</option>
                <option>02:00 PM - 05:00 PM (Afternoon)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#0F172A] mb-1">Farm Gate Address</label>
              <input
                type="text"
                required
                value={pickupAddress}
                onChange={e => setPickupAddress(e.target.value)}
                className="w-full h-10 px-3.5 rounded-xl bg-[#F7F8FA] border border-[#E2E8F0] text-sm focus:outline-none focus:bg-white"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-2xl bg-[#00F098] text-[#0F172A] font-extrabold text-sm hover:bg-[#00C97E] hover:text-white transition-all shadow-sm active:scale-95"
            >
              Book Transporter Vehicle
            </button>
          </form>
        </div>

        {/* Right: Scheduled Pickups List */}
        <div className="lg:col-span-7 space-y-4">
          <h3 className="text-lg font-black text-[#0F172A]">Active Pickup Schedules</h3>
          <div className="space-y-3">
            {pickups.map(p => (
              <div
                key={p.id}
                className="bg-white border border-[#E2E8F0] rounded-3xl p-6 shadow-xs hover:border-[#00C97E] transition-all space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#E2E8F0]">
                  <div>
                    <span className="text-sm font-black text-[#0F172A]">{p.cropName}</span>
                    <span className="text-xs text-[#64748B] block">
                      Quantity: {p.quantity} {p.unit} • ID: {p.id}
                    </span>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold self-start sm:self-auto ${
                      p.status === 'Completed'
                        ? 'bg-emerald-50 text-emerald-700'
                        : 'bg-[#E8FFF6] text-[#006D42] border border-[#00F098]/30'
                    }`}
                  >
                    {p.status}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div>
                    <span className="text-[#64748B] block">Pickup Window:</span>
                    <span className="font-bold text-[#0F172A]">{p.pickupDate} ({p.timeSlot})</span>
                  </div>
                  <div>
                    <span className="text-[#64748B] block">Assigned Vehicle:</span>
                    <span className="font-bold text-[#006D42]">{p.vehicleNumber || 'Pending Allocation'}</span>
                  </div>
                  <div>
                    <span className="text-[#64748B] block">Driver Contact:</span>
                    <span className="font-bold text-slate-800">{p.driverName || 'Transporter Hub'}</span>
                  </div>
                </div>

                {p.status !== 'Completed' && (
                  <div className="pt-2 flex justify-end">
                    <button
                      onClick={() => handleAdvancePickup(p)}
                      className="px-4 py-1.5 rounded-xl bg-[#0F172A] hover:bg-[#00C97E] hover:text-[#0F172A] text-white text-xs font-bold transition-colors flex items-center gap-1.5"
                    >
                      <span>Simulate Status Advance</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
