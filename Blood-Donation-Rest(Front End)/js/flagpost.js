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

function flagPostCreate(postId) {
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

