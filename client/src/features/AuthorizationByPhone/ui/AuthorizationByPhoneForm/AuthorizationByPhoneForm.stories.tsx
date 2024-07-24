import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import AuthorizationByPhoneForm from './AuthorizationByPhoneForm';

export default {
    title: 'shared/AuthorizationByPhone',
    component: AuthorizationByPhoneForm,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof AuthorizationByPhoneForm>;

const Template: ComponentStory<typeof AuthorizationByPhoneForm> = (args) => <AuthorizationByPhoneForm {...args} />;

export const Normal = Template.bind({});
Normal.args = {};
