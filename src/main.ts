import * as dotenv from 'dotenv';
dotenv.config({
    path: `config/.env.${process.env.NODE_ENV}`,
});

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { monoLogger } from 'mono-utils-core';
import { config } from './core';
import { router } from './core';
import { CustomLogger } from './core/common/logger';

export const NS_APP = 'app-info';
async function bootstrap() {
    const app = await NestFactory.create(AppModule, { logger: new CustomLogger() });

    router(app);

    await app.listen(config.PORT, () => {
        monoLogger.log(NS_APP, `Current Mode: ${config.NODE_ENV}`);
        monoLogger.log(NS_APP, `Listening on port ${config.PORT}`);
        monoLogger.log(NS_APP, `Ready to service`);
    });
}

monoLogger.log(NS_APP, `---------------Configuration--------------------`);
monoLogger.log(NS_APP, config);
monoLogger.log(NS_APP, `-----------------------------------`);

bootstrap();
