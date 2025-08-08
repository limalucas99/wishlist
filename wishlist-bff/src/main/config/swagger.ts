import swaggerUi from 'swagger-ui-express'
import type { Express } from 'express'
import swaggerDocument from '@/main/docs'

export default (app: Express): void => {
  app.use('/api/docs', swaggerUi.serve)
  app.get('/api/docs', swaggerUi.setup(swaggerDocument))
}
