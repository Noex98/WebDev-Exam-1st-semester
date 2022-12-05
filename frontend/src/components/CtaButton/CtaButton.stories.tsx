import { ComponentMeta, ComponentStory } from '@storybook/react';
import { CtaButton } from './CtaButton';
export default {
    component: CtaButton,
} as ComponentMeta<typeof CtaButton>;

const Template: ComponentStory<typeof CtaButton> = (args) => <CtaButton {...args} />;

export const Default = Template.bind({});
Default.args = {
    color: "positive",
    disabled: false,
    children: "Click Me!"
}