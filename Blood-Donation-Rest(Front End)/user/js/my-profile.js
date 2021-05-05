outIfNotLogIn();
var data = "";
loadPrimayInfo();

var proPicName = "";

function loadPrimayInfo() {
    console.log((localStorage.getItem("email") + ":" + localStorage.getItem("password")));
    $.ajax({
        url: "http://localhost:10793/api/profile/" + localStorage.getItem("userId"),
        method: "GET",
        headers: {
            "Authorization": "Basic " + btoa(localStorage.getItem("email") + ":" + localStorage.getItem("password"))
        },
        complete: function (xmlHttp, status) {
            //document.write(xmlHttp.responseText);
            if (xmlHttp.status == 200) {
                var str = '';
                data = xmlHttp.responseJSON;
                proPicName = data.ProPic;
                $("#propic").html('<img src="http://localhost:10793/UploadedFiles/' + proPicName + '" alt="">');
                console.log(data);
                str += "<tr><td>Id</td><td>" + data.UserId + "</td></tr>"
                    + "<tr><td>Name</td><td>" + data.Name + "</td></tr>"
                    + "<tr><td>Email</td><td>" + data.Email + "</td></tr>"
                    + "<tr><td>Age</td><td>" + _calculateAge(data.DOB) + "</td></tr>"
                    + "<tr><td>Phone</td><td>" + data.Phone + "</td></tr>"
                    + "<tr><td>Type</td><td>" + data.Type + "</td></tr>"
                    + "<tr><td>Blood Group</td><td>" + data.BloodGroup + "</td></tr>"
                    + "<tr><td>Address</td><td>" + data.Address + "</td></tr>";
                $("#primary_info_tbl tbody").html(str);
                $("#others_info_tbl tbody").html("<tr><td>Gender</td><td>" + data.Gender + "</td></tr>"
                    + "<tr><td>NID</td><td>" + data.NID + "</td></tr>"
                    + "<tr><td>Social Profile</td><td>" + data.Social_Profile + "</td></tr>");
                profileReportLoad();
            }
        }
    });
}


function _calculateAge(birthday) {
    birthday = birthday.split('T')[0];
    console.log(birthday);
    var ageDifMs = Date.now() - Date.parse(birthday);
    var ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
}


function EditProfile() {

}

$("#Edit_Profile_btn").click(function () {

    $("#primary_info_tbl").toggle();
    $("#others_info_tbl").toggle();
    $("#Edit_Profile_others_btn").toggle();
    if ($(this).text() == "Edit Primary Info") {
        $(this).text("Back to Profile");
    } else {
        $(this).text("Edit Primary Info");
    }
    FillEditForm();
    $("#Edit_Profile_Form").toggle();

});

function FillEditForm() {
    $("#Name").val(data.Name);
    $("#Email").val(data.Email);
    $("#Phone").val(data.Phone);
    $("#Address").val(data.Address);
    $("#BloodGroup").val(data.BloodGroup);
}

$("#save_primary_btn").click(function () {
    //validation 
    var all_input = $("#Edit_Profile_Form :input");
    for (let i = 0; i < all_input.length; i++) {
        const element = all_input[i];
        if ($(element).val() == "") {
            $("#validationMsg").html("<span style='color:red;'>Fill All Fields</span>");
            return;
        }
    }

    $("#validationMsg").html("<span style='color:green;'>All Filed</span>");

    $.ajax({

        url: "http://localhost:10793/api/profile/" + localStorage.getItem("userId"),
        method: "PUT",
        dataType: 'json',
        headers: {
            "Authorization": "Basic " + btoa(localStorage.getItem("email") + ":" + localStorage.getItem("password")),
        },
        data: {
            "Name": $("#Name").val(),
            "Address": $("#Address").val(),
            "BloodGroup": $("#BloodGroup").val(),
            "Phone": $("#Phone").val(),
            "Email": $("#Email").val(),
        },
        success: function (result) {
            //$("#post_id_search_delete").val("")
            //loadPosts();
            loadPrimayInfo();
            $("#primary_info_tbl").show();
            $("#Edit_Profile_Form").hide();
            ClearEditForm();
            $("#Edit_Profile_btn").text("Edit Profile");
        }
    });
});

function ClearEditForm() {
    $("#Name").val("");
    $("#Email").val("");
    $("#Phone").val("");
    $("#Address").val("");
    $("#BloodGroup").val("");
}


