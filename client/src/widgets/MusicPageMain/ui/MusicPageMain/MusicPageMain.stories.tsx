import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { MusicPageMain } from './MusicPageMain';

export default {
    title: 'shared/MusicPageMain',
    component: MusicPageMain,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof MusicPageMain>;

const Template: ComponentStory<typeof MusicPageMain> = (args) => <MusicPageMain {...args} />;

export const Normal = Template.bind({});
Normal.args = {};
