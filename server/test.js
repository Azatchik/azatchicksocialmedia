import { parseFile } from 'music-metadata';
import path from 'path';
import LZString from 'lz-string';

async function getMetadata(audioFilePath) {
    try {
        const metadata = await parseFile(audioFilePath);
        console.log(metadata.common.artist); // Выводит имя артиста
        console.log(metadata.common.title); // Выводит имя артиста
        const compressedBase64 = LZString.compressToUTF16(metadata.common.picture[0].data);
        console.log(compressedBase64); // Выводит имя артиста
    } catch (error) {
        console.error('Ошибка при извлечении метаданных:', error);
    }
}

getMetadata(path.resolve('static', 'profiles', 'music4.mp3'));
