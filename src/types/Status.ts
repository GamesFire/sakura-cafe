export enum Statuses {
  PENDING = "на розгляді",
  ACCEPTED = "прийнято",
  REJECTED = "відхилено",
  CANCELED = "скасовано",
}

export type Status =
  | Statuses.PENDING
  | Statuses.ACCEPTED
  | Statuses.REJECTED
  | Statuses.CANCELED;
