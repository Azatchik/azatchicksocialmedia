import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { ProfileMedia } from './ProfileMedia';

export default {
    title: 'shared/ProfileMedia',
    component: ProfileMedia,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ProfileMedia>;

const Template: ComponentStory<typeof ProfileMedia> = (args) => <ProfileMedia {...args} />;

export const Normal = Template.bind({});
Normal.args = {};
