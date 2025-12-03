import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  show(texto: string, tipo: "success" | "error" | "info" = "info") {
    const toast = document.createElement("div");
    toast.classList.add("toast-mensaje", tipo);
    toast.textContent = texto;

    document.body.appendChild(toast);

    setTimeout(() => toast.classList.add("show"), 10);

    setTimeout(() => {
      toast.classList.remove("show");
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }

  success(msg: string) {
    this.show(msg, "success");
  }

  error(msg: string) {
    this.show(msg, "error");
  }

  info(msg: string) {
    this.show(msg, "info");
  }
}
