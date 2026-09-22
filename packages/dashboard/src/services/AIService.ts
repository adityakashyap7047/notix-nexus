interface ChatOptions {
  message: string;
  persona: string;
  userId: string;
  guildId?: string;
}

interface GenerateOptions {
  type: string;
  prompt: string;
  options: Record<string, any>;
  userId: string;
}

const PERSONAS: Record<string, string> = {
  default:
    "You are NOTIX, a helpful Discord bot assistant. You are friendly, knowledgeable, and concise.",
  professional:
    "You are NOTIX, a professional Discord bot assistant. You provide clear, formal, and helpful responses.",
  casual:
    "You are NOTIX, a fun and casual Discord bot assistant. You use a relaxed tone and occasional humor.",
  support:
    "You are NOTIX, a technical support assistant. You help users troubleshoot issues step by step.",
};

const GENERATION_TEMPLATES: Record<string, string> = {
  "welcome-message":
    "Generate a welcome message for a new member joining the Discord server. The message should be warm and inviting. Additional context: {prompt}",
  "moderation-response":
    "Generate a moderation response for a user who has violated server rules. Be firm but fair. Additional context: {prompt}",
  "ticket-response":
    "Generate a response for a support ticket. Be helpful and professional. Additional context: {prompt}",
  custom: "{prompt}",
};

export class AIService {
  private apiEndpoint: string;
  private apiKey: string;

  constructor() {
    this.apiEndpoint = process.env.AI_API_ENDPOINT || "https://api.openai.com/v1/chat/completions";
    this.apiKey = process.env.AI_API_KEY || "";
  }

  async chat(options: ChatOptions): Promise<string> {
    const systemPrompt = PERSONAS[options.persona] || PERSONAS.default;

    if (!this.apiKey) {
      return this.getMockResponse(options.message, options.persona);
    }

    try {
      const response = await fetch(this.apiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: options.message },
          ],
          max_tokens: 1000,
          temperature: 0.7,
        }),
      });

      if (!response.ok) {
        throw new Error(`AI API error: ${response.status}`);
      }

      const data = await response.json();
      return data.choices[0]?.message?.content || "I couldn't generate a response.";
    } catch (error) {
      console.error("AI chat error:", error);
      return this.getMockResponse(options.message, options.persona);
    }
  }

  async generate(options: GenerateOptions): Promise<string> {
    const template = GENERATION_TEMPLATES[options.type] || GENERATION_TEMPLATES.custom;
    const prompt = template.replace("{prompt}", options.prompt);

    if (!this.apiKey) {
      return this.getMockGeneration(options.type, options.prompt);
    }

    try {
      const response = await fetch(this.apiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content:
                "You are a content generation assistant for a Discord bot. Generate appropriate content based on the request.",
            },
            { role: "user", content: prompt },
          ],
          max_tokens: 500,
          temperature: 0.8,
          ...options.options,
        }),
      });

      if (!response.ok) {
        throw new Error(`AI API error: ${response.status}`);
      }

      const data = await response.json();
      return data.choices[0]?.message?.content || "Couldn't generate content.";
    } catch (error) {
      console.error("AI generate error:", error);
      return this.getMockGeneration(options.type, options.prompt);
    }
  }

  private getMockResponse(message: string, persona: string): string {
    const responses: Record<string, string[]> = {
      default: [
        "I'm NOTIX, your Discord bot assistant! How can I help you today?",
        "Thanks for reaching out! I'm here to assist with anything you need.",
        "That's a great question! Let me help you with that.",
      ],
      professional: [
        "Thank you for your inquiry. I'm here to provide professional assistance.",
        "I understand your request. Let me address this matter promptly.",
        "Your question has been noted. I will provide a detailed response shortly.",
      ],
      casual: [
        "Hey there! What's up? I'm here to help!",
        "No worries, I've got you covered!",
        "Awesome question! Let me break it down for you.",
      ],
      support: [
        "I understand you're experiencing an issue. Let's troubleshoot this together.",
        "Thank you for reporting this. I'll help you resolve it step by step.",
        "Let me guide you through the solution for this problem.",
      ],
    };

    const personaResponses = responses[persona] || responses.default;
    return personaResponses[Math.floor(Math.random() * personaResponses.length)];
  }

  private getMockGeneration(type: string, prompt: string): string {
    const generations: Record<string, string> = {
      "welcome-message": `Welcome to the server! We're thrilled to have you join our community. Feel free to introduce yourself and check out our channels. If you have any questions, don't hesitate to ask!`,
      "moderation-response": `Your recent behavior has violated our community guidelines. Please review the rules and ensure future compliance. Continued violations may result in further action.`,
      "ticket-response": `Thank you for reaching out to our support team. We've received your request and will look into this matter. A team member will get back to you shortly.`,
      custom: `Generated content based on: "${prompt}". This is a placeholder response. Connect an AI API for real content generation.`,
    };

    return generations[type] || generations.custom;
  }
}
