require 'rails_helper'
describe Message do
  describe '#create' do
    it "is valid if message is empty" do
      message = build(:message, body: nil)
      expect(message).to be_valid
    end
    it "is valid if no image uploaded" do
      message = build(:message, image: nil)
      expect(message).to be_valid
    end
    it "is valid if message and image exist" do
      message = build(:message)
      expect(message).to be_valid
    end
    it "is invalid if message nor image filled" do
      message = build(:message, body: nil, image: nil)
      message.valid?
      expect(message.errors[:body]).to include("を入力してください")
    end
    it "is invalid if message does not belong in a group" do
      message = build(:message, group_id: nil)
      message.valid?
      expect(message.errors[:group]).to include("を入力してください")
    end
    it "is invalid if message does not belong to a user" do
      message = build(:message, user_id: nil)
      message.valid?
      expect(message.errors[:user]).to include("を入力してください")
    end
  end

end