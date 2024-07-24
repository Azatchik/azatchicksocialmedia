import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { ResetPasswordModal } from './ResetPasswordModal';

export default {
    title: 'shared/ResetPasswordModal',
    component: ResetPasswordModal,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ResetPasswordModal>;

const Template: ComponentStory<typeof ResetPasswordModal> = (args) => <ResetPasswordModal {...args} />;

export const Normal = Template.bind({});
Normal.args = {};
