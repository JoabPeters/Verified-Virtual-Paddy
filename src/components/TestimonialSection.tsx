import React, { useState } from 'react';
import { 
  Star, Quote, CheckCircle2, ShieldCheck, 
  MapPin, Sparkles, ThumbsUp, Building2, UserCheck
} from 'lucide-react';

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  location: string;
  category: 'address' | 'disco' | 'privacy';
  feedback: string;
  initials: string;
  rating: number;
  highlight: string;
  avatarBg: string;
  avatarTextColor: string;
}

const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: '1',
    name: 'Amara Okonkwo',
    role: 'Freelance UX Designer',
    location: 'Enugu, Enugu State',
    category: 'address',
    rating: 5,
    highlight: 'Generated in under 2 minutes',
    feedback: 'I urgently needed a formatted residential address affirmation to submit with my cooperative account documentation. Verified Virtual Paddy generated the exact A4 PDF in less than two minutes directly on my phone. No sign-up, zero ads, completely free!',
    initials: 'AO',
    avatarBg: 'bg-emerald-100 border-emerald-300 text-[#0D9488]',
    avatarTextColor: 'text-[#0D9488]',
  },
  {
    id: '2',
    name: 'Babatunde Adeleke',
    role: 'Logistics Operations Lead',
    location: 'Ikeja, Lagos State',
    category: 'disco',
    rating: 5,
    highlight: 'Direct official DisCo link',
    feedback: 'There are so many unofficial phishing sites claiming to offer utility bill downloads. Verified Virtual Paddy took me straight to the genuine Ikeja Electric customer care portal and WhatsApp verification line. It saved me hours of frustration.',
    initials: 'BA',
    avatarBg: 'bg-blue-100 border-blue-300 text-[#2878C8]',
    avatarTextColor: 'text-[#2878C8]',
  },
  {
    id: '3',
    name: 'Fatima Zahra Bello',
    role: 'Postgraduate Researcher',
    location: 'Zaria, Kaduna State',
    category: 'privacy',
    rating: 5,
    highlight: '100% client-side privacy',
    feedback: 'As someone who values digital privacy, finding out that my name and house address never get uploaded to a cloud server was the ultimate selling point. Processing everything in device RAM is how all civic tools should be built.',
    initials: 'FB',
    avatarBg: 'bg-[#E8F7EF] border-[#0D9488]/40 text-[#0D9488]',
    avatarTextColor: 'text-[#0D9488]',
  },
  {
    id: '4',
    name: 'Chidi Nwachukwu',
    role: 'Remote Software Engineer',
    location: 'Port Harcourt, Rivers State',
    category: 'address',
    rating: 5,
    highlight: 'Clear preview before download',
    feedback: 'The read-only preview panel allowed me to review every line—my LGA, contact number, and affirmance statement—before triggering the download. The red download button with the arrow animation is intuitive and foolproof.',
    initials: 'CN',
    avatarBg: 'bg-slate-100 border-slate-300 text-[#102A43]',
    avatarTextColor: 'text-[#102A43]',
  },
  {
    id: '5',
    name: 'Dr. Olumide Martins',
    role: 'Healthcare Professional',
    location: 'Ibadan, Oyo State',
    category: 'privacy',
    rating: 5,
    highlight: 'Honest statutory disclaimers',
    feedback: 'I respect that the platform openly states that customer-prepared statements are personal affirmations and not fabricated electricity bills. That level of transparency and civic integrity is rare and commendable.',
    initials: 'OM',
    avatarBg: 'bg-emerald-50 border-emerald-200 text-[#0D9488]',
    avatarTextColor: 'text-[#0D9488]',
  },
  {
    id: '6',
    name: 'Hauwa Mohammed',
    role: 'Communications Specialist',
    location: 'Maitama, Abuja (FCT)',
    category: 'disco',
    rating: 5,
    highlight: 'Flawless mobile experience',
    feedback: 'The website is remarkably lightweight. Even when browsing on standard 3G mobile data in Abuja, the pages loaded instantly without heavy lag. Verified Virtual Paddy is a dependable buddy for everyday Nigerians.',
    initials: 'HM',
    avatarBg: 'bg-blue-50 border-blue-200 text-[#2878C8]',
    avatarTextColor: 'text-[#2878C8]',
  },
];

export const TestimonialSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'address' | 'disco' | 'privacy'>('all');

  const filteredTestimonials = selectedCategory === 'all' 
    ? TESTIMONIALS_DATA 
    : TESTIMONIALS_DATA.filter(t => t.category === selectedCategory);

  return (
    <section 
      id="testimonials" 
      className="py-16 sm:py-24 bg-[#F7F9FC] border-b border-gray-200 relative overflow-hidden scroll-mt-16"
      aria-label="User Testimonials Section"
    >
      {/* Subtle Background Glows matching Emerald and Navy theme */}
      <div 
        className="absolute top-0 right-0 w-80 h-80 rounded-full bg-[#0D9488]/5 blur-3xl pointer-events-none" 
        aria-hidden="true" 
      />
      <div 
        className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-[#102A43]/5 blur-3xl pointer-events-none" 
        aria-hidden="true" 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0D9488] bg-[#E8F7EF] px-3.5 py-1.5 rounded-full border border-[#0D9488]/30 shadow-2xs mb-3.5">
            <Sparkles className="w-3.5 h-3.5 text-[#0D9488]" />
            <span>Community Stories</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-[#102A43]">
            Trusted by Everyday Nigerians Nationwide
          </h2>

          <p className="mt-3.5 text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
            Real feedback from students, working professionals, tenants, and business owners across Nigeria who rely on Verified Virtual Paddy for fast, private document assistance.
          </p>

          {/* Category Filter Pills (Navy & Emerald Palette) */}
          <div className="mt-7 flex flex-wrap items-center justify-center gap-2 text-xs font-semibold">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${
                selectedCategory === 'all'
                  ? 'bg-[#102A43] text-white shadow-sm font-bold'
                  : 'bg-white text-slate-600 hover:text-[#102A43] border border-gray-200 hover:border-gray-300'
              }`}
            >
              All Feedback ({TESTIMONIALS_DATA.length})
            </button>

            <button
              onClick={() => setSelectedCategory('address')}
              className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${
                selectedCategory === 'address'
                  ? 'bg-[#0D9488] text-white shadow-sm font-bold'
                  : 'bg-white text-slate-600 hover:text-[#0D9488] border border-gray-200 hover:border-emerald-200'
              }`}
            >
              Address Statement ({TESTIMONIALS_DATA.filter(t => t.category === 'address').length})
            </button>

            <button
              onClick={() => setSelectedCategory('disco')}
              className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${
                selectedCategory === 'disco'
                  ? 'bg-[#2878C8] text-white shadow-sm font-bold'
                  : 'bg-white text-slate-600 hover:text-[#2878C8] border border-gray-200 hover:border-blue-200'
              }`}
            >
              Electricity Bill Help ({TESTIMONIALS_DATA.filter(t => t.category === 'disco').length})
            </button>

            <button
              onClick={() => setSelectedCategory('privacy')}
              className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${
                selectedCategory === 'privacy'
                  ? 'bg-[#0D9488] text-white shadow-sm font-bold'
                  : 'bg-white text-slate-600 hover:text-[#0D9488] border border-gray-200 hover:border-emerald-200'
              }`}
            >
              Privacy & Speed ({TESTIMONIALS_DATA.filter(t => t.category === 'privacy').length})
            </button>
          </div>
        </div>

        {/* Testimonial Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 items-stretch">
          {filteredTestimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white rounded-2xl border-2 border-slate-200/90 hover:border-[#0D9488]/60 p-6 sm:p-7 flex flex-col justify-between shadow-xs hover:shadow-md transition-all duration-300 group relative"
            >
              <div>
                {/* Top Row: Star Rating & Verified User Tag */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>

                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#0D9488] bg-[#E8F7EF] px-2.5 py-0.5 rounded-full border border-[#0D9488]/20">
                    <CheckCircle2 className="w-3 h-3 text-[#0D9488]" />
                    <span>Verified User</span>
                  </span>
                </div>

                {/* Highlight Badge */}
                <div className="mb-3.5">
                  <span className="text-xs font-bold text-[#102A43] bg-slate-100/90 px-2.5 py-1 rounded-lg border border-slate-200/80 inline-block">
                    “{testimonial.highlight}”
                  </span>
                </div>

                {/* Feedback Quote */}
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                  {testimonial.feedback}
                </p>
              </div>

              {/* Bottom Row: User Avatar & Information */}
              <div className="mt-6 pt-5 border-t border-gray-100 flex items-center gap-3.5">
                
                {/* Placeholder Avatar with Navy/Emerald Initials */}
                <div 
                  className={`w-11 h-11 rounded-full flex items-center justify-center font-extrabold text-sm border-2 shadow-2xs shrink-0 select-none ${testimonial.avatarBg}`}
                  aria-hidden="true"
                >
                  {testimonial.initials}
                </div>

                {/* Name, Role & Location */}
                <div className="min-w-0 flex-1">
                  <h4 className="text-sm font-bold text-[#102A43] tracking-tight truncate group-hover:text-[#0D9488] transition-colors">
                    {testimonial.name}
                  </h4>
                  <p className="text-[11px] text-slate-500 font-medium truncate">
                    {testimonial.role}
                  </p>
                  <p className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5 truncate">
                    <MapPin className="w-3 h-3 text-[#0D9488] shrink-0" />
                    <span className="truncate">{testimonial.location}</span>
                  </p>
                </div>

              </div>

            </div>
          ))}
        </div>

        {/* Bottom Trust & Satisfaction Bar (Navy & Emerald Palette) */}
        <div className="mt-12 sm:mt-16 bg-[#102A43] text-white rounded-2xl p-6 sm:p-8 border border-[#102A43] shadow-lg">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center divide-y sm:divide-y-0 sm:divide-x divide-white/15">
            
            <div className="pt-2 sm:pt-0">
              <div className="flex items-center justify-center gap-1.5 text-amber-300 mb-1">
                <Star className="w-5 h-5 fill-amber-300" />
                <span className="text-xl sm:text-2xl font-extrabold text-white">4.9 / 5.0</span>
              </div>
              <p className="text-xs text-white/80 font-medium">Average User Satisfaction Rating</p>
            </div>

            <div className="pt-4 sm:pt-0 sm:px-4">
              <div className="flex items-center justify-center gap-2 text-emerald-400 mb-1">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <span className="text-xl sm:text-2xl font-extrabold text-white">100% Free</span>
              </div>
              <p className="text-xs text-white/80 font-medium">In-Browser RAM Processing Only</p>
            </div>

            <div className="pt-4 sm:pt-0 sm:px-4">
              <div className="flex items-center justify-center gap-2 text-blue-300 mb-1">
                <Building2 className="w-5 h-5 text-blue-300" />
                <span className="text-xl sm:text-2xl font-extrabold text-white">All 36 States</span>
              </div>
              <p className="text-xs text-white/80 font-medium">Full Coverage for All Nigerian DisCos & LGAs</p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
