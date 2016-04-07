$(document).ready(function() {
  console.log('app.js loaded!');
  $.get('/api/dogs').success(function (dogs) {
    dogs.forEach(function(dog) {
      renderDog(dog);
    });
  });

  $('#newDogForm').on('submit', function(e) {
    e.preventDefault();
    var formData = $(this).serialize();
    console.log('formData', formData);
    $.post('/api/dogs', formData, function(dog) {
      console.log('dog after POST', dog);
      renderDog(dog);  //render the server's response
    });
    $(this).trigger("reset");
  });
});


// this function takes a single dog and renders it to the page
function renderDog(dog) {
  console.log('rendering dog', dog);
  var dogHtml = $('#dog-template').html();
  var dogsTemplate = Handlebars.compile(dogHtml);
  var html = dogsTemplate(dog);
  $('#dogTarget').prepend(html);
}
