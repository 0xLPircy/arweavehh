export type UserTransaction = {
  messageId: string;
  aoEthQuantity: string;
  projectTicker: string;
  ProjectTokenReceived: string;
  ptReceived: boolean;
  ptSent: boolean;
};

export type StakedAmounts = Record<
  string,
  {
    aoeth: number;
    projectToken: number;
  }
>;
