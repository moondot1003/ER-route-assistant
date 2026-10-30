/** No ingredient references remain unresolved after material-page extraction.
 * The separate ambiguous Composite Bow equipment recipe remains under review.
 */
export interface UnresolvedIngredientReference {
  id: string;
  name: string;
  validationStatus: 'missing-ingredient-source';
  referencedBy: string[];
}

export const unresolvedIngredientReferences: UnresolvedIngredientReference[] = [];
