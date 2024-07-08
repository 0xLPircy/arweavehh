export type ProjectType = {
  id: string;
  name: string;
  description: string;
  logo: string;
  ticker: string;
  founders: Founder[];
  socials: Socials;
};

type Founder = {
  name: string;
  designation: string;
  photo: string;
};

type Socials = {
  website?: string;
  x?: string;
  discord?: string;
  github?: string;
};
