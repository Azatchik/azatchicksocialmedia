import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { EditProfilePageMain } from './EditProfilePageMain';

export default {
    title: 'shared/EditProfilePageMain',
    component: EditProfilePageMain,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof EditProfilePageMain>;

const Template: ComponentStory<typeof EditProfilePageMain> = (args) => <EditProfilePageMain {...args} />;

export const Normal = Template.bind({});
Normal.args = {};
