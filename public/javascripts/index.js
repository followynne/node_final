console.log('Ciao amici, il tuo Javascript funziona.');

$(document).ready(() => {
    $('#continent').on('change', (event) => addClick(event));
    $('#country').on('change', (event) => addClick(event));
    $('#region').on('change', (event) => addClick(event));
    $('#location').on('change', (event) => embedWebcam(event));
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
    .then(res => res.text())
    .then(data => {
        nextchoice.html(data);
        console.log($('#location').children('option').length);
        nextchoice.show();
    }).catch(err => alert('nope, ' + err));
}

function embedWebcam(event){
    let data = $(event.target).val();
    fetch('/camlink?' + $.param({search: data}),{"Access-Control-Allow-Origin": "*"})
    .then(res => res.text())
    .then(data => {
        $('.webcam1').html(data);
    }).catch(err => alert('nope, ' + err));
}