$(document).ready(function() {
  console.log('app.js loaded!');

  var dogHtml = $('#dog-template').html();
  var dogsTemplate = Handlebars.compile(dogHtml);

  $.get('/api/dogs').success(function (dogs) {
    dogs.forEach(function(dog) {
      renderDog(dog);
      $('#dogTarget').on('click', '.delete-activity', handleDeleteActivityClick);
    });
  });

  $('#newDogForm').on('submit', function(e) {
    e.preventDefault();
    var formData = $(this).serialize();
    $.post('/api/dogs', formData, function(dog) {
      $('.collapse').collapse('hide');
      renderDog(dog);
    });
    $(this).trigger("reset");
  });

  $('#dogTarget').on('click', '.add-activity', handleAddActivityClick);
  $('#saveActivity').on('click', handleNewActivitySubmit);
  $('#dogTarget').on('click', '.delete-dog', handleDeleteDogClick);

  $('#dogTarget').on('click', '.update-dog', handleDogEditClick);
  $('#dogTarget').on('click', '.save-dog', handleSaveChangesClick);
});

function handleDogEditClick(e) {
  var $dogRow = $(this).closest('.dog');
  var dogId = $dogRow.data('dog-id');
  // show the save changes button
  $dogRow.find('.save-dog').toggleClass('hidden');
  // hide the edit button
  $dogRow.find('.update-dog').toggleClass('hidden');

  // get the dog name and replace its field with an input element
  var dogName = $dogRow.find('span.dog-name').text();
  // $dogRow.find('span.dog-name').html('<input class="form-control edit-dog-name" placeholder="Name" required' + dogName + '"></input>');
  $dogRow.find('span.dog-name').html('<input class="form-control edit-dog-name" placeholder="Name" value="' + dogName + '"> </input>');

  // get the image and show an input element
  var dogImageField = $dogRow.find('span.dog-image-field').text();
  var dogImage = $dogRow.find('img.dog-image').attr('src');
  $dogRow.find('span.dog-image-field').html('<br>' + '<br>' + '<input class="form-control edit-dog-image" placeholder="Image Link" value="' + dogImage + '"> </input>');
}

// after editing a dog, when the save changes button is clicked
function handleSaveChangesClick(e) {
  var dogId = $(this).parents('.dog').data('dog-id');
  var $dogRow = $('[data-dog-id=' + dogId + ']');

  var data = {
    name: $dogRow.find('.edit-dog-name').val(),
    image: $dogRow.find('.edit-dog-image').val(),
  };

  $.ajax({
    method: 'PUT',
    url: '/api/dogs/' + dogId,
    data: data,
    success: handleDogUpdatedResponse
  });
}

function handleDogUpdatedResponse(data) {
  var dogId = data._id;
  // remove this dog from the page
  $('[data-dog-id=' + dogId + ']').remove();
  // and then re-draw it with the updates
  renderDog(data);
}


function renderDog(dog) {
  var html = dogsTemplate(dog);
  $('#dogTarget').prepend(html);
}

// when a delete button for an album is clicked
function handleDeleteDogClick(e) {
  var dogId = $(this).parents('.dog').data('dog-id');
  $.ajax({
    url: '/api/dogs/' + dogId,
    method: 'DELETE',
    success: handleDeleteDogSuccess
  });
}

// callback after DELETE /api/albums/:id
function handleDeleteDogSuccess(data) {
  var deletedDogId = data._id;
  $('div[data-dog-id=' + deletedDogId + ']').remove();
}

// this function takes a single dog and renders it to the page
function renderDog(dog) {
  var dogHtml = $('#dog-template').html();
  var dogsTemplate = Handlebars.compile(dogHtml);
  var html = dogsTemplate(dog);
  $('#dogTarget').prepend(html);
}

function fetchAndReRenderDogWithId(dogId) {
  $.get('/api/dogs/' + dogId, function(data) {
    // remove the current instance of the dog from the page
    $('datadogid=' + dogId).remove();
    // re-render it with the new dog data (including activities)
    renderDog(data);
  });
}

// when the add activity button is clicked, display the modal
function handleAddActivityClick(e) {
  var currentDogId = $(this).closest('.dog').data('dog-id');
  $('#activityModal').data('dog-id', currentDogId);
  $('#activityModal').modal('show');
}

function handleNewActivitySubmit(e) {
  e.preventDefault();
  var $modal = $('#activityModal');
  var $timeField = $modal.find('#time');
  var $loggerNameField = $modal.find('#loggerName');
  var $walkedField = $modal.find('#walked, input:radio');
  var $poopedField = $modal.find('#pooped, input:radio');
  var $peedField = $modal.find('#peed, input:radio');
  var $fedField = $modal.find('#fed, input:radio');

  // get data from modal fields
  var dataToPost = {
    time: $timeField.val(),
    name: $loggerNameField.val(),
    walked: $walkedField.val(),
    pooped: $poopedField.val(),
    peed: $peedField.val(),
    fed: $fedField.val()
  };
  var dogId = $modal.data('dogId');
  // POST to SERVER
  var activityPostToServerUrl = '/api/dogs/'+ dogId + '/activitylogs';
  $.post(activityPostToServerUrl, dataToPost, function(data) {
    // clear form
    $timeField.val('');
    $loggerNameField.val('');
    $walkedField.prop('checked', false);
    $poopedField.prop('checked', false);
    $peedField.prop('checked', false);
    $fedField.prop('checked', false);

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



// when an activity delete button is clicked
function handleDeleteActivityClick(e) {
  e.preventDefault();
  var $thisButton = $(this);
  var activityLogId = $thisButton.data('activity-id');
  var dogId = $thisButton.closest('.dog').data('dog-id');
  var url = '/api/dogs/' + dogId + '/activitylogs/' + activityLogId;
  $.ajax({
    method: 'DELETE',
    url: url,
    success: handleActivityDeleteResponse
  });
}

function handleActivityDeleteResponse(data) {
  var activityLogId = data._id;
  var $divRow = $('div#' + activityLogId);
  var dogId = $divRow.data('dog-id');
  // remove that activity edit form from the page
  $divRow.remove();
  fetchAndReRenderDogWithId(dogId);
}
