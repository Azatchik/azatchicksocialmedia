import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { MusicPageMainTabs } from './MusicPageMainTabs';

export default {
    title: 'shared/MusicPageMainTabs',
    component: MusicPageMainTabs,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof MusicPageMainTabs>;

const Template: ComponentStory<typeof MusicPageMainTabs> = (args) => <MusicPageMainTabs {...args} />;

export const Normal = Template.bind({});
Normal.args = {};
