const {ipcRenderer} = require('electron');
const items = require('./items.js');

// Navigate selected item with key up/down event
$(document).keydown((e) => {
  switch (e.key) {
    case 'ArrowUp':
    items.changeItem('up');
      break;
    case 'ArrowDown':
    items.changeItem('down');
      break;
  }
});

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

  // Select first item in list
  if (items.toreadItems.length === 1)
    $('.read-item:first()').addClass('is-active');
});

// Filter items by search
$('#search').keyup((e) => {
  let filter = $(e.currentTarget).val();
  $('.read-item').each((index, element) => {
    let el = $(element);
    el.text().toLowerCase().includes(filter) ? $(el).show() : $(el).hide();
  })
})

// Add items when app loads
if (items.toreadItems.length)
  items.toreadItems.forEach(items.addItem);
  $('.read-item:first()').addClass('is-active');
