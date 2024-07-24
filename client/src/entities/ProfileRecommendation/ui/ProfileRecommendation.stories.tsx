import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { ProfileRecommendation } from './ProfileRecommendation';

export default {
    title: 'shared/ProfileRecommendation',
    component: ProfileRecommendation,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ProfileRecommendation>;

const Template: ComponentStory<typeof ProfileRecommendation> = (args) => <ProfileRecommendation {...args} />;

export const Normal = Template.bind({});
Normal.args = {};
