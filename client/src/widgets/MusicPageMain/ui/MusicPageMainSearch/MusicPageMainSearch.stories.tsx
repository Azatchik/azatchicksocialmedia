import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { MusicPageMainSearch } from './MusicPageMainSearch';

export default {
    title: 'shared/MusicPageMainSearch',
    component: MusicPageMainSearch,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof MusicPageMainSearch>;

const Template: ComponentStory<typeof MusicPageMainSearch> = (args) => <MusicPageMainSearch {...args} />;

export const Normal = Template.bind({});
Normal.args = {};
