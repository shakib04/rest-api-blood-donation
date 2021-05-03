outIfNotLogIn();
loadMyPost();
var data = "";
function loadMyPost() {
    $.ajax({
        url: "http://localhost:10793/api/mypost/" + localStorage.getItem("userId"),
        method: "GET",
        complete: function (xmlHttp, status) {
            if (xmlHttp.status == 200) {
                var str = '';
                data = xmlHttp.responseJSON;
                console.log(data);
                for (let i = 0; i < data.length; i++) {
                    str += '<div class="col-sm-6">'
                        + '<div class="card">'

                        + '<div class="card-body" style="border:1px solid black; padding:5px; margin: 5px;">'
                        + '<h4 class="card-title">'
                        + 'Group:'
                        + '<b>' + data[i].WantedBlood + '</b>'
                        + '</h4>'
                        + '<p class="card-text">' + data[i].Address + '</p>'
                        + '<p class="card-text">Hospital: ' + data[i].HospitalName + '</p>'
                        + '<p class="card-text">' + data[i].Text + '</p>'
                        + '<p class="card-text">' + data[i].ContactNumber + '</p>'
                        + '<p class="card-text">Posted By:' + data[i].userInfo.Name
                        + '<p>'
                        + '<button onclick="getById(this)" class="btn postUpdateBtn btn-info" value="' + data[i].PostId + '">Update</button> '
                        + ' <button onclick="ConfirmDelete(this)" value="' + data[i].PostId + '" class="btn btn-danger">Drop</button>'
                        + '</div>'
                        + '</div>'
                        + '</div>';
                }
                $("#myPostList").html(str);
            }
        }
    });
}


function ConfirmDelete(element) {
    var x = confirm("Are you sure you want to delete?");
    if (x) {
        console.log(element.value);
        deleteMyPost(element.value);
        return true;
    }
    else
        return false;
}

function deleteMyPost(id) {
    $.ajax({
        url: "http://localhost:10793/api/posts/" + id,
        method: "DELETE",
        success: function (result) {
            loadMyPost();
        }
    });
}


$("#update_Post_btn").click(function () {
    postUpdate(idToUpdate);
})
function postUpdate(element) {
    //validation 
    var all_input = $("#update_post :input");
    for (let i = 0; i < all_input.length; i++) {
        const element = all_input[i];
        if ($(element).val() == "") {
            $("#validationMsg").html("<span style='color:red;'>Fill All Fields</span>");
            return;
        }
    }
    $.ajax({
        url: "http://localhost:10793//api/posts/" + element,
        method: "PUT",
        headers: "Content-Type:application/json",
        data: {
            "HospitalName": $("#HospitalName").val(),
            "Address": $("#Address").val(),
            "WantedBlood": $("#WantedBlood").val(),
            "ContactNumber": $("#ContactNumber").val(),
            "Text": $("#Text").val(),
        },
        success: function (result) {
            $("#post_id_search_delete").val("")
            loadMyPost();
            $("#myPostList").toggle();
            $("#update_post").toggle();
        }
    });
}
var idToUpdate = "";

function getById(element) {
    idToUpdate = element.value;
    $("#myPostList").toggle();
    $("#update_post").toggle();
    $.ajax({
        url: "http://localhost:10793//api/posts/" + element.value,
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

$("#cancel_update_Post_btn").click(function () {
    $("#myPostList").toggle();
    $("#update_post").toggle();
})