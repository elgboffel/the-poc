/* eslint-disable */
import type { FunctionComponent } from '@builder.io/qwik'
import type { FlexProperties } from '../patterns/flex'
import type { HTMLStyledProps } from '../types/jsx'

type Assign<T, U> = {
  [K in keyof T]?: K extends keyof T ? (K extends keyof U ? T[K] & U[K] : T[K]) : never
} & U

export type FlexProps = Assign<HTMLStyledProps<'div'>, Omit<FlexProperties, "">>


export declare const Flex: FunctionComponent<FlexProps>