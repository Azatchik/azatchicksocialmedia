import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { ProfileMediaImages } from './ProfileMediaImages';

export default {
    title: 'shared/ProfileMediaImages',
    component: ProfileMediaImages,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ProfileMediaImages>;

const Template: ComponentStory<typeof ProfileMediaImages> = (args) => <ProfileMediaImages {...args} />;

export const Normal = Template.bind({});
Normal.args = {};
