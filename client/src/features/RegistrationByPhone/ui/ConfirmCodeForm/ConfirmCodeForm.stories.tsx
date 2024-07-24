import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import ConfirmCodeForm from './ConfirmCodeForm';

export default {
    title: 'shared/ConfirmCodeForm',
    component: ConfirmCodeForm,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ConfirmCodeForm>;

const Template: ComponentStory<typeof ConfirmCodeForm> = (args) => <ConfirmCodeForm {...args} />;

export const Normal = Template.bind({});
Normal.args = {};
