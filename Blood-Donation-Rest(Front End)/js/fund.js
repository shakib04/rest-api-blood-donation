if (localStorage.getItem("email") != null) {
    $("#UserEmail").val(localStorage.getItem("email"));
}

$("#add_fund_btn").click(function () {
    $("#fund_wrap").toggle();
    $(".fund_user_details").toggle();
});

$("#Add_Payment_Info_btn").click(function () {

    if ($("#Amount").val() == "" || $("#MoneySource").val() == "" || $("#Name").val() == "" || $("#UserEmail").val() == "") {
        $("#user_details_error").text("Fill Required Info");
        return;
    }
    $(".fund_user_details").toggle();
    $("#conf_payment_wrap").toggle();
});


$("#ConfirmBtn").click(function () {
    if ($("#MobileNumber").val() == "" || $("#pin").val() == "") {
        $("#conf_error").text("Fill All Details");
        return;
    }
    $("#conf_error").text("");

    $.ajax({
        url: "http://localhost:10793/api/funding",
        method: "POST",
        //headers: "Content-Type:application/json",
        dataType: 'json',
        headers: {
            "Authorization": "Basic " + btoa(localStorage.getItem("email") + ":" + localStorage.getItem("password")),
        },
        data: {
            "Amount": $("#Amount").val(),
            "MoneySource": $("#MoneySource").val(),
            "UserEmail": $("#UserEmail").val(),
            "Name": $("#Name").val(),
            "YourMessage": $("#YourMessage").val()
        },
        complete: function (xmlHttp, status) {

            if (xmlHttp.status == 201) {
                //location.replace("funding.html");
                $("#tnxMsg").text("Thanks for your support");
                $("#conf_payment_wrap").toggle();

            } else {

            }
        }
    });
});