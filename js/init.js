/*
全局初始化
 */
let flag = path.indexOf("index") !== -1 && !location.search.toString().substr(1);
let tableNum = getDatas("getTableNum");//获取当前表的展示数量
let firstMonth = useData.month;//期初的月份
let date = new Date();
let nowMonth = date.getMonth() + 1;//当前月份
let nowDay = date.getDate();//当前日期

//期初折账
if(flag && ((firstMonth === Number(nowMonth) && Number(nowDay) >= 21) ||
            (firstMonth === Number(nowMonth) - 1 && Number(nowDay) < 21))){
    if(getDatas("first") === null){alert("获取数据失败!code(9)")}
    location.reload();
}

//初始化需要的数据
let parameters = splitUrl();
let results = parameters ? jsonSearch(parameters, parameters.sear ? true : false) : useData;

//初始化表格的函数
tableInit(results, Number(tableNum), true, true);

//初始化样式
if(!flag){
    $(".dataTablesInfo button").eq(0).text("返回主页");
    $(".dataTablesInfo button").eq(0).attr("onclick", "window.location.assign('./index.html')");
}
let tableBottom = Number($(".userImportTableBottom").css("width").replace("px", ""));
let addBtn = Number($(".dataTablesInfo").css("width").replace("px", ""));
let pageInate = Number($(".tablePageinate").css("width").replace("px", ""));
let digital = Number($(".digitalLength").css("width").replace("px", ""));
let left = (tableBottom - addBtn - pageInate - digital) / 2 + 20;
$(".search-wrapper").css("left", left + "px");