const axios = require("axios");

module.exports.fetchReddit = async () => {
    try {
        const subreddits = ["artificial", "MachineLearning", "ChatGPT"];
        let posts = [];

        for (let sub of subreddits) {
            const res = await axios.get(`https://www.reddit.com/r/${sub}/hot.json?limit=20`);

            const data = res.data.data.children.map(p => ({
                title: p.data.title,
                upvotes: p.data.ups,
                comments: p.data.num_comments
            }));

            posts.push(...data);
        }

        return posts;
    } catch (err) {
        console.log("Reddit Fetch Error:", err.message);
        return [];
    }
};