import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import './styles/index.scss';
import Button from './components/Button/button';
import { ButtonType } from './components/Button/button.types';
import Upload from './components/Upload';
import Icon from './components/Icon';
import Progress from './components/Progress';
import AutoComplete from './components/AutoComplete';
const App = () => {
    const defaultUploadList = [
        {
            uid: '1',
            size: 1024,
            name: '已上传文件.png',
            status: 'success',
            percent: 100,
        },
        {
            uid: '2',
            size: 2048,
            name: '上传中文件.jpg',
            status: 'uploading',
            percent: 40,
        },
    ];
    const lakersWithNumber = [
        { value: 'bradley', number: 11 },
        { value: 'pope', number: 1 },
        { value: 'caruso', number: 4 },
        { value: 'cook', number: 2 },
        { value: 'cousins', number: 15 },
        { value: 'james', number: 23 },
        { value: 'AD', number: 3 },
        { value: 'green', number: 14 },
        { value: 'howard', number: 39 },
        { value: 'kuzma', number: 0 },
    ];
    const handleAutoCompleteFetch = (query) => {
        return lakersWithNumber.filter((player) => player.value.toLowerCase().includes(query.toLowerCase()));
    };
    return (_jsx("div", { style: {
            minHeight: '100vh',
            padding: '40px 24px 80px',
            background: 'radial-gradient(circle at top left, #f0f5ff 0, transparent 50%), radial-gradient(circle at bottom right, #fff1f0 0, transparent 55%)',
            fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif',
        }, children: _jsxs("div", { style: {
                maxWidth: 960,
                margin: '0 auto',
            }, children: [_jsxs("header", { style: {
                        marginBottom: 32,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: 16,
                    }, children: [_jsxs("div", { children: [_jsx("h1", { style: { margin: 0, fontSize: 28 }, children: "Cream Design \u7EC4\u4EF6\u5E93" }), _jsx("p", { style: { margin: '8px 0 0', color: '#595959', fontSize: 14 }, children: "\u4E00\u5957\u7528\u6765\u7EC3\u4E60 React + TypeScript \u7684\u8F7B\u91CF\u7EC4\u4EF6\u793A\u4F8B\u3002" })] }), _jsxs("div", { style: { display: 'flex', gap: 12 }, children: [_jsx(Button, { btnType: ButtonType.Primary, children: "\u67E5\u770B\u6587\u6863" }), _jsx(Button, { btnType: ButtonType.Default, children: "Git \u4ED3\u5E93" })] })] }), _jsxs("main", { style: {
                        display: 'grid',
                        gridTemplateColumns: 'minmax(0, 1.2fr) minmax(0, 1fr)',
                        gap: 24,
                        alignItems: 'flex-start',
                    }, children: [_jsxs("section", { style: {
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 24,
                            }, children: [_jsxs("div", { style: {
                                        padding: 24,
                                        borderRadius: 12,
                                        background: '#ffffff',
                                        boxShadow: '0 8px 24px rgba(15, 23, 42, 0.06)',
                                    }, children: [_jsx("h2", { style: { margin: 0, marginBottom: 16, fontSize: 18 }, children: "Button \u7EC4\u4EF6\u6F14\u793A" }), _jsx("p", { style: { margin: '0 0 16px', color: '#8c8c8c', fontSize: 13 }, children: "\u4E0D\u540C\u7C7B\u578B\u6309\u94AE\u548C\u94FE\u63A5\u6309\u94AE\uFF0C\u9002\u5408\u4F5C\u4E3A\u9875\u9762\u4E3B\u64CD\u4F5C\u3001\u6B21\u8981\u64CD\u4F5C\u548C\u6587\u672C\u94FE\u63A5\u3002" }), _jsxs("div", { style: {
                                                display: 'flex',
                                                flexWrap: 'wrap',
                                                gap: 12,
                                            }, children: [_jsx(Button, { btnType: ButtonType.Primary, children: "Primary Button" }), _jsx(Button, { btnType: ButtonType.Default, children: "Default Button" }), _jsx(Button, { btnType: ButtonType.Danger, children: "Danger Button" }), _jsx(Button, { btnType: ButtonType.Link, href: "https://www.baidu.com/", children: "Link \u767E\u5EA6" }), _jsx(Button, { btnType: ButtonType.Link, href: "https://www.baidu.com/", target: "_blank", children: "Link \u767E\u5EA6(\"\u65B0\u7A97\u53E3\u6253\u5F00\")" })] })] }), _jsxs("div", { style: {
                                        padding: 24,
                                        borderRadius: 12,
                                        background: '#ffffff',
                                        boxShadow: '0 8px 24px rgba(15, 23, 42, 0.06)',
                                    }, children: [_jsx("h2", { style: { margin: 0, marginBottom: 16, fontSize: 18 }, children: "Upload \u7EC4\u4EF6\u6F14\u793A" }), _jsx("p", { style: { margin: '0 0 16px', color: '#8c8c8c', fontSize: 13 }, children: "\u652F\u6301\u70B9\u51FB\u9009\u62E9\u3001\u62D6\u62FD\u4E0A\u4F20\u3001\u4E0A\u4F20\u8FDB\u5EA6\u663E\u793A\u548C\u6587\u4EF6\u5217\u8868\u7BA1\u7406\u3002" }), _jsxs("div", { style: {
                                                display: 'flex',
                                                flexDirection: 'column',
                                                gap: 16,
                                                alignItems: 'stretch',
                                            }, children: [_jsx(Upload, { action: "https://jsonplaceholder.typicode.com/posts", defaultFileList: defaultUploadList, children: _jsx(Button, { btnType: ButtonType.Primary, children: "\u70B9\u51FB\u4E0A\u4F20" }) }), _jsx(Upload, { action: "https://jsonplaceholder.typicode.com/posts", drag: true, children: _jsx("div", { style: {
                                                            padding: '20px 40px',
                                                            border: '1px dashed #d9d9d9',
                                                            borderRadius: 4,
                                                            textAlign: 'center',
                                                            color: '#595959',
                                                            background: '#fafafa',
                                                        }, children: "\u62D6\u62FD\u6587\u4EF6\u5230\u6B64\u5904\uFF0C\u6216\u70B9\u51FB\u4E0A\u4F20" }) })] })] })] }), _jsxs("section", { style: {
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 24,
                            }, children: [_jsxs("div", { style: {
                                        padding: 24,
                                        borderRadius: 12,
                                        background: '#ffffff',
                                        boxShadow: '0 8px 24px rgba(15, 23, 42, 0.06)',
                                    }, children: [_jsx("h2", { style: { margin: 0, marginBottom: 16, fontSize: 18 }, children: "Icon \u7EC4\u4EF6\u6F14\u793A" }), _jsx("p", { style: { margin: '0 0 16px', color: '#8c8c8c', fontSize: 13 }, children: "\u57FA\u4E8E Font Awesome \u7684\u56FE\u6807\u7EC4\u4EF6\uFF0C\u652F\u6301\u4E3B\u9898\u8272\u548C\u6240\u6709\u539F\u751F\u5C5E\u6027\u3002" }), _jsxs("div", { style: {
                                                display: 'flex',
                                                flexWrap: 'wrap',
                                                gap: 20,
                                                alignItems: 'center',
                                            }, children: [_jsx(Icon, { icon: "coffee", size: "2x" }), _jsx(Icon, { icon: "check-circle", size: "2x", theme: "success" }), _jsx(Icon, { icon: "times", size: "2x", theme: "danger" }), _jsx(Icon, { icon: "spinner", size: "2x", spin: true, theme: "primary" })] })] }), _jsxs("div", { style: {
                                        padding: 24,
                                        borderRadius: 12,
                                        background: '#ffffff',
                                        boxShadow: '0 8px 24px rgba(15, 23, 42, 0.06)',
                                    }, children: [_jsx("h2", { style: { margin: 0, marginBottom: 16, fontSize: 18 }, children: "Progress \u7EC4\u4EF6\u6F14\u793A" }), _jsx("p", { style: { margin: '0 0 16px', color: '#8c8c8c', fontSize: 13 }, children: "\u5C55\u793A\u4EFB\u52A1\u5B8C\u6210\u8FDB\u5EA6\uFF0C\u652F\u6301\u4E0D\u540C\u4E3B\u9898\u989C\u8272\u548C\u9AD8\u5EA6\u3002" }), _jsxs("div", { style: {
                                                display: 'flex',
                                                flexDirection: 'column',
                                                gap: 12,
                                            }, children: [_jsx(Progress, { percent: 30 }), _jsx(Progress, { percent: 65, theme: "success" }), _jsx(Progress, { percent: 90, theme: "danger", strokeHeight: 10 })] })] }), _jsxs("div", { style: {
                                        padding: 24,
                                        borderRadius: 12,
                                        background: '#ffffff',
                                        boxShadow: '0 8px 24px rgba(15, 23, 42, 0.06)',
                                    }, children: [_jsx("h2", { style: { margin: 0, marginBottom: 16, fontSize: 18 }, children: "AutoComplete \u7EC4\u4EF6\u6F14\u793A" }), _jsx("p", { style: { margin: '0 0 16px', color: '#8c8c8c', fontSize: 13 }, children: "\u8F93\u5165\u5185\u5BB9\u81EA\u52A8\u7ED9\u51FA\u5019\u9009\u9879\uFF0C\u652F\u6301\u952E\u76D8\u9009\u62E9\u4E0E\u81EA\u5B9A\u4E49\u4E0B\u62C9\u6E32\u67D3\u3002" }), _jsx(AutoComplete, { fetchSuggestions: handleAutoCompleteFetch, placeholder: "\u8F93\u5165\u6E56\u4EBA\u961F\u7403\u5458\u82F1\u6587\u540D\u8BD5\u8BD5\uFF08\u5982\uFF1Aja / co\uFF09", renderOption: (item) => {
                                                const player = item;
                                                return (_jsxs("div", { style: { display: 'flex', justifyContent: 'space-between', gap: 12 }, children: [_jsx("b", { children: player.value }), _jsxs("span", { style: { color: '#8c8c8c' }, children: ["#", player.number] })] }));
                                            } })] })] })] }), _jsxs("div", { style: {
                        marginTop: 40,
                        padding: 24,
                        borderRadius: 12,
                        background: '#ffffff',
                        boxShadow: '0 8px 24px rgba(15, 23, 42, 0.06)',
                    }, children: [_jsx("h2", { style: { margin: 0, marginBottom: 16, fontSize: 18 }, children: "\u539F\u751F\u8868\u5355\u4E0A\u4F20\u793A\u4F8B" }), _jsxs("p", { style: { margin: '0 0 16px', color: '#8c8c8c', fontSize: 13 }, children: ["\u4F7F\u7528\u539F\u751F ", _jsx("code", { children: "<form>" }), " \u63D0\u4EA4\u5230\u540E\u7AEF\u63A5\u53E3\u7684\u6587\u4EF6\u4E0A\u4F20\u65B9\u5F0F\u3002"] }), _jsxs("form", { method: "post", encType: "multipart/form-data", action: "https://jsonplaceholder.typicode.com/posts", style: { marginTop: 8 }, children: [_jsx("input", { type: "file", name: "myFile" }), _jsx("button", { type: "submit", style: {
                                        marginLeft: 12,
                                        padding: '4px 12px',
                                        borderRadius: 4,
                                        border: '1px solid #1677ff',
                                        background: '#1677ff',
                                        color: '#fff',
                                        cursor: 'pointer',
                                    }, children: "Submit" })] })] })] }) }));
};
export default App;
