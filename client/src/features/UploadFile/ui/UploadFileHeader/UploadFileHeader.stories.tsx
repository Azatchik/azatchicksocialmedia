import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { UploadFileHeader } from './UploadFileHeader';

export default {
    title: 'shared/UploadFileHeader',
    component: UploadFileHeader,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof UploadFileHeader>;

const Template: ComponentStory<typeof UploadFileHeader> = (args) => <UploadFileHeader {...args} />;

export const Normal = Template.bind({});
Normal.args = {};
