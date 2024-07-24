import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { RegistrationByPhoneModal } from './RegistrationByPhoneModal';

export default {
    title: 'shared/RegistrationByPhoneModal',
    component: RegistrationByPhoneModal,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof RegistrationByPhoneModal>;

const Template: ComponentStory<typeof RegistrationByPhoneModal> = (args) => <RegistrationByPhoneModal {...args} />;

export const Normal = Template.bind({});
Normal.args = {};
