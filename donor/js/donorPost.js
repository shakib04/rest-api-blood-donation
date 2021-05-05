
$(document).ready(function () {
    loadPosts();
});


//post List
function loadPosts() {
    $.ajax({
        url: "http://localhost:10793/api/dposts/" + localStorage.getItem("userId"),
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
                        "</td></tr>";
                }
                $("#tbl_Post_list tbody").html(str);
            }
            //console.log(xmlHttp.responseText); 
        }
    });
}