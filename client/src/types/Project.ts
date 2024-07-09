export type ProjectType = {
  id: string;
  name: string;
  description: string;
  logo: string;
  cooldownPeriod: number;
  aoethRewardRate: number;
  ticker: string;
  founders: Founder[];
  socials: Socials;
  amountStaked: number;
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
