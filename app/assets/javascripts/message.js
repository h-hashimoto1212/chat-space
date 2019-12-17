$(function(){
  function buildMessage(message){
    if (message.image.url) {
      var html = `<div class="message">
                  <div class="message--top">
                  <div class="message--top__user">
                  ${message.name}
                  </div>
                  <div class="message--top__time_stamp">
                  ${message.created_at}
                  </div>
                  </div>
                  <div class="message__text">
                  ${message.text}
                  </div>
                  <img class="message__image" src="${message.image.url}" alt="">
                  </div>`
    } else {
      var html = `<div class="message">
                  <div class="message--top">
                  <div class="message--top__user">
                  ${message.name}
                  </div>
                  <div class="message--top__time_stamp">
                  ${message.created_at}
                  </div>
                  </div>
                  <div class="message__text">
                  ${message.text}
                  </div>
                  </div>`
    }
    return html;
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildMessage(data);
      $('.messages').append(html);
      
      $('.messages').animate({ scrollTop : $('.messages')[0].scrollHeight});
      $('#new_message').get(0).reset();
      $('.send').prop('disabled', false);
    })
    .fail(function(){
      alert('error');
    })
  })
});