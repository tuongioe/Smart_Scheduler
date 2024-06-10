import customAxios from '../utils/customAxios';

export const getAllCalendars = async () =>
  (await customAxios.get('/calendars')).data;

export const generateTask = async (body) =>
  (await customAxios.post('/generate/task', body)).data;

export const createManyTasks = async (body) =>
  (await customAxios.post('/create-many-tasks', body)).data;
