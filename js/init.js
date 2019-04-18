/*
全局初始化
 */
let flag = path.indexOf("index") !== -1 && !location.search.toString().substring(1);

//初始化需要的数据
let parameters = splitUrl();
let results = parameters ? jsonSearch(parameters, parameters.sear ? true : false) : useData;

//初始化表格的函数
let tableNum = getDatas("getTableNum");//获取当前表的展示数量
tableInit(results, Number(tableNum), true, true);

//初始化样式
if(!flag){
    $(".dataTablesInfo button").eq(0).text("返回主页");
    $(".dataTablesInfo button").eq(0).attr("onclick", "window.location.assign('./index.html')");
}