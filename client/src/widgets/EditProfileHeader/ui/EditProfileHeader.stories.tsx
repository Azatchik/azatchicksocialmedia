import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { EditProfileHeader } from './EditProfileHeader';

export default {
    title: 'shared/EditProfileHeader',
    component: EditProfileHeader,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof EditProfileHeader>;

const Template: ComponentStory<typeof EditProfileHeader> = (args) => <EditProfileHeader {...args} />;

export const Normal = Template.bind({});
Normal.args = {};
