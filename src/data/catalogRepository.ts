import type { Catalog } from '../domain/models';
import { mockCatalog } from './mockCatalog';

export interface CatalogRepository {
  loadCatalog(): Promise<Catalog>;
}

export const catalogRepository: CatalogRepository = {
  async loadCatalog() {
    return mockCatalog;
  },
};
