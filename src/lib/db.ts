import { PrismaClient } from '@prisma/client'

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined
}

function getPrismaClient(): PrismaClient {
  if (!global.prisma) {
    global.prisma = new PrismaClient()
  }
  return global.prisma
}

// Lazy proxy — the actual PrismaClient is only instantiated when
// a property is first accessed (i.e. at request time, not module load time).
export const db = new Proxy({} as PrismaClient, {
  get(_target, prop) {
    return (getPrismaClient() as any)[prop]
  },
})
