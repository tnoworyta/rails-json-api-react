class Category < ApplicationRecord
  has_many :posts, dependent: :nullify

  validates :name, presence: true
end
