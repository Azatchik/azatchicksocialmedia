import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { DeleteFileAvatar } from './DeleteFileAvatar';

export default {
    title: 'shared/DeleteFileAvatar',
    component: DeleteFileAvatar,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof DeleteFileAvatar>;

const Template: ComponentStory<typeof DeleteFileAvatar> = (args) => <DeleteFileAvatar {...args} />;

export const Normal = Template.bind({});
Normal.args = {};
