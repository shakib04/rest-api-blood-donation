$(document).ready(function () {
    $.ajax({
        url: "http://localhost:10793//api/Users",
        method: "GET",
        complete: function (xmlHttp, status) {
            //document.write(xmlHttp.responseText);
            if (xmlHttp.status == 200) {
                var str = '';
                var data = xmlHttp.responseJSON;
                for (let i = 0; i < data.length; i++) {
                    str += "<tr><td>" + data[i].UserId + "</td><td>" + data[i].Name + "</td><td>" + data[i].Email + "</td><td>" + data[i].Password + "</td></tr>";

                }
                $("#tblUserList tbody").html(str);
            }
            //console.log(xmlHttp.responseText);
        }
    });
});

// $(document).ready(function () {
//     $("#root").text("Hello")
// })

$("#User_Registration_Btn").click(function () {
    //validation 
    var all_input = $("#User_Reg_Form :input");
    for (let i = 0; i < all_input.length; i++) {
        const element = all_input[i];
        if ($(element).val() == "") {
            $("#validationMsg").html("<span style='color:red;'>Fill All Fields</span>");
            return;
        }
    }

    $.ajax({
        url: "http://localhost:10793/api/userReg",
        method: "POST",
        headers: "Content-Type:application/json",
        data: {
            "Name": $("#Name").val(),
            "Email": $("#Email").val(),
            "Password": $("#Password").val(),
            "Phone": $("#Phone").val(),
            "Address": $("#Address").val(),
            "DOB": $("#DOB").val(),
            "BloodGroup": $("#BloodGroup").val(),
        },
        complete: function (xmlHttp, status) {
            console.log($("#Name").val())
            if (xmlHttp.status == 201) {
                location.replace("index.html");
                $("#msg").html(xmlHttp.status + ":" + xmlHttp.statusText)
            } else {
                $("#msg").html(xmlHttp.status + ":" + xmlHttp.statusText);
            }
        }
    });
});


$("#delete_Btn").click(function () {
    $.ajax({
        url: "http://localhost:10793//api/Users/" + $("#DeleteUserId").val(),
        method: "DELETE",
        success: function (result) {

        }

    })
});

// Store
//localStorage.setItem("lastname", "Smith");

// Retrieve
