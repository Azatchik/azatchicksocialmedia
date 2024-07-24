import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { DeleteFileHeader } from './DeleteFileHeader';

export default {
    title: 'shared/DeleteFileHeader',
    component: DeleteFileHeader,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof DeleteFileHeader>;

const Template: ComponentStory<typeof DeleteFileHeader> = (args) => <DeleteFileHeader {...args} />;

export const Normal = Template.bind({});
Normal.args = {};
