class PlaceCoordinatesJob < ApplicationJob
  queue_as :default

  def perform(place_id)
    place = Place.find(place_id)
    return if !place.location.present?
    logger.info("Place check: #{place.location}")
    results = Geocoder.search(place.location)
    # log results to console
    logger.info("Results: #{results}")
    if results.any?
      place.update(
        latitude: results.first.coordinates[0],
        longitude: results.first.coordinates[1]
      )
      place.broadcast_replace_to(place, target: "map", partial: "places/map", locals: { place: place })
    end
  end
end
