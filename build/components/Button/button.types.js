/* 定义 Button 组件可以接收哪些 props（组件 API） */
// TS 导出 两个固定值 'lg' / 'sm'
/*
as const: 把 ButtonSize对象的值 变成不可修改的 字面量类型
  - 如果没有 as const: Large: string
  - 如果有 as const: Large: "lg"

不写 as const: Large: 'lg' 会被 TS 自动推导为 string 类型
*/
export const ButtonSize = {
    Large: 'lg',
    Small: 'sm',
};
export const ButtonType = {
    Primary: 'primary',
    Default: 'default',
    Danger: 'danger',
    Link: 'link',
};
