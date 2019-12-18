$(function(){
  function buildUser(user){
    var html = `
                <div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.name}</p>
                  <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
                </div>
              `
    $('#user-search-result').append(html);
    return html;
  }
  function noUser(){
    var html =`
              <div class="chat-group-user clearfix">
                <p class="chat-group-user__name">ユーザーが見つかりません</p>
              </div>
              `
    $('#user-search-result').append(html);
    return html;
  }

  function addUserlist(selected){
    var html = `
              <div class='chat-group-user'>
                <input name='group[user_ids][]' type='hidden' value='${selected.userId}'>
                <p class='chat-group-user__name'>${selected.userName}</p>
                <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
              </div>
              `
    $('.js-add-user').append(html)
  }

  function addMember(userId) {
    let html = `<input value="${userId}" name="group[user_ids][]" type="hidden" id="group_user_ids_${userId}" />`;
    $(`#${userId}`).append(html);
  }
  
  $('#user-search-field').on('keyup',function(){
    let input = $('#user-search-field').val();
    $.ajax({
      type: 'GET',
      url: '/user',
      dataType: 'json',
      data: {keyword: input},
    })
    .done(function(user_data){
      $('#user-search-result').empty();
      if (user_data.length !== 0) {
        user_data.forEach(function(each_user){
          buildUser(each_user);
        })
      } else if (input.length == 0){
        return false;
      } else {
        noUser()
      }
    })
    .fail(function(){
      alert('something happened')
    })
  })
  $(function(){
    $(document).on('click', '.user-search-add', function(){
      $(this).parent().remove();
      var selected = $(this).data();
      addUserlist(selected);
      addMember(selected.userId);
    })
  })
  $(function(){
    $(document).on('click', '.js-remove-btn', function(){
      $(this).parent().remove();
    })
  })
})