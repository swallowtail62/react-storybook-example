import { rest } from "msw";
import { userEvent, waitFor, within } from "@storybook/testing-library";
import { expect, jest } from "@storybook/jest";
import { ComponentMeta, ComponentStoryFn } from "@storybook/react";
import { UserCreateForm } from "./UserCreateForm";

export default {
  component: UserCreateForm,
} as ComponentMeta<typeof UserCreateForm>;

const Template: ComponentStoryFn<typeof UserCreateForm> = (args) => {
  return <UserCreateForm />;
};

export const Default = Template.bind({});
const mockApi = jest.fn();
Default.parameters = {
  msw: {
    handlers: [createUserSuccessHandler({ callback: mockApi })],
  },
};
Default.play = async ({ args, canvasElement }) => {
  const canvas = within(canvasElement);
  await userEvent.click(canvas.getByRole("button", { name: /^Create$/ }));
  await waitFor(async () => {
    await expect(mockApi).toBeCalledWith({
      username: "foo",
    });
  });
};

function createUserSuccessHandler({
  callback,
}: { callback?: (body: unknown) => void } = {}) {
  return rest.post("/api/user", async (req, res, ctx) => {
    callback?.(await req.json());
    return res(ctx.status(200));
  });
}
