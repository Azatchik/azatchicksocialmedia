import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { MusicRecommendations } from './MusicRecommendations';

export default {
    title: 'shared/MusicRecommendations',
    component: MusicRecommendations,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof MusicRecommendations>;

const Template: ComponentStory<typeof MusicRecommendations> = (args) => <MusicRecommendations {...args} />;

export const Normal = Template.bind({});
Normal.args = {};
