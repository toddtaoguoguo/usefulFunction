//请求队列方法

// 请求参数接口，待扩展
interface I_FetchParam {
    url: string;
    callback: (data: any) => void;
}

function makeScheduleFetch() {
    let fetchList: Array<I_FetchParam>;

    function scheduleFetch(fetchParam: I_FetchParam) {
        if (fetchList && fetchList.length > 1) {   //如果前面有请求未完成
            //加入请求队列
            fetchList.push(fetchParam);
        } else {
            //直接执行请求
            doFetch(fetchParam);
        }
    }

    function doFetch(fetchParam: I_FetchParam) {
        fetch(fetchParam.url)
            .then(response => response.json())
            .then(
                data => {
                    fetchList && fetchList.shift();
                    fetchParam.callback(data);
                    if (fetchList && fetchList.length > 0) { //如果后面还有请求
                        //执行下一个请求
                        arguments.callee(fetchList[0]);
                    }
                }
            );
    }

    return scheduleFetch;
}

const scheduleFetch = makeScheduleFetch();
let fetchParam = {
    url: 'https://www.baidu.com/sugrec?prod=pc_his&from=pc_web&json=1&sid=35105_31254_34584_35949_35994_35956_35326_26350_35885_35878_36010&hisdata=&_t=1646645291234&req=2&sc=eb&csor=0',
    callback: (data: any) => { console.log(data) }
};
scheduleFetch(fetchParam)

//test name change