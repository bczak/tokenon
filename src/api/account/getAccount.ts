import { client } from '@/api/client.ts'

export const getAccount = async (accountId: string) => {
  return await client.accounts.getAccount(accountId)
}
