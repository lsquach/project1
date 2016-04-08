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

function handleNewActivitySubmit(e) {
  e.preventDefault();
  var $modal = $('#activityModal');
  var $timeField = $modal.find('#time');
  var $loggerNameField = $modal.find('#loggerName');
  var $walkedField = $modal.find('#walked');
  var $poopedField = $modal.find('#pooped');
  var $peedField = $modal.find('#peed');
  var $fedField = $modal.find('#fed');

  // get data from modal fields
  // note the server expects the keys to be 'name', 'trackNumber' so we use those.
  var dataToPost = {
    time: $timeField.val(),
    name: $loggerNameField.val(),
    walked: $walkedField.val(),
    pooped: $poopedField.val(),
    peed: $peedField.val(),
    fed: $fedField.val()
  };
  var dogId = $modal.data('dogId');
  console.log('retrieved ', time, loggerName, walked, pooped, peed, fed);
  // POST to SERVER
  var activityPostToServerUrl = '/api/dogs/'+ dogId + '/activitylogs';
  $.post(activityPostToServerUrl, dataToPost, function(data) {
    console.log('received data from post to /activitylogs:', data);
    // clear form
    $timeField.val('');
    $loggerNameField.val('');
    $walkedField.val('');
    $poopedField.val('');
    $peedField.val('');
    $fedField.val('');

    // close modal
    $modal.modal('hide');
    // update the correct dog to show the new activitylog
    $.get('/api/dogs/' + dogId, function(data) {
      // remove the current instance of the dog from the page
      $('[data-dog-id=' + dogId + ']').remove();
      // re-render it with the new dog data (including activity logs)
      renderDog(data);
    });
  }).error(function(err) {
    console.log('post to /api/dogs/:dogId/activitylogs resulted in error', err);
  });
}
