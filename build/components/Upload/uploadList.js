import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Icon from '../Icon/icon';
import Progress from '../Progress/progress';
export const UploadList = (props) => {
    // 从 Prop 中取出 fileList 文件列表 和 回调
    const { fileList, onRemove, } = props;
    console.log('firelist', fileList);
    return (_jsx("ul", { className: "viking-upload-list", children: fileList.map(item => {
            return (_jsxs("li", { className: "viking-upload-list-item", children: [_jsxs("span", { className: `file-name file-name-${item.status}`, children: [_jsx(Icon, { icon: "file-alt", theme: "secondary" }), item.name] }), _jsxs("span", { className: "file-status", children: [(item.status === 'uploading' || item.status === 'ready') && _jsx(Icon, { icon: "spinner", spin: true, theme: "primary" }), item.status === 'success' && _jsx(Icon, { icon: "check-circle", theme: "success" }), item.status === 'error' && _jsx(Icon, { icon: "times-circle", theme: "danger" })] }), _jsx("span", { className: "file-actions", children: _jsx(Icon, { icon: "times", onClick: () => { onRemove(item); } }) }), item.status === 'uploading' &&
                        _jsx(Progress, { percent: item.percent || 0 })] }, item.uid));
        }) }));
};
export default UploadList;
