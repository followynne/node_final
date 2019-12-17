console.log('Ciao amici, il tuo Javascript funziona.');

$(document).ready(() => {
    $('#continent').on('change', (event) => addClick(event));
    $('#country').on('change', (event) => addClick(event));
    $('#region').on('change', (event) => addClick(event));
    $('#location').on('change', (event) => {
        embedWebcam(event);
        let value = $(event.target).children('option:selected').attr('city');
        $('#weat').val(value);
        $('#weather').submit();
    });

    $('#weather').submit(event => {
       weatherLogic(event);
    })
})

function addClick (event){
    let data = $(event.target).val();
    let idref = $(event.target).attr('id');
    let selectsiblings = $(event.target).nextAll('select');
    let nextchoice = $(event.target).next('select');
    selectsiblings.empty();
    selectsiblings.hide();
    $('.webcam1').html('');
    fetch('/camlocation/get' +  idref + '?' + $.param({search: data}),{"Access-Control-Allow-Origin": "*"})
    .then(res => {
        if (!res.ok){
            throw new Error();
        }    
        return res.text()
    })
    .then(data => {
        nextchoice.html(data);
        nextchoice.show();
    }).catch(err => alert('nope, ' + err));
}

function embedWebcam(event){
    let data = $(event.target).val();
    fetch('/camlink?' + $.param({search: data}),{"Access-Control-Allow-Origin": "*"})
    .then(res =>{if (res.status==404){console.log(res.err);return;} else { return res.text()}})
    .then(data => {
        $('.webcam1').html(data);
    }).catch(err => alert('nope, ' + err));
}

const weatherLogic = (event) => {
    event.preventDefault();
    let action = $(event.target).attr('action');
    let input =  $(event.target).find('input[name="city"]').val()
    let post = $.post(action, {"city" : input});
    post.done(data => {
        $('#weather_result').html(data);
    }).fail((xhr, status, err) => console.log('Error: ' + err + '; Status: ' + status));
}