import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { MediaModalFooter } from './MediaModalFooter';

export default {
    title: 'shared/MediaModalFooter',
    component: MediaModalFooter,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof MediaModalFooter>;

const Template: ComponentStory<typeof MediaModalFooter> = (args) => <MediaModalFooter {...args} />;

export const Normal = Template.bind({});
Normal.args = {};
