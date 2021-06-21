import * as moment from 'moment';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import * as pdfMake from 'pdfmake/build/pdfmake';
import { ActivatedRoute, Router } from '@angular/router';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

import {
  AccessoryService,
  AuthService,
  GlobalService,
  NotificationService,
} from 'src/app/services';
import { Accesssory } from 'src/app/entities/accessory.class';
import { ModalMapComponent } from 'src/app/components/modal-map/modal-map.component';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss'],
})
export class PreviewComponent implements OnInit {
  @BlockUI() blockUI!: NgBlockUI;
  public currentElements: number = 100;
  public editBtn: boolean = false;
  public endDate: any;
  public isLoggedIn: boolean = false;
  public page: number = 1;
  public panelOpenState: boolean = false;
  public paramId!: any;
  public report: any;
  public userInfo: any;
  public comments: any[] = [];

  constructor(
    private readonly accessoryService: AccessoryService,
    private readonly authService: AuthService,
    private readonly globalService: GlobalService,
    private readonly notificationService: NotificationService,
    private route: Router,
    private router: ActivatedRoute,
    public dialog: MatDialog
  ) {
    this.blockUI.start('Cargando...');
  }

  ngOnInit(): void {
    const token: any = this.globalService.getToken();
    this.userInfo = this.authService.getDecodedAccessToken(token);
    this.isLoggedIn = this.authService.isLoggedIn();
    this.getAccessory(this.router.snapshot.params.id_unique);
    this.getComments(this.router.snapshot.params.id_unique);
  }

  public generateQR(report: any) {
    this.blockUI.start('Cargando...');
    const title = report?.name.toUpperCase();
    var dd: any = {
      pageSize: 'A4',
      pageOrientation: 'portrait',
      pageMargins: [40, 80, 40, 60],
      info: {
        title: `Reporte impreso del elemento ${
          report?.name
        } - @${report?.comments[0].userOwner.name.toUpperCase()}`,
        author: report?.comments[0].userOwner.name,
      },
      footer: function (pageCount: number) {
        return {
          table: {
            widths: ['*', 45],
            body: [
              [
                {
                  text: 'Visítanos en www.foundUp.com',
                  link: 'www.foundup.com',
                  alignment: 'center',
                },
                { text: 'Page ' + pageCount, alignment: 'center' },
              ],
            ],
          },
          layout: 'noBorders',
        };
      },
      content: [
        {
          alignment: 'center',
          image:
            'data:image/png;base64,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',
          fit: [220, 100],
        },

        {
          text: `\nSE BUSCA ${title}!`,
          style: 'header',
          alignment: 'center',
        },
        {
          text: [
            '\n',
            '\n',
            `Se ha extraviado en la ciudad de ${report?.lost_place}, y ha sido reportado por su dueño. Para mayor información contactarlo a través de su correo electrónico personal ${report?.comments[0].userOwner.email} o escanee el siguiente código QR para obtener más detalles del reporte:\n\n`,
          ],

          style: 'body',
          bold: false,
        },
        {
          image: report?.qr,
          fit: [300, 300],
          alignment: 'center',
        },
        {
          text: ['\n', '\n', '\n', 'Gracias por usar nuestra plataforma!'],
          style: 'bodySecondary',
          alignment: 'center',
        },
      ],
      styles: {
        header: {
          fontSize: 32,
          bold: true,
          alignment: 'justify',
        },
        body: {
          fontSize: 16,
          bold: true,
          alignment: 'justify',
        },
        bodySecondary: {
          fontSize: 14,
          bold: true,
          alignment: 'justify',
        },
      },
    };

    pdfMake
      .createPdf(dd)
      .download(
        report?.name + '_' + moment().format() + '_' + report?.id_unique
      );

    setTimeout(() => {
      this.blockUI.stop();
    }, 1000);
  }

  public onLocation(report: Accesssory) {
    this.dialog
      .open(ModalMapComponent, {
        width: '550px',
        height: '550px',
        disableClose: false,
        data: report,
      })
      .afterClosed()
      .subscribe((result) => {});
  }

  private getAccessory(id_unique: string) {
    this.accessoryService.getById(id_unique).subscribe((res) => {
      if (res.data === undefined) {
        this.route.navigateByUrl('/not-found');
      } else {
        this.report = res.data;
        this.blockUI.stop();
      }
    });
  }

  private getComments(id: string) {
    this.notificationService.getAllComments(id).subscribe((res) => {
      this.comments = res.data;
    });
  }
}
