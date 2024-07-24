import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { ProfileMediaMusic } from './ProfileMediaMusic';

export default {
    title: 'shared/ProfileMediaMusic',
    component: ProfileMediaMusic,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ProfileMediaMusic>;

const Template: ComponentStory<typeof ProfileMediaMusic> = (args) => <ProfileMediaMusic {...args} />;

export const Normal = Template.bind({});
Normal.args = {};
