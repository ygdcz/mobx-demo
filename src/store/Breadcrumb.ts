import { action, makeAutoObservable } from 'mobx';
import { isEqual } from 'lodash-es';

export interface IBreadcrumbObject {
  link?: string;
  title: string;
}

export type IBreadcrumb = string | IBreadcrumbObject;
class Breadcrumb {
  breadcrumbs: IBreadcrumbObject[] = [];
  constructor() {
    makeAutoObservable(
      this,
      {},
      {
        autoBind: true
      }
    );
  }

  setBreadcrumbs(breadcrumbs: IBreadcrumbObject[]) {
    if (isEqual(this.breadcrumbs, breadcrumbs)) return;
    this.breadcrumbs = breadcrumbs;
  }
}

export default new Breadcrumb();
