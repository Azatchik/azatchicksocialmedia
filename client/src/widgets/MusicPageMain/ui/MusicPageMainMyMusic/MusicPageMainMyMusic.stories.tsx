import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { MusicPageMainMyMusic } from './MusicPageMainMyMusic';

export default {
    title: 'shared/MusicPageMainMyMusic',
    component: MusicPageMainMyMusic,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof MusicPageMainMyMusic>;

const Template: ComponentStory<typeof MusicPageMainMyMusic> = (args) => <MusicPageMainMyMusic {...args} />;

export const Normal = Template.bind({});
Normal.args = {};
