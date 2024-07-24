import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { Image } from './Image';

export default {
    title: 'shared/Image',
    component: Image,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Image>;

const Template: ComponentStory<typeof Image> = (args) => <Image {...args} />;

export const Normal = Template.bind({});
Normal.args = {};
