import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { UploadFile } from './UploadFile';

export default {
    title: 'shared/UploadImage',
    component: UploadFile,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof UploadFile>;

const Template: ComponentStory<typeof UploadFile> = (args) => <UploadFile {...args} />;

export const Normal = Template.bind({});
Normal.args = {};
