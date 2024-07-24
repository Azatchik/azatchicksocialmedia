import { MusicSchema } from 'entities/Music';

export interface ProfileMediaMusicSchema {
    music?: MusicSchema[];
    isLoading?: boolean;
    error?: string;

    _inited: boolean;
}
