import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order, OrderItem } from '../historique/historique.component';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as QRCode from 'qrcode';

@Component({
  selector: 'app-history-details',
  templateUrl: './history-details.component.html',
  styleUrls: ['./history-details.component.scss']
})
export class HistoryDetailsComponent implements OnInit {

  order: Order | null = null;
  items: OrderItem[] = [];
  selectedProductId: string = '';
  reclamationMessage: string = '';

  constructor(private router: Router) {}

  ngOnInit() {
    const storedOrder = localStorage.getItem('selectedOrder');

    if (storedOrder) {
      this.order = JSON.parse(storedOrder) as Order;
      this.items = this.order.items || [];
    } else {
      this.router.navigate(['/historique']);
    }

    console.log('ORDER:', this.order);
  }

  // ================= PDF =================
  async generatePDF() {
    if (!this.order) return;

    const order = this.order;
    const doc = new jsPDF();

    // HEADER
    doc.setFontSize(20);
    doc.text('FACTURE', 150, 20);

    doc.setFontSize(10);
    doc.text(`ID: ${order.id}`, 14, 20);
    doc.text(`Date: ${new Date(order.date).toLocaleString()}`, 14, 26);

    // QR CODE
    const qrData = `http://localhost:4200`;
    const qrImage = await QRCode.toDataURL(qrData);
    doc.addImage(qrImage, 'PNG', 150, 30, 40, 40);

    // LINE
    doc.line(14, 30, 196, 30);

    // CLIENT
    doc.setFontSize(12);
    doc.text('Client:', 14, 40);

    doc.setFontSize(10);
    doc.text(`${order.user.firstName} ${order.user.lastName}`, 14, 46);
    doc.text(`${order.user.address}`, 14, 52);
    doc.text(`Tel: ${order.user.phone}`, 14, 58);

    // TABLE
    const tableData = this.items.map(item => [
      item.name,
      item.quantity,
      `${item.price} $`,
      `${item.price * item.quantity} $`
    ]);

    autoTable(doc, {
      startY: 70,
      head: [['Produit', 'Qté', 'Prix', 'Total']],
      body: tableData,
      theme: 'grid',
      headStyles: {
        fillColor: [0, 0, 0],
        textColor: 255
      }
    });

    // TOTAL
    const finalY = (doc as any).lastAutoTable.finalY + 10;

    const delivery = order.delivery === 'home' ? 7 : 0;
    const subtotal = (order.total || 0) - delivery;

    doc.setFontSize(11);
    doc.text(`Sous-total: ${subtotal} $`, 140, finalY);
    doc.text(`Livraison: ${delivery} $`, 140, finalY + 6);

    doc.setFontSize(13);
    doc.text(`TOTAL: ${order.total} $`, 140, finalY + 15);

    // PAYMENT
    doc.setFontSize(10);
    doc.text(`Paiement: ${order.payment}`, 14, finalY + 10);

    // MESSAGE
    if (order.message) {
      doc.text(`Message: ${order.message}`, 14, finalY + 20);
    }

    // FOOTER
    doc.text('Merci pour votre commande', 14, 280);

    // SAVE
    doc.save(`Facture-${order.id}.pdf`);
  }

  // ================= IMAGE =================
  getImage(item: any): string {
    return Array.isArray(item.image) ? item.image[0] : item.image;
  }

  // ================= RECLAMATION =================
  submitReclamation() {
    if (!this.selectedProductId || !this.reclamationMessage) {
      alert('Veuillez remplir tous les champs');
      return;
    }

    const reclamation = {
      productName: this.selectedProductId,
      message: this.reclamationMessage,
      date: new Date()
    };

    const orders = JSON.parse(localStorage.getItem('orders') || '[]');

    const index = orders.findIndex((o: any) => o.id === this.order?.id);

    if (index !== -1) {

      if (!orders[index].reclamations) {
        orders[index].reclamations = [];
      }

      
      orders[index].reclamations.push(reclamation);

    
      localStorage.setItem('orders', JSON.stringify(orders));

     
      localStorage.setItem('selectedOrder', JSON.stringify(orders[index]));

      alert('Réclamation ajoutée avec succès ✅');
    } else {
      alert('Commande non trouvée ❌');
    }

    // RESET
    this.selectedProductId = '';
    this.reclamationMessage = '';
  }
}
