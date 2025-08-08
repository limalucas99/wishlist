import type { Request, Response } from 'express'
import type { Controller } from '@/presentation/protocols/controller'

export const adaptRoute = (controller: Controller) => async (req: Request, res: Response) => {
    const httpRequest = {
      body: req.body,
      headers: req.headers,
      params: req.params,
      query: req.query,
      customer: (req as any).customer
    }
    const httpResponse = await controller.handle(httpRequest)
    res.status(httpResponse.statusCode).json(httpResponse.body)
  }
