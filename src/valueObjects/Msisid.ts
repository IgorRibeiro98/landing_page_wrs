export default class Msisid {
  private cc: string = '';
  private ndc: string = '';
  private sn: string = '';

  constructor(cc: string = '', ndc: string = '', sn: string = '') {
    if (!cc || !ndc || !sn) return
    this.setPhone(cc, ndc, sn);
  }

  get formattedPhone() {
    return `+${this.cc} (${this.ndc}) ${this.sn}`;
  }

  public setPhone(cc: string, ndc: string, sn: string) {
    if (!/^\d{1,3}$/.test(cc)) {
      throw new Error('CC deve ser uma string contendo de um a três dígitos');
    }
    if (!/^\d{1,3}$/.test(ndc)) {
      throw new Error('NDC deve ser uma string contendo de um a três dígitos');
    }
    if (!/^\d{6,10}$/.test(sn)) {
      throw new Error('SN deve ser uma string contendo de seis a dez dígitos');
    }
    this.cc = `+${cc}`;
    this.ndc = ndc;
    this.sn = sn;
  }

  getCC() {
    return this.cc;
  }

  getNDC() {
    return this.ndc;
  }

  getSN() {
    return this.sn;
  }
}
