const {ipcRenderer} = require('electron');
const items = require('./items.js');

// Show add-modal
$('.open-add-modal').click(() => {
  $('#add-modal').addClass('is-active');
});

// Hide add-model
$('.close-add-modal').click(() => {
  $('#add-modal').removeClass('is-active');
});

// Handle add button url submittion
$('#add-button').click(() => {

  // Get URL from input
  let newItemURL = $('#item-input').val();
  if (newItemURL) {

    // Disable modal UI
    $('#add-button').addClass('is-loading');
    $('#item-input').prop('disabled', true);
    $('.close-add-modal').addClass('is-disabled');

    // Send URL to main process IPC
    ipcRenderer.send('new-item', newItemURL);
  }

});

// Handle keyup event for item-input
$('#item-input').keyup((e) => {
  if(e.key === 'Enter') $('#add-button').click();
});

// Listen for new items from main
ipcRenderer.on('new-item-success', (e, item) => {

  // Add item to item array
  items.toreadItems.push(item);

  // Save item to storage
  items.saveItem(item);

  // Add item
  items.addItem(item);

  // close and reset modal
  $('#add-modal').removeClass('is-active');
  $('#item-input').prop('disabled', false).val('');
  $('#add-button').removeClass('is-loading');
  $('.close-add-modal').removeClass('is-disabled');

});

// Add items when app loads
if (items.toreadItems.length)
  items.toreadItems.forEach(items.addItem);
