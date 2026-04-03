const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

module.exports.extractToolNames = async (titles) => {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
        const prompt = `Extract a list of specific AI tool names (e.g., ChatGPT, Claude, Midjourney) from the following news titles. 
        Only return the tool names separated by commas. If no specific tool is mentioned, ignore that title.
        
        Titles:
        ${titles}`;

        const result = await model.generateContent(prompt);
        return result.response.text().split(",").map(t => t.trim()).filter(t => t.length > 0);
    } catch (err) {
        console.error("AI Extraction Error:", err);
        return [];
    }
};
