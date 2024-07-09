export type UserTransaction = {
  messageId: string;
  aoEthQuantity: string; // can be positive or negative int
  projectTicker: string;
  ProjectTokenReceived: string;
  ptReceived: boolean;
  ptSent: boolean;
  date: number;
  amtUnstaked: boolean;
};

export type UserTxnData = {
  user: string;
  currentlyStaked: boolean;
  msg: UserTransaction[];
};

export type StakedAmounts = Record<
  string,
  {
    aoeth: number;
    projectToken: number;
  }
>;
