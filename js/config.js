/*
储存全局变量
 */
path = location.pathname.toString();//当前路径
backupAataArray=[];//接受接口的数据，避免翻页的时候发送多次请求
dataTotalNum=0;//数据总条数
filtrateTable=[];//table每次需要展示的数据，受每页展示条数的限制;
currentPageNum=1;//当前所在页码;
pageFixedNum=5;//初始化定的页码数量
dataSet=new Set();//用集合来存储选中的数据
roleSelect=[];//角色下拉框数据;
pagesChoose=[10, 15, 20];//自定义每页数据显示条数，可修改
pageNum = 5;
setOn=true;
dataName = path.indexOf("index") !== -1 ? "turnoverData" : "detailData";
useData = getDatas("getJsonData?cur=" + dataName);//当前使用的数据