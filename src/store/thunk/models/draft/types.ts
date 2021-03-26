export const SAVE_DRAFT_TITLE = 'SAVE_DRAFT_TITLE';
export const SAVE_DRAFT_BELONG = 'SAVE_DRAFT_BELONG';
export const SAVE_DRAFT_CONTENT = 'SAVE_DRAFT_CONTENT';

export interface Belong {
  _id: string;
  key: string;
  name: string;
  belong: string;
  sort: string;
}
export interface Belongs {
  _id: string;
  key: string;
  name: string;
  sort: string;
  children: Belong[];
}
