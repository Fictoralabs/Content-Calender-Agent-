
import { GoogleGenAI, Type } from "@google/genai";
import type { FormState, ContentStrategy } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const buildPrompt = (formData: FormState): string => {
    return `
    ### ROLE
    You are a Strategic Content Marketing Manager with 10+ years of experience developing comprehensive content strategies for B2B and B2C brands. You specialize in creating data-driven content calendars that drive engagement, lead generation, and brand awareness across multiple platforms.

    ### GOAL
    Create comprehensive, platform-optimized content calendars that align with business objectives, audience preferences, and seasonal opportunities while maintaining consistent brand voice and maximizing engagement.

    ### RULES
    - YOU MUST align all content with specified business goals and target audience
    - YOU MUST research platform-specific best practices and optimal posting times
    - YOU MUST include diverse content types and formats for maximum engagement
    - YOU MUST provide specific copy suggestions, not just content ideas
    - YOU MUST include performance tracking recommendations

    ### CONTEXT PROVIDED
    <brand_information>
    ${formData.brandInfo}
    </brand_information>

    <content_parameters>
    ${formData.contentParams}
    </content_parameters>

    <current_content_assets>
    ${formData.currentAssets}
    </current_content_assets>
    
    ### TASK
    Based on the context provided, generate a comprehensive content strategy and a 30-day content calendar. Follow the detailed output format requested in the JSON schema. Ensure the response is a valid JSON object.
    `;
};


export const generateContentStrategy = async (formData: FormState): Promise<ContentStrategy> => {
    const prompt = buildPrompt(formData);

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    contentStrategyOverview: {
                        type: Type.OBJECT,
                        properties: {
                            monthlyTheme: { type: Type.STRING, description: "Overarching content theme for the month" },
                            keyObjectives: { type: Type.ARRAY, items: { type: Type.STRING }, description: "3-4 specific goals this calendar will achieve" },
                            contentPillars: {
                                type: Type.ARRAY,
                                items: {
                                    type: Type.OBJECT,
                                    properties: {
                                        pillar: { type: Type.STRING },
                                        distribution: { type: Type.STRING }
                                    },
                                },
                                description: "4-5 content categories with distribution percentages"
                            },
                            successMetrics: { type: Type.ARRAY, items: { type: Type.STRING }, description: "KPIs to track performance" },
                        }
                    },
                    platformSpecificStrategies: {
                        type: Type.ARRAY,
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                platform: { type: Type.STRING },
                                postingFrequency: { type: Type.STRING, description: "Number of posts per week" },
                                optimalPostingTimes: { type: Type.STRING },
                                contentFocus: { type: Type.STRING },
                                hashtagStrategy: { type: Type.STRING }
                            }
                        }
                    },
                    contentCalendar: {
                        type: Type.ARRAY,
                        description: "A 30-day content calendar",
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                date: { type: Type.STRING },
                                platform: { type: Type.STRING },
                                contentType: { type: Type.STRING },
                                topicTheme: { type: Type.STRING },
                                postCopy: { type: Type.STRING, description: "Full copy text for the post" },
                                visualRequirements: { type: Type.STRING, description: "Image/video specifications" },
                                hashtags: { type: Type.STRING },
                                cta: { type: Type.STRING, description: "Call to Action" },
                                notes: { type: Type.STRING, description: "Special notes for the post" }
                            }
                        }
                    },
                    contentBriefs: {
                        type: Type.ARRAY,
                        description: "Expanded briefs for 2-3 major posts",
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                objective: { type: Type.STRING },
                                targetAudience: { type: Type.STRING },
                                keyMessage: { type: Type.STRING },
                                fullCopy: { type: Type.STRING },
                                visualConcept: { type: Type.STRING },
                                engagementStrategy: { type: Type.STRING },
                                successMetrics: { type: Type.STRING },
                            }
                        }
                    }
                }
            }
        }
    });

    try {
        const jsonString = response.text.trim();
        const parsedJson = JSON.parse(jsonString);
        return parsedJson as ContentStrategy;
    } catch (e) {
        console.error("Failed to parse Gemini response as JSON", e);
        console.error("Raw response:", response.text);
        throw new Error("The AI response was not in the expected JSON format.");
    }
};
