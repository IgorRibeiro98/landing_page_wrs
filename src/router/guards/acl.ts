import authorization from '@/plugins/authorization';
import type { Guard } from '@/router/guards';
import useUserStore from '@/stores/user';

export default ((to) => {
    if (to.meta.slugs?.acl && typeof to.meta.slugs?.acl === 'string') {
        if (authorization.scopes.length === 0) {
            const userStore = useUserStore();
            
            authorization.setScopesByUser({ ...userStore.user })
        }
        if (to.meta.slugs.acl) {
            return authorization.acl(to.meta.slugs.acl)
        }
    }
    return false
}) as Guard;