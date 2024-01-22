import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
export const singlebookGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)
  const id = route.params['id'];
  const isGuid = Guid(id);
  if (!isGuid) {
    router.navigate(['/pagenotfound']);
  }
  return isGuid;

  function Guid(value: string): boolean {
    const guidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;
    return guidRegex.test(value);
  }
};
