import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { FollowersPageMain } from './FollowersPageMain';

export default {
    title: 'shared/SubscriptionsPageMain',
    component: FollowersPageMain,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof FollowersPageMain>;

const Template: ComponentStory<typeof FollowersPageMain> = (args) => <FollowersPageMain {...args} />;

export const Normal = Template.bind({});
Normal.args = {};
