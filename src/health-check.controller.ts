import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { HealthCheck, HealthCheckService, HttpHealthIndicator, MongooseHealthIndicator } from '@nestjs/terminus';
import { Public } from './auth/decorator/public.decorator';

@ApiTags('health')
@Controller('health')
export class HealthCheckController {
    constructor(
        private healthCheckService: HealthCheckService,
        private http: HttpHealthIndicator,
        private db: MongooseHealthIndicator,
    ){}

    @Public()
    @Get()
    @HealthCheck()
    checkHealth() {
        return this.healthCheckService.check([
            () => this.http.pingCheck('Basic Check', process.env.APP_HOST),
            () => this.db.pingCheck('mongoose')
        ]);
    }
}
