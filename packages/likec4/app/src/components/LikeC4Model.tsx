import { LikeC4ModelProvider } from '@likec4/diagram'
import { type PropsWithChildren } from 'react'
import { useLikeC4Model } from 'virtual:likec4/model'

export function LikeC4Model({ children }: PropsWithChildren) {
  const model = useLikeC4Model()

  return (
    <LikeC4ModelProvider likec4model={model}>
      {children}
    </LikeC4ModelProvider>
  )
}
