export type plans = 'Membership Plan' | 'Monthly Service';
export type status = 'pending' | 'canceled' | 'completed' | 'active';

export type service =
  | 'Computer Service'
  | 'Laptop Service'
  | 'Printer Service'
  | 'CCTV Setup'
  | 'Network Setup'
  | 'Web Development';

export interface IRequest {
  type?: string;
  createdAt: {
    seconds: number;
    nanoseconds: number;
  };
  email: string;
  id: string;
  issue: string;
  lat: string;
  location: string;
  long: string;
  message: string;
  name: string;
  phone: string;
  related_service: plans & service;
  status: status;
  userId: string;
}
