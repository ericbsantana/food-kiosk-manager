interface IKiosk {
  description: string;
  isKioskClosed: boolean;
  serialKey: string;
  storeClosesAt: Date;
  storeOpensAt: Date;
}

export default IKiosk;
