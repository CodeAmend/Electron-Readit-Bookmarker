const {ipcRenderer} = require('electron');

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
  let newItemURL = $('#item-input').val();
  if(newItemURL) {

    // Disable modal UI
    $('#add-button').addClass('is-loading');
    $('#item-input').addClass('is-disabled');
    $('.close-add-modal').addClass('is-disabled');

    // Send URL to main process IPC
    ipcRenderer.send('new-item', newItemURL);
  }

});

// Handle keyup event for item-input
$('#item-input').keyup((e) => {
  if(e.key === 'Enter') $('#add-button').click();
});

ipcRenderer.on('new-item-success', (e, ret) => {
  $('#add-modal').removeClass('is-active');
  $('#item-input').prop('disabled', true).val('');
  $('#add-button').removeClass('is-loading');
  console.log(ret);
})
