/*
储存全局变量
 */
path = location.pathname.toString();//当前路径
backupAataArray=[],//接受接口的数据，避免翻页的时候发送多次请求
dataTotalNum=0,//数据总条数
tableNum=5,//每一页展示的数据条数
filtrateTable=[],//table每次需要展示的数据，受每页展示条数的限制;
currentPageNum=1,//当前所在页码;
pageFixedNum=6,//初始化定的页码数量
dataSet=new Set();//用集合来存储选中的数据
roleSelect=[];//角色下拉框数据;
pagesChoose=[5, 10, 20];//自定义每页数据显示条数，可修改
setOn=true;


//filtrateTable[i].first + filtrateTable[i].in - filtrateTable[i].out
/*模拟数据 S*/
detailData={
    "status": 1,
    "data": [
        {
            "factory": "恩典",
            "id": "C070前",
            "name": "前叉管",
            "key": "JH19201",
            "operat": "领料",
            "num": 400,
            "date": "2019-04-12"
        },
        {
            "factory": "恩典",
            "id": "C070前",
            "name": "前叉管",
            "key": "JH19201",
            "operat": "入库",
            "num": 1000,
            "date": "2019-04-11"
        },
        {
            "factory": "顺昌",
            "id": "BT100SK前",
            "name": "防尘罩",
            "key": "JH12019",
            "operat": "入库",
            "num": 1000,
            "date": "2019-04-11"
        },
        {
            "factory": "顺昌",
            "id": "BT100SK",
            "name": "防尘罩",
            "key": "JH12019",
            "operat": "入库",
            "num": 1000,
            "date": "2019-04-11"
        },
        {
            "factory": "顺昌哈",
            "id": "BT100SK前",
            "name": "防尘罩",
            "key": "JH12019",
            "operat": "入库",
            "num": 1000,
            "date": "2019-04-11"
        }
    ]
};

turnOver={
    "status": 1,
    "mesg": "获取用户信息成功",
    "data": [
        {
            "factory": "恩典",
            "id": "C070前",
            "name": "前叉管",
            "first": 6857,
            "now": 7457,
            "in": 1000,
            "out": 400
        },
        {
            "factory": "恩典",
            "id": "C070",
            "name": "前叉管",
            "first": 7857,
            "now": 0,
            "in": 1000,
            "out": 400
        },
        {
            "factory": "恩典",
            "id": "C07前",
            "name": "前叉管",
            "first": 7857,
            "now": 0,
            "in": 1000,
            "out": 400
        },
        {
            "factory": "恩典",
            "id": "C070前",
            "name": "前管",
            "first": 7857,
            "now": 0,
            "in": 1000,
            "out": 400
        },
        {
            "factory": "恩典",
            "id": "070前",
            "name": "前叉管",
            "first": 7857,
            "now": 0,
            "in": 1000,
            "out": 400
        },
        {
            "factory": "恩典1",
            "id": "C070前",
            "name": "前叉管",
            "first": 7857,
            "now": 0,
            "in": 1000,
            "out": 400
        },
        {
            "factory": "顺仓",
            "id": "C070前",
            "name": "前叉管",
            "first": 7857,
            "now": 0,
            "in": 1000,
            "out": 400
        }
    ]
};
/*模拟数据 E*/
useData = path.indexOf("index") !== -1 ? turnOver : detailData;//当前使用的数据