
import React from 'react';
import type { ContentStrategy, CalendarEntry } from '../types';

const Section: React.FC<{ title: string; children: React.ReactNode, className?: string }> = ({ title, children, className = '' }) => (
  <div className={`bg-slate-800/50 p-6 rounded-lg border border-slate-700 ${className}`}>
    <h2 className="text-2xl font-bold bg-gradient-to-r from-brand-secondary to-pink-500 text-transparent bg-clip-text mb-4">
      {title}
    </h2>
    {children}
  </div>
);

const ContentDisplay: React.FC<{ strategy: ContentStrategy; onReset: () => void; }> = ({ strategy, onReset }) => {
  
    const { contentStrategyOverview, platformSpecificStrategies, contentCalendar, contentBriefs } = strategy;

    const copyTableToClipboard = () => {
        const table = document.getElementById('content-calendar-table');
        if (table) {
            const range = document.createRange();
            range.selectNode(table);
            window.getSelection()?.removeAllRanges();
            window.getSelection()?.addRange(range);
            try {
                document.execCommand('copy');
                alert('Calendar copied to clipboard!');
            } catch (err) {
                alert('Failed to copy calendar.');
            }
            window.getSelection()?.removeAllRanges();
        }
    };

  return (
    <div className="space-y-8 animate-fade-in">
        <div className="text-center">
            <button
                onClick={onReset}
                className="bg-slate-700 text-slate-200 font-semibold py-2 px-6 rounded-lg hover:bg-slate-600 transition-colors duration-300"
            >
                Start New Strategy
            </button>
        </div>

      <Section title="Content Strategy Overview">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <h3 className="font-semibold text-slate-200">Monthly Theme</h3>
                <p className="text-slate-400">{contentStrategyOverview.monthlyTheme}</p>
            </div>
             <div>
                <h3 className="font-semibold text-slate-200">Key Objectives</h3>
                <ul className="list-disc list-inside text-slate-400 space-y-1">
                    {contentStrategyOverview.keyObjectives.map((obj, i) => <li key={i}>{obj}</li>)}
                </ul>
            </div>
             <div>
                <h3 className="font-semibold text-slate-200">Content Pillars</h3>
                <ul className="list-disc list-inside text-slate-400 space-y-1">
                    {contentStrategyOverview.contentPillars.map((pillar, i) => <li key={i}>{pillar.pillar} ({pillar.distribution})</li>)}
                </ul>
            </div>
            <div>
                <h3 className="font-semibold text-slate-200">Success Metrics</h3>
                <ul className="list-disc list-inside text-slate-400 space-y-1">
                    {contentStrategyOverview.successMetrics.map((metric, i) => <li key={i}>{metric}</li>)}
                </ul>
            </div>
        </div>
      </Section>
      
      <Section title="Platform-Specific Strategy">
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {platformSpecificStrategies.map((platform, i) => (
                <div key={i} className="bg-slate-900/70 p-4 rounded-md border border-slate-700">
                    <h3 className="text-lg font-bold text-brand-light mb-2">{platform.platform}</h3>
                    <p className="text-sm"><strong className="text-slate-300">Frequency:</strong> <span className="text-slate-400">{platform.postingFrequency}</span></p>
                    <p className="text-sm"><strong className="text-slate-300">Optimal Times:</strong> <span className="text-slate-400">{platform.optimalPostingTimes}</span></p>
                    <p className="text-sm"><strong className="text-slate-300">Content Focus:</strong> <span className="text-slate-400">{platform.contentFocus}</span></p>
                    <p className="text-sm"><strong className="text-slate-300">Hashtag Strategy:</strong> <span className="text-slate-400">{platform.hashtagStrategy}</span></p>
                </div>
            ))}
         </div>
      </Section>

      <Section title="30-Day Content Calendar">
        <div className="flex justify-end mb-4">
             <button
                onClick={copyTableToClipboard}
                className="bg-brand-primary text-white font-semibold py-2 px-4 rounded-lg text-sm hover:bg-brand-dark transition-colors duration-300"
            >
                Copy Calendar
            </button>
        </div>
        <div className="overflow-x-auto">
            <table id="content-calendar-table" className="w-full text-sm text-left text-slate-300">
                <thead className="text-xs text-slate-200 uppercase bg-slate-700/50">
                    <tr>
                        <th scope="col" className="px-4 py-3">Date</th>
                        <th scope="col" className="px-4 py-3">Platform</th>
                        <th scope="col" className="px-4 py-3">Content Type</th>
                        <th scope="col" className="px-4 py-3">Topic/Theme</th>
                        <th scope="col" className="px-4 py-3 w-1/4">Post Copy</th>
                        <th scope="col" className="px-4 py-3">Visuals</th>
                        <th scope="col" className="px-4 py-3">Hashtags</th>
                        <th scope="col" className="px-4 py-3">CTA</th>
                        <th scope="col" className="px-4 py-3">Notes</th>
                    </tr>
                </thead>
                <tbody>
                    {contentCalendar.map((entry: CalendarEntry, i: number) => (
                        <tr key={i} className="border-b border-slate-700 hover:bg-slate-800/80">
                            <td className="px-4 py-4 font-medium whitespace-nowrap">{entry.date}</td>
                            <td className="px-4 py-4">{entry.platform}</td>
                            <td className="px-4 py-4">{entry.contentType}</td>
                            <td className="px-4 py-4">{entry.topicTheme}</td>
                            <td className="px-4 py-4 whitespace-pre-wrap">{entry.postCopy}</td>
                            <td className="px-4 py-4">{entry.visualRequirements}</td>
                            <td className="px-4 py-4 text-brand-secondary">{entry.hashtags}</td>
                            <td className="px-4 py-4 font-semibold">{entry.cta}</td>
                            <td className="px-4 py-4">{entry.notes}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
      </Section>

      <Section title="Content Briefs for Major Posts">
         <div className="space-y-6">
            {contentBriefs.map((brief, i) => (
                <div key={i} className="bg-slate-900/70 p-4 rounded-md border border-slate-700">
                    <h3 className="text-lg font-bold text-brand-light mb-3">Brief: {brief.objective}</h3>
                    <div className="space-y-2 text-sm">
                        <p><strong className="text-slate-300">Target Audience:</strong> <span className="text-slate-400">{brief.targetAudience}</span></p>
                        <p><strong className="text-slate-300">Key Message:</strong> <span className="text-slate-400">{brief.keyMessage}</span></p>
                        <p><strong className="text-slate-300">Full Copy:</strong> <span className="text-slate-400 whitespace-pre-wrap">{brief.fullCopy}</span></p>
                        <p><strong className="text-slate-300">Visual Concept:</strong> <span className="text-slate-400">{brief.visualConcept}</span></p>
                        <p><strong className="text-slate-300">Engagement Strategy:</strong> <span className="text-slate-400">{brief.engagementStrategy}</span></p>
                        <p><strong className="text-slate-300">Success Metrics:</strong> <span className="text-slate-400">{brief.successMetrics}</span></p>
                    </div>
                </div>
            ))}
         </div>
      </Section>
    </div>
  );
};

export default ContentDisplay;
