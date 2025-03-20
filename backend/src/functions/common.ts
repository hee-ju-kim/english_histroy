export function makeReqWhoInfo(req: any): object {
  return {
    ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress?.slice(7),
    route: req.path,
  };
}
