import { isString } from 'remeda'
import type { IsLiteral } from 'type-fest'
import { type Expression, type Fqn } from '../types'
import type { AnyTypes, Invalid, Types } from './_types'
import type { LikeC4ViewBuilder, ViewPredicate } from './Builder.view-common'
import type { ViewsBuilder } from './Builder.views'

export interface ElementViewBuilder<T extends AnyTypes>
  extends LikeC4ViewBuilder<T, T['Fqn'], Expression<Types.ToAux<T>>>
{
}

export type ElementViewRulesBuilder<T extends AnyTypes> = (b: ElementViewBuilder<T>) => ElementViewBuilder<T>

export interface AddViewRules<Id extends string> {
  with<S extends AnyTypes>(
    ...rules: ElementViewRulesBuilder<S>[]
  ): (builder: ViewsBuilder<S>) => ViewsBuilder<Types.AddView<S, Id>>
}

export interface AddViewHelper {
  <
    const Id extends string,
    T extends AnyTypes,
  >(
    id: Id,
  ): AddViewRules<Id> & {
    (builder: ViewsBuilder<T>): ViewsBuilder<Types.AddView<T, Id>>
  }

  <
    const Id extends string,
    T extends AnyTypes,
  >(
    id: Id,
    builder: (b: ElementViewBuilder<T>) => ElementViewBuilder<T>,
  ): AddViewRules<Id> & {
    (builder: ViewsBuilder<T>): ViewsBuilder<Types.AddView<T, Id>>
  }

  <
    const Id extends string,
    T extends AnyTypes,
  >(
    id: Id,
    propsOrTitle: NoInfer<T['NewViewProps']> | string,
  ): AddViewRules<Id> & {
    (builder: ViewsBuilder<T>): ViewsBuilder<Types.AddView<T, Id>>
  }

  <
    const Id extends string,
    T extends AnyTypes,
  >(
    id: Id,
    propsOrTitle: NoInfer<T['NewViewProps']> | string | undefined,
    builder: (b: ElementViewBuilder<T>) => ElementViewBuilder<T>,
  ): AddViewRules<Id> & {
    (builder: ViewsBuilder<T>): ViewsBuilder<Types.AddView<T, Id>>
  }
}

type ValidFqn<T extends AnyTypes> = IsLiteral<T['Fqn']> extends true ? T['Fqn']
  : Invalid<'Fqn must be a literal'>

export interface AddViewOfHelper {
  <
    const Id extends string,
    T extends AnyTypes,
  >(
    id: Id,
    of: ValidFqn<T>,
  ): (builder: ViewsBuilder<T>) => ViewsBuilder<Types.AddView<T, Id>>

  <
    const Id extends string,
    T extends AnyTypes,
  >(
    id: Id,
    of: ValidFqn<T>,
    propsOrTitle: T['NewViewProps'] | string | ElementViewRulesBuilder<T>,
  ): (builder: ViewsBuilder<T>) => ViewsBuilder<Types.AddView<T, Id>>

  <
    const Id extends string,
    T extends AnyTypes,
  >(
    id: Id,
    of: ValidFqn<T>,
    propsOrTitle: NoInfer<T>['NewViewProps'] | string,
    builder: (b: ElementViewBuilder<T>) => ElementViewBuilder<T>,
  ): (builder: ViewsBuilder<T>) => ViewsBuilder<Types.AddView<T, Id>>
}

export interface TypedAddViewOfHelper<A extends AnyTypes> {
  <
    const Id extends string,
    T extends AnyTypes,
  >(
    id: Id,
    of: ValidFqn<A>,
  ): AddViewRules<Id> & {
    (builder: ViewsBuilder<T>): ViewsBuilder<Types.AddView<T, Id>>
  }

  <
    const Id extends string,
    T extends AnyTypes,
  >(
    id: Id,
    of: ValidFqn<A>,
    builder: ((b: ElementViewBuilder<A>) => ElementViewBuilder<A>) | A['NewViewProps'] | string,
  ): AddViewRules<Id> & {
    (builder: ViewsBuilder<T>): ViewsBuilder<Types.AddView<T, Id>>
  }

  <
    const Id extends string,
    T extends AnyTypes,
  >(
    id: Id,
    of: ValidFqn<A>,
    propsOrTitle: A['NewViewProps'] | string,
    builder: (b: ElementViewBuilder<A>) => ElementViewBuilder<A>,
  ): AddViewRules<Id> & {
    (builder: ViewsBuilder<T>): ViewsBuilder<Types.AddView<T, Id>>
  }
}
// To hook types
const asTypedExpr = <T extends AnyTypes>(expr: Expression): Expression<Types.ToAux<T>> => {
  return expr as Expression<Types.ToAux<T>>
}

export function $expr<T extends AnyTypes>(
  expr: ViewPredicate.Expression<T> | Expression,
): Expression<Types.ToAux<T>> {
  if (!isString(expr)) {
    return expr as Expression<Types.ToAux<T>>
  }
  if (expr === '*') {
    return asTypedExpr({ wildcard: true })
  }
  if (expr.startsWith('->')) {
    if (expr.endsWith('->')) {
      return asTypedExpr({
        inout: $expr(expr.replace(/->/g, '').trim()) as any,
      })
    }
    return asTypedExpr({
      incoming: $expr(expr.replace('-> ', '')) as any,
    })
  }
  if (expr.endsWith(' ->')) {
    return asTypedExpr({
      outgoing: $expr(expr.replace(' ->', '')) as any,
    })
  }
  if (expr.includes(' <-> ')) {
    const [source, target] = expr.split(' <-> ')
    return asTypedExpr({
      source: $expr(source) as any,
      target: $expr(target) as any,
      isBidirectional: true,
    })
  }
  if (expr.includes(' -> ')) {
    const [source, target] = expr.split(' -> ')
    return asTypedExpr({
      source: $expr(source) as any,
      target: $expr(target) as any,
    })
  }
  if (expr.endsWith('._')) {
    return asTypedExpr({
      ref: {
        model: expr.replace('._', '') as Fqn,
      },
      selector: 'expanded',
    })
  }
  if (expr.endsWith('.**')) {
    return asTypedExpr({
      ref: {
        model: expr.replace('.**', '') as Fqn,
      },
      selector: 'descendants',
    })
  }
  if (expr.endsWith('.*')) {
    return asTypedExpr({
      ref: {
        model: expr.replace('.*', '') as Fqn,
      },
      selector: 'children',
    })
  }
  return asTypedExpr({
    ref: {
      model: expr as any as Fqn,
    },
  })
}
