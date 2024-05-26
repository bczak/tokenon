import { client } from '@/api/client.ts'

export const getJettonsBalances = async (accountId: string) => {
  return await client.accounts.getAccountJettonsBalances(accountId)
}
