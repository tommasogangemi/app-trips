import { WithId } from '../../../types/common/object';

export type TripScore = 'average' | 'good' | 'awesome';

export interface TripResponse extends WithId {
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

export class Trip implements WithId {
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

  /**
   * Maximum rating a trip can have.
   */
  private MAX_RATING = 5;
  /**
   * Minimum rating a trip can have.
   */
  private MIN_RATING = 1;

  getScore(): TripScore {
    const ratingWeight = 0.34;
    const ratingsCountWeight = 0.33;
    const co2Weight = 0.33;

    /**
     * Normalized ratings score. Divides by MAX_RATING - MIN_RATING because seemingly a trip cannot have a rating lower than 1.
     * If this were to change we can easily update the variables at their source.
     */
    const normalizedRating =
      (this.rating - 1) / (this.MAX_RATING - this.MIN_RATING);
    /**
     * Normalized ratings count. Uses logarithmic scale to lower the impact of trips with very high score and minimize outliar values.
     * Divides by log 1000 because it's basically the maximum value that we can have at the moment.
     * HARDCODING THIS IS NOT IDEAL. Ideally this value should be provided by an API so that it can stay up to date
     * with the data on the database, and it can be retrieved without the need to fetch all the trips.
     */
    const normalizedRatingsCount =
      Math.log(this.nrOfRatings + 1) / Math.log(1000);
    /**
     * Normalized emissions score. Divides by 1000 because it's basically the maximum value that we can have at the moment.
     * The value is reversed because lower emissions are better. No logarithmic scale is used because we want to penalize trips with high carbon footprint.
     * HARDCODING THIS IS NOT IDEAL. The same principle noted for normalizedRating applies here as well.
     */
    const normalizedEmissions = 1 - this.co2 / 1000;

    const score =
      ratingWeight * normalizedRating +
      ratingsCountWeight * normalizedRatingsCount +
      co2Weight * normalizedEmissions;

    // Categorize the score into 1, 2, or 3
    if (score < 0.33) return 'average';
    if (score < 0.67) return 'good';
    return 'awesome';
  }

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
