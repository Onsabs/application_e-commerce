import { Component } from '@angular/core';

@Component({
  selector: 'app-historique',
  templateUrl: './historique.component.html',
  styleUrls: ['./historique.component.scss']
})
export class HistoriqueComponent {
  history = [
  {
    name: 'Chemise Femme',
    image: "assets/images/blog-03.jpg",
    action_type: 'CART',
    action_date: new Date()
  },
  {
    name: 'Pull Homme',
    image: "assets/images/blog-02.jpg",
    action_type: 'FAVORITE',
    action_date: new Date()
  }, {
    name: 'Chemise Femme',
    image: "assets/images/blog-03.jpg",
    action_type: 'CART',
    action_date: new Date()
  } ,{
    name: 'Chemise Femme',
    image: "assets/images/blog-03.jpg",
    action_type: 'CART',
    action_date: new Date()
  } ,{
    name: 'Chemise Femme',
    image: "assets/images/blog-03.jpg",
    action_type: 'CART',
    action_date: new Date()
  }
];

}
