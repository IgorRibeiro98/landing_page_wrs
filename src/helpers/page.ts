export function setPageTitle(title: string) {
    // const appName = process.env.VITE_APP_NAME ?? 'WorkFlow';
    const appName = 'Totem';
    if (!title) {
        window.document.title = appName;
        return;
    }
    window.document.title = `${title} | ${appName}`;
}
