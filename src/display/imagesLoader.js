class ImagesLoader {
  constructor() {
    this.imageLinks = [
      "img/wn.svg",
      "img/wr.svg",
      "img/wq.svg",
      "img/wp.svg",
      "img/wk.svg",
      "img/wb.svg",
      "img/bn.svg",
      "img/br.svg",
      "img/bq.svg",
      "img/bp.svg",
      "img/bk.svg",
      "img/bb.svg",
    ];
  }

  loadImages() {
    return this.imageLinks.map(
      (src) =>
        new Promise((resolve, reject) => {
          const img = new Image();
          img.onload = () => resolve(img);
          img.onerror = () => reject(`${src} could not be loaded`);
          img.src = src;
        })
    );
  }
}

export default ImagesLoader;
