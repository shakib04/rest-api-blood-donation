outIfNotLogIn();

$("#btnSearch").click(function () {
    var bgroup = encodeURIComponent($("#select_bgroup").val());
    console.log(bgroup);
    loadBookList(bgroup);
});

loadBookList();
function loadBookList(bgroup = "") {
    $.ajax({
        url: "http://localhost:10793/api/b_book/" + localStorage.getItem("userId") + "?bgroup=" + bgroup,
        method: "GET",
        complete: function (xmlHttp, status) {
            if (xmlHttp.status == 200) {
                var str = '';
                bb_data = xmlHttp.responseJSON;
                console.log(bb_data);
                for (let i = 0; i < bb_data.length; i++) {
                    str += ' <tr><td>' + bb_data[i].BookName + '</td><td>' + bb_data[i].BloodGroup + '</td><td>' + bb_data[i].PhoneNumber + '</td><td>' + bb_data[i].Relation + '</td><td><button onclick="getById(this)" value="' + bb_data[i].BookId + '" class="btn btn-link">Update</button>    <button onclick="ConfirmDelete(this)" value="' + bb_data[i].BookId + '" class="btn btn-danger">Remove</button></td></tr>';
                }
                $("#list_of_bb tbody").html(str);
            }
        }
    });
}




function createBB() {
    $.ajax({
        url: "http://localhost:10793/api/b_book/",
        method: "POST",
        headers: "Content-Type:application/json",
        data: {
            "BookName": $("#BookName").val(),
            "BloodGroup": $("#BloodGroup").val(),
            "PhoneNumber": $("#PhoneNumber").val(),
            "Relation": $("#Relation").val(),
            "UserId": localStorage.getItem("userId")
        },
        complete: function (xmlHttp, status) {
            if (xmlHttp.status == 201) {
                loadBookList();
                $("#list_of_bb_wrap").toggle();
                $("#book_forms").toggle();
            } else {

            }
        }
    });
}

$("#bb_create").click(function () {
    createBB();
});

function ConfirmDelete(element) {
    var x = confirm("Are you sure you want to delete?");
    if (x) {
        console.log(element.value);
        deleteMyBook(element.value);
        return true;
    }
    else
        return false;
}


function deleteMyBook(id) {
    $.ajax({
        url: "http://localhost:10793/api/b_book/" + id,
        method: "DELETE",
        success: function (result) {
            loadBookList();
        }
    });
}


//update

var idToUpdate = "";

function getById(element) {
    idToUpdate = element.value;
    console.log(idToUpdate);
    $("#list_of_bb_wrap").toggle();
    $("#book_forms").toggle();
    $.ajax({
        url: "http://localhost:10793/api/b_book_id/" + element.value,
        method: "GET",
        headers: "Content-Type:application/json",
        complete: function (xmlHttp, status) {
            if (xmlHttp.status == 200) {
                var data = xmlHttp.responseJSON;
                console.log(data.HospitalName);
                $("#BookName").val(data.BookName);
                $("#BloodGroup").val(data.BloodGroup);
                $("#PhoneNumber").val(data.PhoneNumber);
                $("#Relation").val(data.Relation);
                $("#UserId").val(localStorage.getItem("userId"));
                $("#bb_create").hide();
                $("#bb_update").show();
            }
        }
    });
}



$("#bb_update").click(function () {
    bbUpdate(idToUpdate);
})
function bbUpdate(id) {
    $.ajax({
        url: "http://localhost:10793/api/b_book/" + id,
        method: "PUT",
        headers: "Content-Type:application/json",
        data: {
            "BookName": $("#BookName").val(),
            "BloodGroup": $("#BloodGroup").val(),
            "PhoneNumber": $("#PhoneNumber").val(),
            "Relation": $("#Relation").val(),
            "UserId": localStorage.getItem("userId"),
        },
        success: function (result) {
            idToUpdate = "";
            loadBookList();
            clearField();
            $("#bb_create").show();
            $("#bb_update").hide();
            $("#list_of_bb_wrap").toggle();
            $("#book_forms").toggle();
        }
    });
}

function clearField() {
    $("#BookName").val("");
    $("#BloodGroup").val("");
    $("#PhoneNumber").val("");
    $("#Relation").val("");
}


//hide show 
$("#create_bb_ref").click(function () {
    $("#list_of_bb_wrap").toggle();
    $("#book_forms").toggle();
})
$("#bb_cancel_create").click(function () {
    $("#list_of_bb_wrap").toggle();
    $("#book_forms").toggle();
})
