import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { ProfileHeader } from './ProfileHeader';

export default {
    title: 'shared/ProfileHeader',
    component: ProfileHeader,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ProfileHeader>;

const Template: ComponentStory<typeof ProfileHeader> = (args) => <ProfileHeader {...args} />;

export const Normal = Template.bind({});
Normal.args = {};
