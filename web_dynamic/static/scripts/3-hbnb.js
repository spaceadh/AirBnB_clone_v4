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

  $.ajax({
    type: 'POST',
    url: 'http://0.0.0.0:5001/api/v1/places_search/',
    data: '{}',
    contentType: 'application/json',
    success: function (result, status, xhr) {
      const sortedResult = result.sort(function (a, b) {
        if (a.name < b.name) { return -1; }
        if (a.name > b.name) {
          return 1;
        } else { return 0; }
      });
      for (const placeDict of sortedResult) {
        const place = $(`<article>
                     <div class='title'>
                       <h2>${placeDict.name}</h2>
                       <div class='price_by_night'>
                         ${placeDict.price_by_night}
                       </div>
                     </div>
                     <div class='information'>
                       <div class='max_guest'>
                         <i class='fa fa-users fa-3x' aria-hidden='true'></i>
                         <br />
                         ${placeDict.max_guest} Guests
                       </div>
                       <div class='number_rooms'>
                         <i class='fa fa-bed fa-3x' aria-hidden='true'></i>
                         <br />
                         ${placeDict.number_rooms} Bedrooms
                       </div>
                       <div class='number_bathrooms'>
                         <i class='fa fa-bath fa-3x' aria-hidden='true'></i>
                         <br />
                         ${placeDict.number_bathrooms} Bathrooms
                       </div>
                     </div>
                     <div class='description'>
                     ${placeDict.description}
                     </div>
                   </article>`);
        $('SECTION.places').append(place);
      }
    }
  });
});
