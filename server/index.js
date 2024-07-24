import express from 'express';
import mongoose from "mongoose";
import fileUpload from 'express-fileupload';
import cors from "cors";
import dotenv from 'dotenv'
import config from './config.js';
import path from 'path';

import authenticationsRouter from './routes/authenticationsRouter.js';
import usersRouter from "./routes/usersRouter.js";
import profilesRouter from "./routes/profilesRouter.js";
import checkIP from "./middlewares/checkIP.js";
import resetsRouter from "./routes/resetsRouter.js";
import musicRouter from "./routes/musicRouter.js";
import Music from "./models/Music.js";

dotenv.config();

const PORT = process.env.PORT;
const app = express();
const corsOptions = {
    origin: config.ALLOWEDIPs,
    optionsSuccessStatus: 200
}

app.use(express.json())
app.use(cors(corsOptions));
// app.use(checkIP(config.ALLOWEDIPs));
app.use(fileUpload({}))
app.use(async (req, res, next) => {
    if (req.url.includes('audio')) {
        const music = await Music.findOne({file: req.url.split('/')[3]})
        if (!music) {
            return res.status(400).send('<div><center><h1>file not found 404</h1></center></div>')
        }

        const name = music.name ? music.name : 'Unknown';
        const artist = music.artist ? music.artist : 'Unknown';
        const fileName = `${name} - ${artist}.mp3`;
        res.attachment(fileName);
    }
    next();
});
app.use('/static', express.static(path.resolve('static')))
app.use('/api/authentication', authenticationsRouter)
app.use('/api/users', usersRouter)
app.use('/api/profiles', profilesRouter)
app.use('/api/resets', resetsRouter)
app.use('/api/music', musicRouter)


const startApp = async () => {
    try {
        await mongoose.connect(config.DB_URL)
        app.listen(PORT, () => console.log(`server started on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

startApp()




//////////////
// app.get('/music/*', (req, res) => {
//     const filePath = path.resolve('static', 'music', req.params[0]);
//     console.log(filePath)
//     res.setHeader('Content-Disposition', 'attachment; filename="' + path.basename(filePath) + '"');
//     res.sendFile(filePath);
// });
//
// app.delete('/music/*', async (req, res) => {
//     const filePath = path.resolve('static', 'music', req.params[0]);
//     await fs.rm(filePath, (err) => console.log(err));
//     res.send('Удален');
// });
//
// app.get('/posts/*', (req, res) => {
//     const filePath = path.resolve('static', 'posts', req.params[0]);
//
//     res.setHeader('Content-Disposition', 'attachment; filename="' + path.basename(filePath) + '"');
//     res.sendFile(filePath);
// });
