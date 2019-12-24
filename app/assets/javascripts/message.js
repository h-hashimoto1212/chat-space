$(function(){
  $('.messages').animate({ scrollTop : $('.messages')[0].scrollHeight});
  var reloadMessages = function(){
    last_message_id = $('.message').slice(-1).data().messageId
    $.ajax({
      url: 'api/messages',
      type: 'GET',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages){
      var insertHTML = '';
      $.each(messages, function(){
        insertHTML += buildMessage
      });
      $('.mesages').append(insertHTML);
    })
    .fail(function(){
      alert('error, failed to reload messages')
    })
  }
  var buildMessage = function(message){
      var user_date = ` <div class="message--top">
                        <div class="message--top__user">
                          ${message.name}
                        </div>
                        <div class="message--top__time_stamp">
                          ${message.created_at}
                        </div>
                        </div>`
    if (message.text && message.image){
      var html = `<div class="message">
                    ${user_date}
                    <div class="message__text">
                        ${message.text}
                    </div>
                    <img class="message__image" src="${message.image}">
                  </div>`
    } else if (message.text) {
      var html = `<div class="message">
                    ${user_date}
                    <div class="message__text">
                      ${message.text}
                    </div>
                  </div>`
    } else if (message.image) {
      var html = `<div class="message">
                    ${user_date}
                    </div>
                    <img class="message__image" src="${message.image}">
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
  if(document.URL.match('/messages')){
    setInterval(reloadMessages,7000);
  }
});