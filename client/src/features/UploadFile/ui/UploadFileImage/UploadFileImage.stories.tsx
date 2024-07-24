import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { UploadFileImage } from './UploadFileImage';

export default {
    title: 'shared/UploadFileImage',
    component: UploadFileImage,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof UploadFileImage>;

const Template: ComponentStory<typeof UploadFileImage> = (args) => <UploadFileImage {...args} />;

export const Normal = Template.bind({});
Normal.args = {};
