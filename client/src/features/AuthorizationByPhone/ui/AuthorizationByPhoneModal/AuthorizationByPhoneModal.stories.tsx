import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { AuthorizationByPhoneModal } from './AuthorizationByPhoneModal';

export default {
    title: 'shared/AuthorizationByPhoneModal',
    component: AuthorizationByPhoneModal,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof AuthorizationByPhoneModal>;

const Template: ComponentStory<typeof AuthorizationByPhoneModal> = (args) => <AuthorizationByPhoneModal {...args} />;

export const Normal = Template.bind({});
Normal.args = {};
