class GroupController < ApplicationController
  before_action :set_group, only: [:edit, :update]
  before_action :new_message

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
      redirect_to root_path, notice: 'グループを作成しました'
    else
      render :new  
    end
  end

  def update
    if @group.update(group_params)
      redirect_to root_path, notice: 'グループを変更しました'
    else
      render :edit
    end
  end

  def edit

  end

  private
  def group_params
    params.require(:group).permit(:group_name, user_ids: [])
  end

  def set_group
    @group = Group.find(params[:id])
  end

  def new_message
    @message = Message.new
  end
  
end
