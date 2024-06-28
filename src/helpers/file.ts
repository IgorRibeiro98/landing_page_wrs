export async function getPreview(file: File) {
  console.log(file)
  return new Promise((res, rej) => {
    try {
      const fr = new FileReader();
      fr.readAsDataURL(file);
      fr.onload = () => res(fr.result);
    } catch (err) {
      rej(err);
    }
  });
}
