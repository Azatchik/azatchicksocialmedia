import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import ResetPasswordConfirmCode from './ResetPasswordConfirmCode';

export default {
    title: 'shared/ConfirmCodeForm',
    component: ResetPasswordConfirmCode,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ResetPasswordConfirmCode>;

const Template: ComponentStory<typeof ResetPasswordConfirmCode> = (args) => <ResetPasswordConfirmCode {...args} />;

export const Normal = Template.bind({});
Normal.args = {};
