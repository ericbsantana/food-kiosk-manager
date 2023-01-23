import IException from "../interfaces/exception";

const Exception = function (this: IException, status: number, message: string) {
  this.status = status;
  this.message = message;
} as unknown as { new (status: number, message: string): IException };

export default Exception;
