import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { Textarea } from './Textarea';

export default {
    title: 'shared/Textarea',
    component: Textarea,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Textarea>;

const Template: ComponentStory<typeof Textarea> = (args) => <Textarea {...args} />;

export const Normal = Template.bind({});
Normal.args = {};
