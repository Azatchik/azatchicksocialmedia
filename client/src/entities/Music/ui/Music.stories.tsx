import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { Music } from './Music';

export default {
    title: 'shared/Subscription',
    component: Music,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Music>;

const Template: ComponentStory<typeof Music> = (args) => <Music {...args} />;

export const Normal = Template.bind({});
Normal.args = {};
