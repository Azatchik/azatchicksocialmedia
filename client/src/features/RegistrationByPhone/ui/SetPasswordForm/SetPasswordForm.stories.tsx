import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import SetPasswordForm from './SetPasswordForm';

export default {
    title: 'shared/SetPasswordForm',
    component: SetPasswordForm,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof SetPasswordForm>;

const Template: ComponentStory<typeof SetPasswordForm> = (args) => <SetPasswordForm {...args} />;

export const Normal = Template.bind({});
Normal.args = {};
