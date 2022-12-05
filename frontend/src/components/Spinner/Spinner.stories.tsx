import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Spinner } from './Spinner';
export default {
    component: Spinner,
} as ComponentMeta<typeof Spinner>;

const Template: ComponentStory<typeof Spinner> = (args) => <Spinner {...args} />;

export const Default = Template.bind({});
