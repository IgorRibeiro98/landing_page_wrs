type QueryParam = {
  [key: string]: string | string[] | null | undefined;
};

export function setPageTitle(title: string) {
    // const appName = process.env.VITE_APP_NAME ?? 'WorkFlow';
    const appName = 'Totem';
    if (!title) {
        window.document.title = appName;
        return;
    }
    window.document.title = `${title} | ${appName}`;
}

export function toggleQueryString(params: QueryParam = {}, changeUrl: URL | false = false) {
  const containHash = window.location.href.includes('#/');

  const url = changeUrl ? changeUrl : new URL(window.location.href.replace('#/', ''));

  Object.keys(params).forEach((key) => {
    const value = params[key];

    if (!value) {
      url.searchParams.delete(key);
      return;
    }

    if (typeof value === "string") {
      url.searchParams.set(key, value);
    }

    if (Array.isArray(value)) {
      url.searchParams.delete(key);

      value.forEach((item) => {
        url.searchParams.append(key, item);
      });
    }
  });

  if (containHash) {
    url.hash = `#${url.pathname}`;
    url.pathname = '';
  }

  if (changeUrl) {
    return url;
  }

  history.replaceState({}, '', url);
};
