
$(document).ready(function () {
    loadPosts();
});


//post List
function loadPosts() {
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


function inputValidation() {

}


//create post
$("#create_Post_btn").click(function () {
    //validation 
    var all_input = $("#create-post :input");
    console.log(all_input);
    for (let i = 0; i < all_input.length; i++) {
        const element = all_input[i];
        //console.log($(element).val());
        //var arrIndextoClear = 
        if ($(element).val() == "") {
            $("#validationMsg").html("<span style='color:red;'>Fill All Fields</span>");
            return;
        }
    }

    $("#validationMsg").html("<span style='color:green;'>All Filed</span>");


    $.ajax({
        url: "http://localhost:10793/api/posts",
        method: "POST",
        headers: "Content-Type:application/json",
        data: {
            "HospitalName": $("#HospitalName").val(),
            "Address": $("#Address").val(),
            "WantedBlood": $("#WantedBlood").val(),
            "ContactNumber": $("#ContactNumber").val(),
            "Text": $("#Text").val(),
            "UserId": localStorage.getItem("userId")
        },
        complete: function (xmlHttp, status) {

            if (xmlHttp.status == 201) {
                $("#msg").html(xmlHttp.status + ":" + xmlHttp.statusText);
                loadPosts();
                $("#create_post_show").toggle();
                $("#post-list").toggle();
                $("#create-post").toggle();
                for (let i = 0; i < all_input.length; i++) {
                    const element = all_input[i];
                    if ($(element).hasClass("btn")) {
                        continue;
                    } else {
                        $(element).val("");
                    }
                }
            } else {
                $("#msg").html(xmlHttp.status + ":" + xmlHttp.statusText);
            }
        }
    });
});


//delete post
$("#delete_post_btn").click(function () {
    $.ajax({
        url: "http://localhost:10793//api/posts/" + $("#post_id_search_delete").val(),
        method: "DELETE",
        success: function (result) {
            loadPosts();
        }
    });
});

$("#update_post_btn").click(function () {
    console.log($("#HospitalName").val());
    if ($("#HospitalName").val() == "") {
        getById();
    } else {
        postUpdate();
    }
});



function getById() {
    $.ajax({
        url: "http://localhost:10793//api/posts/" + $("#post_id_search_delete").val(),
        method: "GET",
        headers: "Content-Type:application/json",
        complete: function (xmlHttp, status) {
            if (xmlHttp.status == 200) {
                var data = xmlHttp.responseJSON;
                console.log(data.HospitalName);
                $("#HospitalName").val(data.HospitalName);
                $("#Address").val(data.Address);
                $("#WantedBlood").val(data.WantedBlood);
                $("#ContactNumber").val(data.ContactNumber);
                $("#Text").val(data.Text);
            }
        }
    });
}




$("#create_post_show").click(function () {
    outIfNotLogIn();
    $(this).hide();
    $("#post-list").hide();
    $("#create-post").show();
});

$("#create_Post_btn_delete").click(function () {
    $("#create_post_show").toggle();
    $("#post-list").toggle();
    $("#create-post").toggle();
})



$(".flag-post").text("Test")