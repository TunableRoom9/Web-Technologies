let old_email;
var content_ids = ['dashboard', 'accounts', 'rooms', 'location'];

function change_view(view) {
    $.redirect("admin.php", { page : view});
}

$(document).on('click', '.room-entry', function() {

    var room_id = $(this).attr('id').split('room-')[1];

    $.redirect("admin.php", { 
        page : 'room-edit',
        id_room: room_id
    });
});

$(document).on('click', '.photo-entry-room', function() {

    var image = $(this)[0].style.backgroundImage.split(/[\/\"]+/)[4];
    
    $.redirect("admin.php", { 
        page : 'room-edit',
        id_room: window.current_room,
        action: 'delete-photo-room',
        photo: image
    });

});

$(document).on('click', '.photo-entry-location', function() {

    var image = $(this)[0].style.backgroundImage.split(/[\/\"]+/)[4];
    
    $.redirect("admin.php", {
        action: 'delete-photo-location',
        photo: image
    });

});


$(document).on('click', '.edit-account', function() {
    old_email = $(this).parent().siblings('.row-data-email').text();

    var save_btn = "<a href='#' style='margin:auto; display:inline-block; color: inherit' class='update-account'><i class='fa fa-floppy-o'></i></a>"
    var cancel_btn = "<a href='#' style='margin-left:10px; display:inline-block; color: inherit' class='cancel-edit'><i class='fa fa-undo'></i></a>"

    $(this).parent().siblings('.row-data-email').html("<input autocomplete='off' style='width: match-parent' class='input-email' type='email' value='" + old_email + "'>")
    $(this).parent().siblings('.row-data-password').html("<input autocomplete='off' style='width: match-parent' class='input-password' type='password'>")

    $(this).parent().html(save_btn + cancel_btn)
    
});

$(document).on('click', '.delete-account', function() {

    var email = $(this).parent().siblings('.row-data-email').text().trim();
    console.log(email);
    if (confirm("Are you sure you want to delete this account?")) {
        $.redirect("admin.php", { 
            page : 'accounts', 
            action: 'delete-account', 
            demail: email
        });
    }

});

$(document).on('click', '.update-account', function() {
    var email = $(this).parent().siblings('.row-data-email').find('.input-email')[0].value;
    var password = $(this).parent().siblings('.row-data-password').find('.input-password')[0].value;

    var old_email = $(this).parent().siblings('.row-data-email').find('.input-email')[0].attributes.value.nodeValue.trim();

    console.log(email + "-" + password)

    $.redirect("admin.php", { 
        page : 'accounts', 
        action: 'update-account', 
        'old-email': old_email,
        'update-email': email,
        'update-psswd': password
    });

});

$(document).on('click', '.cancel-edit', function() {

    var email = $(this).parent().siblings('.row-data-email').find('.input-email')[0].attributes.value.nodeValue
    $(this).parent().siblings('.row-data-email').html(email)
    $(this).parent().siblings('.row-data-password').html("*****")

    $(this).parent().html("<a href='#' style='margin:auto; display:inline-block; color: inherit' class='edit-account'><i class='fa fa-pencil'></i></a>")

});

$(document).on('click', '.go-back-rooms', function() {
    $.redirect("admin.php", { page : 'rooms'});
});

$(document).ready(function() {

    $('#add-account').click(function() {
        var email = document.getElementById('add-email').value;
        var password = document.getElementById('add-psswd').value;

        $.redirect("admin.php", { page : 'accounts', action: 'add-account', 'add-email': email, 'add-psswd': password});
    });
});