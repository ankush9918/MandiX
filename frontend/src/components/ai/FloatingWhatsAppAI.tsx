import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Mic, Sparkles, CheckCheck, Globe, Volume2 } from 'lucide-react';
import { useMarket } from '../../context/MarketContext';
import { defaultBotResponses } from '../../data/mockAI';

interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
}

export const FloatingWhatsAppAI: React.FC = () => {
  const { marketPrices } = useMarket();
  const [isOpen, setIsOpen] = useState(false);
  const [lang, setLang] = useState<'hi' | 'en'>('hi');
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm-1',
      sender: 'bot',
      text:
        '🌾 **नमस्ते! मैं MANDI-X का AI सहायक हूँ।**\nआप मुझसे आज के मंडी भाव, खरीदार डिमांड, और फसल बिक्री के बारे में हिंदी या English में पूछ सकते हैं।',
      timestamp: '10:30 AM'
    }
  ]);

  const quickQuestionsHi = [
    'आज गेहूं का भाव क्या है?',
    'मेरी फसल की demand कितनी है?',
    'खेत से पिकअप कैसे बुक करें?',
    'टमाटर के सबसे अच्छे खरीदार कौन हैं?'
  ];

  const quickQuestionsEn = [
    "What is today's Wheat price?",
    'What is the demand for my crop?',
    'How do I schedule farm pickup?',
    'Who are the best tomato buyers?'
  ];

  const quickQuestions = lang === 'hi' ? quickQuestionsHi : quickQuestionsEn;

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = (textToSend?: string) => {
    const text = textToSend || input.trim();
    if (!text) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Simulate intelligent bot reply
    setTimeout(() => {
      let reply = '';
      const lower = text.toLowerCase();

      if (lower.includes('गेहूं') || lower.includes('wheat')) {
        const wheat = marketPrices.find(p => p.commodity.toLowerCase().includes('wheat'));
        const rate = wheat ? `₹${wheat.mandiXRate}/Qtl (${wheat.market})` : '₹2,600/Qtl';
        reply =
          lang === 'hi'
            ? defaultBotResponses.priceQueryHi('गेहूं (Wheat)', rate, 'Khanna Mandi')
            : defaultBotResponses.priceQueryEn('Wheat', rate, 'Khanna APMC');
      } else if (lower.includes('demand') || lower.includes('मांग') || lower.includes('डिमांड')) {
        reply =
          lang === 'hi'
            ? defaultBotResponses.demandQueryHi()
            : defaultBotResponses.demandQueryEn();
      } else if (lower.includes('pickup') || lower.includes('पिकअप') || lower.includes('गाड़ी') || lower.includes('ट्रक')) {
        reply =
          lang === 'hi'
            ? defaultBotResponses.pickupQueryHi()
            : defaultBotResponses.pickupQueryEn();
      } else if (lower.includes('टमाटर') || lower.includes('tomato')) {
        reply =
          lang === 'hi'
            ? '🍅 **टमाटर रेट अपडेट:**\nआज कानपुर व आजादपुर मंडी में हाइब्रिड टमाटर ₹28/kg पर ट्रेड हो रहा है। डायरेक्ट किसान सौदे पर 0% कमीशन है।'
            : "🍅 **Tomato Rate Update:**\nFresh hybrid tomatoes are trading at ₹28/kg on MANDI-X with direct buyer settlements and zero middlemen cut.";
      } else if (lower.includes('प्याज') || lower.includes('onion')) {
        reply =
          lang === 'hi'
            ? '🧅 **नासिक लाल प्याज:**\nलासलगांव APMC में ₹2,250/Qtl पर मजबूत मांग है। MANDI-X पर रिटेल बायर्स तत्काल एडवांस पेमेंट दे रहे हैं।'
            : '🧅 **Nashik Red Onion:**\nHigh demand at Lasalgaon APMC with current benchmark ₹2,250/Qtl. Direct dispatch pickup available.';
      } else {
        reply =
          lang === 'hi'
            ? `✅ **MANDI-X AI सूचना:**\nआपके प्रश्न "${text}" के आधार पर हमारा सिस्टम 18 मंडियों के लाइव भाव ट्रैक कर रहा है। आप डैशबोर्ड में जाकर सीधे अपना उत्पाद लिस्ट कर सकते हैं या ऑर्डर ट्रैक कर सकते हैं।`
            : `✅ **MANDI-X AI Intelligence:**\nTracking APMC rates for "${text}". You can directly list harvest lots or place orders with zero middleman commissions on our platform.`;
      }

      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 1100);
  };

  const simulateVoiceInput = () => {
    setIsListening(true);
    setTimeout(() => {
      setIsListening(false);
      const sampleQuestion = lang === 'hi' ? 'आज गेहूं का भाव क्या है?' : "What is today's Wheat price?";
      setInput(sampleQuestion);
      handleSend(sampleQuestion);
    }, 2200);
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <div className="fixed bottom-4 right-4 z-[95]">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(true)}
          className="relative flex items-center gap-2.5 px-4 py-3 bg-[#075E54] text-white rounded-full shadow-2xl border-2 border-white hover:bg-[#128C7E] transition-all"
        >
          <div className="relative">
            <span className="w-2.5 h-2.5 bg-[#00F098] rounded-full absolute -top-0.5 -right-0.5 ring-2 ring-[#075E54] animate-pulse" />
            <MessageSquare className="w-5 h-5 fill-current" />
          </div>
          <span className="font-bold text-sm hidden sm:inline">WhatsApp AI</span>
          <span className="px-1.5 py-0.5 rounded bg-[#00F098] text-[#075E54] font-black text-[10px] tracking-wide">
            24x7
          </span>
        </motion.button>
      </div>

      {/* Chat Drawer / Window */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 sm:inset-auto sm:bottom-20 sm:right-4 z-[105] flex items-end justify-center pointer-events-none">
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.95 }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="pointer-events-auto w-full sm:w-[390px] h-[88vh] sm:h-[580px] bg-white sm:rounded-3xl shadow-2xl border border-[#E2E8F0] flex flex-col overflow-hidden font-sans"
            >
              {/* WhatsApp Header */}
              <div className="bg-[#075E54] text-white p-4 flex items-center justify-between shadow-md">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/15 border border-[#00F098]/40 flex items-center justify-center font-black text-sm text-[#00F098]">
                    MX
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h3 className="font-bold text-sm tracking-tight">MANDI-X Kisan Bot</h3>
                      <Sparkles className="w-3.5 h-3.5 text-[#00F098]" />
                    </div>
                    <div className="flex items-center gap-1 text-[11px] text-white/80">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00F098] animate-ping" />
                      <span>Online • AI Mandi Intelligence</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  {/* Language Toggle */}
                  <button
                    onClick={() => setLang(lang === 'hi' ? 'en' : 'hi')}
                    className="px-2 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-bold flex items-center gap-1 transition-colors"
                    title="Change language"
                  >
                    <Globe className="w-3 h-3 text-[#00F098]" />
                    <span>{lang === 'hi' ? 'हिन्दी' : 'ENG'}</span>
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    aria-label="Close assistant"
                    className="p-1.5 rounded-full hover:bg-white/15 text-white/90 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Chat Body */}
              <div className="flex-1 overflow-y-auto p-4 bg-[#EFEAE2] flex flex-col gap-3">
                <div className="self-center bg-white/85 backdrop-blur px-3 py-1 rounded-full text-[10px] font-bold text-[#64748B] uppercase tracking-wider shadow-xs">
                  Direct WhatsApp AI Bridge
                </div>

                {messages.map(msg => {
                  const isUser = msg.sender === 'user';
                  return (
                    <div
                      key={msg.id}
                      className={`flex flex-col max-w-[85%] ${
                        isUser ? 'self-end items-end' : 'self-start items-start'
                      }`}
                    >
                      <div
                        className={`p-3 rounded-2xl shadow-xs text-xs sm:text-[13px] leading-relaxed whitespace-pre-line ${
                          isUser
                            ? 'bg-[#DCF8C6] text-[#0F172A] rounded-tr-xs'
                            : 'bg-white text-[#0F172A] rounded-tl-xs border border-[#E2E8F0]/80'
                        }`}
                      >
                        {msg.text}
                      </div>
                      <div className="flex items-center gap-1 text-[10px] text-slate-500 mt-1 px-1">
                        <span>{msg.timestamp}</span>
                        {isUser && <CheckCheck className="w-3 h-3 text-sky-600 inline" />}
                      </div>
                    </div>
                  );
                })}

                {/* Typing Indicator */}
                {isTyping && (
                  <div className="self-start bg-white p-3 rounded-2xl rounded-tl-xs shadow-xs border border-[#E2E8F0] flex items-center gap-1.5">
                    <span className="w-2 h-2 bg-[#00C97E] rounded-full animate-bounce" />
                    <span className="w-2 h-2 bg-[#00C97E] rounded-full animate-bounce [animation-delay:0.2s]" />
                    <span className="w-2 h-2 bg-[#00C97E] rounded-full animate-bounce [animation-delay:0.4s]" />
                    <span className="text-[11px] text-[#64748B] font-semibold ml-1">AI Typing...</span>
                  </div>
                )}

                {/* Voice listening pulse */}
                {isListening && (
                  <div className="self-center bg-[#075E54] text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2 text-xs font-bold animate-pulse">
                    <Volume2 className="w-4 h-4 text-[#00F098] animate-bounce" />
                    <span>Listening to Hindi/English audio...</span>
                  </div>
                )}

                <div ref={chatBottomRef} />
              </div>

              {/* Quick Questions Chips */}
              <div className="px-3 py-2 bg-[#F7F8FA] border-t border-[#E2E8F0] flex items-center gap-1.5 overflow-x-auto no-scrollbar">
                {quickQuestions.map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSend(q)}
                    className="whitespace-nowrap px-2.5 py-1 rounded-full bg-white border border-[#E2E8F0] hover:border-[#00C97E] hover:bg-[#E8FFF6] text-[11px] font-semibold text-[#0F172A] transition-colors shrink-0"
                  >
                    {q}
                  </button>
                ))}
              </div>

              {/* Chat Input Bar */}
              <div className="p-3 bg-[#F0F2F5] border-t border-[#E2E8F0] flex items-center gap-2">
                <button
                  onClick={simulateVoiceInput}
                  title="Speak in Hindi or English"
                  className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                    isListening
                      ? 'bg-rose-600 text-white animate-pulse'
                      : 'bg-white hover:bg-slate-100 text-[#075E54] border border-[#E2E8F0]'
                  }`}
                >
                  <Mic className="w-4 h-4" />
                </button>

                <input
                  type="text"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleSend()}
                  placeholder={lang === 'hi' ? 'यहाँ संदेश लिखें (उदा: गेहूं का भाव)...' : 'Type message in English/Hindi...'}
                  className="flex-1 h-10 px-3.5 rounded-full bg-white border border-[#E2E8F0] text-xs sm:text-sm text-[#0F172A] placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#075E54]"
                />

                <button
                  onClick={() => handleSend()}
                  disabled={!input.trim()}
                  className="w-10 h-10 rounded-full bg-[#075E54] hover:bg-[#128C7E] disabled:opacity-50 text-white flex items-center justify-center transition-transform active:scale-95 shadow-sm"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
