export type UserTransaction = {
  messageId: string;
  aoEthQuantity: number;
  projectTicker: string;
  ProjectTokenReceived: number;
  ptReceived: number;
  ptSent: number;
};

export type StakedAmounts = Record<
  string,
  {
    amount: number;
  }
>;
