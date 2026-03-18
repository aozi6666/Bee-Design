import React from "react";
import type { Meta, StoryFn } from "@storybook/react-vite";
import Menu from "./index";

const meta = {
  title: "第六章：Menu",
  id: "Menu",
  component: Menu,
  subcomponents: { SubMenu: Menu.SubMenu, Item: Menu.Item },
} satisfies Meta<typeof Menu>;

export default meta;

const Template: StoryFn<typeof Menu> = (args) => <Menu {...args} />;

const defaultChildren = (
  <>
    <Menu.Item>cool link</Menu.Item>
    <Menu.Item>cool link 2</Menu.Item>
    <Menu.Item disabled>disabled</Menu.Item>
    <Menu.SubMenu title="下拉选项">
      <Menu.Item>下拉选项一</Menu.Item>
      <Menu.Item>下拉选项二</Menu.Item>
    </Menu.SubMenu>
  </>
);

export const ADefaultMenu = Template.bind({});
ADefaultMenu.args = {
  defaultIndex: "0",
  children: defaultChildren,
};
ADefaultMenu.storyName = "默认Menu";

export const BClickMenu = Template.bind({});
BClickMenu.args = {
  defaultIndex: "0",
  mode: "vertical",
  children: (
    <>
      <Menu.Item>cool link</Menu.Item>
      <Menu.Item>cool link 2</Menu.Item>
      <Menu.SubMenu title="点击下拉选项">
        <Menu.Item>下拉选项一</Menu.Item>
        <Menu.Item>下拉选项二</Menu.Item>
      </Menu.SubMenu>
    </>
  ),
};
BClickMenu.storyName = "纵向的 Menu";

export const COpenedMenu = Template.bind({});
COpenedMenu.args = {
  defaultIndex: "0",
  mode: "vertical",
  defaultOpenSubMenus: ["2"],
  children: (
    <>
      <Menu.Item>cool link</Menu.Item>
      <Menu.Item>cool link 2</Menu.Item>
      <Menu.SubMenu title="默认展开下拉选项">
        <Menu.Item>下拉选项一</Menu.Item>
        <Menu.Item>下拉选项二</Menu.Item>
      </Menu.SubMenu>
    </>
  ),
};
COpenedMenu.storyName = "默认展开的纵向 Menu";
