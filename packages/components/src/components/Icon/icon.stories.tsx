import React from "react";
import type { Meta, StoryFn } from "@storybook/react-vite";
import Icon from "./icon";
import Button from "../Button/button";

const meta = {
  title: "第七章：Icon 组件",
  id: "Icon",
  component: Icon,
} satisfies Meta<typeof Icon>;

export default meta;

export const ADefaultIcons: StoryFn<typeof Icon> = () => (
  <>
    <Icon icon="check" size="3x" />
    <Icon icon="times" size="3x" />
    <Icon icon="anchor" size="3x" />
    <Icon icon="trash" size="3x" />
    <Button size="lg" btnType="primary">
      <Icon icon="check" /> check
    </Button>
  </>
);
ADefaultIcons.storyName = "默认图标";

export const BThemeIcons: StoryFn<typeof Icon> = () => (
  <>
    <Icon icon="check" size="3x" theme="success" />
    <Icon icon="times" size="3x" theme="danger" />
    <Icon icon="anchor" size="3x" theme="primary" />
    <Icon icon="exclamation-circle" size="3x" theme="warning" />
  </>
);
BThemeIcons.storyName = "不同主题的 Icon";

export const CCustomIcons: StoryFn<typeof Icon> = () => (
  <>
    <Icon icon="spinner" size="3x" theme="primary" spin />
    <Icon icon="spinner" size="3x" theme="success" pulse />
  </>
);
CCustomIcons.storyName = "更多行为的 Icon";
