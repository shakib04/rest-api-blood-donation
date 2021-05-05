$("#BacktoPostListBtn").click(function () {
    $("#tbl_Post_list").show();
    $("#flag-post-reason").hide();
    $("#flagPostReasonText").val("");
});



var postIdForFlag = null;
function GetElement(element) {
    outIfNotLogIn();
    console.log(element.value);
    postIdForFlag = element.value;
    $("#tbl_Post_list").hide();
    $("#flag-post-reason").show();
}

$("#FlagPostSubmitBtn").click(function () {

    flagPostCreate(postIdForFlag);
})

function isItMyPost(postid) {
    var result = true;
    $.ajax({
        url: "http://localhost:10793/api/IsItMyPost?userid=" + localStorage.getItem("userId") + "&postid=" + postid,
        method: "GET",
        complete: function (xmlHttp, status) {
            if (xmlHttp.status == 200) {
                var str = '';
                result = xmlHttp.responseJSON;
                return result;
            }
            //console.log(xmlHttp.responseText); 
        }
    });
    return result
}

function flagPostCreate(postId) {
    // if (isItMyPost(postId)) {
    console.log(isItMyPost(postId));
    //}
    if ($("#flagPostReasonText").val() == "") {
        $("#flagValidationMsg").text("Write The Reason!");
        return;
    }


    $.ajax({
        url: "http://localhost:10793/api/flagpost",
        method: "POST",
        headers: "Content-Type:application/json",
        data: {
            "PostID": postId,
            "userID": localStorage.getItem("userId"),
            "FlagReason": $("#flagPostReasonText").val()
        },
        complete: function (xmlHttp, status) {

            if (xmlHttp.status == 201) {
                $("#msg").html(xmlHttp.status + ":" + xmlHttp.statusText);
                $("#tbl_Post_list").show();
                $("#flag-post-reason").hide();
                $("#flagPostReasonText").val("");
            } else {
                $("#msg").html(xmlHttp.status + ":" + xmlHttp.statusText);
            }
        }
    });
}

function loadFlagByUserId() {
    $.ajax({
        url: "http://localhost:10793/api/Posts",
        method: "GET",
        complete: function (xmlHttp, status) {
            if (xmlHttp.status == 200) {
                var str = '';
                var data = xmlHttp.responseJSON;
                console.log(data);
                for (let i = 0; i < data.length; i++) {
                    str += "<tr><td>" + data[i].PostId +
                        "</td><td>" + data[i].HospitalName +
                        "</td><td>" + data[i].Address +
                        "</td><td>" + data[i].WantedBlood +
                        "</td><td>" + data[i].ContactNumber +
                        "</td><td>" + data[i].Text +
                        "</td><td>" + data[i].userInfo.Name +
                        "</td><td><button onclick='GetElement(this)' id='test-flag' value='" + data[i].PostId + "'  class='flag-post btn btn-info'>Flag Post</button>" +
                        "</td></tr>";
                }
                $("#tbl_Post_list tbody").html(str);
            }
            //console.log(xmlHttp.responseText); 
        }
    });
}