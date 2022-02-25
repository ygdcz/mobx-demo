import useStore from 'store';
import { useMount, useUnmount } from 'ahooks';
import { isString, last, map, get } from 'lodash-es';
import { IBreadcrumb, IBreadcrumbObject } from 'store/Breadcrumb';

function makeBreadcrumbs(breadcrumbs: IBreadcrumb[]): IBreadcrumbObject[] {
  return map(breadcrumbs, (b) => {
    if (isString(b)) {
      return {
        title: b
      };
    }
    return b;
  });
}

const useBreadcrumbs = (newBreadcrumbs: IBreadcrumb[]) => {
  const { setBreadcrumbs } = useStore().breadcrumb;

  const _newBreadcrumbs = makeBreadcrumbs(newBreadcrumbs);

  useMount(() => {
    setBreadcrumbs(_newBreadcrumbs);
  });
  useUnmount(() => {
    setBreadcrumbs([]);
  });
};

export default useBreadcrumbs;
