class UserResource < JSONAPI::Resource
  attributes :email, :confirmed_at
end
