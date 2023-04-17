import { Injectable, NestMiddleware } from '@nestjs/common';

const LIMIT_RECORD_PER_PAGE_DEFAULT = 10;
const DEFAULT_PAGE = 1;

@Injectable()
export class PagerMiddleware implements NestMiddleware {
  use(req: any, _: any, next: (error?: any) => void) {
    req.query._limit = +req.query._limit || LIMIT_RECORD_PER_PAGE_DEFAULT;
    req.query._page = +req.query._page || DEFAULT_PAGE;
    req.query._search = req.query._search || '';
    next();
  }
}
