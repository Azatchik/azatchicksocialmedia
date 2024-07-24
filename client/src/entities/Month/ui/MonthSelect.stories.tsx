import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { MonthSelect } from './MonthSelect';

export default {
    title: 'shared/Month',
    component: MonthSelect,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof MonthSelect>;

const Template: ComponentStory<typeof MonthSelect> = (args) => <MonthSelect {...args} />;

export const Normal = Template.bind({});
Normal.args = {};
