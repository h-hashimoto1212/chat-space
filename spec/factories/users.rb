FactoryBot.define do
  
  factory :user do
    name                  {Faker::Name.last_name}
    email                 {Faker::Internet.email}
    fakepass = Faker::Internet.password(min_length: 8)
    password              {fakepass}
    password_confirmation {fakepass}
  end
end