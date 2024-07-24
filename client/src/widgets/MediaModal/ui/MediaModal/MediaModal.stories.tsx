import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { MediaModal } from './MediaModal';

export default {
    title: 'shared/MediaModal',
    component: MediaModal,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof MediaModal>;

const Template: ComponentStory<typeof MediaModal> = (args) => <MediaModal {...args} />;

export const Normal = Template.bind({});
Normal.args = {};
