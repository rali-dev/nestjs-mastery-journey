import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');
  use(req: Request, res: Response, next: NextFunction) {
    const { ip, method, originalUrl } = req;
    const userAgent = req.get('user-agent') || '';
    const startAt = process.hrtime();
    res.on('finish', () => {
      const { statusCode } = res;
      const contentLength = res.get('content-length');
      const dif = process.hrtime(startAt);
      const responseTimeInMs = dif[0] * 1e3 + dif[1] * 1e-6;
      this.logger.log(
        `${method} ${originalUrl} ${statusCode} - ${contentLength} - ${responseTimeInMs.toFixed(2)} ms - ${userAgent} - ${ip}`,
      );
    });
    next();
  }
}
