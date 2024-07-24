import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import ResetPassword from './ResetPassword';

export default {
    title: 'shared/RegistrationByPhoneForm',
    component: ResetPassword,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ResetPassword>;

const Template: ComponentStory<typeof ResetPassword> = (args) => <ResetPassword {...args} />;

export const Normal = Template.bind({});
Normal.args = {};
