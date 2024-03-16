export interface Item {
  trackingNumber: string;
  carrier: string;
  origin: string;
  destination: string;
  mawb: string;
  consigner: string;
  consignee: string;
  description: string;
  count: number;
  weight: number;
  riskLevel: RiskLevelEnum;
  riskAnalysisLink: string;
  uld: string;
}

export enum RiskLevelEnum {
  Low = 'Low',
  Medium = 'Medium',
  High = 'High'
}
