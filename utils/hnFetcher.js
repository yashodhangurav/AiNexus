const axios = require("axios");

module.exports.fetchHN = async () => {
    try {
        const idsRes = await axios.get("https://hacker-news.firebaseio.com/v0/topstories.json");
        const ids = idsRes.data.slice(0, 20);

        let posts = [];

        for (let id of ids) {
            const item = await axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);

            if (item.data.title && item.data.title.toLowerCase().includes("ai")) {
                posts.push({
                    title: item.data.title,
                    score: item.data.score || 0
                });
            }
        }

        return posts;
    } catch (err) {
        console.log("HN Fetch Error:", err.message);
        return [];
    }
};