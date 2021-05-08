const express = require('express');
const app = express();

// app.use((req, res) => {
//    console.log("Request recieved.")
//    res.send('<h1>TEST RESPONSE</h1>')
//})

app.get('/', (req, res) => {
    res.send("HOME PAGE")
})

app.get('/path', (req, res) => {
    res.send("PATH")
})

app.get('/r/:subreddit', (req, res) => {
    const { subreddit, postId } = req.params;
    res.send(`<h1>Viewing Post ID: ${postId} on the ${subreddit} subreddit</h1>`)
})

app.get('/r/:subreddit/:postId', (req, res) => {
    const { subreddit } = req.params;
    res.send(`<h1>Browsing the ${subreddit} subreddit</h1>`)
})

// Express handles query strings for you
app.get('/search', (req, res) => {
    const { q } = req.query;
    if (!q) {
        res.send('Nothing found if nothing searched')
    }
    console.log("REQUEST_QUERY");
    res.send(`Search results for ${q}`)
})

app.post('/path', (req, res) => {
    res.send("POSTING REQUEST TO PATH")
})

app.listen(3000, () => {
    console.log('listening on port 3000');
})