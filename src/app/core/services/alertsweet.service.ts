import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertsweetService {

  constructor() { }

  // Método para mostrar una alerta de éxito
  mostrarExito(mensaje: string) {
   Swal.fire({
     position: "top-end",
     icon: "success",
     title: mensaje,
     showConfirmButton: false,
     timer: 1500
   });
 }

 // Método para mostrar una alerta de error
 mostrarError(mensaje: string) {
   Swal.fire('Error', mensaje, 'error');
 }

 // Método para mostrar una alerta de advertencia
 mostrarAdvertencia(mensaje: string) {
   Swal.fire('Advertencia', mensaje, 'warning');
 }

 // Método para mostrar una alerta de información
 mostrarInformacion(mensaje: string) {
   Swal.fire('Información', mensaje, 'info');
 }

 mostrarMensajeError(mensaje: string): void {
   Swal.fire('¡Error!', mensaje, 'error');
 }
 // Método para mostrar una alerta de confirmación
 async confirmar(mensaje: string): Promise<boolean> {
   const resultado = await Swal.fire({
     title: 'Confirmar',
     text: mensaje,
     icon: 'question',
     showCancelButton: true,
     confirmButtonText: 'Sí',
     cancelButtonText: 'No'
   });

   return resultado.isConfirmed;
 }
}
