/*
json数据的操作方法
 */

//获取数据
function getDatas(urls){
    let results;
    $.ajax({
        url : location.protocol + "//" + location.hostname + ":" + location.port + "/" + urls,
        type : "post",
        async : false,
        success : function (data) {
             results = data;
        },
        error : function (err) {
            console.log(err)
            alert("数据获取失败!code(0)");
            return null;
        }
    });
    return results;
}

//搜索json数据并返回结果
function jsonSearch(args, match=false, sob = useData){
    let results = {"data": []};

    if(match){
        for(let i in sob.data){
            if(sob.data[i].factory.indexOf(args.sear) !== -1 || sob.data[i].id.indexOf(args.sear) !== -1 || sob.data[i].name.indexOf(args.sear) !== -1){
                results.data.push(sob.data[i]);
            }
        }
    }else{
        for(let i in sob.data){
            if(!args.factory || sob.data[i].factory === args.factory) {
                if(!args.id || sob.data[i].id === args.id){
                    if(!args.name || sob.data[i].name === args.name){
                        if(!args.operat || sob.data[i].operat === args.operat){
                            if(!args.key || sob.data[i].key === args.key){
                                if(!args.date || sob.data[i].date.indexOf(args.date) !== -1){
                                    results.data.push(sob.data[i]);
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    results["status"] = 1;
    return results;
}

//搜索某条值
function jsonSearchKey(key, args, sob = useData){
    let results;

    for(i in sob.data){
        if(sob.data[i].factory === args.factory || !args.factory) {
            if(sob.data[i].id === args.id || !args.id){
                if(sob.data[i].name === args.name || !args.name){
                    results = sob.data[i][key];
                }
            }
        }
    }

    return results;
}

//末尾追加值,添加成功则返回１
function jsonPush(vals, cdataName = dataName) {
    return getDatas("changeJsonData?cur=" + cdataName + "&datas=" + vals);
}