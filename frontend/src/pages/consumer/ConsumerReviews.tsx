import React, { useState } from 'react';
import { useNotifications } from '../../context/NotificationContext';
import { Star, CheckCircle2, MessageSquare } from 'lucide-react';

export const ConsumerReviews: React.FC = () => {
  const { showToast } = useNotifications();

  const [reviews, setReviews] = useState([
    {
      id: 'rev-1',
      farmerName: 'Ramesh Patil',
      crop: 'Fresh Hybrid Tomatoes',
      rating: 5,
      date: '2 days ago',
      comment: 'Incredible aroma and freshness! Delivered before 8:30 AM with crisp packaging. Will buy again directly.'
    },
    {
      id: 'rev-2',
      farmerName: 'Ganesh Shinde',
      crop: 'Nashik Red Onions',
      rating: 5,
      date: '5 days ago',
      comment: 'Top quality export grade onions. Zero moisture damage or sprouting. 100% fair price paid to farmer.'
    }
  ]);

  const [newComment, setNewComment] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [selectedKisan, setSelectedKisan] = useState('Ramesh Patil');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setReviews([
      {
        id: `rev-${Date.now()}`,
        farmerName: selectedKisan,
        crop: 'Sharbati Wheat',
        rating: newRating,
        date: 'Just now',
        comment: newComment
      },
      ...reviews
    ]);
    setNewComment('');
    showToast('Review Published', 'Your review has been shared directly with the farmer.', 'success');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 font-sans">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-[#0F172A] tracking-tight">
          Producer Feedback & Reviews
        </h1>
        <p className="text-xs sm:text-sm text-[#64748B]">
          Support Indian farmers directly by rating harvest freshness and delivery quality
        </p>
      </div>

      {/* Post Review Form */}
      <div className="bg-white border border-[#E2E8F0] rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
        <h3 className="text-base font-black text-[#0F172A] flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-[#006D42]" />
          <span>Write a Review for Your Farmer</span>
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#0F172A] mb-1">Select Farmer</label>
              <select
                value={selectedKisan}
                onChange={e => setSelectedKisan(e.target.value)}
                className="w-full h-10 px-3 rounded-xl bg-[#F7F8FA] border border-[#E2E8F0] text-xs font-bold outline-none"
              >
                <option>Ramesh Patil (Kanpur)</option>
                <option>Sukhwinder Singh (Khanna)</option>
                <option>Ganesh Shinde (Nashik)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#0F172A] mb-1">Rating</label>
              <div className="flex items-center gap-1.5 h-10">
                {[1, 2, 3, 4, 5].map(star => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setNewRating(star)}
                    className="p-1 text-xl transition-transform hover:scale-125"
                  >
                    <Star
                      className={`w-6 h-6 ${
                        star <= newRating ? 'fill-amber-400 text-amber-400' : 'text-slate-300'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#0F172A] mb-1">Your Feedback</label>
            <textarea
              required
              rows={2}
              value={newComment}
              onChange={e => setNewComment(e.target.value)}
              placeholder="How was the produce quality, aroma, packaging and morning delivery?"
              className="w-full p-3.5 rounded-xl bg-[#F7F8FA] border border-[#E2E8F0] text-sm focus:bg-white focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="px-7 py-2.5 rounded-xl bg-[#00F098] text-[#0F172A] font-extrabold text-xs hover:bg-[#00C97E] hover:text-white transition-all shadow-xs"
          >
            Post Review
          </button>
        </form>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.map(rev => (
          <div key={rev.id} className="bg-white border border-[#E2E8F0] rounded-3xl p-6 shadow-xs space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-[#0F172A]">{rev.farmerName} • {rev.crop}</h4>
                <div className="flex items-center gap-1 text-amber-500 mt-0.5">
                  {Array.from({ length: rev.rating }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
              </div>
              <span className="text-[11px] text-[#64748B]">{rev.date}</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed pt-1">
              "{rev.comment}"
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
