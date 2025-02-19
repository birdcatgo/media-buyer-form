'use client';

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Alert, AlertDescription } from '../ui/alert';
import { Loader2 } from 'lucide-react';

interface VerticalCategory {
  name: string;
  subcategories: string[];
}

const verticalCategories: VerticalCategory[] = [
  {
    name: 'E-commerce & Retail',
    subcategories: [
      'Fashion & Apparel',
      'Beauty & Cosmetics',
      'Home & Garden',
      'Electronics & Gadgets',
      'Health & Wellness Products'
    ]
  },
  {
    name: 'Direct-to-Consumer (DTC)',
    subcategories: [
      'Subscription Boxes',
      'Personal Care Products',
      'Food & Beverage',
      'Fitness Equipment'
    ]
  },
  {
    name: 'Education',
    subcategories: [
      'Online Courses',
      'Professional Training',
      'Language Learning',
      'Coaching Programs'
    ]
  },
  {
    name: 'Financial Services',
    subcategories: [
      'Investment Products',
      'Insurance',
      'Personal Finance Apps',
      'Credit Cards',
      'Trading Platforms'
    ]
  },
  {
    name: 'Gaming & Entertainment',
    subcategories: [
      'Mobile Games',
      'Online Gaming',
      'Streaming Services',
      'Entertainment Apps'
    ]
  },
  {
    name: 'Health & Wellness',
    subcategories: [
      'Fitness Programs',
      'Nutrition/Supplements',
      'Mental Health Services',
      'Meditation Apps'
    ]
  },
  {
    name: 'Software & Apps',
    subcategories: [
      'Mobile Applications',
      'SaaS Products',
      'Business Tools',
      'Productivity Apps'
    ]
  },
  {
    name: 'Lead Generation',
    subcategories: [
      'Real Estate',
      'Insurance',
      'Home Services',
      'B2B Services',
      'Legal Services',
      'Auto',
      'Medicare',
    ]
  },
  {
    name: 'Other',
    subcategories: []
  }
];

interface FormData {
  contactName: string;
  contactEmail: string;
  skypeId: string;
  telegramId: string;
  selectedVerticalCategories: string[];
  selectedSubcategories: Record<string, string[]>;
  otherVertical: string;
  selectedLeadVerticals: string[];
  selectedNetworks: string[];
  spendRanges: Record<string, string>;
  otherLeadVertical: string;
  monthlySpend: string;
  averageRoas: string;
  teamSize: string;
  profitShare: string;
  otherPlatform: string;
}

const verticals = [
  'E-commerce',
  'SaaS/Technology',
  'Finance/Fintech',
  'Healthcare',
  'Education',
  'Gaming',
  'Travel',
  'Real Estate',
  'Consumer Goods',
  'B2B Services',
  'Lead Generation'
] as const;

const leadVerticals = [
  'Solar',
  'Roofing',
  'Windows',
  'Gutters',
  'Other Home Services',
  'Debt',
  'Medicare',
  'Health Insurance',
  'Auto',
  'Other'
] as const;

const networks = [
  'Facebook/Instagram Ads',
  'Google Search Ads',
  'YouTube Ads',
  'TikTok Ads',
  'Native Ads (Taboola, Outbrain)',
  'Other'
] as const;

const spendCategories = [
  '0-10k/month',
  '10k-50k/month',
  '50k-100k/month',
  '100k-500k/month',
  '500k+/month'
] as const;

export const MediaBuyerForm = () => {
  const [formData, setFormData] = useState<FormData>({
    contactName: '',
    contactEmail: '',
    skypeId: '',
    telegramId: '',
    selectedVerticalCategories: [],
    selectedSubcategories: {},
    otherVertical: '',
    selectedLeadVerticals: [],
    selectedNetworks: [],
    spendRanges: {},
    otherLeadVertical: '',
    monthlySpend: '',
    averageRoas: '',
    teamSize: '',
    profitShare: '',
    otherPlatform: ''
  });

  const [formErrors, setFormErrors] = useState({
    leadVerticals: false,
    monthlySpend: false,
    averageRoas: false,
    teamSize: false,
    profitShare: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string | null;
  }>({ type: null, message: null });

  const handleVerticalToggle = (vertical: string) => {
    setFormData(prev => {
      const newVerticals = prev.selectedVerticalCategories.includes(vertical)
        ? prev.selectedVerticalCategories.filter(v => v !== vertical)
        : [...prev.selectedVerticalCategories, vertical];

      // Clear subcategories when category is deselected
      const newSubcategories = { ...prev.selectedSubcategories };
      if (!newVerticals.includes(vertical)) {
        delete newSubcategories[vertical];
      }

      // Clear other vertical when Other is deselected
      if (vertical === 'Other' && !newVerticals.includes('Other')) {
        return {
          ...prev,
          selectedVerticalCategories: newVerticals,
          selectedSubcategories: newSubcategories,
          otherVertical: ''
        };
      }

      return {
        ...prev,
        selectedVerticalCategories: newVerticals,
        selectedSubcategories: newSubcategories
      };
    });
  };

  const handleLeadVerticalToggle = (vertical: string) => {
    setFormData(prev => {
      const newLeadVerticals = prev.selectedLeadVerticals.includes(vertical)
        ? prev.selectedLeadVerticals.filter(v => v !== vertical)
        : [...prev.selectedLeadVerticals, vertical];

      if (vertical === 'Other' && !newLeadVerticals.includes('Other')) {
        return {
          ...prev,
          selectedLeadVerticals: newLeadVerticals,
          otherLeadVertical: ''
        };
      }

      return {
        ...prev,
        selectedLeadVerticals: newLeadVerticals
      };
    });
  };

  const handleOtherLeadVerticalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      otherLeadVertical: e.target.value
    }));
  };

  const handleNetworkToggle = (network: string) => {
    setFormData(prev => ({
      ...prev,
      selectedNetworks: prev.selectedNetworks.includes(network)
        ? prev.selectedNetworks.filter(n => n !== network)
        : [...prev.selectedNetworks, network]
    }));
  };

  const handleSpendRangeChange = (network: string, range: string) => {
    setFormData(prev => ({
      ...prev,
      spendRanges: {
        ...prev.spendRanges,
        [network]: range
      }
    }));
  };

  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubcategoryToggle = (categoryName: string, subcategory: string) => {
    setFormData(prev => {
      const currentSubcategories = prev.selectedSubcategories[categoryName] || [];
      const newSubcategories = currentSubcategories.includes(subcategory)
        ? currentSubcategories.filter(sub => sub !== subcategory)
        : [...currentSubcategories, subcategory];

      return {
        ...prev,
        selectedSubcategories: {
          ...prev.selectedSubcategories,
          [categoryName]: newSubcategories
        }
      };
    });
  };

  const validateForm = () => {
    const errors = {
      leadVerticals: false,
      monthlySpend: false,
      averageRoas: false,
      teamSize: false,
      profitShare: false
    };

    if (formData.selectedVerticalCategories.includes('Lead Generation') && formData.selectedLeadVerticals.length === 0) {
      errors.leadVerticals = true;
    }

    if (!formData.monthlySpend) {
      errors.monthlySpend = true;
    }
    if (!formData.averageRoas) {
      errors.averageRoas = true;
    }
    if (!formData.teamSize) {
      errors.teamSize = true;
    }
    if (!formData.profitShare) {
      errors.profitShare = true;
    }

    setFormErrors(errors);
    return !Object.values(errors).some(error => error);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: null });

    try {
      const response = await fetch('/api/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setSubmitStatus({
          type: 'success',
          message: 'Form submitted successfully!'
        });
        // Optional: Reset form
        // setFormData({
        //   selectedVerticals: [],
        //   selectedLeadVerticals: [],
        //   selectedNetworks: [],
        //   spendRanges: {},
        //   otherLeadVertical: ''
        // });
      } else {
        throw new Error(data.message || 'Failed to submit form');
      }
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: error instanceof Error ? error.message : 'Failed to submit form'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center w-full">
      <form onSubmit={handleSubmit} className="w-full max-w-[580px] mx-4">
        <Card className="bg-[#111] shadow-2xl border-0 overflow-hidden">
          <CardHeader className="bg-[#D92121] px-8 py-8">
            <CardTitle className="text-[32px] font-light text-white leading-tight tracking-wide">
              Elite Media Buyer Network
            </CardTitle>
            <p className="text-white/80 mt-2 text-[15px] font-light">
              Partner with Convert2Freedom and unlock unprecedented scaling potential
            </p>
            
            {/* Benefit Boxes */}
            <div className="grid grid-cols-2 gap-4 mt-8">
              <div className="bg-black/20 p-4 rounded-lg">
                <p className="text-white/90 text-[14px] flex items-center gap-2">
                  <span className="text-xl">💰</span>
                  Premium offers with industry-leading payouts
                </p>
              </div>
              <div className="bg-black/20 p-4 rounded-lg">
                <p className="text-white/90 text-[14px] flex items-center gap-2">
                  <span className="text-xl">🚀</span>
                  First access to proven converting campaigns
                </p>
              </div>
              <div className="bg-black/20 p-4 rounded-lg">
                <p className="text-white/90 text-[14px] flex items-center gap-2">
                  <span className="text-xl">🤝</span>
                  Direct advertiser relationships & dedicated support
                </p>
              </div>
              <div className="bg-black/20 p-4 rounded-lg">
                <p className="text-white/90 text-[14px] flex items-center gap-2">
                  <span className="text-xl">📈</span>
                  Weekly optimization calls & scaling strategies
                </p>
              </div>
            </div>
          </CardHeader>

          {/* About Nick section - moved outside CardHeader */}
          <div className="bg-[#1A1A1A] border-b border-gray-800/50">
            <div className="px-8 py-10 space-y-6">
              <div className="flex items-start gap-6">
                <img
                  src="/nick.jpeg" // Add this image to your public folder
                  alt="Nick Torson"
                  className="w-24 h-24 rounded-lg object-cover"
                />
                <div className="space-y-2">
                  <h3 className="text-[20px] font-light text-white/90">
                    About Nick Torson
                  </h3>
                  <p className="text-white/60 text-[15px] font-light">
                    Founder & CEO of Convert2Freedom
                  </p>
                </div>
              </div>
              
              <p className="text-white/80 text-[15px] leading-relaxed">
                As one of the industry's most successful media buying coaches, I've mentored hundreds of buyers to 7-figure success, including coaching Robby Blanchard - known as the #1 affiliate in the world. My expertise isn't just theory - I've personally generated over $500M in revenue through paid traffic and continue to actively scale campaigns.
              </p>
              
              <p className="text-white/80 text-[15px] leading-relaxed">
                At C2F, I bring the same mentorship approach to our network. Our media buyers get direct access to my proven strategies, optimization techniques, and scaling methods that have helped create multiple 7-figure success stories. This isn't just a network - it's a partnership focused on scaling your campaigns with proven methods that work.
              </p>
              
              <div className="space-y-3 pt-2">
                <h4 className="text-[16px] font-medium text-white/90">
                  Why partner with C2F:
                </h4>
                <ul className="space-y-2">
                  {[
                    'Direct mentorship from a proven industry leader',
                    'Coached hundreds of media buyers to 7-figure success',
                    'Mentored top industry names including Robby Blanchard',
                    'Generated $500M+ in revenue through paid advertising',
                    'Active hands-on support in campaign optimization',
                    'Weekly strategy calls and scaling guidance'
                  ].map(point => (
                    <li key={point} className="flex items-start gap-2 text-white/70 text-[14px]">
                      <span className="text-red-500 mt-1">•</span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <CardContent className="p-8 space-y-10">
            {/* Contact Section */}
            <section className="space-y-4">
              <h3 className="text-[20px] font-light text-white/90">Contact Information</h3>
              <div className="grid grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-[13px] text-white/50 font-normal">Name</label>
                  <input
                    type="text"
                    name="contactName"
                    value={formData.contactName}
                    onChange={handleContactChange}
                    className="w-full h-12 px-4 bg-[#1A1A1A] border border-gray-800/50 rounded text-white/90 text-[15px]
                             focus:border-gray-700 focus:outline-none transition-colors"
                    required
                    data-form-type="other"
                    autoComplete="off"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[13px] text-white/50 font-normal">Email</label>
                  <input
                    type="email"
                    name="contactEmail"
                    value={formData.contactEmail}
                    onChange={handleContactChange}
                    className="w-full h-12 px-4 bg-[#1A1A1A] border border-gray-800/50 rounded text-white/90 text-[15px]
                             focus:border-gray-700 focus:outline-none transition-colors"
                    required
                    data-form-type="other"
                    autoComplete="off"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[13px] text-white/50 font-normal">Telegram ID</label>
                  <input
                    type="text"
                    name="telegramId"
                    value={formData.telegramId}
                    onChange={handleContactChange}
                    className="w-full h-12 px-4 bg-[#1A1A1A] border border-gray-800/50 rounded text-white/90 text-[15px]
                             focus:border-gray-700 focus:outline-none transition-colors"
                    placeholder="@username"
                    required
                    data-form-type="other"
                    autoComplete="off"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[13px] text-white/50 font-normal">Skype ID</label>
                  <input
                    type="text"
                    name="skypeId"
                    value={formData.skypeId}
                    onChange={handleContactChange}
                    className="w-full h-12 px-4 bg-[#1A1A1A] border border-gray-800/50 rounded text-white/90 text-[15px]
                             focus:border-gray-700 focus:outline-none transition-colors"
                    placeholder="live:.cid.123456789"
                    required
                    data-form-type="other"
                    autoComplete="off"
                  />
                </div>
              </div>
            </section>

            {/* Performance Overview */}
            <section className="space-y-4">
              <h3 className="text-[20px] font-light text-white/90">Performance Overview</h3>
              <div className="grid grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-[13px] text-white/50 font-normal">Monthly Ad Spend</label>
                  <select
                    name="monthlySpend"
                    value={formData.monthlySpend}
                    onChange={handleSelectChange}
                    className={`w-full h-12 px-4 bg-[#1A1A1A] border rounded text-white/90 text-[15px]
                              focus:border-gray-700 focus:outline-none appearance-none
                              ${formErrors.monthlySpend ? 'border-red-500' : 'border-gray-800/50'}`}
                    required
                  >
                    <option value="">Select monthly spend</option>
                    <option value="10k-50k">$10K - $50K</option>
                    <option value="50k-100k">$50K - $100K</option>
                    <option value="100k-500k">$100K - $500K</option>
                    <option value="500k+">$500K+</option>
                  </select>
                  {formErrors.monthlySpend && (
                    <p className="text-red-500 text-xs mt-1">Please select monthly ad spend</p>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="text-[13px] text-white/50 font-normal">Average ROAS</label>
                  <select
                    name="averageRoas"
                    value={formData.averageRoas}
                    onChange={handleSelectChange}
                    className={`w-full h-12 px-4 bg-[#1A1A1A] border rounded text-white/90 text-[15px]
                              focus:border-gray-700 focus:outline-none appearance-none
                              ${formErrors.averageRoas ? 'border-red-500' : 'border-gray-800/50'}`}
                    required
                  >
                    <option value="">Select ROAS range</option>
                    <option value="1-2x">1-2x</option>
                    <option value="2-3x">2-3x</option>
                    <option value="3-4x">3-4x</option>
                    <option value="4x+">4x+</option>
                  </select>
                  {formErrors.averageRoas && (
                    <p className="text-red-500 text-xs mt-1">Please select average ROAS</p>
                  )}
                </div>
              </div>
            </section>

            {/* Team & Operations */}
            <section className="space-y-4">
              <h3 className="text-[20px] font-light text-white/90">Team & Operations</h3>
              <div className="space-y-5">
                <div className="space-y-2">
                  <label className="text-[13px] text-white/50 font-normal">Team Size</label>
                  <select
                    name="teamSize"
                    value={formData.teamSize}
                    onChange={handleSelectChange}
                    className={`w-full h-12 px-4 bg-[#1A1A1A] border rounded text-white/90 text-[15px]
                              focus:border-gray-700 focus:outline-none appearance-none
                              ${formErrors.teamSize ? 'border-red-500' : 'border-gray-800/50'}`}
                    required
                  >
                    <option value="">Select team size</option>
                    <option value="solo">Solo Operator</option>
                    <option value="2-5">2-5 People</option>
                    <option value="6-10">6-10 People</option>
                    <option value="10+">10+ People</option>
                  </select>
                  {formErrors.teamSize && (
                    <p className="text-red-500 text-xs mt-1">Please select team size</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <label className="text-[13px] text-white/50 font-normal">
                    What percentage of profit are you looking for?
                  </label>
                  <select
                    name="profitShare"
                    value={formData.profitShare}
                    onChange={handleSelectChange}
                    className={`w-full h-12 px-4 bg-[#1A1A1A] border rounded text-white/90 text-[15px]
                              focus:border-gray-700 focus:outline-none appearance-none
                              ${formErrors.profitShare ? 'border-red-500' : 'border-gray-800/50'}`}
                    required
                  >
                    <option value="">Select profit share</option>
                    <option value="10-20">10-20% of profit</option>
                    <option value="20-30">20-30% of profit</option>
                    <option value="30-40">30-40% of profit</option>
                    <option value="40-50">40-50% of profit</option>
                    <option value="50+">50%+ of profit</option>
                    <option value="open">Open to discussion based on volume</option>
                  </select>
                  {formErrors.profitShare && (
                    <p className="text-red-500 text-xs mt-1">Please select profit share</p>
                  )}
                </div>
              </div>
            </section>

            {/* Verticals Section */}
            <section className="space-y-6">
              <h3 className="text-[20px] font-light text-white/90">Industry Verticals</h3>
              <div className="space-y-6">
                {verticalCategories.map(category => (
                  <div key={category.name} className="space-y-3">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        id={category.name}
                        checked={formData.selectedVerticalCategories.includes(category.name)}
                        onChange={() => handleVerticalToggle(category.name)}
                        className="h-4 w-4 rounded border-gray-700 accent-red-500"
                      />
                      <label className="text-[15px] text-white/90 font-medium">
                        {category.name}
                      </label>
                    </div>

                    {formData.selectedVerticalCategories.includes(category.name) && (
                      <div className="grid grid-cols-2 gap-2 ml-7">
                        {category.subcategories.map(sub => (
                          <div key={sub} className="flex items-center gap-3">
                            <input
                              type="checkbox"
                              id={sub}
                              checked={formData.selectedSubcategories[category.name]?.includes(sub)}
                              onChange={() => handleSubcategoryToggle(category.name, sub)}
                              className="h-4 w-4 rounded border-gray-700 accent-red-500"
                            />
                            <label className="text-[13px] text-white/70">
                              {sub}
                            </label>
                          </div>
                        ))}
                      </div>
                    )}

                    {category.name === 'Other' && 
                     formData.selectedVerticalCategories.includes('Other') && (
                      <input
                        type="text"
                        name="otherVertical"
                        value={formData.otherVertical}
                        onChange={handleContactChange}
                        placeholder="Please specify vertical"
                        className="w-full h-10 px-3 ml-7 bg-[#1A1A1A] border border-gray-800/50 rounded 
                                 text-[13px] text-white/60 focus:border-gray-700 focus:outline-none"
                      />
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* Networks Section */}
            <section className="space-y-4">
              <h3 className="text-[20px] font-light text-white/90">Ad Networks & Spend</h3>
              <div className="space-y-3">
                {networks.map(network => (
                  <div key={network} 
                       className="flex items-center gap-4 px-4 py-3.5 bg-[#1A1A1A] border border-gray-800/50 rounded">
                    <input
                      type="checkbox"
                      id={network}
                      checked={formData.selectedNetworks.includes(network)}
                      onChange={() => handleNetworkToggle(network)}
                      className="h-4 w-4 rounded border-gray-700 accent-red-500"
                    />
                    <label className="text-[14px] text-white/70 flex-1">{network}</label>
                    
                    {network === 'Other' && formData.selectedNetworks.includes('Other') && (
                      <input
                        type="text"
                        name="otherPlatform"
                        value={formData.otherPlatform}
                        onChange={handleContactChange}
                        placeholder="Please specify platform"
                        className="w-44 h-10 px-3 bg-[#111] border border-gray-800/50 rounded text-[13px] text-white/60
                                 focus:border-gray-700 focus:outline-none"
                      />
                    )}
                    
                    {formData.selectedNetworks.includes(network) && (
                      <select
                        value={formData.spendRanges[network] || ''}
                        onChange={(e) => handleSpendRangeChange(network, e.target.value)}
                        className="w-44 h-10 px-3 bg-[#111] border border-gray-800/50 rounded text-[13px] text-white/60
                                 focus:border-gray-700 focus:outline-none appearance-none"
                      >
                        <option value="">Select spend range</option>
                        <option value="0-10k">$0-10k/month</option>
                        <option value="10k-50k">$10k-50k/month</option>
                        <option value="50k-100k">$50k-100k/month</option>
                        <option value="100k-500k">$100k-500k/month</option>
                        <option value="500k+">$500k+/month</option>
                      </select>
                    )}
                  </div>
                ))}
              </div>
            </section>
          </CardContent>
        </Card>
      </form>
    </div>
  );
};

export default MediaBuyerForm;