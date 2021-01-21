// ajax  async javascript and XML

/**
 * url: 请求的路径
 * method: 请求的方式get post
 * data: 请求的数据
 * success: 请求成功的回调函数
 * @param { Object } options 
 */
function ajax(options){
    var xhr = null;
    if(window.XMLHttpRequest){
        xhr = new XMLHttpRequest()
    }else if(window.ActiveXObject){
        xhr = new ActiveXObject('Microsoft.XMLHTTP');
    }else{
        return alert('当前浏览器不支持XMLHTTPRquest');
    }
    var method = '';
    if(options.method){
        method = options.method.toUpperCase();
    }else {
        method = 'GET';
    }
    // 接收服务器返回的数据
    xhr.onreadystatechange = function() {
        // 判断服务器是否有返回数据 0 - 4
        if(xhr.readyState === 4) {
            // 判断服务器返回的数据是否是我想要的
            if(xhr.status === 200) {
                // 调用回调函数
                success(JSON.parse(xhr.responseText));
                // console.log(xhr);
            }
        }
    }
    var data = '';
    if(typeof options.data === 'object') {
        for (const prop in options.data) {
            data += prop + '=' + options.data[prop] + '&';
        }
        data.slice(0, data.length-1);
    }else{
        data = options.data;
    }
    var isAsync = typeof options.isAsync === 'undefined' ? true : options.isAsync;
    var url = options.url;
    if(method === 'GET') {
        // 建立连接
        xhr.open(method, url + '?' + data, isAsync);
        // 发送请求
        xhr.send();
    }else {
        xhr.open(method, url, isAsync);
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencode');
        // key=value&key=value
        // 发送数据
        xhr.send(data);
    }
    var success = typeof options.success === 'function' ? options.success : function() {};
}