/* eslint-disable */
import type { FunctionComponent } from '@builder.io/qwik'
import type { ContainerProperties } from '../patterns/container'
import type { HTMLStyledProps } from '../types/jsx'

type Assign<T, U> = {
  [K in keyof T]?: K extends keyof T ? (K extends keyof U ? T[K] & U[K] : T[K]) : never
} & U

export type ContainerProps = Assign<HTMLStyledProps<'div'>, Omit<ContainerProperties, "">>


export declare const Container: FunctionComponent<ContainerProps>