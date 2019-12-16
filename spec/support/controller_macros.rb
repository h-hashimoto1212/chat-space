module ControllerMacros
  def login(user)
    @request.env["devise.mapping"] = Devise.mappings[:admin]
    sign_in user
  end
end