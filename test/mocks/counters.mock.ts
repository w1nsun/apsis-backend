import { Counter } from '../../src/domain/stepTracking';
import { TEAMS_MOCK } from './teams.mock';

export const COUNTERS_MOCK: Counter[] = [
  {
    id: '57d2949e-7f3c-451e-8484-c106e790b95e',
    teamId: TEAMS_MOCK[0].id,
    employeeId: '74c8410b-24d6-487d-bf80-966715dde938',
    stepsAmount: 100,
    createdAt: new Date('2022-12-02T02:00:00Z'),
  },
  {
    id: '84d9e37d-d435-4282-8291-87d7832db938',
    teamId: TEAMS_MOCK[0].id,
    employeeId: '905cf766-bb84-4109-9d4c-018678ce9962',
    stepsAmount: 200,
    createdAt: new Date('2022-12-02T02:00:00Z'),
  },
  {
    id: '67d1f018-76a2-4210-9396-38b979208ae2',
    teamId: TEAMS_MOCK[0].id,
    employeeId: '937f6355-cb1c-4644-a1b4-291617e4f302',
    stepsAmount: 300,
    createdAt: new Date('2022-12-02T02:00:00Z'),
  },
  {
    id: '817e68eb-8192-404c-a3b9-65987071b967',
    teamId: TEAMS_MOCK[1].id,
    employeeId: '20a4712b-a484-473c-a2f2-e7838110c471',
    stepsAmount: 1002,
    createdAt: new Date('2022-12-02T02:00:00Z'),
  },
];
