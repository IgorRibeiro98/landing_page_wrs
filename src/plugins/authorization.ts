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
        const userStore = useUserStore();
        this.user = { ...userStore.user };
        this.scopes = this.user.scopes! ?? [];
    }
    _authorization(slugsParam: string): boolean {

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

