import type { Fqn as CoreFqn } from '../types/element'
import type { RelationID as CoreRelationID } from '../types/relation'
import type { EdgeId as CoreEdgeId, ViewID as CoreViewID } from '../types/view'

import type { LiteralUnion } from 'type-fest'
import { isString } from '../utils/guards'

export type Fqn = LiteralUnion<CoreFqn, string>
export type RelationID = LiteralUnion<CoreRelationID, string>
export type ViewID = LiteralUnion<CoreViewID, string>
export type EdgeId = LiteralUnion<CoreEdgeId, string>

export type IncomingFilter = 'all' | 'direct' | 'to-descendants'
export type OutgoingFilter = 'all' | 'direct' | 'from-descendants'

export type ElementOrFqn = Fqn | { id: Fqn }

/**
 * Utility function to extract `id` from the given element.
 */
export function getId<Id extends string>(element: Id | { id: Id }): Id {
  return isString(element) ? element : element.id
}
