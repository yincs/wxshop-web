/**
 * Created by yincs on 2017/3/26.
 */

$(document).ready(function () {
    console.log("document ready!");

    checkHasLogin();


    $("#login").click(function () {
        console.log("点击了");
        $.getJSON("http://localhost:8080/wxshop-admin-web/usma/userLogin",
            {"userName": $("#account").val(), "pwd": $("#pwd").val()},
            function (data) {
                if (checkDataIsSuccess(data)) {
                    console.log(data.object.token);
                    saveUserToken(data.object.token);
                    checkHasLogin();
                }
            })
    });

    $("#loginOut").click(function () {
        console.log("点击了");
        clearUserToken();
        checkHasLogin();
    });
});

function checkHasLogin() {
    var userToken = getUserToken();
    if (userToken == null) {
        $("#notLoginDiv").show(300);
        $("#hasLoginDiv").hide();
        console.log("userToken == null")
    } else {
        $("#hasLoginDiv").show(300);
        $("#notLoginDiv").hide();
        console.log("userToken != null")
    }
}


function saveUserToken(userToken) {
    sessionStorage.userToken = userToken;
}

function clearUserToken() {
    sessionStorage.removeItem("userToken")
}


function getUserToken() {
    return sessionStorage.userToken;
}

function checkDataIsSuccess(data) {
    console.log(data);
    if (data == null) {
        alert("操作失败");
        return false;
    }
    console.log(data.code);
    var success = data.code == "000000";
    if (!success)
        alert(data.msg);
    return success;
}