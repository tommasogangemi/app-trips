import { Trip, TripResponse } from './trips';

const BASE_TRIP_RESPONSE: TripResponse = {
  id: '1',
  title: 'Test Trip',
  price: 100,
  rating: 4.5,
  creationDate: '2023-01-01T00:00:00Z',
  co2: 550,
  description: 'Test description',
  nrOfRatings: 10,
  verticalType: 'car',
  tags: ['tag1', 'tag2'],
  thumbnailUrl: 'test-thumbnail-url',
  imageUrl: 'test-image-url',
};

describe('Trip', () => {
  it('should be created with the correct properties', () => {
    const trip = new Trip(BASE_TRIP_RESPONSE);

    expect(trip.id).toBe('1');
    expect(trip.title).toBe('Test Trip');
    expect(trip.price).toBe(100);
    expect(trip.rating).toBe(4.5);
    expect(trip.creationDate).toEqual(new Date('2023-01-01T00:00:00Z'));
  });

  describe('getScore basic behavior', () => {
    it('should return the an "average" score when the rating is low, co2 emissions are high and the amount of ratings is low', () => {
      const trip = new Trip({
        ...BASE_TRIP_RESPONSE,
        co2: 800,
        rating: 2,
        nrOfRatings: 5,
      });

      expect(trip.getScore()).toBe('average');
    });

    it('should return the a "good" score when the rating is average, co2 emissions are not very high and the amount of ratings is not very low', () => {
      const trip = new Trip({
        ...BASE_TRIP_RESPONSE,
        co2: 400,
        rating: 3,
        nrOfRatings: 500,
      });

      expect(trip.getScore()).toBe('good');
    });

    it('should return the a "awesome" score when the rating is great, co2 emissions are low and the amount of ratings is high', () => {
      const trip = new Trip({
        ...BASE_TRIP_RESPONSE,
        co2: 50,
        rating: 4.5,
        nrOfRatings: 600,
      });

      expect(trip.getScore()).toBe('awesome');
    });
  });

  describe('getScore equally weighs factors', () => {
    it('should return the a "good" score when the rating is at its peak even though the other parameters are very bad', () => {
      const trip = new Trip({
        ...BASE_TRIP_RESPONSE,
        co2: 1000,
        rating: 5,
        nrOfRatings: 0,
      });

      expect(trip.getScore()).toBe('good');
    });

    it('should return the a "good" score when the nr of ratings is at its peak even though the other parameters are very bad', () => {
      const trip = new Trip({
        ...BASE_TRIP_RESPONSE,
        co2: 1000,
        rating: 1,
        nrOfRatings: 1000,
      });

      expect(trip.getScore()).toBe('good');
    });

    it('should return the a "good" score when the co2 emissions is at its peak even though the other parameters are very bad', () => {
      const trip = new Trip({
        ...BASE_TRIP_RESPONSE,
        co2: 0,
        rating: 1,
        nrOfRatings: 0,
      });

      expect(trip.getScore()).toBe('good');
    });
  });
});
