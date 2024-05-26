import { type FC, useEffect, useState } from 'react'
import { Button, Input, List, Subheadline, Text, Textarea, Title } from '@telegram-apps/telegram-ui'
import { useTonConnectUI, useTonWallet } from '@tonconnect/ui-react'
import { httpsCallable } from 'firebase/functions'
import { useNavigate } from 'react-router-dom'

import { functions, MASTER } from '@/config'

import './Launch.scss'
import { useThemeParams } from '@tma.js/sdk-react'

export const LaunchPage: FC = () => {
  const wallet = useTonWallet()
  const navigate = useNavigate()
  const [ tonConnectUI ] = useTonConnectUI()
  const themeParams = useThemeParams()

  const [ supply, setSupply ] = useState<number>(1000000)
  const [ name, setName ] = useState<string>('')
  const [ symbol, setSymbol ] = useState<string>('')
  const [ description, setDescription ] = useState<string>('')
  const [ image, setImage ] = useState<string>('')

  // const isLaunchButtonDisabled = useMemo(() => {
  //   return (name.isEmpty() || symbol.isEmpty() || description.isEmpty() || image.isEmpty())
  // }, [ name, symbol, description, image, supply ])

  useEffect(() => {
    if (!wallet) {
      navigate('/wallet', { replace: true })
    }
  }, [ wallet ])

  if (!wallet) return null

  const handleDeploy = async () => {
    const prepared = await httpsCallable(functions, 'prepareTransaction')({
      supply: supply,
      content: {
        name: name,
        symbol: symbol,
        description: description,
        image: image
      }
    })
    const myTransaction = {
      validUntil: Math.floor(Date.now() / 1000) + 360,
      messages: [
        {
          address: MASTER,
          amount: '350000000',
          payload: prepared.data as string // payload with comment in body
        }
      ]
    }
    console.log(myTransaction)
    const result = await tonConnectUI.sendTransaction(myTransaction)
    console.log(result.boc)
    alert('Bonding curve deployed!')
    navigate('/', { replace: true })
  }

  const handleSupplyChange = (e: any) => {
    setSupply(e.target.value)
  }
  const handleNameChange = (e: any) => {
    setName(e.target.value)
  }
  const handleSymbolChange = (e: any) => {
    setSymbol(e.target.value)
  }
  const handleDescriptionChange = (e: any) => {
    setDescription(e.target.value)
  }
  const handleImageChange = (e: any) => {
    setImage(e.target.value)
  }

  return (
    <List className="scrolling-page launch">
      <Title
        caps
        style={ {
          textAlign: 'center',
          margin: '32px 0'
        } }
			>
				Ready to launch
			</Title>
      <Subheadline level={ '2' }>
        Name
      </Subheadline>
      <Input
				value={ name }
				onChange={ handleNameChange }
				header="Name"
				placeholder="TON"
			/>
      <Subheadline level={ '2' }>
        Symbol
      </Subheadline>
      <Input
        value={ symbol }
        onChange={ handleSymbolChange }
        header="Symbol"
        placeholder="tons"
      />
      <Subheadline level={ '2' }>
        Description
      </Subheadline>
      <Textarea
        value={ description }
        onChange={ handleDescriptionChange }
        header="Description"
        placeholder="Just another memecoin"
      />
      <Subheadline level={ '2' }>
        Image link
      </Subheadline>
      <Input
        value={ image }
        onChange={ handleImageChange }
        header="Image link"
        placeholder="https://picsum.photos/300"
        type={ 'url' }
      />
      <Subheadline level={ '2' }>
        Total supply
      </Subheadline>
      <Input
        header="Input"
        placeholder="1000000"
        value={ supply }
        type={ 'number' }
        onChange={ handleSupplyChange }
      />
      <Button
        size={ 'l' }
        style={ { width: '100%' } }
        onClick={ handleDeploy }
        // disabled={ isLaunchButtonDisabled }
      >
        Create and mint
      </Button>
      <Text
        style={ {
          fontSize: '12px'
        } }
      >
        Cost to deploy = <span style={{ color: themeParams.linkColor }}>0.35</span> TON
      </Text>
    </List>
  )
}
