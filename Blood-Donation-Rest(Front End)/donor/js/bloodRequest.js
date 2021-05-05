$.ajax({
    url: "http://localhost:10793/api/bloodrequest/" + localStorage.getItem("userId"),
    method: "GET",
    complete: function (xmlHttp, status) {
        if (xmlHttp.status == 200) {
            var str = '';
            var data = xmlHttp.responseJSON;
            console.log(data);
            //Res();
            localStorage.setItem("reqid", data[0].RequestId);
            var response = localStorage.getItem("response")
            for (let i = 0; i < data.length; i++) {
                if (localStorage.getItem("response") == null) {
                    //localStorage.setItem("reqid" + [i], data[0].RequestId);
                    str += "<tr><td>" + data[i].Request_Message +
                        "</td><td>" + data[i].userInfoUser.Name +
                        "</td><td>" + data[i].userInfoDonar.BloodGroup +
                        "</td><td><button onclick='Accept()' class='btn btn-secondary' value='Accept'>Accept</button>" +
                        "  <button onclick='Reject()' class='btn btn-secondary' value='Accept'>Reject</button>" +
                        "</td></tr>";
                }
                if (localStorage.getItem("response") != null) {
                    str += "<tr><td>" + data[i].Request_Message +
                        "</td><td>" + data[i].userInfoUser.Name +
                        "</td><td>" + data[i].userInfoDonar.BloodGroup +
                        "</td><td>" + response +
                        "</td></tr>";
                }
            }
            $("#request_blood_tbl tbody").html(str);
        }
    }
});

function Res() {
    $.ajax({
        url: "http://localhost:10793/api/reply/" + localStorage.getItem("reqid"),
        method: "GET",
        complete: function (xmlHttp, status) {
            //document.write(xmlHttp.responseText);
            if (xmlHttp.status == 200) {
                var data = xmlHttp.responseJSON;
                localStorage.setItem("response", data);
            }
        }
    });
}

function Accept() {
    console.log("A");
    $.ajax({
        url: "http://localhost:10793/api/reqresponseA/" + localStorage.getItem("reqid"),
        method: "GET",

        headers: {
            "Authorization": "Basic " + btoa(localStorage.getItem("email") + ":" + localStorage.getItem("password"))
        },
        complete: function (xmlHttp, status) {
            //document.write(xmlHttp.responseText);
            if (xmlHttp.status == 200) {
                var data = xmlHttp.responseJSON;
                localStorage.setItem("response", data.willDonate);
                location.reload();
            }
        }
    });
}

function Reject() {
    console.log("R");
    $.ajax({
        url: "http://localhost:10793/api/reqresponseR/" + localStorage.getItem("reqid"),
        method: "GET",

        headers: {
            "Authorization": "Basic " + btoa(localStorage.getItem("email") + ":" + localStorage.getItem("password"))
        },
        complete: function (xmlHttp, status) {
            //document.write(xmlHttp.responseText);
            if (xmlHttp.status == 200) {
                var data = xmlHttp.responseJSON;
                localStorage.setItem("response", data.willDonate);
                location.reload();
            }
        }
    });
}