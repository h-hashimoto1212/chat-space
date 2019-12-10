class GroupController < ApplicationController

  def index
    @group = Group.all
  end

  def new
    @group = Group.new
    @group.users << current_user
  end

  def create
    @group = Group.new(group_params)
    if @group.save
      redirect_to root_path, notice: 'グループを作成しました。'
    else
      render :new  
    end
  end

  def show
  
  end

  def update
  
  end

  def edit
    
  end

  def destroy
  
  end

  def group_params
    params.require(:group).permit(:group_name, user_ids: [])
  end
  
end