import {ITokenInfo} from '@/pages/board/BoardPage.types.tsx'
import {MASTER} from '@/config.ts'
import {client} from '@/api/client.ts'
import {Cell} from '@ton/core'
import {Buffer} from 'buffer'
import {fetchCurveBalance} from "@/components/coin_info_comp/utils.tsx";

export const fetchTokens = async (): Promise<ITokenInfo[]> => {
	const res = await client.accounts.getAccountEvents(MASTER, {limit: 10})
	const {events} = res
	const curves: Set<string> = new Set()
	for (const event of events) {
		const {actions} = event
		for (const action of actions) {
			if (action.type === 'TonTransfer' && action.TonTransfer && action.TonTransfer.comment === 'MINT') {
				curves.add(action.TonTransfer.recipient.address)
			}
		}
	}
	return (await Promise.all([...curves].map(async (curve) => {
		try {
			const result = await client.blockchain.execGetMethodForBlockchainAccount(curve, 'token')
			const hex = result.stack[0].cell
			const cells = Cell.fromBoc(Buffer.from(hex!, 'hex'))
			const token = cells[0].beginParse().loadAddressAny()?.toString()
			const data = await client.jettons.getJettonInfo(token!)
			const balance = await fetchCurveBalance(curve, token!);
			const account = await client.accounts.getAccount(curve)
			console.log(account)
			return {
				address: token!,
				image: data.metadata.image,
				description: data.metadata.description,
				name: data.metadata.name,
				symbol: data.metadata.symbol,
				balance: balance,
				tonBalance: BigInt(account.balance),
				curve: curve
			} as ITokenInfo
			
		} catch (e) {
			return null
		}
	}))).filter((token) => token !== null) as ITokenInfo[]
}
