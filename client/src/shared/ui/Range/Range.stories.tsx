import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { Range } from './Range';

export default {
    title: 'shared/Range',
    component: Range,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Range>;

const Template: ComponentStory<typeof Range> = (args) => <Range {...args} />;

export const Normal = Template.bind({});
Normal.args = {};
