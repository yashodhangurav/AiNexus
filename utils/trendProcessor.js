module.exports.processTrends = (redditData, hnData, toolList = []) => {
    let toolMap = {};

    const isTool = (title) => {
        if (toolList.length > 0) {
            return toolList.find(tool => title.toLowerCase().includes(tool.toLowerCase()));
        }
        return title.split(" ").slice(0, 2).join(" "); // Fallback
    };

    // Reddit scoring
    redditData.forEach(post => {
        const toolName = isTool(post.title);
        if (toolName) {
            const score = (post.upvotes * 2) + (post.comments * 3);
            toolMap[toolName] = (toolMap[toolName] || 0) + score;
        }
    });

    // HN scoring
    hnData.forEach(post => {
        const toolName = isTool(post.title);
        if (toolName) {
            toolMap[toolName] = (toolMap[toolName] || 0) + (post.score * 2);
        }
    });

    // Convert to array
    let tools = Object.keys(toolMap).map(name => ({
        name: name.charAt(0).toUpperCase() + name.slice(1),
        score: toolMap[name]
    }));

    // Sort
    tools.sort((a, b) => b.score - a.score);

    return {
        hot: tools.slice(0, 5),
        rising: tools.slice(5, 12)
    };
};