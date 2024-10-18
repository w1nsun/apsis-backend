import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { MainModule } from '../src/main.module';
import { ITeamRepository, TeamRepository } from '../src/domain/teamManagement';
import { TEAMS_MOCK } from './mocks/teams.mock';
import {
  CounterRepository,
  ICounterRepository,
} from '../src/domain/stepTracking';
import { COUNTERS_MOCK } from './mocks/counters.mock';

describe('Leaderboard (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [MainModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    const teamRepo = app.get<TeamRepository>(ITeamRepository);
    const countersRepo = app.get<CounterRepository>(ICounterRepository);
    teamRepo.teams = TEAMS_MOCK;
    countersRepo.counters = COUNTERS_MOCK;
  });

  it('/leaderboard/teams/team_1/total (GET)', () => {
    return request(app.getHttpServer())
      .get(`/leaderboard/teams/${TEAMS_MOCK[0].id}/total`)
      .expect(200)
      .expect({
        team_id: '26a5d305-7947-4e3f-bd63-1a8940941cd5',
        team_name: 'Team 1',
        steps_amount: 600,
      });
  });

  it('/leaderboard/teams/team_1 (GET)', () => {
    return request(app.getHttpServer())
      .get(`/leaderboard/teams/${TEAMS_MOCK[0].id}`)
      .expect(200)
      .expect([
        {
          counter_id: '57d2949e-7f3c-451e-8484-c106e790b95e',
          steps_amount: 100,
        },
        {
          counter_id: '84d9e37d-d435-4282-8291-87d7832db938',
          steps_amount: 200,
        },
        {
          counter_id: '67d1f018-76a2-4210-9396-38b979208ae2',
          steps_amount: 300,
        },
      ]);
  });

  it('/leaderboard/teams/team_2/total (GET)', () => {
    return request(app.getHttpServer())
      .get(`/leaderboard/teams/${TEAMS_MOCK[1].id}/total`)
      .expect(200)
      .expect({
        team_id: '2dfee014-09f5-43fa-a98c-4f0531903e8d',
        team_name: 'Team 2',
        steps_amount: 1002,
      });
  });

  it('/leaderboard/teams/team_2 (GET)', () => {
    return request(app.getHttpServer())
      .get(`/leaderboard/teams/${TEAMS_MOCK[1].id}`)
      .expect(200)
      .expect([
        {
          counter_id: '817e68eb-8192-404c-a3b9-65987071b967',
          steps_amount: 1002,
        },
      ]);
  });

  it('/leaderboard/teams (GET)', () => {
    return request(app.getHttpServer())
      .get('/leaderboard/teams')
      .expect(200)
      .expect([
        {
          team_id: '26a5d305-7947-4e3f-bd63-1a8940941cd5',
          team_name: 'Team 1',
          steps_amount: 600,
        },
        {
          team_id: '2dfee014-09f5-43fa-a98c-4f0531903e8d',
          team_name: 'Team 2',
          steps_amount: 1002,
        },
      ]);
  });
});
