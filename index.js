
import express from 'express';
import axios from 'axios';

const app = express();
const port = 3000;

app.use(express.static("public"));
app.get("/", async (req, res) => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 0);
    const yesterdayDate = yesterday.toISOString().split('T')[0];
    try {
        const picture = await axios.get(`https://api.nasa.gov/planetary/apod?api_key=${process.env.API_KEY}&date=${yesterdayDate}`)
        console.log(picture.data)
        res.render("index.ejs", { url: picture.data.hdurl, mediaType: picture.data.media_type, videourl: picture.data.url, title: picture.data.title, explanation: picture.data.explanation })
    } catch (error) {
        console.log(JSON.stringify(error.response.data))
    }
})
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});