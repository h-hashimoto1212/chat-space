FactoryBot.define do
  
  factory :message do
    body              {"newmessage"}
    image             {Rack::Test::UploadedFile.new(File.join(Rails.root, 'spec/fixtures/test.png'))}
    group
    user
  end
end