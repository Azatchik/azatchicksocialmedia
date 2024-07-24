import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { MusicPlayerPlaylist } from './MusicPlayerPlaylist';

export default {
    title: 'shared/MusicPlayerPlaylist',
    component: MusicPlayerPlaylist,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof MusicPlayerPlaylist>;

const Template: ComponentStory<typeof MusicPlayerPlaylist> = (args) => <MusicPlayerPlaylist {...args} />;

export const Normal = Template.bind({});
Normal.args = {};
