export class Counter {
  id: string;

  teamId: string;

  employeeId: string;

  stepsAmount: number;

  createdAt: Date;

  constructor(
    id: string,
    teamId: string,
    employeeId: string,
    stepsAmount: number,
  ) {
    this.id = id;
    this.teamId = teamId;
    this.employeeId = employeeId;
    this.stepsAmount = stepsAmount ?? 0;
    this.createdAt = new Date();
  }
}
