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
  let url = $('#item-input').val();


  ipcRenderer.send('new-item', url);
});

// Handle keyup event for item-input
$('#item-input').keyup((e) => {
  if(e.key === 'Enter') $('#add-button').click();
});

ipcRenderer.on('new-item-success', (e, ret) => {
  console.log(ret);
})
