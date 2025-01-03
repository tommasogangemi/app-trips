import { TripResponse } from '../../resources/trips/trips';

export const buildTripResponseMock = (
  overrides: Partial<TripResponse>
): TripResponse => ({
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
  ...overrides,
});
