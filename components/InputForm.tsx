
import React, { useState } from 'react';
import type { FormState } from '../types';

interface InputFormProps {
  initialState: FormState;
  onSubmit: (formData: FormState) => void;
}

const InfoIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 inline-block mr-2 text-slate-400">
        <path fillRule="evenodd" d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-7-4a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM9 9a.75.75 0 0 0 0 1.5h.253a.25.25 0 0 1 .244.304l-.459 2.066A1.75 1.75 0 0 0 10.747 15H11a.75.75 0 0 0 0-1.5h-.253a.25.25 0 0 1-.244-.304l.459-2.066A1.75 1.75 0 0 0 9.253 9H9Z" clipRule="evenodd" />
    </svg>
);

const FormSection: React.FC<{ title: string; description: string; children: React.ReactNode }> = ({ title, description, children }) => (
  <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700">
    <h3 className="text-xl font-semibold text-slate-100 mb-1">{title}</h3>
    <p className="text-slate-400 mb-4">{description}</p>
    {children}
  </div>
);

const TextAreaInput: React.FC<{
    id: keyof FormState;
    label: string;
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}> = ({ id, label, placeholder, value, onChange }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-slate-300 mb-2">{label}</label>
        <textarea
            id={id}
            name={id}
            rows={6}
            className="w-full bg-slate-900/80 border border-slate-600 rounded-md shadow-sm focus:ring-brand-primary focus:border-brand-primary text-slate-200 p-3 transition"
            placeholder={placeholder}
            value={value}
            onChange={onChange}
        />
    </div>
);

const InputForm: React.FC<InputFormProps> = ({ initialState, onSubmit }) => {
  const [formData, setFormData] = useState<FormState>(initialState);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };
  
  const isFormValid = formData.brandInfo.trim() !== '' && formData.contentParams.trim() !== '';

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <FormSection title="Brand Information" description="Tell us about the brand you're creating content for.">
          <TextAreaInput
            id="brandInfo"
            label="Company, Products, Voice, Audience"
            placeholder="- Company: Pixel Perfect Inc. (SaaS for designers)
- Products: UI design tool, prototyping platform
- Brand Voice: Helpful, innovative, slightly witty
- Audience: UI/UX designers, product managers, tech startups"
            value={formData.brandInfo}
            onChange={handleChange}
          />
        </FormSection>
        
        <FormSection title="Content Parameters" description="Define the scope and constraints of the content calendar.">
          <TextAreaInput
            id="contentParams"
            label="Timeframe, Platforms, Frequency"
            placeholder="- Timeframe: 30 days
- Platforms: LinkedIn, Twitter, Instagram
- Frequency: LI (3/wk), TW (5/wk), IG (4/wk)
- Campaigns: New feature launch on the 15th"
            value={formData.contentParams}
            onChange={handleChange}
          />
        </FormSection>

        <FormSection title="Current Content Assets" description="List any existing content or resources the AI can leverage. (Optional)">
          <TextAreaInput
            id="currentAssets"
            label="Blog Posts, Case Studies, Brand Style"
            placeholder="- Existing Blog: '10 Tips for Better Prototyping'
- Case Study: How Acme Corp increased conversion by 20%
- Style: Minimalist visuals, use brand color #4F46E5"
            value={formData.currentAssets}
            onChange={handleChange}
          />
        </FormSection>
      </div>

        <div className="bg-brand-light/10 border border-brand-dark p-4 rounded-lg flex items-start">
            <InfoIcon />
            <p className="text-sm text-slate-300">
                Provide as much detail as possible for a more tailored and effective content strategy. The AI will use this context to generate highly relevant post copy, themes, and platform-specific recommendations.
            </p>
        </div>

      <div className="text-center pt-4">
        <button
          type="submit"
          disabled={!isFormValid}
          className="bg-brand-primary text-white font-semibold py-3 px-8 rounded-lg shadow-md hover:bg-brand-dark transition-all duration-300 disabled:bg-slate-700 disabled:cursor-not-allowed disabled:text-slate-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-brand-primary"
        >
          Generate Content Calendar
        </button>
      </div>
    </form>
  );
};

export default InputForm;
