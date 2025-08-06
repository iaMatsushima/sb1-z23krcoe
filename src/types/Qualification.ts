export interface Qualification {
  id: string;
  category: string;
  subcategory: string;
  name: string;
  points: number;
  currentCount: number;
}

export interface QualificationStats {
  month: string;
  totalCount: number;
  totalPoints: number;
}