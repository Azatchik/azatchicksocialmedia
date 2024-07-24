import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { PanelInput } from './PanelInput';

export default {
    title: 'shared/PanelInput',
    component: PanelInput,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof PanelInput>;

const Template: ComponentStory<typeof PanelInput> = (args) => <PanelInput {...args} />;

export const Normal = Template.bind({});
Normal.args = {};
