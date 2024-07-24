import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { ProfileInfoModal } from './ProfileInfoModal';

export default {
    title: 'shared/ProfileInfoModal',
    component: ProfileInfoModal,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ProfileInfoModal>;

const Template: ComponentStory<typeof ProfileInfoModal> = (args) => <ProfileInfoModal {...args} />;

export const Normal = Template.bind({});
Normal.args = {};
