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
        url: "http://localhost:10793/api/donorReg",
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
                location.replace("../index.html");
                $("#msg").html(xmlHttp.status + ":" + xmlHttp.statusText)
            } else {
                $("#msg").html(xmlHttp.status + ":" + xmlHttp.statusText);
            }
        }
    });
});
