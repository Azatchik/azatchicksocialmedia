import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { SubscriptionsPageMain } from './SubscriptionsPageMain';

export default {
    title: 'shared/SubscriptionsPageMain',
    component: SubscriptionsPageMain,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof SubscriptionsPageMain>;

const Template: ComponentStory<typeof SubscriptionsPageMain> = (args) => <SubscriptionsPageMain {...args} />;

export const Normal = Template.bind({});
Normal.args = {};
