var application_form = document.getElementById("application-form");
var submit_btn = document.getElementById("submit-btn");
var response_block = document.getElementById("response-block");
var loading = document.getElementById("loading");

function toggle_loading(state) {
    state ? loading.style.display = "block" : loading.style.display = "none";
    state ? submit_btn.style.display = "none" : submit_btn.style.display = "block";
}

function toggle_response(state, data = null) {
    state ? response_block.style.display = "block" : response_block.style.display = "none";

    if (data) {
        var html = ``;
        html += `<span>${data}</span>`;
        response_block.innerHTML = html;
    } else {
        response_block.innerHTML =
            `<span>null</span>`;
    }

}

application_form.addEventListener('submit', function (e) {
    e.preventDefault();

    toggle_response(false);
    toggle_loading(true);

    var data = {};
    var formData = new FormData(e.target);

    for (var [key, value] of formData.entries()) {
        data[key] = value;
    }

    console.log(data);

    /*setTimeout(function () {
        toggle_response(true, "Thank you!");
        toggle_loading(false);
    }, 1000);*/

    const http = new XMLHttpRequest();
    const url = '/api/loan.submit';

    http.open("POST", url, true);
    http.setRequestHeader("Content-type", "application/json");
    http.send(JSON.stringify(data));

    http.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var result = JSON.parse(http.responseText)
            console.log(result);
            toggle_response(true, result.message);
            toggle_loading(false);
        }
    }

    return false;
});