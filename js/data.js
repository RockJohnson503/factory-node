//型号的操作
function idOperat(id, operat){
    let modalHeader = document.getElementsByClassName("modal-header")[0].getElementsByTagName("strong")[0];
    if(modalHeader.innerText !== ""){
        $(".modal-body .input-group").eq(0).css("display", "");
        modalHeader.childNodes[0].remove();
    }
    if(operat === "领料"){
        $(".modal-body .input-group").eq(0).css("display", "none");
    }
    modalHeader.append(operat + "型号: " + id);
}

//检查批次号输入的数据
function checkOpDatas() {
    return false;
}

//检查添加输入的数据
function checkAddDatas(node) {
    let trNode = node.parentNode.parentNode;
    let inputNodes = trNode.getElementsByTagName("input");
    let results = {
        "factory": "空",
        "id": "空",
        "name": "空",
        "first": 0,
        "now": 0,
        "in": 0,
        "out": 0
    };

    //页面被修改
    if(inputNodes.length !== 7){
        alert("页面已被篡改,请按F5刷新页面后重新操作!");
        return ;
    }

    //获取数据
    let i = 0;
    for(let k in results){
        let vals = inputNodes[i].value;

        //装换数据类型
        if(i >= 3){
            vals = Number(vals);
            if(!vals && vals !== 0){
                alert("请输入数字!");
                return ;
            }
        }

        if(vals !== ""){
            results[k] = vals;
        }
        i++;
    }

    //验证必输入字段
    if(results.id === "空" || results.name === "空"){
        alert("您还没填写型号和名称列表!");
        return ;
    }

    //验证型号是否重复
    for(let k in useData.data){
        if(results.id === useData.data[k].id){
            alert("您输入了重复的型号!");
            return ;
        }
    }

    //验证完毕
    results.now = results.first + results.in - results.out;
    let txt = "厂家: " + results.factory + ",  型号: " + results.id +
        ",  名称: " + results.name + ",  期初: " + results.first +
        ",  现存: " + results.now + ",  入库合计: " + results.in +
        ",  领料合计: " + results.out;
    let check = confirm("您输入的数据为:\n" + txt + "\n请仔细确认!");
    if(!check){
        return ;
    }

    let q = jsonPush(JSON.stringify(results));
    if(q !== null){
        alert("添加数据成功!");
        location.reload();
    }else{
        alert("添加数据失败!");
    }
}