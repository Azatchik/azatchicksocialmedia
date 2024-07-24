import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { ProfileFollowers } from './ProfileFollowers';

export default {
    title: 'shared/ProfileSubscriptions',
    component: ProfileFollowers,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ProfileFollowers>;

const Template: ComponentStory<typeof ProfileFollowers> = (args) => <ProfileFollowers {...args} />;

export const Normal = Template.bind({});
Normal.args = {};
