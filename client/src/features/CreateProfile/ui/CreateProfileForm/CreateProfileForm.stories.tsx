import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import CreateProfileForm from './CreateProfileForm';

export default {
    title: 'features/CreateProfileForm',
    component: CreateProfileForm,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof CreateProfileForm>;

const Template: ComponentStory<typeof CreateProfileForm> = (args) => <CreateProfileForm {...args} />;

export const Normal = Template.bind({});
Normal.args = {};
