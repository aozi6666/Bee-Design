import Menu, {} from './menu';
import SubMenu, {} from './subMenu';
import MenuItem, {} from './menuItem';
// Menu 做类型转换
const TransMenu = Menu;
// 把子组件挂到 Menu 上
TransMenu.Item = MenuItem;
TransMenu.SubMenu = SubMenu;
export default TransMenu;
