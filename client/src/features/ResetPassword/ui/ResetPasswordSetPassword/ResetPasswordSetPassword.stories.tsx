import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import ResetPasswordSetPassword from './ResetPasswordSetPassword';

export default {
    title: 'shared/SetPasswordForm',
    component: ResetPasswordSetPassword,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ResetPasswordSetPassword>;

const Template: ComponentStory<typeof ResetPasswordSetPassword> = (args) => <ResetPasswordSetPassword {...args} />;

export const Normal = Template.bind({});
Normal.args = {};
