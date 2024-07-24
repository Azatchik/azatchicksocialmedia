import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { Asidebar } from './Asidebar';

export default {
    title: 'shared/Asidebar',
    component: Asidebar,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Asidebar>;

const Template: ComponentStory<typeof Asidebar> = (args) => <Asidebar {...args} />;

export const Normal = Template.bind({});
Normal.args = {};
