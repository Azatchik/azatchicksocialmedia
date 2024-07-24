import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { Subscription } from './Subscription';

export default {
    title: 'shared/Subscription',
    component: Subscription,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Subscription>;

const Template: ComponentStory<typeof Subscription> = (args) => <Subscription {...args} />;

export const Normal = Template.bind({});
Normal.args = {};
