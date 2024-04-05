export function getComponentNameByPath(path: string) {
  const match = path.match(/\/([^\/]+)\.vue$/);
  return match ? match[1] : null;
}

export function isComponentNameEqualToPreviousFolder(path: string) {
  const match = path.match(/\/([^\/]+)\/([^\/]+)\.vue$/);
  return match ? match[1] === match[2] : false;
}

export function hasSubfolder(path: string) {
  const match = path.match(/\/totem\/([^\/]+)\/([^\/]+)/);
  return match !== null;
}

export default {
  getComponentNameByPath,
  isComponentNameEqualToPreviousFolder,
  hasSubfolder
}
