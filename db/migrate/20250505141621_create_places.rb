class CreatePlaces < ActiveRecord::Migration[8.0]
  def change
    create_table :places do |t|
      t.string :name
      t.string :location
      t.decimal :latitude
      t.decimal :longitude

      t.timestamps
    end
  end
end
