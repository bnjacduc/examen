import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { QrComponent } from 'src/app/components/qr/qr.component';
import { MiclaseComponent } from 'src/app/components/miclase/miclase.component';
import { ForoComponent } from 'src/app/components/foro/foro.component';
import { MisdatosComponent } from 'src/app/components/misdatos/misdatos.component';
import { DataBaseService } from 'src/app/services/data-base.service';
import { APIClientService } from 'src/app/services/apiclient.service';
import { AdminComponent } from 'src/app/components/admin/admin.component';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
  standalone: true,
  imports: [IonicModule, 
    CommonModule,
    FormsModule,
    QrComponent, 
    MiclaseComponent, 
    ForoComponent, 
    MisdatosComponent, 
    AdminComponent
  ],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateX(-100%)' }),
        animate('500ms ease-out', style({ transform: 'translateX(0%)' }))
      ]),
      transition(':leave', [
        animate('500ms ease-out', style({ transform: 'translateX(100%)' }))
      ])
    ])
  ]
})
export class InicioPage implements OnInit {

  componente_actual = 'qr';
  admin_: boolean = false;

  

  constructor(
    private authService: AuthService, 
    private bd: DataBaseService,
    private api: APIClientService) { }

  ngOnInit() {
    this.authService.leerUsuarioAutenticado().then((userData) => {
      this.admin_ = userData?.nombre === 'admin';
    });
    this.componente_actual = '';
    this.bd.datosQR.next('');
    
  }

  cambiarComponente(nombreComponente: string) {
    this.componente_actual = nombreComponente;
    if (this.componente_actual === 'foro' && !this.admin_) {
    } else if (this.componente_actual === 'foro') {
      this.api.cargarPublicaciones();
    }
  }


  cerrarSesion() {
    this.authService.logout();
  }


}
