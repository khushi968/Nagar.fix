// NOTE: In a real production app, API calls should go through the backend to hide the key.
// For this demo, we are doing it client-side as requested or for simplicity, 
// but ideally we should proxy through our server.
// Since we have a backend, let's try to keep it simple. 
// We will assume the user might put the key here or we mock it.

const OPENAI_API_KEY = ''; // User needs to set this or we use backend proxy

const AI = {
    async enhanceDescription(text) {
        if (!text) return "Please enter a description first.";

        // Mock response if no key
        if (!OPENAI_API_KEY) {
            return `[AI Enhanced] ${text} - This issue requires immediate attention due to public safety concerns.`;
        }

        try {
            const response = await this.callOpenAI([
                { role: "system", content: "You are a helpful assistant that improves report descriptions for local government issues. Make them clear, professional, and concise." },
                { role: "user", content: `Enhance this complaint description: "${text}"` }
            ]);
            return response;
        } catch (error) {
            console.error("AI Error:", error);
            return text;
        }
    },

    async detectCategory(text) {
        if (!OPENAI_API_KEY) {
            const keywords = {
                'pothole': 'Pothole',
                'road': 'Pothole',
                'garbage': 'Garbage',
                'trash': 'Garbage',
                'light': 'Streetlight',
                'dark': 'Streetlight',
                'water': 'Water Supply',
                'leak': 'Water Supply'
            };
            for (const [key, val] of Object.entries(keywords)) {
                if (text.toLowerCase().includes(key)) return val;
            }
            return 'Other';
        }

        try {
            const response = await this.callOpenAI([
                { role: "system", content: "Classify the complaint into one of these categories: Pothole, Garbage, Streetlight, Water Supply, Other. Return only the category name." },
                { role: "user", content: text }
            ]);
            return response.trim();
        } catch (error) {
            return 'Other';
        }
    },

    async detectSeverity(text) {
        if (!OPENAI_API_KEY) {
            if (text.toLowerCase().includes('danger') || text.toLowerCase().includes('accident') || text.toLowerCase().includes('urgent')) return 'High';
            return 'Medium';
        }

        try {
            const response = await this.callOpenAI([
                { role: "system", content: "Analyze the severity of this complaint (High, Medium, Low). Return only the severity level." },
                { role: "user", content: text }
            ]);
            return response.trim();
        } catch (error) {
            return 'Medium';
        }
    },

    async generateReply(report) {
        if (!OPENAI_API_KEY) {
            return `Dear ${report.name},\n\nThank you for reporting the issue regarding ${report.category} at ${report.location}. We have received your complaint (ID: ${report.id}) and our team has been notified.\n\nSeverity: ${report.severity}\nStatus: ${report.status}\n\nRegards,\nNagar Seva Team`;
        }

        try {
            const response = await this.callOpenAI([
                { role: "system", content: "Write a polite and professional official response to a citizen's complaint. Mention the ID and status." },
                { role: "user", content: `Complaint Details: ${JSON.stringify(report)}` }
            ]);
            return response;
        } catch (error) {
            return "Error generating reply.";
        }
    },

    async callOpenAI(messages) {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: messages,
                temperature: 0.7
            })
        });
        const data = await response.json();
        return data.choices[0].message.content;
    }
};
