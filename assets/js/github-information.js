function fetchGitHubInformation(event) {
    var username = $("#gh-username").val();
    if (!username) {
        $("#gh-user-data").html("<h2>Please Enter Your Username</h2>");
        return;
    }

    $("#gh-user-data").html(
        `<div id="loader">
            <img src="../css/loader.gif" alt="Loading...">
        </div>`
    );

    $.when(
        $.getJSON(`https://api-github-com/users/${username}`)
    ).then (
        response => {
            var userData = response;
            $("#gh-user-data").html(userInformationHTML(userData));
        },
        errorResponse => {
            if (errorResponse.status === 404) {
                $("gh-user-data").html(`<h2>User Data not found for user ${username}</h2>`);
            } else {
                console.log("Error Response:", errorResponse);
                $("gh-user-data").html(
                    `<h2>Error: ${errorResponse.responseJSON.message}</h2>`
                );
            }
        }
    );
}