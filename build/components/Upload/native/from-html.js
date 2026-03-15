import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const FromHtml = () => {
    return (_jsx("div", { className: "App", style: { marginTop: '100px', marginLeft: '100px' }, children: _jsxs("form", { method: "post", encType: "multipart/form-data", action: "https://jsonplaceholder.typicode.com/posts", children: [_jsx("input", { type: "file", name: "myFile" }), _jsx("button", { type: "submit", children: "Submit" })] }) }));
};
export default FromHtml;
