import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { FollowerCard } from './FollowerCard';

export default {
    title: 'shared/FollowerCard',
    component: FollowerCard,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof FollowerCard>;

const Template: ComponentStory<typeof FollowerCard> = (args) => <FollowerCard {...args} />;

export const Normal = Template.bind({});
Normal.args = {};
