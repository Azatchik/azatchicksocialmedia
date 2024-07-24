import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { Text, TextSize, TextTheme } from './Text';

export default {
    title: 'shared/Text',
    component: Text,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Text>;

const Template: ComponentStory<typeof Text> = (args) => <Text {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    children: 'Description Description Description Description',
};

export const Secondary = Template.bind({});
Secondary.args = {
    children: 'Description Description Description Description',
    theme: TextTheme.SECONDARY,
};

export const Error = Template.bind({});
Error.args = {
    children: 'Title lorem ipsun',
    theme: TextTheme.ERROR,
};

export const SizeSS = Template.bind({});
SizeSS.args = {
    children: 'Description Description Description Description',
    size: TextSize.SS,
};

export const SizeS = Template.bind({});
SizeS.args = {
    children: 'Description Description Description Description',
    size: TextSize.S,
};

export const SizeSSM = Template.bind({});
SizeSSM.args = {
    children: 'Description Description Description Description',
    size: TextSize.SSM,
};

export const SizeSM = Template.bind({});
SizeSM.args = {
    children: 'Description Description Description Description',
    size: TextSize.SM,
};

export const SizeM = Template.bind({});
SizeM.args = {
    children: 'Description Description Description Description',
    size: TextSize.M,
};

export const SizeL = Template.bind({});
SizeL.args = {
    children: 'Description Description Description Description',
    size: TextSize.L,
};

export const SizeXL = Template.bind({});
SizeXL.args = {
    children: 'Description Description Description Description',
    size: TextSize.XL,
};
