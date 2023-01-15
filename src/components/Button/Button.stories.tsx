import { userEvent, within } from "@storybook/testing-library";
import { expect } from "@storybook/jest";
import { ComponentMeta, ComponentStoryFn } from "@storybook/react";
import { Button } from "./Button";

export default {
  component: Button,
} as ComponentMeta<typeof Button>;

const Template: ComponentStoryFn<typeof Button> = (args) => {
  return <Button {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  children: "ぼたん",
};
Default.play = async ({ args, canvasElement }) => {
  const canvas = within(canvasElement);
  await userEvent.click(canvas.getByRole("button", { name: /^ぼたん$/ }));
  await expect(args.onClick).toBeCalled();
};
