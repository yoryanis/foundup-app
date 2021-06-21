import { environment } from '../../environments/environment';

const addPagination = (page: number, elements: any) =>
  `?pageNumber=${page}&pageElements=${elements}`;
const addPaginationWithDates = (
  page: number,
  elements: any,
  start: any,
  end: any
) => `${addPagination(page, elements)}&start=${start}&end=${end}`;
const addPaginationWithDatesAndState = (
  page: number,
  elements: any,
  start: any,
  end: any,
  state: string,
  identification: number
) =>
  `${addPagination(
    page,
    elements
  )}&start=${start}&end=${end}&state=${state}&identification=${identification}`;
const addPaginationWithDatesAndFilter = (
  page: number,
  elements: any,
  start: any,
  end: any,
  filter: any
) =>
  `${addPagination(page, elements)}&start=${start}&end=${end}&filter=${filter}`;

export const Endpoint = {
  AUTH: {
    LOGIN: environment.apiHost + environment.apiVersion + 'auth/login',
  },
  USER: {
    BASE: environment.apiHost + environment.apiVersion + 'user',
    UPDATE: (id: number) =>
      environment.apiHost + environment.apiVersion + `user/${id}`,
    UPDATEPASSWORD: (id: number) =>
      environment.apiHost + environment.apiVersion + `user/password/${id}`,
    AVATAR: (identification: number) =>
      environment.apiHost +
      environment.apiVersion +
      `user/avatar/${identification}`,
  },
  ACCESSORY: {
    BASE: environment.apiHost + environment.apiVersion + 'accessory',
    ALL: (page: number, elements: number, start: string, end: string) =>
      environment.apiHost +
      environment.apiVersion +
      `accessory` +
      addPaginationWithDates(page, elements, start, end),
    ALL_REPORTS: (
      page: number,
      elements: number,
      start: string,
      end: string,
      state: string,
      identification: number
    ) =>
      environment.apiHost +
      environment.apiVersion +
      `accessory/user-accesories` +
      addPaginationWithDatesAndState(
        page,
        elements,
        start,
        end,
        state,
        identification
      ),
    UPDATE: (id: string) =>
      environment.apiHost + environment.apiVersion + `accessory/${id}`,
    DELETE: (id: string) =>
      environment.apiHost + environment.apiVersion + `accessory/${id}`,
    SEARCH: (
      page: number,
      elements: number,
      start: string,
      end: string,
      filter: any
    ) =>
      environment.apiHost +
      environment.apiVersion +
      `accessory/search/lost` +
      addPaginationWithDatesAndFilter(page, elements, start, end, filter),
    UPLOAD: (id_unique: string) =>
      environment.apiHost +
      environment.apiVersion +
      `accessory/evidences/${id_unique}`,
    REMOVE_EVIDENCE: (id: number) =>
      environment.apiHost +
      environment.apiVersion +
      `accessory/evidences/delete/${id}`,
  },
  CATEGORY: {
    BASE: environment.apiHost + environment.apiVersion + 'category',
  },
  NOTIFICATION: {
    BASE: environment.apiHost + environment.apiVersion + 'notification',
    GENERATE: (id: number) =>
      environment.apiHost +
      environment.apiVersion +
      `notification/generate/${id}`,
    COUNT: (id: number) =>
      environment.apiHost + environment.apiVersion + `notification/count/${id}`,
    COMMENTS: (id: string) =>
      environment.apiHost +
      environment.apiVersion +
      `notification/comments-accessory/${id}`,
    SEEN: (id: number) =>
      environment.apiHost + environment.apiVersion + `notification/${id}/seen`,
    ACCEPT: (id_unique: string) =>
      environment.apiHost +
      environment.apiVersion +
      `notification/${id_unique}/accept`,
  },
};
