export class Counter {
  id: string;

  employeeId: string;

  stepsAmount: number;

  createdAt: Date;

  constructor(id: string, employeeId: string, stepsAmount: number) {
    this.id = id;
    this.employeeId = employeeId;
    this.stepsAmount = stepsAmount ?? 0;
    this.createdAt = new Date();
  }
}
