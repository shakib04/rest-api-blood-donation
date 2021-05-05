
$(document).ready(function () {
    loadUser();
});


//post List
function loadUser() {
    $.ajax({
        url: "http://localhost:10793/api/duser",
        method: "GET",
        complete: function (xmlHttp, status) {
            if (xmlHttp.status == 200) {
                var str = '';
                var data = xmlHttp.responseJSON;
                console.log(data);
                for (let i = 0; i < data.length; i++) {
                    str += "<tr><td>" + data[i].Name +
                        "</td><td>" + data[i].Email +
                        "</td><td>" + data[i].Phone +
                        "</td><td>" + data[i].Address +
                        "</td><td>" + data[i].BloodGroup +
                        "</td><td>" + _calculateAge(data[i].DOB) +
                        "</td><td>" + data[i].ReportCounter +
                        "</td><td>" + data[i].isVerified +
                        "</td><td>" + data[i].Gender +
                        "</td></td>";
                }
                $("#donar_list_tbl tbody").html(str);
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