export class Accesssory {
  public id?: string;
  public name?: string;
  public category_id?: number;
  public category?: number;
  public description?: string;
  public lost_date?: string;
  public lost_place?: string;
  public reward?: number;
  public qr?: string;
  public id_unique?: string;
  public latitude?: number;
  public longitude?: number;
  public state?: string;

  constructor(item?: Accesssory) {
    this.id = item && item.id ? item.id : '';
    this.name = item && item.name ? item.name : '';
    this.category_id = item && item.category_id ? item.category_id : 0;
    this.category = item && item.category ? item.category : 0;
    this.description = item && item.description ? item.description : '';
    this.lost_date = item && item.lost_date ? item.lost_date : '';
    this.lost_place = item && item.lost_place ? item.lost_place : '';
    this.reward = item && item.reward ? item.reward : 0;
    this.qr = item && item.qr ? item.qr : '';
    this.id_unique = item && item.id_unique ? item.id_unique : '';
    this.latitude = item && item.latitude ? item.latitude : 0;
    this.longitude = item && item.longitude ? item.longitude : 0;
    this.state = item && item.state ? item.state : '';
  }
}
