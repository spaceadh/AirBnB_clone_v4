$(document).ready(function () {
  const idDict = {};
  $('input:checkbox').change(function () {
    if ($(this).is(':checked')) {
      idDict[($(this).attr('data-name'))] = $(this).attr('data-id');
    } else {
      delete idDict[$(this).attr('data-name')];
    }
    $('.amenities > h4').text(Object.keys(idDict).join(', '));
  });

  $.get('http://0.0.0.0:5001/api/v1/status/', function (data) {
    if (data.status === 'OK') {
      $('DIV#api_status').addClass('available');
    }
  });
});
