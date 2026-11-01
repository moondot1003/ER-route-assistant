/** The sole active route; array order is visit order. Manual routes have no length limit. */
export function toggleRouteRegion(activeRoute: readonly string[], regionId: string, validRegionIds: ReadonlySet<string>): string[] {
  if (!validRegionIds.has(regionId)) throw new Error(`선택할 수 없는 지역 ID: ${regionId}`);
  return activeRoute.includes(regionId)
    ? activeRoute.filter((id) => id !== regionId)
    : [...activeRoute, regionId];
}

export function routesMatch(a: readonly string[], b: readonly string[]): boolean {
  return a.length === b.length && a.every((id, index) => id === b[index]);
}
