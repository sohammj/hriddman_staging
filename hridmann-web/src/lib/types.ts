export interface EventType {
  title: string;
  description: string;
  date: string;
  bannerExpiry: string;
  flyer?: {
    asset?: {
      _ref?: string;
      _type?: string;
    };
  };
  link?: string;
}
