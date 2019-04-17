/*
处理链接问题
 */
function splitUrl() {
    let parameters = location.search.toString().substring(1);
    let results = {};

    //没有参数直接返回结果
    if(!parameters){
        return null;
    }

    //拆分参数
    parameters = parameters.split("&");
    for(i in parameters){
        parameter = parameters[i].split("=");
        results[decodeURIComponent(parameter[0])] = decodeURIComponent(parameter[1]);
    }

    return results;
}