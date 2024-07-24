import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { DeleteFile } from './DeleteFile';

export default {
    title: 'shared/DeleteFile',
    component: DeleteFile,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof DeleteFile>;

const Template: ComponentStory<typeof DeleteFile> = (args) => <DeleteFile {...args} />;

export const Normal = Template.bind({});
Normal.args = {};
