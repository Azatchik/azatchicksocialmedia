import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import RegistrationByPhoneForm from './RegistrationByPhoneForm';

export default {
    title: 'shared/RegistrationByPhoneForm',
    component: RegistrationByPhoneForm,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof RegistrationByPhoneForm>;

const Template: ComponentStory<typeof RegistrationByPhoneForm> = (args) => <RegistrationByPhoneForm {...args} />;

export const Normal = Template.bind({});
Normal.args = {};
