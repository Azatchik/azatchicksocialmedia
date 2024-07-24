import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { ProfileMediaToggle } from './ProfileMediaToggle';

export default {
    title: 'shared/ProfileMediaToggle',
    component: ProfileMediaToggle,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ProfileMediaToggle>;

const Template: ComponentStory<typeof ProfileMediaToggle> = (args) => <ProfileMediaToggle {...args} />;

export const Normal = Template.bind({});
Normal.args = {};
