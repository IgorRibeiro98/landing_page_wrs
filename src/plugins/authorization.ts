import useUserStore from '@/stores/user';

class Authorization {
    user: User = {
        id: '',
        name: '',
        email: '',
        email_verified_at: null,
        tenant_id: '',
        created_at: '',
        updated_at: '',
        scopes_count: 0,
        scopes: [],
    };
    scopes: string[] = [];

    constructor() {
        
    }
    _authorization(slugsParam: string): boolean {
        if (!this.user.id.length) this.setUserFromStore();
        
        if (this.scopes.length) {
            if (slugsParam.includes("&")) {
                const slugs = slugsParam.split("&");

                return slugs.every((slug) => {
                    return this.scopes.some((scope) => scope === slug);
                });
            }

            const slugs = slugsParam.split("|");

            return slugs.some((slug) => {
                return this.scopes.some((scope) => scope === slug);
            });

        }

        return false
    }

    setUserFromStore() {
        const userStore = useUserStore();

        this.user = { ...userStore.user,
            scopes: [
                'totem.view',
                'totem.create',
                'totem.update',
                'totem.delete',
    
                'totem.queue.view',
                'totem.queue.create',
                'totem.queue.update',
                'totem.queue.delete',
    
                'totem.screen.view',
                'totem.screen.attach',
                'totem.screen.update',
                'totem.screen.delete',
    
                'queue.view',
                'queue.create',
                'queue.update',
                'queue.delete',
    
                'attendance_type.view',
                'attendance_type.create',
                'attendance_type.update',
                'attendance_type.delete',

                'acl.view',
                'acl.create',
                'acl.update',
                'acl.delete',
            ]
        };

        this.scopes = this.user.scopes! ?? [];
    }

    acl(slugsParam: string): boolean {
        if (!this.scopes.length) {
            const userStore = useUserStore();
            if (userStore.user.scopes?.length) {
                this.scopes = userStore.user.scopes;
            }
        }
        return this._authorization(slugsParam)
    }

    setScopesByUser(user: User): void {
        this.scopes = user.scopes! ?? [];
    }

}

export default new Authorization();

