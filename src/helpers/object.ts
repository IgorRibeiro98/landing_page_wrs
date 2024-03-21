type PathNode = { [key: string]: PathNode };

function buildTree(paths: string[]): PathNode {
  const tree: PathNode = {};
  for (const path of paths) {
    const parts = path.split('.');
    let current: PathNode = tree;
    for (const part of parts) {
      const properties = part.split(',');
      for (const property of properties) {
        if (!current[property]) {
          current[property] = {};
        }
      }
      if (properties.length > 1) {
        current = tree; // Reset current to root for sibling properties
      } else {
        current = current[properties[0]];
      }
    }
  }
  return tree;
}
type Callback = (value: any, key: string) => boolean;

function removeProperties(data: any, tree: PathNode, callback?: Callback): any {
  if (Array.isArray(data)) {
    data.forEach((item, index) => {
      data[index] = removeProperties(item, tree, callback);
    });
  } else {
    for (const key in tree) {
      if (data.hasOwnProperty(key)) {
        if (callback && callback(data[key], key)) {
          delete data[key];
        } else if (Object.keys(tree[key]).length === 0) {
          delete data[key];
        } else if (typeof data[key] === 'object' && data[key] !== null) {
          data[key] = removeProperties(data[key], tree[key], callback);
        }
      }
    }
  }
  return data;
}

export function removePropertiesByPaths(data: any, paths: string[], callback?: Callback): any {
  const tree = buildTree(paths);
  const result = JSON.parse(JSON.stringify(data));
  return removeProperties(result, tree, callback);
}
