import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { ProfileSubscriptions } from './ProfileSubscriptions';

export default {
    title: 'shared/ProfileSubscriptions',
    component: ProfileSubscriptions,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ProfileSubscriptions>;

const Template: ComponentStory<typeof ProfileSubscriptions> = (args) => <ProfileSubscriptions {...args} />;

export const Normal = Template.bind({});
Normal.args = {};
