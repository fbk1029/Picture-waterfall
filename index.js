// 获取数据
function getData() {
    var data = ajax({
        url: './data.json',
        method: 'get',
        data: '',
        success: function (e) {
            console.log(e);
            renderDom(e);
        }
    });
}
// 获取最短的li
function getMinLi() {
    var lis = document.getElementsByClassName('col');
    var minHeight = lis[0].offsetHeight;
    var minIndex = 0;
    for (var i = 1; i < lis.length; i++) {
        if (lis[i].offsetHeight < minHeight) {
            minHeight = lis[i].offsetHeight;
            minIndex = i;
        }
    }
    return {
        minHeight: minHeight,
        minIndex: minIndex
    }
}
// 网li中添加内容
function renderDom(data) {
    var lis = document.getElementsByClassName('col');
    var imgWidth = lis[0].offsetWidth - 20;
    data.forEach((item) => {
        var oDiv = document.createElement('div');
        oDiv.className = 'item';
        // oDiv.innerHTML = `
        //     <img src="${item.img}" alt="">
        //     <p>${item.desc}</p>
        // `
        var img = document.createElement('img');
        img.src = item.img;
        img.height = imgWidth * item.height / item.width;
        var p = document.createElement('p');
        p.innerText = item.desc;
        oDiv.appendChild(img);
        oDiv.appendChild(p);
        // img.onload = function() {
        var minIndex = getMinLi().minIndex;
        lis[minIndex].appendChild(oDiv);
        // }
    });
}
getData();

// 滚动事件+防抖
var timer = null;
window.onscroll = function() {
    clearTimeout(timer);
    var clientHeight = document.documentElement.clientHeight;
    var scrollTop = document.documentElement.scrollTop;
    var minHeight = getMinLi().minHeight;
    if(minHeight < clientHeight + scrollTop) {
        timer = setTimeout(function() {
            getData();
        }, 500)
    }

}