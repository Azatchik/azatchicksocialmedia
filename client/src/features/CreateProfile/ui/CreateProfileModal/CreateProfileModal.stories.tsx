import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { CreateProfileModal } from './CreateProfileModal';

export default {
    title: 'features/CreateProfileModal',
    component: CreateProfileModal,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof CreateProfileModal>;

const Template: ComponentStory<typeof CreateProfileModal> = (args) => <CreateProfileModal {...args} />;

export const Normal = Template.bind({});
Normal.args = {};
