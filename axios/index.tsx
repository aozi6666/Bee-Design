import React, { useState, useEffect } from 'react'
import axios from 'axios'

const App: React.FC = () => { 
    const [ title, setTitle ] = useState('');

    const posData = {
      title: '自己写的标题',
      body: 'bar',
    };

    useEffect(() => {
        axios.post('https://jsonplaceholder.typicode.com/posts', posData)
        .then(response => {
            console.log('posData:',response.data);
            setTitle(response.data.title);
        })
    })

    useEffect(() => {
      // 发送 Axios 请求:
      // 自己mock数据与网址：https://mocki.io/
      axios.get('https://jsonplaceholder.typicode.com/posts/1', {
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/json'
        },
        responseType: 'json'
      })
        .then(response => {
            console.log(response);  // Axios 响应对象: 包装了很多属性
            console.log(response.data);
            setTitle(response.data.title);
        })
    }, [])

    return (
        <div className="App">
            <h1>测试Axios请求</h1>
        </div>
    );
}

export default App;