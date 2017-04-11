// Module add new item to UI
exports.addItem = (item) => {

  // Hide 'no items' message
  $('#no-items').hide();

  // New item HTML
  let itemHTML = `<a class="panel-block read-item">
                    <figure class="image has-shadow is-64x64 thumb">
                      <img src="${item.screenshot}"/>
                    </figure>
                    <h2 class="title is-4 column">${item.title}</h2>
                  </a>`;

  // Append item to read-list
  $('#read-list').append(itemHTML);

}
