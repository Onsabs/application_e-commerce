import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  slides = [
  {
    image: 'assets/images/gallery-02.jpg',
    title: 'New Fashion Collection 2026',
    desc: 'Découvrez les dernières tendances élégantes et modernes.'
  },
  {
    image: 'assets/images/blog-02.jpg',
    title: 'Premium Style',
    desc: 'Des vêtements de haute qualité pour un look unique.'
  },
  {
    image: 'assets/images/blog-03.jpg',
    title: 'Limited Edition',
    desc: 'Collection exclusive disponible pour une durée limitée.'
  }
];

current = 0;

ngOnInit() {
  setInterval(() => {
    this.current = (this.current + 1) % this.slides.length;
  }, 4000);
}


}
