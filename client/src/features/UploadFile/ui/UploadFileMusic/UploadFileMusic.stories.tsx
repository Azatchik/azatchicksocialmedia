import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { UploadFileMusic } from './UploadFileMusic';

export default {
    title: 'shared/UploadFileMusic',
    component: UploadFileMusic,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof UploadFileMusic>;

const Template: ComponentStory<typeof UploadFileMusic> = (args) => <UploadFileMusic {...args} />;

export const Normal = Template.bind({});
Normal.args = {};
