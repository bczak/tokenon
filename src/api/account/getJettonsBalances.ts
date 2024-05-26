import {client} from '@/api/client.ts'
import {Address} from "@ton/core";

export const getJettonsBalances = async (accountId: string) => {
	return await client.accounts.getAccountJettonsBalances(accountId)
}

export const getJettonBalance = async (jetton: string, accountId: string) => {
	const balances = await getJettonsBalances(accountId)
	const jettonBalance = balances.balances.find((balance) => Address.parse(balance.jetton.address).toString() === Address.parse(jetton).toString())
	return jettonBalance ? BigInt(jettonBalance.balance) : 0n
}