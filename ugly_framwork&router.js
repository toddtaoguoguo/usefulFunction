domain='';
/*网站单页面应用 —— 路由：站内导航，跳转，前进，后退，刷新*/
function url_control() {
    clear_left_ui();
    close_all_component();
    let page=location.href.split('/main.html#page=')[1];
    if(page){
        getComponent(domain+'component/'+page+'.js');
        if(document.getElementById(page)){
            document.getElementById(page).className+=' active';
        }else{
            history.state&&(document.getElementById(history.state.toString()).className+=' active');
        }
    }
    else{
        let tags = document.querySelectorAll('body>.left>ul>li');
        for (let i in tags) {
            if (tags[i].style.display === 'list-item') {
                tags[i].click();
                return;
            }
        }
    }
}
function go_where(data,title,url) {
    history.pushState(data,title,'main.html#page='+url);
    url_control();
}
window.onpopstate=function () {
    url_control();
    console.log(111)
};
ajax('/metric/v0/operation/current',function (res) {
    if(res.success){
        /*权限判断*/
        sessionStorage.permissions = res.data.permissions;

        //权限判断——试衣间管理
        if (sessionStorage.permissions.indexOf('scanner_tab') > -1) {
            changingRoom.style.display = 'list-item';
        }

        //权限判断——用户管理
        if (sessionStorage.permissions.indexOf('usersmanage_tab') > -1) {
            clientManager.style.display = 'list-item';
        }

        //权限判断——商家管理
        if (sessionStorage.permissions.indexOf('merchantssettings_tab') > -1) {
            businessSet.style.display = 'list-item';
        }

        //权限判断——营销管理
        if (sessionStorage.permissions.indexOf('couponmanage_tab') > -1) {
            coupon.style.display = 'list-item';
        }

        //权限判断——订单管理
        if (sessionStorage.permissions.indexOf('ordersmanage_tab') > -1) {
            order.style.display = 'list-item';
        }

        //权限判断——子账号管理
        if (sessionStorage.permissions.indexOf('son_tab') > -1) {
            subAccount.style.display = 'list-item';
        }

        //权限判断——电商管理
        if (sessionStorage.permissions.indexOf('ebay_tab') > -1) {
            E_commerce.style.display = 'list-item';
        }

        /*点击事件绑定*/
        //changingRoom
        changingRoom.onclick=function () {
            // clear_left_ui();
            // close_all_component();
            go_where('','运营平台',this.id);
        };

        //clientManager
        clientManager.onclick=function () {
            // clear_left_ui();
            // close_all_component();
            go_where('','运营平台',this.id);
        };

        //businessSet
        businessSet.onclick=function () {
            // clear_left_ui();
            // close_all_component();
            go_where('','运营平台',this.id);
        };

        //E_commerce
        E_commerce.onclick=function () {
            // clear_left_ui();
            // close_all_component();
            go_where('','运营平台',this.id);
        };

        //coupon
        coupon.onclick=function () {
            // clear_left_ui();
            // close_all_component();
            go_where('','运营平台',this.id);
        };

        //order
        order.onclick=function () {
            // clear_left_ui();
            // close_all_component();
            go_where('','运营平台',this.id);
        };

        //subAccount
        subAccount.onclick=function () {
            // clear_left_ui();
            // close_all_component();
            go_where('','运营平台',this.id);
        };

        //退出功能
        user.innerHTML=`<div id="logout" style="display: none;">
                <p id="banana"><span class="logout_icon"></span>退出</p>
            </div>${res.data.username}`;
        user.onclick=function (e) {
            logout.style.display=logout.style.display==='block'?'none':'block';
            if(e.target.id==='banana'){
                let xhr=new XMLHttpRequest();
                xhr.onreadystatechange=function () {
                    if(xhr.readyState===4){
                        location.replace('index.html');
                    }
                };
                xhr.open('delete','/metric/v0/operation/login',true);
                xhr.send(null);
            }
        };

        //默认跳转
        //自动加载第一个页签对应的页面
        url_control();
        //自动加载第一个页签对应的页面


        //临时代码
        //     E_commerce.click();
    }
},function(res){
    //失败则返回主页
    location.replace('index.html');
});

//清除左侧点击样式
function clear_left_ui(){
    [changingRoom,clientManager,businessSet,E_commerce,coupon,order,subAccount].forEach((item)=>{
        item.className=item.className.replace('active','');
    });
}

//关闭所有页面
function close_all_component() {
    ['.changingRoom','.clientManager','.businessSet','.roomDetail','.userDetail','.merchantDetail','.coupon','.order','.subAccount','.E_commerce','.customSpecifications'].forEach((item)=>{
        main.querySelector(item).style.display='none';
    });
    //关闭自定义弹窗
    document.getElementById('self_alert') && (self_alert.style.display = 'none');
}