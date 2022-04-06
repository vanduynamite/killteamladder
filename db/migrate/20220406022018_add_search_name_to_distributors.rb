class AddSearchNameToDistributors < ActiveRecord::Migration[5.2]
  def change
    add_column(:distributors, :search_name, :string)
  end
end
