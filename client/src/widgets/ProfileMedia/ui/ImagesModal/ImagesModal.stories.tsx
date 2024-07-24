import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import ImagesModal from './ImagesModal';

export default {
    title: 'shared/ImagesModal',
    component: ImagesModal,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ImagesModal>;

const Template: ComponentStory<typeof ImagesModal> = (args) => <ImagesModal {...args} />;

export const Normal = Template.bind({});
Normal.args = {};
