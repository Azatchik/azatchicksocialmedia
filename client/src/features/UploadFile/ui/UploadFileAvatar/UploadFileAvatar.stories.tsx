import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { UploadFileAvatar } from './UploadFileAvatar';

export default {
    title: 'shared/UploadFileAvatar',
    component: UploadFileAvatar,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof UploadFileAvatar>;

const Template: ComponentStory<typeof UploadFileAvatar> = (args) => <UploadFileAvatar {...args} />;

export const Normal = Template.bind({});
Normal.args = {};
