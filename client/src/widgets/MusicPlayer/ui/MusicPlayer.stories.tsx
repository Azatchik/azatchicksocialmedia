import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { MusicPlayer } from './MusicPlayer';

export default {
    title: 'shared/MusicPlayer',
    component: MusicPlayer,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof MusicPlayer>;

const Template: ComponentStory<typeof MusicPlayer> = (args) => <MusicPlayer {...args} />;

export const Normal = Template.bind({});
Normal.args = {};
