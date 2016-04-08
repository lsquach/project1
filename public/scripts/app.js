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

  $('#dogTarget').on('click', '.add-activity', handleAddActivityClick);
});


// this function takes a single dog and renders it to the page
function renderDog(dog) {
  console.log('rendering dog', dog);
  var dogHtml = $('#dog-template').html();
  var dogsTemplate = Handlebars.compile(dogHtml);
  var html = dogsTemplate(dog);
  $('#dogTarget').prepend(html);
}

// when the add activity button is clicked, display the modal
function handleAddActivityClick(e) {
  console.log('add-activity clicked!');
  var currentDogId = $(this).closest('.dog').data('dog-id'); // "5665ff1678209c64e51b4e7b"
  console.log('id',currentDogId);
  $('#activityModal').data('dog-id', currentDogId);
  console.log('dog-id');
  $('#activityModal').modal('show');  // display the modal!
  console.log('modal');
}
