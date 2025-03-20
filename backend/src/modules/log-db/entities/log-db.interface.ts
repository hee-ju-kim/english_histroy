export interface LogDB {
	who: {
    _id: string,
    ip: string,
  },
  when: Date,
  where: {
    route: string,
  },
  what: {
    _id: string,
    schema: string,
  },
  how: {
    action: string,
    before: object,
    after: object,
  },
  memo: string,
}