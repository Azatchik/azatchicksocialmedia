import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { SubscribeRecommendations } from './SubscribeRecommendations';

export default {
    title: 'shared/SubscribeRecommendations',
    component: SubscribeRecommendations,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof SubscribeRecommendations>;

const Template: ComponentStory<typeof SubscribeRecommendations> = (args) => <SubscribeRecommendations {...args} />;

export const Normal = Template.bind({});
Normal.args = {};
