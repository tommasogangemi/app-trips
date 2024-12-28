import { TransformFn } from '../../types/common/functions';

export interface TripResponse {
  id: string;
  title: string;
  description: string;
  price: number;
  rating: number;
  nrOfRatings: number;
  verticalType: string;
  tags: string[];
  co2: number;
  thumbnailUrl: string;
  imageUrl: string;
  creationDate: string;
}

export class Trip {
  id: string;
  title: string;
  description: string;
  price: number;
  rating: number;
  nrOfRatings: number;
  verticalType: string;
  tags: string[];
  co2: number;
  thumbnailUrl: string;
  imageUrl: string;
  creationDate: Date;

  constructor(apiResponse: TripResponse) {
    this.id = apiResponse.id;
    this.title = apiResponse.title;
    this.description = apiResponse.description;
    this.price = apiResponse.price;
    this.rating = apiResponse.rating;
    this.nrOfRatings = apiResponse.nrOfRatings;
    this.verticalType = apiResponse.verticalType;
    this.tags = apiResponse.tags;
    this.co2 = apiResponse.co2;
    this.thumbnailUrl = apiResponse.thumbnailUrl;
    this.imageUrl = apiResponse.imageUrl;
    this.creationDate = new Date(apiResponse.creationDate);
  }
}

export const transformTripResponse: TransformFn<TripResponse, Trip> = (res) =>
  new Trip(res);
