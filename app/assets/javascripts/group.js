$(function(){
  function buildUser(user){
    var html = `
                <div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.name}</p>
                  <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
                </div>
              `
    return html;
  }
  $('#user-search-field').on('keyup',function(e){
    let input = $('#user-search-field').val();
    $.ajax({
      type: 'GET',
      url: '/user',
      dataType: 'json',
      data: {keyword: input},
    })
    .done(function(user_data){
      user_data.forEach(function(each_user){
      var html = buildUser(each_user);
      $('#user-search-result').append(html);
      })
    })
    .fail(function(){
      alert('failed to find user')
    })
  })
})