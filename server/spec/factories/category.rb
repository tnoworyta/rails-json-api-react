FactoryGirl.define do
  factory :category do
    name { Faker::Lorem.word }
  end

  trait :with_posts do
    posts { build_list :post, 5, :with_comments }
  end
end
