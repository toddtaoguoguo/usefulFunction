/*
* 通用js文件
* */
/*
* ajax请求
* 参数：url--地址，
* func--成功时的回调函数*/
function ajax(url,func,fail){
    if(window.XMLHttpRequest){
        var xhr=new XMLHttpRequest();
    }else{
        var xhr=new ActiveXObject("Microsoft.XMLHTTP");
    }
    xhr.onreadystatechange=function () {
        if(xhr.readyState===4&&xhr.status===403){
            self_alert_icon.src = '';
            self_alert_text.innerHTML = '您未开通该页面权限';
            self_alert.style.display = 'block';
            return;
        }
        if(xhr.readyState===4&&xhr.status===200){
            func(JSON.parse(xhr.responseText));
        }else if(xhr.readyState===4){
            if(fail){
                fail(JSON.parse(xhr.responseText));
            }
        }
    };
    xhr.open('GET',url,true);
    xhr.send(null);
}
/*ajax---post*/
function ajaxP(url,query,succ,fail) {
    if(window.XMLHttpRequest){
        var xhr=new XMLHttpRequest();
    }else{
        var xhr=new ActiveXObject("Microsoft.XMLHTTP");
    }
    xhr.onreadystatechange=function () {
        if(xhr.readyState===4&&xhr.status===403){
            self_alert_icon.src = '';
            self_alert_text.innerHTML = '您未开通该页面权限';
            self_alert.style.display = 'block';
            return;
        }
        if(xhr.readyState===4&&xhr.status===200){
            succ(xhr.responseText);
        }else if(xhr.readyState===4){
            if(fail){
                fail(xhr.responseText);
            }
        }
    };
    xhr.open('POST',url,true);
    xhr.setRequestHeader('content-type','application/json');
    xhr.send(query);
}
/*ajax---put*/
function ajaxPut(url,query,succ,fail) {
    if(window.XMLHttpRequest){
        var xhr=new XMLHttpRequest();
    }else{
        var xhr=new ActiveXObject("Microsoft.XMLHTTP");
    }
    xhr.onreadystatechange=function () {
        if(xhr.readyState===4&&xhr.status===403){
            self_alert_icon.src = '';
            self_alert_text.innerHTML = '您未开通该页面权限';
            self_alert.style.display = 'block';
            return;
        }
        if(xhr.readyState===4&&xhr.status===200){
            succ(xhr.responseText);
        }else if(xhr.readyState===4){
            fail(xhr.responseText);
        }
    };
    xhr.open('PUT',url,true);
    xhr.setRequestHeader('content-type','application/json');
    xhr.send(query);
}

/*方法：对象转query字符串*/
function toQueryString(obj) {
    var qs='';
    for(var k in obj){
        qs+=k+'='+obj[k]+'&';
    }
    qs=qs.replace(/\&$/,'');
    return qs;
}
/*方法：获取滑动方向，return ==》click，right，left，down，up*/
function getSlide(startX,startY,endX,endY){
    var x=endX-startX;
    var y=endY-startY;
    var result={
        direction:'click',
        distance:0
    };
    if(Math.abs(x)<2&&Math.abs(y)<2){
        return result;
    }
    if(Math.abs(x)>Math.abs(y)&&x>0){
        result={
            direction:'right',
            distance:x
        };
    }else if(Math.abs(x)>Math.abs(y)&&x<0){
        result={
            direction:'left',
            distance:x
        };
    }else if(Math.abs(x)<Math.abs(y)&&y>0){
        result={
            direction:'down',
            distance:y
        };
    }else{
        result={
            direction:'up',
            distance:y
        };
    }
    return result;
}

/*ajax-获取组件-getComponent*/
function getComponent(url,then) {
    let xhr=new XMLHttpRequest();
    xhr.onreadystatechange=function () {
        if(xhr.readyState===4&&xhr.status===200){
            eval(xhr.responseText);
            then&&then();
        }
    };
    xhr.open('GET',url,true);
    xhr.send(null);
}

/*获取select中选中的文本*/
function selected_text(dom) {
    let opt1=dom.querySelectorAll('option');
    for(let i=0;i<opt1.length;i++){
        if(opt1[i].selected===true){
            return opt1[i].text;
        }
    }
}

/*方法，去除obj的某个键值对*/
function objDelete(obj,str_key){
    let newObj={};
    for(let k in obj) {
        if (k !== str_key) {
            newObj[k] = obj[k];
        }
    }
    return newObj;
}

/*键盘事件*/
document.onkeyup=function (e) {
    switch (document.activeElement){
        //分页器回车直接跳
        case document.getElementById("goPage_value"):
        case document.getElementById("goPage_value1"):
        case document.getElementById("goPage_value2"):
        case document.getElementById("goPage_value3"):
        case document.getElementById("goPage_value4"):
        case document.getElementById("goPage_value5"):
        case document.getElementById("goPage_value6"):
        case document.getElementById("goPage_value7"):
        case document.getElementById("goPage_value8"):
        case document.getElementById("goPage_value9"):
        case document.getElementById("goPage_value10"):
        case document.getElementById("goPage_value11"):
        case document.getElementById("goPage_value12"):
        case document.getElementById("goPage_value13"):
            e.keyCode===13&&document.activeElement.nextElementSibling.nextElementSibling.click();
            break;
        //搜索回车直接搜
        case document.getElementById('search_content'):
        case document.getElementById('search_content2'):
            e.keyCode===13&&document.activeElement.nextElementSibling.nextElementSibling.click();
            break;
    }
};