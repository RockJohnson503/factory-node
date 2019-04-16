/*
全局初始化
 */
let flag = path.indexOf("index") !== -1;

//初始化需要的数据
let parameters = splitUrl();
let results = parameters ? jsonSearch(parameters) : useData;

//初始化表格的函数
tableInit(results,true,true,true);

//初始化样式
if(!flag){
    $(".dataTablesInfo button").eq(0).text("返回主页");
    $(".dataTablesInfo button").eq(0).attr("onclick", "window.location.assign('./index.html')");
}