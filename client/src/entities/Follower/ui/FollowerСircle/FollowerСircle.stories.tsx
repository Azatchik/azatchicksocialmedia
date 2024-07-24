import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { FollowerСircle } from './FollowerСircle';

export default {
    title: 'entities/FollowerCircle',
    component: FollowerСircle,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof FollowerСircle>;

const Template: ComponentStory<typeof FollowerСircle> = (args) => <FollowerСircle {...args} />;

export const Normal = Template.bind({});
Normal.args = {};
