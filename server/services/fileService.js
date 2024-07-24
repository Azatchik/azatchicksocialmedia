import * as uuid from 'uuid';
import * as path from 'path';
import sharp from 'sharp';
import * as fs from "fs";
import {parseFile} from "music-metadata";
import { getAudioDurationInSeconds } from "get-audio-duration";

class FileService {
    async saveImage(file, catalog) {
        try {
            const fileType = file.mimetype.split('/')[0];
            const fileName = fileType + uuid.v4() + `.jpg`;
            const filePath = path.resolve('static', catalog, fileName);
            await sharp(file.data)
                .resize(1000, 1000, {
                    fit: sharp.fit.inside,
                    withoutEnlargement: true
                })
                .toFile(filePath)


            return fileName;
        } catch (e)  {
            console.log(e)
        }
    }

    async saveMusic(file, catalog) {
        try {
            const fileType = file.mimetype.split('/')[0];
            const fileName = fileType + uuid.v4() + `.mp3`;
            const filePath = path.resolve('static', catalog, fileName);
            await file.mv(filePath);


            const metadata = await parseFile(filePath);

            let artist = '';
            if (metadata.common.artist) {
                artist = metadata.common.artist;
            }
            let name = '';
            if (metadata.common.title) {
                name = metadata.common.title;
            }


            let musicImgFile = '';
            if (metadata.common.picture) {
                if(metadata.common.picture.length) {
                    musicImgFile = metadata.common.picture[0];
                }
            }

            let musicImageFileName = '';
            let imgFilePath = '';

            if(musicImgFile) {
                const musicImgFileType = metadata.common.picture[0].format.split('/')[0];
                musicImageFileName = musicImgFileType + uuid.v4() + `.jpg`;
                imgFilePath = path.resolve('static', catalog, musicImageFileName);
                await fs.writeFile(imgFilePath, musicImgFile.data, (err) => {
                    if(err) {
                        console.log(err);
                    }
                });
            }


            return {
                file: fileName,
                artist,
                name,
                image: musicImageFileName,
            };
        } catch (e)  {
            console.log(e)
        }
    }
    async deleteFiles(files, catalog) {
        try {
            const catalogPath = path.resolve('static', catalog);

            files.forEach((file) => fs.unlink(`${catalogPath}/${file}`, (err) => {
                if(err) {
                    console.error('Произошла ошибка при удалении файла:', err);
                }
                console.log(`${file}: файл успешно удален`);
            })
            );

            return 'Success';
        } catch (e)  {
            console.log(e)
        }
    }
}

export default new FileService();
