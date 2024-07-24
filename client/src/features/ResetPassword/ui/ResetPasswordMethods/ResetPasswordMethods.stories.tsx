import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import ResetPasswordMethods from './ResetPasswordMethods';

export default {
    title: 'shared/RegistrationByPhoneForm',
    component: ResetPasswordMethods,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ResetPasswordMethods>;

const Template: ComponentStory<typeof ResetPasswordMethods> = (args) => <ResetPasswordMethods {...args} />;

export const Normal = Template.bind({});
Normal.args = {};
