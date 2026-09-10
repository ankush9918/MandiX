import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMarket } from '../../context/MarketContext';
import { useNotifications } from '../../context/NotificationContext';
import { ProductCategory } from '../../types';
import { PlusCircle, Upload, ArrowLeft } from 'lucide-react';

export const FarmerAddProduct: React.FC = () => {
  const { addProduct } = useMarket();
  const { showToast } = useNotifications();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [category, setCategory] = useState<ProductCategory>('Vegetables');
  const [variety, setVariety] = useState('Hybrid Extra Grade');
  const [grade, setGrade] = useState<'Grade-A' | 'Grade-B' | 'Export Quality' | 'FAQ'>('Grade-A');
  const [price, setPrice] = useState('30');
  const [unit, setUnit] = useState<'kg' | 'quintal'>('kg');
  const [availableQty, setAvailableQty] = useState('200');
  const [moq, setMoq] = useState('10');
  const [mandi, setMandi] = useState('Kanpur Mandi Hub');
  const [description, setDescription] = useState('Freshly harvested, naturally sun-dried and graded produce ready for direct pickup.');
  const [image, setImage] = useState('https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&auto=format&fit=crop&q=80');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    addProduct({
      name,
      category,
      variety,
      grade,
      price: Number(price),
      unit,
      availableQty: Number(availableQty),
      moq: Number(moq),
      farmerId: 'user-farmer-1',
      farmerName: 'Ramesh Patil',
      farmerLocation: 'Kanpur, UP',
      mandi,
      image,
      description,
      status: 'Active',
      harvestDate: 'Today',
      traceability: {
        harvestTimestamp: new Date().toISOString().replace('T', ' ').slice(0, 16) + ' IST',
        fieldLocation: 'Plot 7B, Kanpur Rural Belt',
        batchNumber: `MX-LOT-${Math.floor(1000 + Math.random() * 9000)}`,
        coldStoragePassed: true,
        qualityCertifiedBy: 'APMC Kanpur Quality Cell'
      },
      rating: 5.0,
      reviewsCount: 1
    });

    showToast('Crop Lot Published!', `${name} is now live on the MANDI-X marketplace.`, 'success');
    navigate('/farmer/products');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 font-sans">
      <button
        onClick={() => navigate('/farmer/products')}
        className="inline-flex items-center gap-2 text-xs font-bold text-[#64748B] hover:text-[#0F172A] transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to My Products</span>
      </button>

      <div className="bg-white rounded-3xl border border-[#E2E8F0] p-6 sm:p-10 shadow-sm space-y-8">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8FFF6] text-[#006D42] text-xs font-bold mb-2">
            <PlusCircle className="w-4 h-4 text-[#00C97E]" />
            <span>DIRECT KISAN LISTING</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#0F172A] tracking-tight">
            List New Crop Harvest Lot
          </h1>
          <p className="text-xs sm:text-sm text-[#64748B] mt-1">
            Fill in details below to publish your harvest lot directly to verified mandi buyers with 0% commission.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Field 1: Name */}
            <div>
              <label className="block text-xs font-bold text-[#0F172A] mb-1.5">Product Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="e.g. Fresh Red Tomatoes"
                className="w-full h-11 px-4 rounded-xl bg-[#F7F8FA] border border-[#E2E8F0] text-sm text-[#0F172A] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0F172A]"
              />
            </div>

            {/* Field 2: Category */}
            <div>
              <label className="block text-xs font-bold text-[#0F172A] mb-1.5">Category</label>
              <select
                value={category}
                onChange={e => setCategory(e.target.value as ProductCategory)}
                className="w-full h-11 px-4 rounded-xl bg-[#F7F8FA] border border-[#E2E8F0] text-sm text-[#0F172A] font-medium outline-none focus:bg-white focus:ring-2 focus:ring-[#0F172A]"
              >
                <option value="Vegetables">Vegetables</option>
                <option value="Grains">Grains</option>
                <option value="Fruits">Fruits</option>
                <option value="Oilseeds">Oilseeds</option>
                <option value="Pulses">Pulses</option>
                <option value="Dairy">Dairy</option>
                <option value="Spices">Spices</option>
                <option value="Organic">Organic</option>
              </select>
            </div>

            {/* Field 3: Variety */}
            <div>
              <label className="block text-xs font-bold text-[#0F172A] mb-1.5">Variety / Cultivar</label>
              <input
                type="text"
                required
                value={variety}
                onChange={e => setVariety(e.target.value)}
                placeholder="e.g. Himsona / C-306 Sharbati"
                className="w-full h-11 px-4 rounded-xl bg-[#F7F8FA] border border-[#E2E8F0] text-sm text-[#0F172A] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0F172A]"
              />
            </div>

            {/* Field 4: Grade */}
            <div>
              <label className="block text-xs font-bold text-[#0F172A] mb-1.5">Quality Grading</label>
              <select
                value={grade}
                onChange={e => setGrade(e.target.value as any)}
                className="w-full h-11 px-4 rounded-xl bg-[#F7F8FA] border border-[#E2E8F0] text-sm text-[#0F172A] font-medium outline-none focus:bg-white focus:ring-2 focus:ring-[#0F172A]"
              >
                <option value="Grade-A">Grade-A (Premium)</option>
                <option value="Export Quality">Export Quality</option>
                <option value="Grade-B">Grade-B (Standard)</option>
                <option value="FAQ">FAQ (Fair Average Quality)</option>
              </select>
            </div>

            {/* Field 5: Price per unit */}
            <div>
              <label className="block text-xs font-bold text-[#0F172A] mb-1.5">
                Reserve Price (₹ per {unit})
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  required
                  value={price}
                  onChange={e => setPrice(e.target.value)}
                  placeholder="e.g. 28"
                  className="flex-1 h-11 px-4 rounded-xl bg-[#F7F8FA] border border-[#E2E8F0] text-sm text-[#0F172A] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0F172A]"
                />
                <select
                  value={unit}
                  onChange={e => setUnit(e.target.value as any)}
                  className="h-11 px-3 rounded-xl bg-[#F7F8FA] border border-[#E2E8F0] text-xs font-bold text-[#0F172A] outline-none"
                >
                  <option value="kg">₹ / kg</option>
                  <option value="quintal">₹ / Quintal</option>
                </select>
              </div>
            </div>

            {/* Field 6: Quantity Available */}
            <div>
              <label className="block text-xs font-bold text-[#0F172A] mb-1.5">
                Available Quantity (in {unit})
              </label>
              <input
                type="number"
                required
                value={availableQty}
                onChange={e => setAvailableQty(e.target.value)}
                placeholder="e.g. 500"
                className="w-full h-11 px-4 rounded-xl bg-[#F7F8FA] border border-[#E2E8F0] text-sm text-[#0F172A] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0F172A]"
              />
            </div>

            {/* Field 7: MOQ */}
            <div>
              <label className="block text-xs font-bold text-[#0F172A] mb-1.5">
                Minimum Order Quantity (MOQ in {unit})
              </label>
              <input
                type="number"
                required
                value={moq}
                onChange={e => setMoq(e.target.value)}
                placeholder="e.g. 10"
                className="w-full h-11 px-4 rounded-xl bg-[#F7F8FA] border border-[#E2E8F0] text-sm text-[#0F172A] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0F172A]"
              />
            </div>

            {/* Field 8: Location */}
            <div>
              <label className="block text-xs font-bold text-[#0F172A] mb-1.5">
                Farm Gate / Mandi Hub
              </label>
              <input
                type="text"
                required
                value={mandi}
                onChange={e => setMandi(e.target.value)}
                placeholder="e.g. Kanpur Mandi Gate #2"
                className="w-full h-11 px-4 rounded-xl bg-[#F7F8FA] border border-[#E2E8F0] text-sm text-[#0F172A] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0F172A]"
              />
            </div>

            {/* Description */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-[#0F172A] mb-1.5">
                Produce Description & Quality Highlights
              </label>
              <textarea
                rows={2}
                value={description}
                onChange={e => setDescription(e.target.value)}
                className="w-full p-4 rounded-xl bg-[#F7F8FA] border border-[#E2E8F0] text-sm text-[#0F172A] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0F172A]"
              />
            </div>

            {/* Crop Photo Dropzone Simulation */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-[#0F172A] mb-1.5">Product Photo</label>
              <div
                onClick={() => showToast('Photo Ready', 'Photo attached from camera / field storage.', 'info')}
                className="border-2 border-dashed border-[#E2E8F0] hover:border-[#00F098] bg-[#F7F8FA] rounded-2xl p-6 text-center cursor-pointer transition-colors flex flex-col items-center justify-center gap-2"
              >
                <div className="w-12 h-12 rounded-full bg-white shadow-xs flex items-center justify-center text-slate-400">
                  <Upload className="w-6 h-6 text-[#006D42]" />
                </div>
                <span className="text-xs font-bold text-[#0F172A]">
                  Click or drag crop photo from device
                </span>
                <span className="text-[11px] text-[#64748B]">
                  JPEG, PNG format with high daylight clarity
                </span>
              </div>
            </div>
          </div>

          <div className="pt-4 flex items-center justify-end gap-3 border-t border-[#E2E8F0]">
            <button
              type="button"
              onClick={() => navigate('/farmer/products')}
              className="px-5 py-2.5 rounded-xl border border-[#E2E8F0] bg-white text-xs font-bold text-[#64748B] hover:bg-[#F7F8FA]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-8 py-3 rounded-full bg-[#00F098] text-[#0F172A] text-sm font-extrabold hover:bg-[#00C97E] hover:text-white transition-all shadow-[0_2px_10px_rgba(0,240,152,0.35)] active:scale-95"
            >
              Publish Crop Lot
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
