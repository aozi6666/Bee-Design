import axios from "axios";

const AxiosReact: React.FC = () => {
  /*
    e： 这次变化事件的事件对象 -- “事件说明单”
      e = {
        谁触发的这次变化,
        发生了什么,
        当前 input 里有什么值
      }

    e.target： 触发这次事件的那个 DOM 元素（input 节点本身）
    e: React.ChangeEvent<HTMLInputElement>: 给参数 e 标注类型
       - React 里的 ChangeEvent
       - 这个事件来自 <HTMLInputElement> 泛型参数

    提前告诉大家：e 是“来自 input 元素的 change 事件对象” （贴标签）
        - 放心大胆用：e.target.files
  */
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 1）取出 用户上传的 文件
    /*
     input type="file" 文件类型输入框：
       - 有一个特殊属性 files: 用户当前选中的 文件列表 FileList 
       - 用户一次性可以选3个文件
           FileList {
              // File对象
              0: File {
                   name: "a.png",
                   size: 12345,
                   type: "image/png"

                   //  内部隐藏
                      [[BinaryData]]: <文件二进制>0100110101...
                 },
            
              1: File {
                   name: "b.jpg",
                   size: 23456,
                   type: "image/jpeg"
                 },
            
              2: File {
                   name: "c.pdf",
                   size: 34567,
                   type: "application/pdf"
                 },
            
              length: 3
            }
    */
    // 获取 文件列表
    const files = e.target.files;

    if (files) {
      // 从文件列表中取出 第一个 File 对象 ： 文件信息 + 文件内容（二进制）
      const uploadedFile = files[0];

      // 2）将 本次文件 放进 formData
      const formData = new FormData();
      // key-value 形式
      formData.append("file", uploadedFile);

      // 3）使用 Axios 发送请求
      /* 
        常见参数: axios.post(url, data, config)
        - url:地址
        - data： 请求体body （这次 POST 请求要携带的数据）
        - config配置项 对象：
      */
      axios
        .post(
          "https://jsonplaceholder.typicode.com/posts",
          // Axios 发出去的不是 FormData 对象本身
          /*
          FormData 里装的是一个 File 对象引用
            -> 当 Axios / fetch 看到： body: formData
            -> 浏览器会开始做“编码
            -> 先遍历 FormData 里的每一项
            -> 变成 HTTP body 里的某一个 "part"
            -> 每一个"part"包含：(文件相关的描述信息 + 二进制内容)
                ------WebKitBoundary123【包裹边界】
                Content-Disposition: form-data; name="file"; filename="a.png"
                Content-Type: image/png
                
                <文件二进制内容>
                ------WebKitBoundary123--【结束边界】  
        */
          formData,
          {
            // 设置 请求头信息
            headers: {
              // 表单文件数据
              "Content-Type": "multipart/form-data",
            },
          },
        )
        .then((resp) => {
          console.log(resp);
        });
    }
  };

  return (
    <div className="AxiosReact" style={{ marginTop: "100px", marginLeft: "100px" }}>
      <input
        type="file"
        // {/* 原生必须传，自定义不用传 name="myFile" */}
        onChange={handleFileChange}
      />
    </div>
  );
};

export default AxiosReact;
